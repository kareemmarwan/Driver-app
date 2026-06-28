"use client";

import { useEffect, useState, useCallback } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const hideSplash = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    try {
      const alreadyLoaded = sessionStorage.getItem("splashShown");
      if (alreadyLoaded && isMounted) {
        setLoading(false);
        return;
      }
    } catch {
      // sessionStorage may be blocked (incognito, etc.)
    }

    const timer = setTimeout(() => {
      if (isMounted) {
        try {
          sessionStorage.setItem("splashShown", "true");
        } catch {
          // sessionStorage may be blocked
        }
        setLoading(false);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [hideSplash]);

  if (loading) {
    return <SplashScreen onReady={hideSplash} />;
  }

  return <>{children}</>;
}