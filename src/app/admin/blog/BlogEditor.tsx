"use client";

import {
  AlertCircle,
  ArrowLeft,
  Check,
  Eye,
  Loader2,
  Save,
  Trash2,
  // Underline as UnderlineIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TiptapLink from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extensions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate, SectionKicker } from "@/components/Blog/Blog-shell";
import { ContentRenderer } from "@/components/Blog/Content-renderer";
import {
  ArrowUpRightIcon,
  categoryOptions,
  EditorToolbar,
  ImagePanel,
  starterContent,
} from "./page-helpers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlogPostFormValues,
  blogPostInputSchema,
  BlogStatus,
} from "@/schemas/BlogSchema";
import {
  BlogPostInput,
  BlogPostInputContent,
  useCreateBlogPost,
  useDeleteBlogPost,
  useGetBlogPost,
  useUnpublishBlogPost,
  useUpdateBlogPost,
} from "@/hooks/use-blogs";
import { useToast } from "@/components/ui/use-toast";
import { DeleteStoryDialog } from "@/components/Blog/Delete-story-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { generateSlug } from "@/helpers/generateSlug";
import { Textarea } from "@/components/ui/textarea";

interface BlogEditorProps {
  mode: "create" | "edit";
  postId?: string;
}

function saveErrorMessage(error: unknown) {
  const status = (error as { response?: { status?: number } })?.response
    ?.status;
  if (status === 409)
    return "Another story already uses this slug. Choose a different one.";
  if (status === 401)
    return "Your session has expired. Sign in again to save this story.";
  return "Could not save this story. Please try again.";
}

export type EditorNotice = { tone: "success" | "error"; text: string } | null;

