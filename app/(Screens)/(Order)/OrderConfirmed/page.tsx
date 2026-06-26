"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// استيراد خط Cairo من Next.js
import { Cairo } from "next/font/google";

const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function OrderConfirmedScreen() {
  const [statusText, setStatusText] = useState("جاري البحث عن سائق...");

  // مصفوفة العبارات التفاعلية أثناء البحث عن سائق
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
    <div className={`${cairoFont.className} bg-[#f3fcef] text-[#151e16] min-h-screen overflow-x-hidden relative`} dir="rtl">

      {/* عناصر زخرفية ثابتة في الخلفية */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] opacity-10 transform -rotate-12">
          <span className="material-symbols-outlined text-[120px] text-[#006d34]">local_shipping</span>
        </div>
        <div className="absolute bottom-[15%] left-[5%] opacity-5 transform rotate-12">
          <span className="material-symbols-outlined text-[160px] text-[#5f5e5e]">shopping_bag</span>
        </div>
      </div>

      <main className="min-h-screen flex flex-col items-center justify-between px-4 pt-16 pb-12 max-w-md mx-auto relative overflow-hidden z-10">

        {/* هالة مضيئة علوية وسفلية بالخلفية */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00d26a]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#e5e2e1]/30 rounded-full blur-3xl -z-10"></div>

        {/* حاوية رسالة النجاح والأنيميشن */}
        <div className="flex flex-col items-center text-center w-full mt-6">

          {/* أيقونة النجاح المتحركة */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-[#00d26a] rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-500 scale-100 hover:scale-105 cursor-pointer">
              <span className="material-symbols-outlined text-[#005426] text-[64px] font-bold">check</span>
            </div>
            {/* تأثير النبض الدائري خلف الأيقونة */}
            <div className="absolute inset-0 w-32 h-32 bg-[#00d26a]/40 rounded-full animate-pulse-ring -z-0"></div>
          </div>

          {/* نصوص العنوان */}
          <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#151e16] mb-2">تم تأكيد طلبك!</h1>
          <p className="text-[16px] text-[#5f5e5e] mb-12 px-4">جاري تجهيز شحنتك وتعيين أفضل سائق متاح بالقرب منك الآن.</p>

          {/* بطاقة حالة البحث الحالية */}
          <div className="bg-[#e1ebdf] rounded-xl p-6 w-full max-w-xs border border-[#bbcbba]/30 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className="absolute w-full h-full bg-[#006d34] rounded-full animate-pulse-ring"></div>
                <div className="relative w-3 h-3 bg-[#006d34] rounded-full animate-pulse-dot"></div>
              </div>
              <span className="text-[14px] font-bold text-[#006d34] transition-opacity duration-300">
                {statusText}
              </span>
            </div>

            {/* تمثيل مرئي لربط السائق بالطلب */}
            <div className="flex justify-around items-center pt-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-[#dce5d9]">
                  <Image
                    className="w-full h-full object-cover grayscale opacity-50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPrzivhUpolYp6lac8UjoBM_gjUYf_vCbR1VX6lXlid29l38jRkNVcfp5if_HB-NBegfealScy9keYxNtSVTKitiDVmRUn7FLFRdQjfdizYP7N7rDK1SZ8EqUdRYi6-P6c_8XFbxO61mSAX6MrNQNDwHYSqkvy5I2RdJYMRha5YnsdHmwTHDhmU-_sfGqd-2k_W_qqgbxdXq5sC49GPk0d4gGXNbFyHGfVKZN-yFA6jURfVkAs2KPQ5N-sdrfhVVH8wrunHY1bBlQ"
                    alt="صورة السائق"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="h-2 w-10 bg-[#bbcbba] rounded-full"></div>
              </div>

              <div className="flex items-center text-[#bbcbba] gap-1">
                <span className="material-symbols-outlined text-sm">more_horiz</span>
                <span className="material-symbols-outlined text-sm">more_horiz</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#e7f1e4] border-2 border-[#00d26a] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[#006d34]">local_shipping</span>
                </div>
                <div className="h-2 w-16 bg-[#00d26a] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* تفاصيل الطلب (أسلوب Bento المودرن) */}
        <div className="w-full grid grid-cols-2 gap-4 mt-6">
          <div className="col-span-2 bg-[#edf6ea] rounded-2xl p-4 flex items-center justify-between border border-[#bbcbba]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#006d34]">receipt_long</span>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#5f5e5e]">رقم الطلب</p>
                <p className="text-[14px] font-bold text-[#151e16]">#AG-82931-DL</p>
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText("#AG-82931-DL")}
              className="text-[#006d34] hover:bg-[#00d26a]/10 p-2 rounded-full transition-colors active:scale-90"
              title="نسخ رقم الطلب"
            >
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>

          <div className="bg-[#edf6ea] rounded-2xl p-4 border border-[#bbcbba]/20 text-right">
            <p className="text-[11px] text-[#5f5e5e] mb-1">الوقت المتوقع لوصوله</p>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#006d34]">schedule</span>
              <p className="text-[14px] font-bold text-[#151e16]">25-35 دقيقة</p>
            </div>
          </div>

          <div className="bg-[#edf6ea] rounded-2xl p-4 border border-[#bbcbba]/20 text-right">
            <p className="text-[11px] text-[#5f5e5e] mb-1">إجمالي الحساب</p>
            <p className="text-[14px] font-bold text-[#151e16]">42.50 $</p>
          </div>
        </div>

        {/* أزرار الإجراءات السفلية */}
        <div className="w-full space-y-4 mt-auto pt-6">
          <Link
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#006d34] text-white rounded-xl font-bold text-[18px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            href="/LiveTrackingPage"
          >
            تتبع حالة الطلب
            <span className="material-symbols-outlined transform rotate-180">arrow_forward</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-3 bg-transparent text-[#5f5e5e] hover:text-[#151e16] font-bold text-[14px] transition-colors text-center"
          >
            العودة للرئيسية
          </Link>
        </div>
      </main>

      {/* الستايلات والأنيميشن المخصصة للنقاط والهالات */}
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