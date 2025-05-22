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
    <div
      className="min-h-screen bg-green-50 p-4 flex flex-col items-center"
      style={{ backgroundImage: "url('/imgs/background.png')", backgroundSize: "cover" }}
    >
      <h1 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
        <img src="/imgs/icon.png" alt="icon" className="w-8 h-8" />
        柳絮班級排行榜
      </h1>

      {/* sticky 頒獎台 */}
<div className="sticky top-0 z-10 backdrop-blur pb-4 rounded-b">
  <div className="w-full max-w-md flex justify-around items-end">
    
    {/* 第二名 */}
    {sortedAmount[1] && (
      <div className="flex flex-col items-center relative">
        <img src="/imgs/second.png" alt="2nd" className="w-20 mb-2" />
        
        {/* 班級名稱放到圖片中間框框 */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700 text-center whitespace-nowrap">
          {sortedAmount[1].grade}年{String(sortedAmount[1].class).padStart(2, "0")}班
        </div>
        
        {/* 袋數照舊 */}
        <p className="mt-1 text-gray-600 font-medium">{sortedAmount[1].amount} 袋</p>
      </div>
    )}

    {/* 第一名 */}
    {sortedAmount[0] && (
      <div className="flex flex-col items-center relative">
        <img src="/imgs/first.png" alt="1st" className="w-24 mb-1" />

        <div className="absolute top-26 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-yellow-700 text-center whitespace-nowrap">
          {sortedAmount[0].grade}年{String(sortedAmount[0].class).padStart(2, "0")}班
        </div>

        <p className="mt-1 text-yellow-600 font-semibold">{sortedAmount[0].amount} 袋</p>
      </div>
    )}

    {/* 第三名 */}
    {sortedAmount[2] && (
      <div className="flex flex-col items-center relative">
        <img src="/imgs/third.png" alt="3rd" className="w-20 mb-2" />

        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-orange-700 text-center whitespace-nowrap">
          {sortedAmount[2].grade}年{String(sortedAmount[2].class).padStart(2, "0")}班
        </div>

        <p className="mt-1 text-orange-700 font-medium">{sortedAmount[2].amount} 袋</p>
      </div>
    )}
  </div>
</div>


      {/* 其餘排名 */}
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
