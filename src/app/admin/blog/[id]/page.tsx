import { redirect } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  redirect(`/admin/blog/${id}/edit`);
}
