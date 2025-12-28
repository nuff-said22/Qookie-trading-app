"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/utils/axiosInstance';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      router.push(res.data.role === "admin" ? "/admin" : "/wallet"); // Land on deposit for users
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-80">
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <button type="submit" className="bg-blue-500 p-2 w-full rounded hover:bg-blue-600 transition">Login</button>
    </form>
  );
}