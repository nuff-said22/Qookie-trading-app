"use client";

import { useState } from "react";

export default function DepositForm() {
  const [asset, setAsset] = useState("USDT");
  const [customAsset, setCustomAsset] = useState("");
  const [amount, setAmount] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const walletAddresses = {
    ethereum: "0x5df2F3f435714Ea747c83f17D0C8e86aEcD4d31D",
    solana: "GADmH8hCHyxYjS7wuANrYczLFx7tRhALjbWckRirKjj6",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAsset = asset === "OTHER" ? customAsset : asset;
    if (!finalAsset) return alert("Enter asset");
    const chain = asset === "SOL" ? "solana" : "ethereum";
    const address = walletAddresses[chain];
    setWalletAddress(address);
    setShowAddress(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Address copied to clipboard!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 bg-gray-700 p-4 rounded">
        <select value={asset} onChange={e => setAsset(e.target.value)} className="mr-2 p-2 text-black rounded">
          <option>ETH</option>
          <option>USDT</option>
          <option>SOL</option>
          <option value="OTHER">Other ERC20</option>
        </select>
        {asset === "OTHER" && <input type="text" placeholder="Custom Asset" value={customAsset} onChange={e => setCustomAsset(e.target.value)} className="mr-2 p-2 text-black rounded" />}
        <input type="number" value={amount || ''} onChange={e => {
          const val = parseFloat(e.target.value);
          setAmount(isNaN(val) ? 0 : val);
        }} className="mr-2 p-2 text-black rounded" />
        <button type="submit" className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition">Deposit</button>
      </form>
      {showAddress && (
        <div className="mt-4 bg-gray-800 p-4 rounded">
          <p className="mb-2">Please deposit to the following wallet address:</p>
          <p className="font-mono bg-gray-900 p-2 rounded mb-2">{walletAddress}</p>
          <button onClick={handleCopy} className="bg-green-500 p-2 rounded hover:bg-green-600 transition">Copy Address</button>
        </div>
      )}
    </div>
  );
}