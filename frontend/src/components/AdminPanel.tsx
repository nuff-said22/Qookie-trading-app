"use client";

import { useEffect, useState } from "react";
import api from '@/utils/axiosInstance';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {}
    };
    fetchUsers();
  }, []);

  const handleEditBalance = async () => {
    if (!selectedUser) return;
    try {
      await api.put(`/admin/user/${selectedUser}/balance`, { asset, amount });
      alert("Updated");
    } catch (err) {}
  };

  const handleToggleTrading = async () => {
    if (!selectedUser) return;
    try {
      await api.put(`/admin/user/${selectedUser}/trading`, { enabled });
      alert("Toggled");
    } catch (err) {}
  };

  return (
    <div>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user.id} onClick={() => setSelectedUser(user.id)} className="cursor-pointer bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition">
            {user.username} - Trading: {user.trading_enabled ? "Enabled" : "Disabled"}
            <ul className="ml-4">
              {user.Balances?.map(b => <li key={b.asset}>{b.asset}: {b.amount}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="mt-4 bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl mb-2">Edit Selected User</h3>
          <select value={asset} onChange={e => setAsset(e.target.value)} className="mr-2 p-2 text-black rounded">
            <option>ETH</option>
            <option>USDT</option>
            <option>SOL</option>
          </select>
          <input type="number" value={amount || ''} onChange={e => {
            const val = parseFloat(e.target.value);
            setAmount(isNaN(val) ? 0 : val); // Fix NaN
          }} className="mr-2 p-2 text-black rounded" />
          <button onClick={handleEditBalance} className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition">Update Balance</button>
          <div className="mt-2">
            <label>Trading Enabled: <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} /></label>
            <button onClick={handleToggleTrading} className="bg-blue-500 p-2 ml-2 rounded hover:bg-blue-600 transition">Toggle</button>
          </div>
        </div>
      )}
    </div>
  );
}