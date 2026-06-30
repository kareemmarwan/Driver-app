"use client";

import { useState } from "react";
import EmptyState from '@/components/EmptyState';
import { HISTORY_ORDERS, HISTORY_MONTHS } from "@/lib/data";

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("هذا الشهر");

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 bg-background px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">السجل</h1>
          <div className="flex items-center gap-1 text-primary">
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
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-text-secondary"
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
              className="bg-white rounded-2xl p-4 shadow-sm border border-border active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${order.image}')` }}
                  />
                </div>
                <div className="flex-1 text-right min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-secondary">#{order.id}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-primary">{order.status}</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mt-1">{order.store}</h3>
                  <p className="text-[11px] text-text-secondary mt-0.5">{order.items}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-primary">{order.price}</span>
                    <span className="text-[11px] text-text-secondary">
                      {order.date} • {order.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  إعادة الطلب
                </button>
                <button className="flex-1 py-2.5 bg-surface text-text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform">
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
