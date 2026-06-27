"use client";

import { usePathname } from "next/navigation";
import AdvancedTabBar from "./AdvancedTabBar";

const HIDE_TABBAR_PATTERNS = [
  "/SplashScreen",
  "/ProductDetailsPage",
  "/LiveTrackingPage",
  "/OrderConfirmed",
  "/OrderSummary",
  "/LocationPicker",
  "/OrderTracking",
  "/FilterDeliveryAreaPage",
  "/StoreDetails/",
  "/ProductDetailsPage/",
  "/edit-profile",
  "/settings",
  "/login",
  "/register",
];

const HIDE_TABBAR_ROUTES = new Set(HIDE_TABBAR_PATTERNS.filter(p => !p.endsWith("/")));

export default function TabBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowTabBar = !HIDE_TABBAR_ROUTES.has(pathname) && !HIDE_TABBAR_PATTERNS.some(p => p.endsWith("/") && pathname.startsWith(p));

  return (
    <>
      {children}
      {shouldShowTabBar && <AdvancedTabBar />}
    </>
  );
}
