"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";  // Changed to named import; use QRCodeCanvas if preferring canvas
import BalanceDisplay from "@/components/BalanceDisplay";
import DepositForm from "@/components/DepositForm";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function Wallet() {
  const router = useRouter();
  const address = "0x5df2F3f435714Ea747c83f17D0C8e86aEcD4d31D";
  const [copied, setCopied] = useState(false);

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

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full bg-gray-900">
        <h2 className="text-3xl mb-6 font-bold">Wallet & Deposit</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <h3 className="text-2xl mb-4">Deposit Address:</h3>
          <p className="text-3xl font-bold mb-2 break-all">{address}</p>
          <button onClick={copyAddress} className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition mr-4">
            {copied ? "Copied!" : "Copy Address"}
          </button>
          <div className="mt-4">
            <QRCodeSVG value={address} size={128} />  {/* Updated component name */}
          </div>
          <p className="mt-4 text-yellow-400">Deposit ETH, USDT, SOL, or any ERC20 token below. Send confirmation to admin.</p>
          <BalanceDisplay />
          <DepositForm />
        </div>
      </div>
    </div>
  );
}