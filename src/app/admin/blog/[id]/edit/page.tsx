import { adminAuth } from "@/middleware/adminAuth";
import { redirect } from "next/navigation";
import BlogEditor from "../../BlogEditor";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const session = await adminAuth();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  return <BlogEditor mode="edit" postId={id} />;
}
