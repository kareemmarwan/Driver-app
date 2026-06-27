"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export default function HomeScreen() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  // منطق إخفاء وإظهار الهيدر بسلاسة عند السكرول (Sticky Header)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false); // الإسكول للأسفل -> إخفاء
      } else {
        setShowHeader(true); // الإسكول للأعلى -> إظهار
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // مصفوفة الخدمات مع ترجمة العناوين للغة العربية
  const services = [
    { id: "package", icon: "package_2", label: "طرد بريدي" ,link:'/Restaurants'},
    { id: "gift", icon: "card_giftcard", label: "هدية" ,link:'/Restaurants'},
    { id: "docs", icon: "description", label: "مستندات" ,link:'/Restaurants'},
    { id: "shopping", icon: "shopping_bag", label: "تسوق" ,link:'/Restaurants'},
    { id: "food", icon: "restaurant", label: "طعام" ,link:'/Restaurants'},
    { id: "other", icon: "more_horiz", label: "أخرى" ,link:'/Restaurants'},
  ];

  return (
    // هنا قمنا بإضافة كلاس الخط cairoFont.className وتغيير اتجاه النص إلى RTL ليتناسب مع اللغة العربية
    <div className="bg-[#F8FAFC] min-h-screen text-[#151e16] antialiased pb-32" dir="rtl">

      {/* AppBar العلوي */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#f3fcef] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] transform transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link
            href="/ProfilePage"
            className="w-10 h-10 rounded-full overflow-hidden bg-[#e1ebdf] border border-[#bbcbba] active:scale-95 transition-transform block"
          >
            <Image
              className="object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAnwoSamYhHtiK2uZB_FpM-wcWhUW6KXqXN3QQAhuVGpgyNQnu-EHoQKVeil4S5Q7JQc1IJrtopo6tTC2pKedxPHUyV1MAKMaYNUSZYx-0gOnVr37JImVVa42tYvbpRV8WhrYFFnnuJmY_AT8_o31AuFKXLIIyw9XwD2xgoFHihh4UVVstPvG9Uws0bfnvbLEtfWtro0WsupLc2LeR4NK4jrI19VMcpYeCo1Zyd8D_0Bya9aVI8CqZR3YTOoNnREpG3gblO0G9KjY"
              alt="صورة المستخدم الشخصية"
              width={40}
              height={40}
            />
          </Link>
          <div className="flex flex-col text-right">
            <span className="text-[12px] text-[#3c4a3d]">صباح الخير،</span>
            <span className="text-[14px] font-bold text-[#151e16]">أحمد</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#dce5d9] transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[#151e16]">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#dce5d9] transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[#151e16]">notifications</span>
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex flex-col gap-6 px-4 pt-20">

        {/* قسم الـ Hero Banner */}
        <section className="relative w-full overflow-hidden rounded-2xl h-56 shadow-[0px_8px_30px_rgba(0,0,0,0.08)] bg-[#006d34] active:scale-[0.99] transition-transform">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-40"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAA8P_XzRRqohoq-31LwZCwupqZn4RUoAmm_klZHeyX7wVguO_8hGZiq8k545w8pGTV0u9BN2zeUSowQjR1_eFRbhPlGWjnLwTBAzayA1p9i7cWEV0qTLKsjzJX3__VhzjTys2OEEAqmSJk1A0hnRN3-Kfb9NO9KF63aplSp7HmZrbKHQhys5FIU87_7NsN1pnJEOr-uHQfkYgUs36FKHh0BFSZtquTXjpKqCBeugTPKJ3DXGMAdhkO9XbYSv1cTw5-vxrO4FLXS6U')` }}
          ></div>
          <div className="relative z-10 h-full p-6 flex flex-col justify-center gap-4 bg-gradient-to-l from-[#006d34] to-transparent text-right">
            <h1 className="text-[24px] font-bold text-white max-w-[200px] leading-tight">
              أرسل أي شيء فوراً وبكل سهولة
            </h1>
            <Link
              href="/Cart"
              className="bg-[#00d26a] text-[#005426] px-6 py-2 rounded-full text-[14px] font-bold w-fit shadow-md flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              إنشاء طلب توصيل جديد
            </Link>
          </div>
        </section>

        {/* حالة الطلب الحالي (Active Order Status) */}
        <section className="text-right">
          <div className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] font-fill">local_shipping</span>
                <span className="text-[14px] font-bold">هناك طلب قيد التوصيل الآن</span>
              </div>
              <span className="text-[#006d34] text-[12px] font-medium">على بعد 8 دقائق</span>
            </div>
            <div className="w-full bg-[#dce5d9] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00d26a] h-full w-3/4 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[#5f5e5e] text-xs">تم الاستلام</span>
              <span className="text-[#151e16] text-xs font-semibold">بالقرب من موقع الوصول</span>
            </div>
          </div>
        </section>

        {/* شبكة الخدمات (Services Grid) */}
        <section className="text-right">
          <h2 className="text-[20px] font-bold mb-4 text-[#151e16]">خدماتنا</h2>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-[#006d34]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#006d34]">{service.icon}</span>
                </div>
                <span className="text-[13px] font-bold text-center leading-tight">{service.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* الطلبات الأخيرة (Recent Orders) */}
        <section className="text-right">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-[#151e16]">طلب سريع مجدد</h2>
            <button className="text-[#006d34] text-[14px] font-bold hover:underline">عرض الكل</button>
          </div>
          <div className="flex flex-col gap-3">
            {/* الطلب الأول */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e7f1e4] flex items-center justify-center text-[#3c4a3d]">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold">المكتب - برج أ</p>
                  <p className="text-xs text-[#5f5e5e]">توصيل مستندات • منذ يومين</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bbcbba] rotate-180">chevron_right</span>
            </div>

            {/* الطلب الثاني */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e7f1e4] flex items-center justify-center text-[#3c4a3d]">
                  <span className="material-symbols-outlined">home</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold">المنزل - الرمال</p>
                  <p className="text-xs text-[#5f5e5e]">احضار بقالة • منذ 5 أيام</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bbcbba] rotate-180">chevron_right</span>
            </div>
          </div>
        </section>

        {/* بانر دعوة الأصدقاء (Promotional Banner) */}
        <section className="rounded-2xl bg-[#e5e2e1] p-6 flex items-center justify-between shadow-[0px_4px_20px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-transform text-right">
          <div className="max-w-[180px]">
            <h3 className="text-[14px] font-bold text-[#656464]">ادعُ أصدقاءك واحصل على خصم 20%</h3>
            <p className="text-xs text-[#656464] mt-1">شارك رمز الإحالة الفريد الخاص بك الآن.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#00d26a]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#006d34] scale-125">share</span>
          </div>
        </section>
      </main>
    </div>
  );
}