"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "../animations/loader";

const RouteLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-600 border-t-transparent" /> */}
      <Loader />
    </div>
  );
};

export default RouteLoader;
