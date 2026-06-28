"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import OrdersSkeleton from "@/components/skeletons/OrdersSkeleton";
import EmptyState from '@/components/EmptyState';
import { ACTIVE_ORDERS as MOCK_ACTIVE, PAST_ORDERS as MOCK_PAST } from "@/lib/data";
import { useOrderStore } from '@/lib/store/orderStore';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [isLoading, setIsLoading] = useState(true);
  const storeActive = useOrderStore((s) => s.activeOrders);
  const storePast = useOrderStore((s) => s.pastOrders);

  const activeOrders = useMemo(() => [...storeActive, ...MOCK_ACTIVE], [storeActive]);
  const pastOrders = useMemo(() => [...storePast, ...MOCK_PAST], [storePast]);

  useEffect(() => {
    document.title = 'طلباتي | دري فري';
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <header className="sticky top-0 z-50 bg-[#F8FAFC] px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-[#151e16] text-right">طلباتي</h1>
        <div className="flex gap-2 mt-3 bg-[#e8f0e5] rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "active"
                ? "bg-white text-[#006d34] shadow-sm"
                : "text-[#5f5e5e]"
            }`}
          >
            النشطة ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "past"
                ? "bg-white text-[#006d34] shadow-sm"
                : "text-[#5f5e5e]"
            }`}
          >
            السابقة ({pastOrders.length})
          </button>
        </div>
      </header>

      <main className="px-4 mt-2 space-y-4">
        {isLoading ? <OrdersSkeleton /> : activeTab === "active" ? (
          activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <Link
                key={order.id}
                href="/OrderSummary"
                className="block bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-transform"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e8f0e5] shrink-0">
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${order.image}')` }} />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#7f8e7e]">#{order.id}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#006d34] bg-[#00d26a]/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">{order.statusIcon}</span>
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#151e16] mt-1">{order.store}</h3>
                    <p className="text-[11px] text-[#5f5e5e] mt-0.5">{order.items}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] font-bold text-[#006d34] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {order.eta}
                      </span>
                      <span className="text-[10px] text-[#7f8e7e]">
                        {order.driver ? `السائق: ${order.driver}` : "قيد التجهيز"}
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-[#dce5d9] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#00d26a] h-full rounded-full transition-all"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <EmptyState
              icon="receipt_long"
              title="لا توجد طلبات نشطة حالياً"
              description="عند تقديم طلب جديد، سيظهر هنا لتتمكن من متابعته"
              actionLabel="تصفح المطاعم"
              onAction={() => window.location.href = '/Restaurants'}
            />
          )
        ) : (
          pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e8f0e5] shrink-0">
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${order.image}')` }} />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#7f8e7e]">#{order.id}</span>
                      <span className="text-[11px] text-[#006d34] font-bold">{order.status}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#151e16] mt-1">{order.store}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-[#006d34]">{order.price}</span>
                      <span className="text-[11px] text-[#5f5e5e]">{order.date} {order.time}</span>
                    </div>
                    <button className="mt-2 text-[11px] text-[#006d34] font-bold flex items-center gap-1">
                      <span>إعادة الطلب</span>
                      <span className="material-symbols-outlined text-[14px]">replay</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon="history"
              title="لا يوجد سجل طلبات سابق"
              description="الطلبات السابقة ستظهر هنا بعد إتمام أول طلب"
            />
          ))}
      </main>
    </div>
  );
}
