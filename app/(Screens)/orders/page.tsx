"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OrdersSkeleton from "@/components/skeletons/OrdersSkeleton";
import EmptyState from '@/components/EmptyState';

const ACTIVE_ORDERS = [
  {
    id: "DF-7829",
    status: "في الطريق",
    statusIcon: "local_shipping",
    store: "مخبز الموقد الذهبي",
    items: "٢ وجبة شاورما + مشروبات",
    eta: "١٢ دقيقة",
    progress: 65,
    driver: "عمر",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoG-28-Ne2QmnMCXrKOz_QE6lMucu1HbLbq3tUjsfrG3OLEQH1waKYOCxOTVmQR4YWoyMVG9trh-Hxnyp1qMK27W7v8FCI-DH7E_uydDJlARVsMa55yx3dE4mPL1dc9ZGERgWkQkJFUA3iYsPKZfud63lAjvaUlITYQQbGwxYxwQ7WgE-qcCvoi_7EDmrGIlSkCO65pM46gsSeE_H_m8Qg5Z6-Fgq4tLPYnUOGP9IVmP8ya0kXZ5hfT1W--eRhfR2kSacXnClU8ow",
  },
  {
    id: "DF-7812",
    status: "قيد التحضير",
    statusIcon: "store",
    store: "بيتزا روما",
    items: "بيتزا عائلية + باستا",
    eta: "٢٥ دقيقة",
    progress: 30,
    driver: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
  },
];

const PAST_ORDERS = [
  { id: "DF-7798", store: "برجر باي", date: "اليوم ١٠:٣٠ ص", price: "₪٤٥.٠٠", status: "مكتمل", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ" },
  { id: "DF-7765", store: "مطعم جنين", date: "أمس ٨:١٥ م", price: "₪٣٢.٠٠", status: "مكتمل", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
            النشطة ({ACTIVE_ORDERS.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "past"
                ? "bg-white text-[#006d34] shadow-sm"
                : "text-[#5f5e5e]"
            }`}
          >
            السابقة ({PAST_ORDERS.length})
          </button>
        </div>
      </header>

      <main className="px-4 mt-2 space-y-4">
        {isLoading ? <OrdersSkeleton /> : activeTab === "active" ? (
          ACTIVE_ORDERS.length > 0 ? (
            ACTIVE_ORDERS.map((order) => (
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
          PAST_ORDERS.length > 0 ? (
            PAST_ORDERS.map((order) => (
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
                      <span className="text-[11px] text-[#5f5e5e]">{order.date}</span>
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
