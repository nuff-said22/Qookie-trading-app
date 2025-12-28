"use client";

import { useState } from "react";
import api from '@/utils/axiosInstance'; // Updated import

export default function OrderForm() {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("buy");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/trade/${type}`, { coin, amount }); // Use api
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      setAmount(0);
    } catch (err) {
      // Error handled by interceptor
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input type="text" placeholder="Coin Symbol (e.g., MEME1)" value={coin} onChange={e => setCoin(e.target.value)} className="block mb-2 p-2 text-black" />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} className="block mb-2 p-2 text-black" />
      <select value={type} onChange={e => setType(e.target.value)} className="block mb-2 p-2 text-black">
        <option>buy</option>
        <option>sell</option>
      </select>
      <button type="submit" className="bg-blue-500 p-2">Place Order</button>
    </form>
  );
}