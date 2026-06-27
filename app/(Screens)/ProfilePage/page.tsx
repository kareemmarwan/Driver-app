'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { useWishlistStore } from '@/lib/store/wishlistStore';
import DarkModeToggle from '@/components/DarkModeToggle';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  extra?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    title: 'الطلبات',
    items: [
      { id: 'active_orders', label: 'الطلبات النشطة', icon: 'order_approve', badge: 1 },
      { id: 'order_history', label: 'سجل الطلبات', icon: 'history' },
      { id: 'reorder', label: 'إعادة طلب سريع', icon: 'replay' },
    ]
  },
  {
    title: 'المحفظة والمدفوعات',
    items: [
      { id: 'payment_methods', label: 'طرق الدفع', icon: 'payments' },
      { id: 'wallet', label: 'المحفظة الرقمية', icon: 'account_balance_wallet', extra: '₪150.00' },
      { id: 'promo_codes', label: 'الكوبونات وأكواد الخصم', icon: 'sell' },
    ]
  },
  {
    title: 'التفضيلات والإعدادات',
    items: [
      { id: 'language', label: 'اللغة', icon: 'language', extra: 'العربية' },
      { id: 'theme', label: 'المظهر', icon: 'contrast', extra: 'فاتح' },
      { id: 'delivery_prefs', label: 'تفضيلات التوصيل', icon: 'hail' },
    ]
  },
  {
    title: 'الدعم والأمان',
    items: [
      { id: 'help_center', label: 'مركز المساعدة والدعم', icon: 'help' },
      { id: 'security', label: 'أمان الحساب', icon: 'security' },
    ]
  }
];

