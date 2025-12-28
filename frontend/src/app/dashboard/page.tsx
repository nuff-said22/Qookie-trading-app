"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role === "admin") router.push("/admin");
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">
        <h2>Welcome to Dashboard. Select a tab from sidebar.</h2>
      </div>
    </div>
  );
}