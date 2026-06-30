"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cairo } from "next/font/google";

const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function DeliveryCompletedScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className={`${cairoFont.className} bg-white text-slate-900 min-h-screen flex flex-col relative pb-32`} dir="rtl">

      <header className="w-full top-0 sticky z-50 bg-white shadow-sm flex justify-between items-center px-4 py-2 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 relative">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBytb0U32xn7RQ7MRNPFrXiG6dIAJJmGA72w2mZhvsQqRFE_r55CxfH5xm-2j6QP61jNq-R4Pg3PS_V1p7c9f7kMhkJfrPewOvpwxKwZ9TsBKxxLuZWYMlhfPW7q696xNmCiGEuBusTDq3KVCD4Jwu6qOpxNkmPxX659rzjPD9aIfwqSB5_7DcSCceLKB0NQ-jDhKq1ej249axo5g3C2anWwNW8k_VodvgLUdddo6MmiQ9c7AHdC-N-FHWPFNk84OAjGfAYcFyN6T4"
              alt="عمر - السائق الخاص بك"
              width={40}
              height={40}
            />
          </div>
          <h2 className="text-lg font-bold text-primary">بوابة السائق</h2>
        </div>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className="text-primary hover:bg-primary/5 transition-colors p-1 rounded-full active:scale-95"
        >
          <span className="material-symbols-outlined text-[32px]">
            {isOnline ? "toggle_on" : "toggle_off"}
          </span>
        </button>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 py-6">

        <section className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white mb-4 animate-bounce-subtle">
            <span className="material-symbols-outlined text-[48px] font-bold">task_alt</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">تم التوصيل بنجاح!</h1>
          <p className="text-gray-600 text-base">لقد تم تسليم الطرد الخاص بك بأمان.</p>
        </section>

        <div className="grid grid-cols-1 gap-4">

          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E5E5E5]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] text-gray-600 uppercase tracking-wider">رقم معرف الطلب</p>
                <h3 className="text-xl font-bold text-slate-900">#DEL-882941</h3>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                مدفوع
              </div>
            </div>

            <div className="space-y-4 border-t border-[#E5E5E5] pt-4 text-right">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">تم التوصيل إلى</p>
                  <p className="text-base text-slate-900">241 هاي ستريت، إيست إيند</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">وقت التوصيل</p>
                  <p className="text-base text-slate-900">اليوم، 2:45 مساءً</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5] flex flex-col justify-center text-right">
              <p className="text-xs text-gray-600 mb-1">التكلفة الإجمالية</p>
              <p className="text-2xl font-extrabold text-primary">$42.50</p>
              <p className="text-[11px] text-gray-600 mt-1">تتضمن بقشيش بقيمة $5.00</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5] flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-primary relative">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PDoh-AF3JQdwFNRKEkjaQfw0ND7pLRXirC5o-xW742OEhs-fGtWbfi2hVrAL-jtCl7pKChdPWvX0uixsibGaJRwEsDqdt0o3w7wCJ07svIuAEXvOBCDNMIIS1X1Bvy1jvJLTqFoHQhps49L53Uaf4xkjgg1XW5Gqgj1DpimVXGm21Ms3pAUxzcQNPpNXfxNB6xj3EDu_KzHYvRvZ2CyH6Deix9QCOx3wlLkDigTxCbBd5CM1-twVG3OcMQPGrRF0E357awz7R7s"
                  alt="عمر"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-sm font-bold text-slate-900">عمر</p>
              <p className="text-[11px] text-gray-600">السائق الخاص بك</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E5E5E5] text-center">
            <h3 className="text-sm font-bold mb-3 text-slate-900">كيف تقيم تجربة التوصيل؟</h3>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => setRating(starIndex)}
                  className="transition-colors active:scale-90"
                >
                  <span
                    className="material-symbols-outlined text-[32px] transition-all duration-150"
                    style={{
                      fontVariationSettings: `'FILL' ${starIndex <= rating ? "1" : "0"}`,
                      color: starIndex <= rating ? "#EF2B2D" : "#E5E5E5"
                    }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            <textarea
              className="w-full bg-slate-50 border border-[#E5E5E5] rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none h-24 text-right"
              placeholder="أضف تعليقًا لعمر..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              type="button"
              className="mt-4 w-full py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-slate-900 rounded-full text-sm font-bold transition-all active:scale-[0.97]"
            >
              إرسال التقييم المرتجع
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-4 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
          >
            العودة للرئيسية
            <span className="material-symbols-outlined transform rotate-180">arrow_forward</span>
          </Link>
          <button
            type="button"
            className="w-full py-4 bg-transparent text-gray-600 hover:bg-primary/5 rounded-full text-sm font-bold transition-all active:scale-[0.97]"
          >
            تحميل فاتورة الطلب
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white border-t border-[#E5E5E5] shadow-[0px_-8px_30px_rgba(0,0,0,0.04)] flex justify-around items-center pt-2 pb-safe">
        <div className="flex flex-col items-center justify-center text-gray-600 px-4 py-1 hover:bg-primary/5 rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-xs">الرئيسية</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-full px-5 py-1 hover:bg-primary/20 transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="text-xs font-bold">الطلبات</span>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-600 px-4 py-1 hover:bg-primary/5 rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">history</span>
          <span className="text-xs">السجل</span>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-600 px-4 py-1 hover:bg-primary/5 rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-xs">الأرباح</span>
        </div>
      </nav>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
