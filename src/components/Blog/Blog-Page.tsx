"use client";

import {
  AlertCircle,
  Archive,
  ArrowUpRight,
  Check,
  ChevronDown,
  FilePenLine,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  formatDate,
  SearchField,
  SectionKicker,
} from "@/components/Blog/Blog-shell";
import { DeleteStoryDialog } from "@/components/Blog/Delete-story-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BlogPost,
  BlogStatus,
  useDeleteBlogPost,
  useListBlogPosts,
  usePublishBlogPost,
  useUnpublishBlogPost,
} from "@/hooks/use-blogs";

const filters = ["All stories", "Published", "Drafts"];

const sortOptions = {
  recent: "Recently edited",
  oldest: "Oldest first",
  title: "Title A–Z",
} as const;

type SortKey = keyof typeof sortOptions;

type Feedback = { tone: "success" | "error"; message: string } | null;

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-[#111111] focus:bg-[#FFE8F7] focus:text-[#ED006C]";

function StatusPill({ status }: { status: BlogStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] ${status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-[#FFE8F7] text-[#B90D7D]"}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status === "PUBLISHED" ? "Published" : "Draft"}
    </span>
  );
}

function PostRow({
  post,
  onFeedback,
}: {
  post: BlogPost;
  onFeedback: (feedback: Feedback) => void;
}) {
  const publish = usePublishBlogPost();
  const unpublish = useUnpublishBlogPost();
  const remove = useDeleteBlogPost();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const busy = publish.isPending || unpublish.isPending || remove.isPending;
  const isPublished = post.status === BlogStatus.PUBLISHED;

  const togglePublish = () => {
    const action = isPublished ? unpublish : publish;
    action.mutate(post.id, {
      onSuccess: () =>
        onFeedback({
          tone: "success",
          message: isPublished
            ? `“${post.title}” moved back to drafts.`
            : `“${post.title}” is now live on the blog.`,
        }),
      onError: () =>
        onFeedback({
          tone: "error",
          message: "The server could not update this story.",
        }),
    });
  };

  const deletePost = () => {
    remove.mutate(post.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        onFeedback({
          tone: "success",
          message: `“${post.title}” has been deleted.`,
        });
      },
      onError: () => {
        setIsDeleteOpen(false);
        onFeedback({
          tone: "error",
          message: "The server could not delete this story.",
        });
      },
    });
  };

  return (
    <div
      className="group grid gap-4 border-b border-pink-100 px-5 py-5 transition-colors last:border-b-0 hover:bg-pink-50/30 md:grid-cols-[minmax(0,1fr)_155px_135px_44px] md:items-center md:px-6"
      data-testid={`row-post-${post.id}`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <StatusPill status={post.status} />
          <span className="truncate text-[11px] font-medium text-[#11111199]">
            {post.category}
          </span>
        </div>
        <Link
          href={`/admin/blog/${post.id}/edit`}
          className="mt-2 block truncate font-playfair text-xl font-bold text-[#111111] transition-colors hover:text-[#ED006C]"
          data-testid={`link-edit-post-${post.id}`}
        >
          {post.title || "Untitled story"}
        </Link>
        <p className="mt-1 truncate text-xs text-[#11111199]">
          {post.excerpt || "No excerpt yet."}
        </p>
      </div>
      <div className="hidden text-xs text-gray-600 md:block">
        {isPublished
          ? `Published ${formatDate(post.publishedAt)}`
          : `Edited ${formatDate(post.updatedAt)}`}
      </div>
      <div className="hidden text-xs text-gray-600 md:block">
        {post.author || "PadHer team"}
      </div>
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              disabled={busy}
              className="grid h-9 w-9 place-items-center rounded-md text-gray-500 cursor-pointer transition-colors hover:bg-[#FFE8F7] hover:text-[#ED006C] data-[state=open]:bg-[#FFE8F7] data-[state=open]:text-[#ED006C] disabled:opacity-50"
              aria-label="Open story actions"
              data-testid={`button-post-menu-${post.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl border-pink-100 bg-white p-1 shadow-lg shadow-[#FF07A9]/10"
          >
            <DropdownMenuItem asChild className={menuItemClass}>
              <Link
                href={`/admin/blog/${post.id}/edit`}
                data-testid={`link-menu-edit-${post.id}`}
              >
                <FilePenLine className="h-3.5 w-3.5" /> Continue editing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={togglePublish}
              className={menuItemClass}
              data-testid={`button-toggle-publish-${post.id}`}
            >
              {isPublished ? (
                <Archive className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )}
              {isPublished ? "Unpublish" : "Publish"}
            </DropdownMenuItem>
            {isPublished && (
              <DropdownMenuItem asChild className={menuItemClass}>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  data-testid={`link-menu-view-${post.id}`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" /> View live
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onSelect={() => setIsDeleteOpen(true)}
              className={`${menuItemClass} text-red-600 focus:bg-red-50 focus:text-red-600`}
              data-testid={`button-delete-post-${post.id}`}
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete story
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteStoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={post.title}
        isDeleting={remove.isPending}
        onConfirm={deletePost}
      />
    </div>
  );
}

export default function AdminBlog() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("All stories");
  const [sort, setSort] = useState<SortKey>("recent");
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      300,
    );
    return () => window.clearTimeout(timeout);
  }, [search]);

  const status =
    filter === "Published"
      ? BlogStatus.PUBLISHED
      : filter === "Drafts"
        ? BlogStatus.DRAFT
        : undefined;
  const params = useMemo(
    () => ({
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(status ? { status } : {}),
    }),
    [debouncedSearch, status],
  );
  const query = useListBlogPosts(params);
  const posts = useMemo(() => {
    const list = [...(query.data ?? [])];
    if (sort === "title")
      return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "oldest")
      return list.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
    return list.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [query.data, sort]);
  const isFiltered = Boolean(debouncedSearch || status);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-6 border-b border-pink-100 pb-8 md:flex-row md:items-end">
        <div>
          <SectionKicker>Editorial desk</SectionKicker>
          <h1 className="font-playfair text-4xl font-bold tracking-tight md:text-5xl text-[#111111]">
            All stories
          </h1>
          <p className="mt-2 text-sm font-medium text-[#11111199]">
            The shared shelf for every story in progress.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-linear-to-b from-[#FF07A9] to-[#B90D7D] px-5 text-sm font-bold text-white shadow-md shadow-[#FF07A9]/25 transition-all hover:-translate-y-0.5 hover:from-[#ED006C]"
          data-testid="link-new-story"
        >
          <Plus className="h-4 w-4" /> New story
        </Link>
      </div>
      <div className="mt-7 flex flex-col gap-3 md:flex-row">
        <div className="w-full md:max-w-sm">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by title, author or tag"
          />
        </div>
        <div className="flex rounded-full border border-pink-100 bg-white p-1">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold cursor-pointer transition-colors ${filter === item ? "bg-[#FF07A9] text-white shadow-sm shadow-[#FF07A9]/25" : "text-[#11111199] hover:text-[#ED006C]"}`}
              data-testid={`button-filter-${item.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item}
            </button>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-auto hidden h-11 items-center gap-2 rounded-full border border-pink-100 bg-white px-4 text-xs font-semibold text-[#11111199] transition-colors hover:border-[#FF07A9] hover:text-[#FF07A9] data-[state=open]:border-[#FF07A9] data-[state=open]:text-[#FF07A9] md:flex cursor-pointer"
              data-testid="button-sort-stories"
            >
              {sortOptions[sort]} <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl border-pink-100 bg-white p-1 shadow-lg shadow-[#FF07A9]/10"
          >
            {(Object.keys(sortOptions) as SortKey[]).map((key) => (
              <DropdownMenuItem
                key={key}
                onSelect={() => setSort(key)}
                className={`${menuItemClass} ${sort === key ? "text-[#ED006C]" : ""}`}
              >
                {sortOptions[key]}
                {sort === key && <Check className="ml-auto h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {feedback && (
        <div
          className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${feedback.tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-800"}`}
          data-testid="status-action-feedback"
        >
          {feedback.tone === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {feedback.message}
          <button
            className="ml-auto cursor-pointer opacity-60 hover:opacity-100"
            onClick={() => setFeedback(null)}
            data-testid="button-dismiss-feedback"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="mt-8 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
        {query.isLoading ? (
          <div className="space-y-5 p-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex gap-4">
                <div className="skeleton h-5 w-16 rounded-full" />
                <div className="skeleton h-5 flex-1 rounded" />
                <div className="skeleton h-5 w-24 rounded" />
              </div>
            ))}
          </div>
        ) : query.isError ? (
          <div className="p-16 text-center">
            <h2 className="font-playfair text-2xl font-bold text-[#111111]">
              The shelf is temporarily closed.
            </h2>
            <p className="mt-2 text-sm text-[#11111199]">
              We could not load your stories right now.
            </p>
            <button
              onClick={() => query.refetch()}
              className="mt-5 rounded-full border border-[#FF07A9] px-5 py-2.5 text-sm font-semibold text-[#FF07A9] transition-colors hover:bg-[#FFE8F7] cursor-pointer"
              data-testid="button-retry-posts"
            >
              Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#FFE8F7] text-[#FF07A9]">
              <FilePenLine className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-playfair text-2xl font-bold text-[#111111]">Nothing here yet.</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#11111199]">
              {isFiltered
                ? "No story matches these filters."
                : "Start with the story that has been waiting to be told."}
            </p>
            <Link
              href="/admin/blog/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-b from-[#FF07A9] to-[#B90D7D] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#FF07A9]/25 transition-all hover:-translate-y-0.5 hover:from-[#ED006C]"
              data-testid="link-empty-new-story"
            >
              <Plus className="h-4 w-4" /> Write a story
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[minmax(0,1fr)_155px_135px_44px] gap-4 border-b border-pink-100 bg-[#FFF9FB] px-6 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-gray-600 md:grid">
              <span>Story</span>
              <span>Timing</span>
              <span>Author</span>
              <span />
            </div>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} onFeedback={setFeedback} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
