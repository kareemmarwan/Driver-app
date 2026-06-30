"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ar");

  return (
    <div className="bg-background min-h-screen p-6" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
            <span className="text-2xl transform rotate-180 material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-text-primary">الإعدادات</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b bg-surface border-border/50">
              <span className="text-xs font-black tracking-wider uppercase text-text-secondary">عام</span>
            </div>
            <div className="divide-y divide-border">
              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-text-secondary">notifications</span>
                  <span className="text-sm font-bold text-text-primary">الإشعارات</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-switch-off'} relative`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${notifications ? 'right-6' : 'right-0.5'}`} />
                </button>
              </div>

              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-text-secondary">language</span>
                  <span className="text-sm font-bold text-text-primary">اللغة</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm font-bold text-text-secondary bg-surface px-2 py-1 rounded-md border border-border/50"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-text-secondary">contrast</span>
                  <span className="text-sm font-bold text-text-primary">المظهر</span>
                </div>
                <select className="text-sm font-bold text-text-secondary bg-surface px-2 py-1 rounded-md border border-border/50">
                  <option>فاتح</option>
                  <option>داكن</option>
                  <option>النظام</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b bg-surface border-border/50">
              <span className="text-xs font-black tracking-wider uppercase text-text-secondary">حول</span>
            </div>
            <div className="divide-y divide-border">
              <div className="px-4 py-3.5 flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">الإصدار</span>
                <span className="text-xs font-bold text-text-secondary">v4.2.1-stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
