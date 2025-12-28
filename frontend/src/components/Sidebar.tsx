"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        setRole(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4 shadow-lg">
      <ul className="space-y-2">
        <li><Link href="/wallet" className="block py-2 px-4 hover:bg-gray-700 rounded transition">Wallet / Deposit</Link></li>
        <li><Link href="/trading" className="block py-2 px-4 hover:bg-gray-700 rounded transition">Trading</Link></li>
        <li><Link href="/history" className="block py-2 px-4 hover:bg-gray-700 rounded transition">History</Link></li>
        <li><Link href="/profile" className="block py-2 px-4 hover:bg-gray-700 rounded transition">Profile</Link></li>
        {role === "admin" && <li><Link href="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded transition">Admin Panel</Link></li>}
        <li><button onClick={handleLogout} className="block py-2 px-4 text-red-500 hover:bg-gray-700 rounded transition w-full text-left">Logout</button></li>
      </ul>
    </div>
  );
}