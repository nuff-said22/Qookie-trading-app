"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BalanceDisplay from "@/components/BalanceDisplay";
import HistoryTable from "@/components/HistoryTable";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const router = useRouter();
  const [withdrawAsset, setWithdrawAsset] = useState("USDT");
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    try {
      jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, [router]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate: Subtract from balance (backend would need endpoint, but for demo alert)
      alert(`Withdrew ${withdrawAmount} ${withdrawAsset} (simulated)`);
      setWithdrawAmount(0);
    } catch (err) {}
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full bg-gray-900">
        <h2 className="text-3xl mb-6 font-bold">Profile</h2>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h3 className="text-2xl mb-4">Balances & Portfolio</h3>
            <BalanceDisplay />
          </div>
          <div className="flex gap-4">
            <button onClick={() => router.push("/wallet")} className="bg-green-500 p-3 rounded hover:bg-green-600 transition">Deposit</button>
            <form onSubmit={handleWithdraw} className="flex gap-2">
              <select value={withdrawAsset} onChange={e => setWithdrawAsset(e.target.value)} className="p-2 text-black rounded">
                <option>ETH</option>
                <option>USDT</option>
                <option>SOL</option>
              </select>
              <input type="number" value={withdrawAmount || ''} onChange={e => {
                const val = parseFloat(e.target.value);
                setWithdrawAmount(isNaN(val) ? 0 : val);
              }} className="p-2 text-black rounded" />
              <button type="submit" className="bg-red-500 p-3 rounded hover:bg-red-600 transition">Withdraw</button>
            </form>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h3 className="text-2xl mb-4">Deposit History</h3>
            <HistoryTable type="deposits" />
          </div>
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h3 className="text-2xl mb-4">Trade History</h3>
            <HistoryTable type="trades" />
          </div>
        </div>
      </div>
    </div>
  );
}