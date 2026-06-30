"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Tab = {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
};

const TABS: Tab[] = [
  { id: "home", label: "الرئيسية", icon: "home", activeIcon: "home", href: "/" },
  { id: "restaurants", label: "المطاعم", icon: "restaurant", activeIcon: "restaurant", href: "/Restaurants" },
  { id: "orders", label: "طلباتي", icon: "receipt_long", activeIcon: "receipt_long", href: "/orders" },
  { id: "profile", label: "حسابي", icon: "person", activeIcon: "person", href: "/ProfilePage" },
];

export default function AdvancedTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = (): string => {
    if (pathname === "/" || pathname.startsWith("/HomeScreen")) return "home";
    if (pathname.startsWith("/Restaurants")) return "restaurants";
    if (pathname.startsWith("/orders")) return "orders";
    if (pathname.startsWith("/ProfilePage")) return "profile";
    return "home";
  };

  const activeTab = getActiveTab();

  const navigate = (href: string) => {
    router.push(href);
  };

  const getTabIndex = (tabId: string) => TABS.findIndex(t => t.id === tabId);
  const activeIndex = getTabIndex(activeTab);

  return (
    <div className="relative bg-white/90 backdrop-blur-xl border-t border-border/50 shadow-lg px-2 py-2 flex items-center justify-around">
      <div
        className="absolute top-2 bottom-2 bg-primary-light rounded-[18px] transition-all duration-300 ease-out z-0"
        style={{
          width: `${100 / TABS.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.href)}
            className="flex flex-col items-center justify-center py-1 px-3 z-10 relative transition-all duration-200 active:scale-90"
          >
            <span
              className={`material-symbols-outlined text-[24px] transition-all duration-300 ${
                isActive ? "text-primary scale-110" : "text-tab-inactive"
              }`}
              style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[11px] font-medium transition-all duration-300 mt-0.5 ${
                isActive ? "text-primary" : "text-tab-inactive"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
