"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { requestNotificationPermission } from "@/lib/firebase/notification";

export default function NotificationRequest() {
  const { data: session } = useSession();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (session && !dismissed && "Notification" in window && Notification.permission === "default") {
      const timer = setTimeout(() => {
        requestNotificationPermission();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [session, dismissed]);

  return null;
}
