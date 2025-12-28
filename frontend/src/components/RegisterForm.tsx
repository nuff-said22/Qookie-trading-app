"use client";

import { useState } from "react";
import api from '@/utils/axiosInstance';

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords don't match");
    if (!email.includes('@')) return alert("Invalid email");
    try {
      await api.post("/auth/register", { username, email, password });
      alert("Registered! Now login.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-80">
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="block mb-4 p-2 w-full text-black rounded" />
      <button type="submit" className="bg-green-500 p-2 w-full rounded hover:bg-green-600 transition">Register</button>
    </form>
  );
}