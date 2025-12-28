"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HistoryTable from "@/components/HistoryTable";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function History() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    try {
      jwtDecode(token); // Throws if invalid
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <h2 className="text-2xl mb-4">History</h2>
        <HistoryTable type="deposits" />
        <HistoryTable type="trades" />
      </div>
    </div>
  );
}