export default function BlogEditor({ mode, postId }: BlogEditorProps) {
  const isNew = mode === "create";
  const router = useRouter();
  const { toast } = useToast();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const loadedPostId = useRef<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState<EditorNotice>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<BlogStatus | null>(null);

  const postQuery = useGetBlogPost(postId ?? "");
  const { mutate: createPost, isPending } = useCreateBlogPost();
  const { mutate: update, isPending: isUpdating } = useUpdateBlogPost();
  const { mutate: unpublish, isPending: isUnpublishing } =
    useUnpublishBlogPost();
  const { mutate: remove, isPending: isRemoving } = useDeleteBlogPost();
  const post = postQuery.data;

  const success = (text: string) => setNotice({ tone: "success", text });
  const failure = (text: string) => setNotice({ tone: "error", text });

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostInputSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: starterContent,
      featuredImage: null,
      author: "PadHer editorial team",
      category: categoryOptions[0],
      tags: [],
      status: BlogStatus.DRAFT,
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapLink.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder: "Begin writing here…",
      }),
      CharacterCount.configure({
        limit: 50000,
      }),
    ],

    content: form.getValues("content"),
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      form.setValue("content", editor.getJSON() as BlogPostInputContent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
  });

  const title = form.watch("title");
  const excerpt = form.watch("excerpt");
  const category = form.watch("category");
  const image = form.watch("featuredImage");
  const body = form.watch("content");
  const tags = form.watch("tags") ?? [];
  const status = form.watch("status");

  // Load the saved post into the form once. Background refetches (e.g. on
  // window focus) must not overwrite edits that haven't been saved yet.
  useEffect(() => {
    if (isNew || !post || !editor || loadedPostId.current === post.id) return;

    loadedPostId.current = post.id;

    form.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      author: post.author,
      category: post.category,
      tags: post.tags ?? [],
      status: post.status,
    });

    editor.commands.setContent(post.content);
  }, [isNew, post, editor, form]);

  const save = (nextStatus: BlogStatus = BlogStatus.DRAFT) => {
    setNotice(null);

    form.handleSubmit(
      (values) => {
        const data: BlogPostInput = {
          ...values,
          status: nextStatus,
        };
        const published = nextStatus === BlogStatus.PUBLISHED;

        setPendingStatus(nextStatus);

        if (isNew) {
          createPost(data, {
            onSuccess: (saved) => {
              toast({
                title: published ? "Story published" : "Draft saved",
                description: `“${saved.title}” has been ${published ? "published" : "saved"}.`,
              });
              router.replace(`/admin/blog/${saved.id}/edit`);
            },
            onError: (error) => failure(saveErrorMessage(error)),
            onSettled: () => setPendingStatus(null),
          });

          return;
        }

        if (!postId) return;

        update(
          {
            id: postId,
            ...data,
          },
          {
            onSuccess: (saved) => {
              form.reset({ ...values, status: saved.status });
              success(
                published
                  ? "Story saved and published."
                  : status === BlogStatus.PUBLISHED
                    ? "Changes saved. This story is now a draft."
                    : "Changes saved.",
              );
            },
            onError: (error) => failure(saveErrorMessage(error)),
            onSettled: () => setPendingStatus(null),
          },
        );
      },
      (errors) => {
        if (errors.title) titleRef.current?.focus();
        failure(
          errors.title
            ? "Add a title before saving this story."
            : errors.slug
              ? "Add a slug before saving this story."
              : "Some details are missing. Check the highlighted fields.",
        );
      },
    )();
  };

  // Publishing goes through a full save so unsaved edits are published too
  const publishNow = () => save(BlogStatus.PUBLISHED);

  const updateNow = () => save(BlogStatus.PUBLISHED);

  const unpublishNow = () => {
    if (!postId) return;

    unpublish(postId, {
      onSuccess: (saved) => {
        form.setValue("status", saved.status);
        success("Story moved back to drafts.");
      },

      onError: () => failure("Could not unpublish this story."),
    });
  };

  const deleteNow = () => {
    if (!postId) return;

    remove(postId, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast({
          title: "Story deleted",
          description: `“${form.getValues("title")}” has been removed.`,
        });
        router.push("/admin/blog");
      },

      onError: () => {
        setIsDeleteOpen(false);
        failure("Could not delete this story.");
      },
    });
  };

  const isSaving = isPending || isUpdating;
  const isSavingDraft = isSaving && pendingStatus === BlogStatus.DRAFT;
  const isPublishing = isSaving && pendingStatus === BlogStatus.PUBLISHED;

  const busy =
    isSaving ||
    isUnpublishing ||
    isRemoving ||
    (!isNew && postQuery.isLoading);

  const addTag = () => {
    const value = tagInput.trim().replace(/^#/, "");

    if (!value) return;

    const currentTags = form.getValues("tags") ?? [];

    if (!currentTags.includes(value)) {
      form.setValue("tags", [...currentTags, value], {
        shouldDirty: true,
      });
    }

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") ?? [];

    form.setValue(
      "tags",
      currentTags.filter((item) => item !== tag),
      {
        shouldDirty: true,
      },
    );
  };

  if (!isNew && postQuery.isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#FF07A9]" />
      </div>
    );
  }

  if (!isNew && postQuery.isError)
    return (
      <div className="mx-auto max-w-3xl text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-[#ED006C]" />

        <h1 className="mt-4 font-playfair text-3xl font-bold text-[#111111]">
          We could not open this story.
        </h1>

        <p className="mt-2 text-sm text-[#11111199]">
          Try returning to the shelf and opening it again.
        </p>

        <Link
          href="/admin/blog"
          className="mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-bold transition-all bg-linear-to-b from-[#FF07A9] to-[#B90D7D] text-white shadow-md shadow-[#FF07A9]/25 hover:from-[#ED006C]"
          data-testid="link-editor-error-back"
        >
          Back to stories
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-330">
      <div className="flex flex-col gap-4 border-b border-pink-100 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="grid h-9 w-9 place-items-center rounded-full border border-pink-100 bg-white text-[#FF07A9] transition-colors hover:border-[#FF07A9] hover:bg-[#FFE8F7] cursor-pointer"
            aria-label="Back to stories"
            data-testid="link-editor-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <SectionKicker>
                {isNew ? "New story" : "Edit story"}
              </SectionKicker>
              {!isNew && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.16em] ${status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-[#FFE8F7] text-[#B90D7D]"}`}>
                  {status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-[#11111199]">
              {post
                ? `Last edited ${formatDate(post.updatedAt)}`
                : "A blank page, with good intentions."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-semibold cursor-pointer transition-colors ${preview ? "border-[#FF07A9] bg-[#FFE8F7] text-[#ED006C]" : "border-pink-100 bg-white text-[#11111199] hover:border-[#FF07A9] hover:text-[#FF07A9]"}`}
            data-testid="button-toggle-preview"
          >
            <Eye className="h-4 w-4" /> {preview ? "Writing mode" : "Preview"}
          </button>
          <button
            disabled={busy}
            onClick={() => save(BlogStatus.DRAFT)}
            className="inline-flex cursor-pointer h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors border border-[#FF07A9] bg-white text-[#FF07A9] hover:bg-[#FFE8F7] disabled:opacity-60"
            data-testid="button-save-draft"
          >
            {isSavingDraft ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}{" "}
            {status === "PUBLISHED" && !isNew ? "Save as draft" : "Save draft"}
          </button>
          {status === "PUBLISHED" && !isNew ? (
            <>
            <button
              disabled={busy}
              onClick={unpublishNow}
              className="h-10 rounded-full cursor-pointer border border-pink-100 bg-white px-4 text-xs font-semibold text-[#11111199] transition-colors hover:border-[#B90D7D] hover:text-[#B90D7D] disabled:opacity-60"
              data-testid="button-unpublish"
            >
              {isUnpublishing ? "Unpublishing…" : "Unpublish"}
            </button>
            <button
              disabled={busy}
              onClick={updateNow}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-xs font-bold transition-all hover:-translate-y-0.5 bg-linear-to-b from-[#FF07A9] to-[#B90D7D] text-white shadow-md shadow-[#FF07A9]/25 hover:from-[#ED006C] disabled:opacity-60"
              data-testid="button-update-published"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}{" "}
              Update story
            </button>
            </>
          ) : (
            <button
              disabled={busy}
              onClick={publishNow}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-xs font-bold transition-all hover:-translate-y-0.5 bg-linear-to-b from-[#FF07A9] to-[#B90D7D] text-white shadow-md shadow-[#FF07A9]/25 hover:from-[#ED006C] disabled:opacity-60"
              data-testid="button-publish"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRightIcon />
              )}{" "}
              Publish
            </button>
          )}
        </div>
      </div>
      {notice && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${notice.tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-800"}`}
          data-testid="status-editor-message"
          role={notice.tone === "error" ? "alert" : "status"}
        >
          {notice.tone === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {notice.text}
          <button
            type="button"
            className="ml-auto cursor-pointer opacity-60 hover:opacity-100"
            onClick={() => setNotice(null)}
            data-testid="button-dismiss-editor-message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {preview ? (
        <div className="mx-auto mt-10 w-full rounded-2xl border border-pink-100 bg-white px-6 py-12 shadow-sm md:px-16 text-[#393939]">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF07A9]">
              {category}
            </div>
            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight tracking-tight text-[#111111] md:text-6xl">
              {title || "Your story title"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#11111199]">
              {excerpt || "A short introduction to the story."}
            </p>
          </div>
          {image && (
            <img
              src={image}
              alt=""
              className="mt-10 aspect-2/1 w-full rounded-xl object-cover"
            />
          )}
          <div className="mx-auto mt-10 max-w-2xl">
            <ContentRenderer content={body} />
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              save(BlogStatus.DRAFT);
            })}
            className="grid gap-8 py-8 xl:grid-cols-[minmax(0,1fr)_320px]"
          >
            <div className="min-w-0 rounded-2xl border border-pink-100 bg-white px-5 py-7 shadow-sm md:px-12 md:py-12">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="block">
                    <FormLabel className="sr-only label">Story title</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        ref={(element) => {
                          field.ref(element);
                          titleRef.current = element;
                        }}
                        onChange={(event) => {
                          const value = event.target.value;

                          const currentSlug = form.getValues("slug");
                          const slugFollowsTitle =
                            !currentSlug ||
                            currentSlug === generateSlug(field.value ?? "");

                          field.onChange(value);

                          // Keep the slug in step with the title until it is
                          // edited by hand. Never change a live story's URL.
                          if (
                            slugFollowsTitle &&
                            status !== BlogStatus.PUBLISHED
                          ) {
                            form.setValue("slug", generateSlug(value), {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }
                        }}
                        rows={2}
                        placeholder="Give this story a title…"
                        className="w-full resize-none bg-transparent font-playfair text-4xl font-bold leading-[1.1] tracking-tight outline-none placeholder:text-[#11111140] text-[#111111] md:text-6xl"
                        data-testid="input-story-title"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-8 grid gap-5 border-y border-pink-100 py-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 label">Slug</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="story-slug"
                          data-testid="input-story-slug"
                          className="border-pink-100 bg-[#FFF9FB] focus-visible:border-[#FF07A9] focus-visible:ring-[#FF07A9]/15"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 label">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border-pink-100 bg-[#FFF9FB] focus-visible:border-[#FF07A9] focus-visible:ring-[#FF07A9]/15">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="mb-2 label">Excerpt</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        rows={2}
                        placeholder="A clear, generous invitation into the story…"
                        className="w-full resize-none rounded-md border border-pink-100 bg-[#FFF9FB] focus-visible:border-[#FF07A9] focus-visible:ring-[#FF07A9]/15"
                        data-testid="input-story-excerpt"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-7 overflow-hidden rounded-xl border border-pink-100 focus-within:border-[#FF07A9] transition-colors">
                <EditorToolbar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="editor-copy min-h-97.5 px-5 py-5 text-[#393939] outline-none md:px-7 md:py-7"
                  data-testid="editor-story-content"
                />
              </div>
            </div>
            <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start text-[#111111]">
              <section className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-[.15em] text-[#FF07A9]">
                  Story details
                </h3>
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="mb-2 label">Author</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          data-testid="input-story-author"
                          className="border-pink-100 bg-[#FFF9FB] focus-visible:border-[#FF07A9] focus-visible:ring-[#FF07A9]/15"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <span className="mb-2 label">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="rounded-full bg-[#FFE8F7] px-2.5 py-1 text-[11px] font-semibold text-[#B90D7D] transition-colors hover:bg-[#FF07A9] hover:text-white cursor-pointer"
                        data-testid={`button-remove-tag-${tag}`}
                      >
                        #{tag} <span className="ml-1">×</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      placeholder="Add a tag"
                      className="border border-pink-100 bg-[#FFF9FB] focus-visible:border-[#FF07A9] focus-visible:ring-[#FF07A9]/15"
                      data-testid="input-story-tag"
                    />
                    <button
                      onClick={addTag}
                      type="button"
                      className="rounded-md border border-[#FF07A9] text-[#FF07A9] px-3 text-xs font-semibold transition-colors hover:bg-[#FF07A9] hover:text-white cursor-pointer"
                      data-testid="button-add-tag"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </section>
              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <ImagePanel
                    image={field.value ?? null}
                    onImageChange={field.onChange}
                    onNotice={setNotice}
                  />
                )}
              />
              {!isNew && (
                <button
                  onClick={() => setIsDeleteOpen(true)}
                  disabled={busy}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 cursor-pointer disabled:opacity-50"
                  data-testid="button-delete-story"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete story
                </button>
              )}
            </aside>
          </form>
        </Form>
      )}
      <DeleteStoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={title}
        isDeleting={isRemoving}
        onConfirm={deleteNow}
      />
    </div>
  );
}
