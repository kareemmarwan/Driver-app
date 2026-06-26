"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdvancedTabBar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "الرئيسية", icon: "grid_view" },
    { href: "/orders", label: "الطلبات", icon: "local_shipping" },
    { isPlaceholder: true },
    { href: "/history", label: "السجل", icon: "history" },
    { href: "/ProfilePage", label: "الحساب", icon: "person" },
  ];

  const getIndicatorPosition = () => {
    switch (pathname) {
      case "/":
        return "2%";
      case "/orders":
        return "21.5%";
      case "/history":
        return "60.5%";
      case "/ProfilePage":
        return "80%";
      default:
        return "2%";
    }
  };

  return (
    <div dir="rtl">
      <div className="fixed left-0 right-0 z-50 w-full max-w-md px-4 mx-auto bottom-6">
        <div className="relative bg-white/90 backdrop-blur-xl border border-[#bbcbba]/30 shadow-[0px_12px_40px_rgba(0,109,52,0.08)] rounded-[24px] px-2 py-2 flex items-center justify-around">

          {/* الخلفية المتحركة للمؤشر */}
          <div
            className="absolute top-2 bottom-2 bg-[#00d26a]/15 rounded-[18px] transition-all duration-300 ease-out z-0"
            style={{
              width: "18%",
              right: getIndicatorPosition(), // تعتمد على الـ right لأن الاتجاه rtl
            }}
          />

          {tabs.map((tab, idx) => {
            if ("isPlaceholder" in tab) {
              return <div key={idx} className="w-[18%]" />;
            }

            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="w-[18%] flex flex-col items-center justify-center py-2 rounded-[18px] relative z-10 transition-transform active:scale-90"
              >
                <span
                  className={`material-symbols-outlined text-[24px] transition-all duration-300 ${
                    isActive ? "text-[#006d34] scale-110" : "text-[#7f8e7e]"
                  }`}
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {tab.icon}
                </span>

                <span
                  className={`text-[11px] font-medium transition-all duration-300 mt-0.5 ${
                    isActive ? "text-[#006d34]" : "text-[#7f8e7e]"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* الزر الأوسط الطائر المتنقل لإنشاء طلب */}
          <div className="absolute z-20 -translate-x-1/2 -top-6 left-1/2">
            <Link
              href="/Cart"
              className="w-14 h-14 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white rounded-full flex items-center justify-center shadow-[0px_8px_20px_rgba(0,210,106,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[30px]">
                add
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
