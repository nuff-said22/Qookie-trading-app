"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [userInfo, setUserInfo] = useState<{ username: string; role: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Re-check on path change

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserInfo({ username: decoded.username, role: decoded.role });
      } catch (err) {
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  }, [pathname]); // Depend on path to re-run after redirects/logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null); // Clear state instantly
    router.push("/");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Qookie Trading App</h1>
      {userInfo && (
        <div className="flex items-center gap-4">
          <span className="text-lg">Logged in as: {userInfo.username} ({userInfo.role.toUpperCase()})</span>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 p-2 rounded transition">Logout</button>
        </div>
      )}
    </header>
  );
}