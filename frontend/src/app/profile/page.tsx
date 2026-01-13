"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BalanceDisplay from "@/components/BalanceDisplay";
import HistoryTable from "@/components/HistoryTable";
import Sidebar from "@/components/Sidebar";
import api from "@/utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const router = useRouter();
  const [withdrawAsset, setWithdrawAsset] = useState("USDT");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

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
      if (!withdrawAmount || withdrawAmount <= 0) return alert("Enter a valid amount");
      if (!withdrawAddress) return alert("Enter a destination address");
      await api.post("/user/withdraw", { asset: withdrawAsset, amount: withdrawAmount, address: withdrawAddress });
      alert(`Withdrew ${withdrawAmount} ${withdrawAsset}`);
      setWithdrawAmount(0);
      setWithdrawAddress("");
      setRefreshKey((k) => k + 1);
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
            <BalanceDisplay refreshKey={refreshKey} />
          </div>
          <div className="flex gap-4">
            <button onClick={() => router.push("/wallet")} className="bg-green-500 p-3 rounded hover:bg-green-600 transition">Deposit</button>
            <form onSubmit={handleWithdraw} className="flex flex-col gap-3 bg-gray-800 p-4 rounded shadow-md w-full max-w-xl">
              <div className="flex gap-2">
                <button type="button" className="flex-1 p-2 rounded bg-gray-700">Withdraw</button>
                <button type="button" onClick={() => router.push("/wallet")} className="flex-1 p-2 rounded bg-gray-600 hover:bg-gray-500 transition">Deposit</button>
              </div>
              <label className="block mb-2">Asset</label>
              <select value={withdrawAsset} onChange={e => setWithdrawAsset(e.target.value)} className="p-2 text-black rounded w-full">
                <option>ETH</option>
                <option>USDT</option>
                <option>SOL</option>
              </select>
              <label className="block mt-3 mb-2">Amount</label>
              <input type="number" value={withdrawAmount || ''} onChange={e => {
                const val = parseFloat(e.target.value);
                setWithdrawAmount(isNaN(val) ? 0 : val);
              }} className="p-2 text-black rounded w-full" />
              <label className="block mt-3 mb-2">Destination Address</label>
              <textarea value={withdrawAddress} onChange={e => setWithdrawAddress(e.target.value)} className="p-2 text-black rounded w-full" placeholder="Paste the address you are withdrawing to" />
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