export default function ProfilePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { items: wishlistItems, toggleItem } = useWishlistStore();

  useEffect(() => {
    document.title = 'الملف الشخصي | دري فري';
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen pb-16 font-sans antialiased bg-slate-50 text-slate-800 dark:bg-[#151e16] dark:text-[#f3fcef]" dir="rtl">

      {/* الحاوية المرنة الرئيسية */}
      <main className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* تقسيم الشاشة: عمودين في الشاشات الكبيرة، وعمود واحد في الشاشات الصغيرة */}
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">

          {/* العمود الأيمن: البيانات الشخصية والإحصائيات والملخص (يأخذ 5 أعمدة على الـ Desktop) */}
          <div className="space-y-6 lg:col-span-5">

            {/* بطاقة المستخدم الشخصية الفاخرة */}
            <section className="bg-white dark:bg-[#1e2a20] p-6 rounded-3xl shadow-[0_4px_24px_rgba(15,23,42,0.02)] border border-slate-100 dark:border-[#2a3e2e] flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 transition-all rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10" />
              <div className="relative w-20 h-20 overflow-hidden rounded-full shadow-md ring-4 ring-emerald-50/50 shrink-0">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="كريم مروان"
                />
              </div>
              <div className="z-10 flex flex-col gap-1">
                <h2 className="text-xl font-bold text-slate-800 dark:text-[#f3fcef]">كريم مروان</h2>
                <p className="text-sm font-medium text-slate-500" dir="ltr">+970 59-123-4567</p>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50 w-fit rounded-full mt-1.5">
                  عضو فضي منذ ٢٠٢٣
                </span>
              </div>
              <button onClick={() => router.push('/edit-profile')} className="absolute flex items-center justify-center transition-all border border-transparent top-4 left-4 w-9 h-9 text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-100 rounded-xl active:scale-95">
                <span className="text-xl material-symbols-outlined">edit</span>
              </button>
              <DarkModeToggle />
            </section>

            {/* شبكة الإحصائيات الذكية (Bento Grid) */}
            <section className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1e2a20] p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 dark:border-[#2a3e2e] transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"><span className="text-xl material-symbols-outlined">receipt_long</span></div>
                <span className="text-lg font-black text-slate-800 dark:text-[#f3fcef]">٤٧</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-[#dce5d9]">إجمالي الطلبات</span>
              </div>
              <div className="bg-white dark:bg-[#1e2a20] p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 dark:border-[#2a3e2e] transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"><span className="text-xl material-symbols-outlined">check_circle</span></div>
                <span className="text-lg font-black text-slate-800 dark:text-[#f3fcef]">٤٢</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-[#dce5d9]">مكتملة</span>
              </div>
              <div className="bg-white dark:bg-[#1e2a20] p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 dark:border-[#2a3e2e] transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"><span className="text-xl material-symbols-outlined">payments</span></div>
                <span className="text-lg font-black text-slate-800 dark:text-[#f3fcef]">١,٢٥٠</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-[#dce5d9]">مصروفات</span>
              </div>
            </section>

            {/* صف إضافي: طلب نشط + نقاط */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#1e2a20] p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border-2 border-emerald-500/30 transition-all hover:translate-y-[-2px] hover:shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600"><span className="text-xl material-symbols-outlined animate-pulse">local_shipping</span></div>
                <span className="text-lg font-black text-slate-800 dark:text-[#f3fcef]">١</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">طلب نشط</span>
              </div>
              <div className="bg-white dark:bg-[#1e2a20] p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 dark:border-[#2a3e2e] transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"><span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span></div>
                <span className="text-lg font-black text-slate-800 dark:text-[#f3fcef]">١,٢٠٠</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-[#dce5d9]">نقاط المكافآت</span>
              </div>
            </section>

            {/* قسم العناوين المحفوظة بالتمرير الأفقي الذكي */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-[#f3fcef]">العناوين المحفوظة</h3>
                <button className="flex items-center gap-1 px-2 py-1 text-xs font-bold transition-all rounded-lg text-emerald-600 active:scale-95 hover:text-emerald-700 hover:bg-emerald-50">
                  <span className="text-sm font-bold material-symbols-outlined">add</span> إضافة جديد
                </button>
              </div>
              <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-none snap-x">
                <div className="min-w-[260px] max-w-[280px] bg-white dark:bg-[#1e2a20] p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-slate-100 dark:border-[#2a3e2e] flex gap-3 snap-start transition-all hover:border-slate-200 dark:hover:border-emerald-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-50 dark:bg-[#1a2e1e] text-slate-600 dark:text-[#dce5d9] rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">home</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-slate-800 dark:text-[#f3fcef]">المنزل</span>
                    <span className="text-xs text-slate-400 dark:text-[#dce5d9] line-clamp-1 mt-0.5">غزة، الرمال، شارع الشهداء، عمارة الأمل</span>
                  </div>
                </div>
                <div className="min-w-[260px] max-w-[280px] bg-white dark:bg-[#1e2a20] p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-slate-100 dark:border-[#2a3e2e] flex gap-3 snap-start transition-all hover:border-slate-200 dark:hover:border-emerald-700">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-50 dark:bg-[#1a2e1e] text-slate-600 dark:text-[#dce5d9] rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">work</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-slate-800 dark:text-[#f3fcef]">المكتب (العمل)</span>
                    <span className="text-xs text-slate-400 dark:text-[#dce5d9] line-clamp-1 mt-0.5">برج التناغم، الطابق الرابع عشر</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* العمود الأيسر: خيارات القوائم والإعدادات (يأخذ 7 أعمدة على الـ Desktop لعرض منظم وشبكي مريح) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {MENU_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="bg-white dark:bg-[#1e2a20] rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.01)] border border-slate-100 dark:border-[#2a3e2e] overflow-hidden h-fit">
                  <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50 dark:bg-[#1a2e1e]/50 border-slate-50 dark:border-[#2a3e2e]">
                    <span className="text-xs font-black tracking-wider uppercase text-slate-400 dark:text-[#dce5d9]">{group.title}</span>
                  </div>
                  <div className="divide-y divide-slate-50 dark:divide-[#2a3e2e]">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { if (item.id === 'language' || item.id === 'theme' || item.id === 'delivery_prefs') router.push('/settings'); }}
                        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-[#1a2e1e]/70 transition-all active:bg-slate-100 dark:active:bg-[#1a2e1e] text-right group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 transition-all rounded-lg bg-slate-50 dark:bg-[#1a2e1e] text-slate-500 dark:text-[#dce5d9] group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600 dark:group-hover/btn:bg-emerald-900/30 dark:group-hover/btn:text-emerald-400">
                            <span className="text-xl material-symbols-outlined">{item.icon}</span>
                          </div>
                          <span className="text-sm font-bold transition-colors text-slate-700 dark:text-[#dce5d9] group-hover/btn:text-slate-900 dark:group-hover/btn:text-white">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                              {item.badge}
                            </span>
                          )}
                          {item.extra && (
                            <span className="text-xs font-bold text-slate-400 group-hover/btn:text-emerald-600 dark:group-hover/btn:text-emerald-400 transition-colors bg-slate-50 dark:bg-[#1a2e1e] px-2 py-0.5 rounded-md">
                              {item.extra}
                            </span>
                          )}
                          <span className="material-symbols-outlined text-slate-300 dark:text-slate-500 text-lg group-hover/btn:text-slate-500 dark:group-hover/btn:text-slate-300 group-hover/btn:translate-x-[-2px] transition-all transform rotate-180">
                            chevron_right
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* قسم المفضلة */}
            {wishlistItems.length > 0 && (
              <div className="bg-white dark:bg-[#1e2a20] rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.01)] border border-slate-100 dark:border-[#2a3e2e] overflow-hidden">
                <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50 dark:bg-[#1a2e1e]/50 border-slate-50 dark:border-[#2a3e2e] flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider uppercase text-slate-400 dark:text-[#dce5d9]">المفضلة</span>
                  <span className="text-xs text-slate-400 dark:text-[#dce5d9]">{wishlistItems.length} عنصر</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${item.image}')` }} />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-[#f3fcef] truncate">{item.name}</p>
                          {item.price && <p className="text-xs text-[#006d34] dark:text-[#00d26a] font-semibold">{item.price}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItem(item)}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-rose-50 active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-rose-500 text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
                          favorite
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* زر تسجيل الخروج */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full py-3.5 mt-4 bg-white dark:bg-[#1e2a20] rounded-2xl border border-rose-200 dark:border-rose-900/50 flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors active:scale-[0.98] text-sm font-bold shadow-sm"
            >
              <span className="text-xl material-symbols-outlined">logout</span>
              <span>تسجيل الخروج</span>
            </button>
            <p className="text-center text-[11px] text-slate-400 dark:text-[#dce5d9] mt-2 font-mono">Dreefree إصدار v4.2.1-stable</p>

          </div>

        </div>
      </main>
    </div>
  );
}
