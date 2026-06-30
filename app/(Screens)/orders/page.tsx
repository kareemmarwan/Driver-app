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
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 bg-background px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-text-primary text-right">طلباتي</h1>
        <div className="flex gap-2 mt-3 bg-surface rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "active"
                ? "bg-white text-primary shadow-sm"
                : "text-text-secondary"
            }`}
          >
            النشطة ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "past"
                ? "bg-white text-primary shadow-sm"
                : "text-text-secondary"
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
                className="block bg-white rounded-2xl p-4 shadow-sm border border-border active:scale-[0.98] transition-transform"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface shrink-0">
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${order.image}')` }} />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-text-secondary">#{order.id}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">{order.statusIcon}</span>
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-text-primary mt-1">{order.store}</h3>
                    <p className="text-[11px] text-text-secondary mt-0.5">{order.items}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {order.eta}
                      </span>
                      <span className="text-[10px] text-text-secondary">
                        {order.driver ? `السائق: ${order.driver}` : "قيد التجهيز"}
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-border h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
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
                className="bg-white rounded-2xl p-4 shadow-sm border border-border active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface shrink-0">
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${order.image}')` }} />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-text-secondary">#{order.id}</span>
                      <span className="text-[11px] text-primary font-bold">{order.status}</span>
                    </div>
                    <h3 className="text-sm font-bold text-text-primary mt-1">{order.store}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-primary">{order.price}</span>
                      <span className="text-[11px] text-text-secondary">{order.date} {order.time}</span>
                    </div>
                    <button className="mt-2 text-[11px] text-primary font-bold flex items-center gap-1">
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
