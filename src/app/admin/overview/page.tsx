import { adminAuth } from "@/middleware/adminAuth";
import { redirect } from "next/navigation";
import { Overview } from "./Overview";

const Page = async () => {
  const session = await adminAuth();

  if (!session) {
    redirect("/login");
  }

  return (
      <>
        <Overview />
      </>
  );
};

export default Page;