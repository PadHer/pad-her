import { ExternalLink } from "lucide-react";

type Mark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type Node = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Mark[];
  content?: Node[];
};

function safeUrl(value: unknown) {
  if (typeof value !== "string") return "#";
  return /^(https?:\/\/|mailto:)/i.test(value) ? value : "#";
}

function scrubHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function renderNode(node: Node, key: string): React.ReactNode {
  const children =
    node.content?.map((child, i) => renderNode(child, `${key}-${i}`)) ??
    node.text ??
    null;
  if (node.type === "heading") {
    const level = Number(node.attrs?.level) || 2;
    const Tag = level === 1 ? "h2" : level === 3 ? "h4" : "h3";
    return <Tag key={key}>{children}</Tag>;
  }
  if (node.type === "blockquote")
    return <blockquote key={key}>{children}</blockquote>;
  if (node.type === "bulletList" || node.type === "orderedList") {
    const Tag = node.type === "bulletList" ? "ul" : "ol";
    return <Tag key={key}>{children}</Tag>;
  }
  if (node.type === "listItem") return <li key={key}>{children}</li>;
  if (node.type === "image")
    return (
      <img
        key={key}
        src={safeUrl(node.attrs?.src)}
        alt={String(node.attrs?.alt ?? "")}
      />
    );
  if (node.type === "hardBreak") return <br key={key} />;
  if (node.type === "horizontalRule") return <hr key={key} />;
  if (node.type === "codeBlock")
    return (
      <pre key={key}>
        <code>{children}</code>
      </pre>
    );
  if (node.type === "text") {
    // Tiptap stores inline formatting (bold, links, …) as marks on text nodes
    return (node.marks ?? []).reduce<React.ReactNode>((text, mark, i) => {
      const markKey = `${key}-m${i}`;
      switch (mark.type) {
        case "bold":
          return <strong key={markKey}>{text}</strong>;
        case "italic":
          return <em key={markKey}>{text}</em>;
        case "underline":
          return <u key={markKey}>{text}</u>;
        case "strike":
          return <s key={markKey}>{text}</s>;
        case "code":
          return <code key={markKey}>{text}</code>;
        case "link":
          return (
            <a
              key={markKey}
              href={safeUrl(mark.attrs?.href)}
              target="_blank"
              rel="noreferrer"
            >
              {text}
              <ExternalLink className="ml-1 inline-block h-3 w-3" />
            </a>
          );
        default:
          return text;
      }
    }, node.text ?? "");
  }
  if (node.type === "paragraph") return <p key={key}>{children}</p>;
  return <span key={key}>{children}</span>;
}

export function ContentRenderer({
  content,
}: {
  content: Record<string, unknown>;
}) {
  const value = content as Node;
  if (typeof content.html === "string")
    return (
      <div
        className="editor-copy"
        dangerouslySetInnerHTML={{ __html: scrubHtml(content.html) }}
      />
    );
  if (Array.isArray(value.content))
    return (
      <div className="editor-copy">
        {value.content.map((node, i) => renderNode(node, String(i)))}
      </div>
    );
  return (
    <p className="text-[#11111199]">This story is still taking shape.</p>
  );
}
