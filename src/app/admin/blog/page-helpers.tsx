import { Editor } from "@tiptap/react";
import {
  ImageIcon,
  ImagePlus,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  UnderlineIcon,
  Undo2,
  X,
} from "lucide-react";
import { useUploadImage } from "@/hooks/use-uploads";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { EditorNotice } from "./BlogEditor";

export const categoryOptions = [
  "Menstrual health",
  "Girls’ education",
  "Community care",
  "Movement notes",
];

export const starterContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Start with the moment that stayed with you." },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "What did you notice? What changed? Give the reader enough room to arrive alongside you.",
        },
      ],
    },
  ],
};

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const button = (
    label: string,
    icon: React.ReactNode,
    action: () => void,
    active = false,
  ) => (
    <button
      type="button"
      title={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={action}
      className={`grid h-8 min-w-8 place-items-center rounded-md cursor-pointer px-2 ${active ? "bg-[#FF07A9] text-white shadow-sm shadow-[#FF07A9]/25" : "text-gray-600 hover:bg-[#FFE8F7] hover:text-[#ED006C]"}`}
      data-testid={`button-format-${label.toLowerCase().replaceAll(" ", "-")}`}
    >
      {icon}
    </button>
  );
  const link = () => {
    const url = window.prompt("Paste a link");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-pink-100 bg-[#FFF9FB]/95 px-3 py-2 backdrop-blur">
      {button(
        "Paragraph",
        <span className="text-xs font-bold">P</span>,
        () => editor.chain().focus().setParagraph().run(),
        editor.isActive("paragraph"),
      )}
      {button(
        "Heading 1",
        <span className="text-xs font-bold">H1</span>,
        () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        editor.isActive("heading", { level: 1 }),
      )}
      {button(
        "Heading 2",
        <span className="text-xs font-bold">H2</span>,
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        editor.isActive("heading", { level: 2 }),
      )}
      {button(
        "Heading 3",
        <span className="text-xs font-bold">H3</span>,
        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        editor.isActive("heading", { level: 3 }),
      )}
      {button(
        "Bold",
        <strong className="text-xs">B</strong>,
        () => editor.chain().focus().toggleBold().run(),
        editor.isActive("bold"),
      )}
      {button(
        "Italic",
        <em className="text-xs">I</em>,
        () => editor.chain().focus().toggleItalic().run(),
        editor.isActive("italic"),
      )}
      {button(
        "Underline",
        <UnderlineIcon className="h-4 w-4" />,
        () => editor.chain().focus().toggleUnderline().run(),
        editor.isActive("underline"),
      )}
      {button(
        "Link",
        <Link2 className="h-4 w-4" />,
        link,
        editor.isActive("link"),
      )}
      {button(
        "Bullet list",
        <List className="h-4 w-4" />,
        () => editor.chain().focus().toggleBulletList().run(),
        editor.isActive("bulletList"),
      )}
      {button(
        "Ordered list",
        <ListOrdered className="h-4 w-4" />,
        () => editor.chain().focus().toggleOrderedList().run(),
        editor.isActive("orderedList"),
      )}
      {button(
        "Blockquote",
        <Quote className="h-4 w-4" />,
        () => editor.chain().focus().toggleBlockquote().run(),
        editor.isActive("blockquote"),
      )}
      {button("Divider", <Minus className="h-4 w-4" />, () =>
        editor.chain().focus().setHorizontalRule().run(),
      )}
      <span className="mx-1 h-5 w-px bg-pink-100" />
      {button("Undo", <Undo2 className="h-4 w-4" />, () =>
        editor.chain().focus().undo().run(),
      )}
      {button("Redo", <Redo2 className="h-4 w-4" />, () =>
        editor.chain().focus().redo().run(),
      )}
      <span className="ml-auto text-[10px] text-[#11111199]">
        {editor.storage.characterCount.characters()} characters
      </span>
    </div>
  );
}

interface ImagePanelProps {
  image: string | null;
  onImageChange: (url: string | null) => void;
  onNotice: (notice: EditorNotice) => void;
}

export function ImagePanel({
  image,
  onImageChange,
  onNotice,
}: ImagePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onNotice(null);

    // Basic validation
    if (!file.type.startsWith("image/")) {
      onNotice({ tone: "error", text: "Please select a valid image file." });
      return;
    }

    // Optional size limit: 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      onNotice({ tone: "error", text: "Image must be smaller than 5MB." });
      return;
    }

    // Create temporary local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const response = await uploadImage(file);

      /*
       * Adjust this depending on the exact response
       * returned by UploadService.uploadImage.
       */
      const imageUrl = response.url;

      if (!imageUrl) {
        throw new Error("Upload succeeded but no image URL was returned.");
      }

      // Store Cloudinary URL in React Hook Form
      onImageChange(imageUrl);

      onNotice({ tone: "success", text: "Featured image uploaded." });
    } catch (error) {
      console.error("Image upload failed:", error);

      // Remove temporary preview if upload failed
      setPreviewUrl(null);

      onImageChange(null);

      onNotice({
        tone: "error",
        text: "Could not upload the featured image. Please try again.",
      });
    } finally {
      // Allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageChange(null);
    onNotice(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const displayImage = image ?? previewUrl;

  return (
    <section className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.15em] text-[#FF07A9]">
            Featured image
          </h3>
          <p className="mt-1 text-xs text-[#11111199]">
            Add an image that represents this story.
          </p>
        </div>
        {displayImage && !isUploading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-[#11111199] hover:bg-red-50 hover:text-red-600"
          >
            <X className="mr-1.5 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
      <div className="overflow-hidden border-dashed rounded-xl border-2 border-pink-200 bg-[#FFF9FB] mt-3">
        {displayImage ? (
          <div className="relative">
            <img
              src={displayImage}
              alt="Featured image preview"
              className="aspect-video w-full object-cover"
            />

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111111]/40 text-[#FF07A9]">
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium shadow">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              </div>
            )}

            {image && !isUploading && (
              <div className="absolute bottom-3 left-3 rounded-full bg-[#FF07A9] px-2.5 py-1 text-[11px] font-semibold text-white">
                Uploaded
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleChooseImage}
            disabled={isUploading}
            className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 transition-colors hover:bg-[#FFE8F7] disabled:pointer-events-none disabled:opacity-60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-100 bg-white">
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#FF07A9]" />
              ) : (
                <ImageIcon className="h-5 w-5 text-[#FF07A9]" />
              )}
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-[#111111]">
                {isUploading ? "Uploading image..." : "Upload featured image"}
              </p>

              <p className="mt-1 text-xs text-[#11111199]">
                PNG, JPG or WEBP · Max 5MB
              </p>
            </div>
          </button>
        )}
      </div>
      {/* <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileSelect}
        placeholder="https://…"
        className="mt-3 h-10 w-full rounded-md border border-input bg-background px-3 text-xs outline-none focus:border-primary"
        data-testid="input-featured-image-url"
      /> */}
      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#FF07A9] py-2 text-xs font-semibold text-[#FF07A9] transition-colors hover:bg-[#FFE8F7]">
        <ImagePlus className="h-3.5 w-3.5" /> Choose file
        <input
        ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          data-testid="input-featured-image-file"
        />
      </label>
    </section>
  );
}

export function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 fill-none stroke-current stroke-2"
    >
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}
