import AdminSidebar from "@/components/Admin/AdminSidebar";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/QueryClientProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="min-h-screen bg-[#FFF9FB]">
        <AdminSidebar />
        <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
            <Toaster />
          </div>
        </main>
      </div>
    </ReactQueryProvider>
  );
}