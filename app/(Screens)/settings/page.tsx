"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ar");

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151e16] min-h-screen p-6" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 bg-white dark:bg-[#1e2a20] rounded-full shadow-sm">
            <span className="text-2xl transform rotate-180 material-symbols-outlined text-[#006d34] dark:text-[#00d26a]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800 dark:text-[#f3fcef]">الإعدادات</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1e2a20] rounded-2xl border border-slate-100 dark:border-[#2a3e2e] overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50 dark:bg-[#1a2e1e]/50 border-slate-50 dark:border-[#2a3e2e]">
              <span className="text-xs font-black tracking-wider uppercase text-slate-400 dark:text-[#dce5d9]">عام</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-[#2a3e2e]">
              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-slate-500 dark:text-[#dce5d9]">notifications</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-[#f3fcef]">الإشعارات</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-[#006d34]' : 'bg-slate-300'} relative`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${notifications ? 'right-6' : 'right-0.5'}`} />
                </button>
              </div>

              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-slate-500 dark:text-[#dce5d9]">language</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-[#f3fcef]">اللغة</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm font-bold text-slate-400 dark:text-[#dce5d9] bg-slate-50 dark:bg-[#1a2e1e] px-2 py-1 rounded-md border border-slate-100 dark:border-[#2a3e2e]"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl material-symbols-outlined text-slate-500 dark:text-[#dce5d9]">contrast</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-[#f3fcef]">المظهر</span>
                </div>
                <select className="text-sm font-bold text-slate-400 dark:text-[#dce5d9] bg-slate-50 dark:bg-[#1a2e1e] px-2 py-1 rounded-md border border-slate-100 dark:border-[#2a3e2e]">
                  <option>فاتح</option>
                  <option>داكن</option>
                  <option>النظام</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e2a20] rounded-2xl border border-slate-100 dark:border-[#2a3e2e] overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50 dark:bg-[#1a2e1e]/50 border-slate-50 dark:border-[#2a3e2e]">
              <span className="text-xs font-black tracking-wider uppercase text-slate-400 dark:text-[#dce5d9]">حول</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-[#2a3e2e]">
              <div className="px-4 py-3.5 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-[#f3fcef]">الإصدار</span>
                <span className="text-xs font-bold text-slate-400 dark:text-[#dce5d9]">v4.2.1-stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
