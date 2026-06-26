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
    <div className={`${cairoFont.className} bg-[#f3fcef] text-[#151e16] min-h-screen flex flex-col relative pb-32`} dir="rtl">

      {/* الشريط العلوي - هيدر بوابة السائق */}
      <header className="w-full top-0 sticky z-50 bg-[#f3fcef] shadow-sm flex justify-between items-center px-4 py-2 border-b border-[#bbcbba]/20 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e1ebdf] relative">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBytb0U32xn7RQ7MRNPFrXiG6dIAJJmGA72w2mZhvsQqRFE_r55CxfH5xm-2j6QP61jNq-R4Pg3PS_V1p7c9f7kMhkJfrPewOvpwxKwZ9TsBKxxLuZWYMlhfPW7q696xNmCiGEuBusTDq3KVCD4Jwu6qOpxNkmPxX659rzjPD9aIfwqSB5_7DcSCceLKB0NQ-jDhKq1ej249axo5g3C2anWwNW8k_VodvgLUdddo6MmiQ9c7AHdC-N-FHWPFNk84OAjGfAYcFyN6T4"
              alt="عمر - السائق الخاص بك"
              width={40}
              height={40}
            />
          </div>
          <h2 className="text-[18px] font-bold text-[#006d34]">بوابة السائق</h2>
        </div>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className="text-[#006d34] hover:bg-[#e1ebdf] transition-colors p-1 rounded-full active:scale-95 transition-transform duration-150"
        >
          <span className="material-symbols-outlined text-[32px]">
            {isOnline ? "toggle_on" : "toggle_off"}
          </span>
        </button>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 py-6">

        {/* هيدر حالة النجاح والأنيميشن */}
        <section className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00d26a] text-[#005426] mb-4 animate-bounce-subtle">
            <span className="material-symbols-outlined text-[48px] font-bold">task_alt</span>
          </div>
          <h1 className="text-[24px] font-extrabold text-[#151e16] mb-1">تم التوصيل بنجاح!</h1>
          <p className="text-[#5f5e5e] text-[16px]">لقد تم تسليم الطرد الخاص بك بأمان.</p>
        </section>

        {/* بطاقات تفاصيل التوصيل بأسلوب Bento */}
        <div className="grid grid-cols-1 gap-4">

          {/* بطاقة ملخص الطلب الأساسية */}
          <div className="bg-white rounded-xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#bbcbba]/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] text-[#5f5e5e] uppercase tracking-wider">رقم معرف الطلب</p>
                <h3 className="text-[20px] font-bold text-[#151e16]">#DEL-882941</h3>
              </div>
              <div className="bg-[#00d26a]/20 text-[#006d34] px-3 py-1 rounded-full text-[12px] font-semibold">
                مدفوع
              </div>
            </div>

            <div className="space-y-4 border-t border-[#bbcbba]/20 pt-4 text-right">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#edf6ea] text-[#006d34] flex items-center justify-center">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#5f5e5e]">تم التوصيل إلى</p>
                  <p className="text-[16px] text-[#151e16]">241 هاي ستريت، إيست إيند</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#edf6ea] text-[#006d34] flex items-center justify-center">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#5f5e5e]">وقت التوصيل</p>
                  <p className="text-[16px] text-[#151e16]">اليوم، 2:45 مساءً</p>
                </div>
              </div>
            </div>
          </div>

          {/* شبكة التكلفة والتقييم المصغرة */}
          <div className="grid grid-cols-2 gap-4">
            {/* بطاقة التكلفة الإجمالية */}
            <div className="bg-white rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#bbcbba]/30 flex flex-col justify-center text-right">
              <p className="text-[12px] text-[#5f5e5e] mb-1">التكلفة الإجمالية</p>
              <p className="text-[24px] font-extrabold text-[#006d34]">$42.50</p>
              <p className="text-[11px] text-[#5f5e5e] mt-1">تتضمن بقشيش بقيمة $5.00</p>
            </div>

            {/* بطاقة السائق */}
            <div className="bg-white rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#bbcbba]/30 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-[#006d34] relative">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PDoh-AF3JQdwFNRKEkjaQfw0ND7pLRXirC5o-xW742OEhs-fGtWbfi2hVrAL-jtCl7pKChdPWvX0uixsibGaJRwEsDqdt0o3w7wCJ07svIuAEXvOBCDNMIIS1X1Bvy1jvJLTqFoHQhps49L53Uaf4xkjgg1XW5Gqgj1DpimVXGm21Ms3pAUxzcQNPpNXfxNB6xj3EDu_KzHYvRvZ2CyH6Deix9QCOx3wlLkDigTxCbBd5CM1-twVG3OcMQPGrRF0E357awz7R7s"
                  alt="عمر"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-[14px] font-bold text-[#151e16]">عمر</p>
              <p className="text-[11px] text-[#5f5e5e]">السائق الخاص بك</p>
            </div>
          </div>

          {/* قسم تقييم الخدمة التفاعلي */}
          <div className="bg-white rounded-xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#bbcbba]/30 text-center">
            <h3 className="text-[14px] font-bold mb-3 text-[#151e16]">كيف تقيم تجربة التوصيل؟</h3>

            {/* النجوم التفاعلية */}
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
                      color: starIndex <= rating ? "#006d34" : "#bbcbba"
                    }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            <textarea
              className="w-full bg-[#f3fcef] border border-[#bbcbba] rounded-xl p-3 text-[14px] focus:ring-2 focus:ring-[#006d34] focus:border-transparent outline-none transition-all resize-none h-24 text-right"
              placeholder="أضف تعليقًا لعمر..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              type="button"
              className="mt-4 w-full py-3 bg-[#e5e2e1] text-[#656464] hover:bg-[#bbcbba] hover:text-[#151e16] rounded-full text-[14px] font-bold transition-all active:scale-[0.97]"
            >
              إرسال التقييم المرتجع
            </button>
          </div>
        </div>

        {/* أزرار اتخاذ الإجراء السفلية */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-4 bg-[#006d34] text-white rounded-full text-[14px] font-bold shadow-lg shadow-[#006d34]/20 hover:brightness-110 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
          >
            العودة للرئيسية
            <span className="material-symbols-outlined transform rotate-180">arrow_forward</span>
          </Link>
          <button
            type="button"
            className="w-full py-4 bg-transparent text-[#5f5e5e] hover:bg-[#edf6ea] rounded-full text-[14px] font-bold transition-all active:scale-[0.97]"
          >
            تحميل فاتورة الطلب
          </button>
        </div>
      </main>

      {/* شريط التنقل السفلي الثابت */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white border-t border-[#bbcbba] shadow-[0px_-8px_30px_rgba(0,0,0,0.04)] flex justify-around items-center pt-2 pb-safe">
        <div className="flex flex-col items-center justify-center text-[#5f5e5e] px-4 py-1 hover:bg-[#edf6ea] rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[12px]">الرئيسية</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#00d26a]/20 text-[#005426] rounded-full px-5 py-1 hover:bg-[#00d26a]/30 transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="text-[12px] font-bold">الطلبات</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#5f5e5e] px-4 py-1 hover:bg-[#edf6ea] rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[12px]">السجل</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#5f5e5e] px-4 py-1 hover:bg-[#edf6ea] rounded-xl transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[12px]">الأرباح</span>
        </div>
      </nav>

      {/* تأثير أنيميشن الباونس المخصص لأيقونة النجاح */}
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