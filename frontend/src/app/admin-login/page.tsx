"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/utils/axiosInstance';

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      if (res.data.role !== "admin") {
        return alert("Access denied - Admin only");
      }
      localStorage.setItem("token", res.data.token);
      router.push("/admin");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-4xl mb-8 font-bold">Admin Login (Admin Only)</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-80">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
        <button type="submit" className="bg-blue-500 p-2 w-full rounded hover:bg-blue-600 transition">Login</button>
      </form>
    </main>
  );
}