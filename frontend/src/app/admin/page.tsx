"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role !== "admin") router.push("/dashboard");
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar /> {/* Added sidebar for better navigation */}
      <div className="p-8 w-full">
        <h2 className="text-2xl mb-4">Admin Panel</h2>
        <AdminPanel />
      </div>
    </div>
  );
}