"use client";
import { useState, useEffect } from "react";

export default function GetAmount() {
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    async function getAmount() {
      const res = await fetch("/api/getAmount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAmount(data.result);
    }
    getAmount();
  }, []);

  const sortedAmount = [...amount].sort((a, b) => b.amount - a.amount);

  return (
    <div className="min-h-screen bg-green-50 p-4 flex flex-col items-center">
  <h1 className="text-2xl font-bold text-green-700 mb-4">🌿 柳絮班級排行榜</h1>

  {/* sticky 頒獎台 */}
  <div className="sticky top-0 z-10 bg-green-50 pb-4">
    <div className="w-full max-w-md flex justify-around items-end">
      {/* 第二名 */}
      {sortedAmount[1] && (
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-2">🥈</div>
          <div className="bg-gray-300 w-24 h-32 flex flex-col justify-center items-center rounded-t shadow-md">
            <p className="text-sm font-semibold text-white">
              {sortedAmount[1].grade}年{String(sortedAmount[1].class).padStart(2, "0")}班
            </p>
          </div>
          <p className="mt-2 text-gray-600 font-medium">{sortedAmount[1].amount} 袋</p>
        </div>
      )}

      {/* 第一名 */}
      {sortedAmount[0] && (
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-1">👑</div>
          <div className="bg-yellow-400 w-24 h-40 flex flex-col justify-center items-center rounded-t shadow-md border-2 border-yellow-500">
            <p className="text-sm font-semibold text-white">
              {sortedAmount[0].grade}年{String(sortedAmount[0].class).padStart(2, "0")}班
            </p>
          </div>
          <p className="mt-2 text-yellow-600 font-semibold">{sortedAmount[0].amount} 袋</p>
        </div>
      )}

      {/* 第三名 */}
      {sortedAmount[2] && (
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-2">🥉</div>
          <div className="bg-orange-400 w-24 h-28 flex flex-col justify-center items-center rounded-t shadow-md">
            <p className="text-sm font-semibold text-white">
              {sortedAmount[2].grade}年{String(sortedAmount[2].class).padStart(2, "0")}班
            </p>
          </div>
          <p className="mt-2 text-orange-700 font-medium">{sortedAmount[2].amount} 袋</p>
        </div>
      )}
    </div>
  </div>

  {/* 其餘排名（可滾動） */}
  <div className="w-full max-w-md overflow-y-auto mt-2 bg-white rounded shadow p-4 space-y-2 max-h-[60vh]">
    {sortedAmount.slice(3).map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center border-b pb-1 text-gray-700"
      >
        <span className="font-medium">{index + 4}.</span>
        <span>
          {item.grade}年{String(item.class).padStart(2, "0")}班
        </span>
        <span className="text-green-600 font-semibold">{item.amount} 袋</span>
      </div>
    ))}
  </div>
</div>

  );
}
