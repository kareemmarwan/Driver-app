"use client";

import { usePathname } from "next/navigation";
import AdvancedTabBar from "./AdvancedTabBar";

const HIDE_TAB_BAR_ROUTES = [
  "/login",
  "/register",
  "/SplashScreen",
  "/LiveTrackingPage",
  "/PickupLocationPage",
  "/RecipientDetailsPage",
  "/LocationPicker",
  "/OrderTracking",
  "/LiveTracking",
  "/DeliveryCompleted",
  "/Cart",
  "/ProductDetailsPage",
];

export default function TabBarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHide = HIDE_TAB_BAR_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 pb-16">{children}</div>
      {!shouldHide && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background">
          <AdvancedTabBar />
        </div>
      )}
    </div>
  );
}
