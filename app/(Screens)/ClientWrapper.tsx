"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("splashShown");

    if (alreadyLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("splashShown", "true");
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}