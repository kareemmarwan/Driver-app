"use client";

import { useState } from "react";
import EmptyState from '@/components/EmptyState';
import { HISTORY_ORDERS, HISTORY_MONTHS } from "@/lib/data";

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("هذا الشهر");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <header className="sticky top-0 z-50 bg-[#F8FAFC] px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#151e16]">السجل</h1>
          <div className="flex items-center gap-1 text-[#006d34]">
            <span className="material-symbols-outlined text-lg">contacts_product</span>
            <span className="text-xs font-bold">{HISTORY_ORDERS.length} طلب</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          {HISTORY_MONTHS.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedMonth === month
                  ? "bg-[#006d34] text-white shadow-sm"
                  : "bg-[#e8f0e5] text-[#5f5e5e]"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 mt-2 space-y-3">
        {HISTORY_ORDERS.length > 0 ? (
          HISTORY_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e8f0e5] shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${order.image}')` }}
                  />
                </div>
                <div className="flex-1 text-right min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#7f8e7e]">#{order.id}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-[#006d34]">{order.status}</span>
                      <span className="material-symbols-outlined text-[16px] text-[#006d34]">check_circle</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#151e16] mt-1">{order.store}</h3>
                  <p className="text-[11px] text-[#5f5e5e] mt-0.5">{order.items}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-[#006d34]">{order.price}</span>
                    <span className="text-[11px] text-[#7f8e7e]">
                      {order.date} • {order.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-[#e8f0e5]">
                <button className="flex-1 py-2.5 bg-[#006d34] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  إعادة الطلب
                </button>
                <button className="flex-1 py-2.5 bg-[#e8f0e5] text-[#151e16] rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  عرض الفاتورة
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon="history"
            title="لا يوجد سجل طلبات"
            description="ستظهر طلباتك السابقة هنا بعد إتمام أول طلب"
          />
        )}
      </main>
    </div>
  );
}
