import { adminAuth } from "@/middleware/adminAuth";
import { redirect } from "next/navigation";
import BlogEditor from "../BlogEditor";

const Page = async () => {
  const session = await adminAuth();

  if (!session) {
    redirect("/login");
  }

  return <BlogEditor mode="create" />;
};

export default Page;
