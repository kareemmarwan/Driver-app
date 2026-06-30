"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useOrderStore } from '@/lib/store/orderStore';
import { Cairo } from "next/font/google";

const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function OrderConfirmedScreen() {
  const [statusText, setStatusText] = useState("جاري البحث عن سائق...");
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const activeOrders = useOrderStore((s) => s.activeOrders);
  const latestOrder = activeOrders[0];
  const orderId = latestOrder?.id || '#AG-82931-DL';
  const totalPrice = currentOrder?.total || 42.50;
  const eta = latestOrder?.eta || '25-35 دقيقة';

  const phrases = [
    "جاري البحث عن سائق...",
    "يتم الآن الاتصال بالمندوب...",
    "جاري تحديد المسار الأسرع..."
  ];

  useEffect(() => {
    let phraseIndex = 0;
    const interval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setStatusText(phrases[phraseIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${cairoFont.className} bg-background text-text-primary min-h-screen overflow-x-hidden relative`} dir="rtl">

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] opacity-5 transform -rotate-12">
          <span className="material-symbols-outlined text-[120px] text-primary">local_shipping</span>
        </div>
        <div className="absolute bottom-[15%] left-[5%] opacity-5 transform rotate-12">
          <span className="material-symbols-outlined text-[160px] text-text-secondary">shopping_bag</span>
        </div>
      </div>

      <main className="min-h-screen flex flex-col items-center justify-between px-4 pt-16 pb-12 max-w-md mx-auto relative overflow-hidden z-10">

        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-border/30 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col items-center text-center w-full mt-6">

          <div className="relative mb-6">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-500 scale-100 hover:scale-105 cursor-pointer">
              <span className="material-symbols-outlined text-white text-[64px] font-bold">check</span>
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-primary/40 rounded-full animate-pulse-ring -z-0"></div>
          </div>

          <h1 className="text-[24px] md:text-[32px] font-extrabold text-text-primary mb-2">تم تأكيد طلبك!</h1>
          <p className="text-[16px] text-text-secondary mb-12 px-4">جاري تجهيز شحنتك وتعيين أفضل سائق متاح بالقرب منك الآن.</p>

          <div className="bg-surface rounded-xl p-6 w-full max-w-xs border border-border/30 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className="absolute w-full h-full bg-primary rounded-full animate-pulse-ring"></div>
                <div className="relative w-3 h-3 bg-primary rounded-full animate-pulse-dot"></div>
              </div>
              <span className="text-[14px] font-bold text-primary transition-opacity duration-300">
                {statusText}
              </span>
            </div>

            <div className="flex justify-around items-center pt-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-border">
                  <Image
                    className="w-full h-full object-cover grayscale opacity-50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPrzivhUpolYp6lac8UjoBM_gjUYf_vCbR1VX6lXlid29l38jRkNVcfp5if_HB-NBegfealScy9keYxNtSVTKitiDVmRUn7FLFRdQjfdizYP7N7rDK1SZ8EqUdRYi6-P6c_8XFbxO61mSAX6MrNQNDwHYSqkvy5I2RdJYMRha5YnsdHmwTHDhmU-_sfGqd-2k_W_qqgbxdXq5sC49GPk0d4gGXNbFyHGfVKZN-yFA6jURfVkAs2KPQ5N-sdrfhVVH8wrunHY1bBlQ"
                    alt="صورة السائق"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="h-2 w-10 bg-border rounded-full"></div>
              </div>

              <div className="flex items-center text-border gap-1">
                <span className="material-symbols-outlined text-sm">more_horiz</span>
                <span className="material-symbols-outlined text-sm">more_horiz</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-light border-2 border-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                </div>
                <div className="h-2 w-16 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-6">
          <div className="col-span-2 bg-surface rounded-2xl p-4 flex items-center justify-between border border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-text-secondary">رقم الطلب</p>
                <p className="text-[14px] font-bold text-text-primary">{orderId}</p>
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(orderId)}
              className="text-primary hover:bg-primary-light p-2 rounded-full transition-colors active:scale-90"
              title="نسخ رقم الطلب"
            >
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>

          <div className="bg-surface rounded-2xl p-4 border border-border/20 text-right">
            <p className="text-[11px] text-text-secondary mb-1">الوقت المتوقع لوصوله</p>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">schedule</span>
              <p className="text-[14px] font-bold text-text-primary">{eta}</p>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-4 border border-border/20 text-right">
            <p className="text-[11px] text-text-secondary mb-1">إجمالي الحساب</p>
            <p className="text-[14px] font-bold text-text-primary">₪{totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="w-full space-y-4 mt-auto pt-6">
          <Link
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl font-bold text-[18px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            href="/OrderTracking"
          >
            تتبع حالة الطلب
            <span className="material-symbols-outlined transform rotate-180">arrow_forward</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-3 bg-transparent text-text-secondary hover:text-text-primary font-bold text-[14px] transition-colors text-center"
          >
            العودة للرئيسية
          </Link>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 0.8; }
          80%, 100% { opacity: 0; }
        }
        @keyframes pulse-dot {
          0% { transform: scale(0.8); }
          50% { transform: scale(1); }
          100% { transform: scale(0.8); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        .animate-pulse-dot {
          animation: pulse-dot 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
      `}</style>
    </div>
  );
}
