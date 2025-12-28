"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/dashboard");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-4xl mb-8 font-bold">Qookie Trading App</h1>
      <div className="flex gap-8">
        <LoginForm />
        <RegisterForm />
      </div>
      <Link href="/admin-login" className="mt-4 text-blue-400 hover:underline">Admin Login (Admin Only)</Link>
    </main>
  );
}