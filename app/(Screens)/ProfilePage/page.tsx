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
    <div className="min-h-screen pb-16 font-sans antialiased bg-background text-text-primary" dir="rtl">

      <main className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">

          <div className="space-y-6 lg:col-span-5">

            <section className="bg-white p-6 rounded-3xl border border-border/50 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 transition-all rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10" />
              <div className="relative w-20 h-20 overflow-hidden rounded-full shadow-md ring-4 ring-primary/10 shrink-0">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="كريم مروان"
                />
              </div>
              <div className="z-10 flex flex-col gap-1">
                <h2 className="text-xl font-bold text-text-primary">كريم مروان</h2>
                <p className="text-sm font-medium text-text-secondary" dir="ltr">+970 59-123-4567</p>
                <span className="text-[11px] text-primary font-semibold px-2.5 py-0.5 bg-primary-light border border-primary/20 w-fit rounded-full mt-1.5">
                  عضو فضي منذ ٢٠٢٣
                </span>
              </div>
              <button onClick={() => router.push('/edit-profile')} className="absolute flex items-center justify-center transition-all border border-transparent top-4 left-4 w-9 h-9 text-text-secondary hover:text-text-primary hover:bg-surface hover:border-border/50 rounded-xl active:scale-95">
                <span className="text-xl material-symbols-outlined">edit</span>
              </button>
              <DarkModeToggle />
            </section>

            <section className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border border-border/50 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface text-text-secondary"><span className="text-xl material-symbols-outlined">receipt_long</span></div>
                <span className="text-lg font-black text-text-primary">٤٧</span>
                <span className="text-[10px] font-medium text-text-secondary">إجمالي الطلبات</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border border-border/50 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light text-primary"><span className="text-xl material-symbols-outlined">check_circle</span></div>
                <span className="text-lg font-black text-text-primary">٤٢</span>
                <span className="text-[10px] font-medium text-text-secondary">مكتملة</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border border-border/50 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light text-primary"><span className="text-xl material-symbols-outlined">payments</span></div>
                <span className="text-lg font-black text-text-primary">١,٢٥٠</span>
                <span className="text-[10px] font-medium text-text-secondary">مصروفات</span>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border-2 border-primary/30 transition-all hover:translate-y-[-2px] hover:shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light text-primary"><span className="text-xl material-symbols-outlined animate-pulse">local_shipping</span></div>
                <span className="text-lg font-black text-text-primary">١</span>
                <span className="text-[10px] font-bold text-primary">طلب نشط</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border border-border/50 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-light text-primary"><span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span></div>
                <span className="text-lg font-black text-text-primary">١,٢٠٠</span>
                <span className="text-[10px] font-medium text-text-secondary">نقاط المكافآت</span>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-primary">العناوين المحفوظة</h3>
                <button className="flex items-center gap-1 px-2 py-1 text-xs font-bold transition-all rounded-lg text-primary active:scale-95 hover:text-primary-dark hover:bg-primary-light">
                  <span className="text-sm font-bold material-symbols-outlined">add</span> إضافة جديد
                </button>
              </div>
              <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-none snap-x">
                <div className="min-w-[260px] max-w-[280px] bg-white p-4 rounded-2xl border border-border/50 flex gap-3 snap-start transition-all hover:border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-surface text-text-secondary rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">home</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-text-primary">المنزل</span>
                    <span className="text-xs text-text-secondary line-clamp-1 mt-0.5">غزة، الرمال، شارع الشهداء، عمارة الأمل</span>
                  </div>
                </div>
                <div className="min-w-[260px] max-w-[280px] bg-white p-4 rounded-2xl border border-border/50 flex gap-3 snap-start transition-all hover:border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-surface text-text-secondary rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">work</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-text-primary">المكتب (العمل)</span>
                    <span className="text-xs text-text-secondary line-clamp-1 mt-0.5">برج التناغم، الطابق الرابع عشر</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {MENU_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="bg-white rounded-2xl border border-border/50 overflow-hidden h-fit">
                  <div className="px-4 pt-4 pb-2 border-b bg-surface border-border/50">
                    <span className="text-xs font-black tracking-wider uppercase text-text-secondary">{group.title}</span>
                  </div>
                  <div className="divide-y divide-border">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { if (item.id === 'language' || item.id === 'theme' || item.id === 'delivery_prefs') router.push('/settings'); }}
                        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-surface/70 transition-all active:bg-surface text-right group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 transition-all rounded-lg bg-surface text-text-secondary group-hover/btn:bg-primary-light group-hover/btn:text-primary">
                            <span className="text-xl material-symbols-outlined">{item.icon}</span>
                          </div>
                          <span className="text-sm font-bold transition-colors text-text-secondary group-hover/btn:text-text-primary">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="bg-error text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                              {item.badge}
                            </span>
                          )}
                          {item.extra && (
                            <span className="text-xs font-bold text-text-secondary group-hover/btn:text-primary transition-colors bg-surface px-2 py-0.5 rounded-md">
                              {item.extra}
                            </span>
                          )}
                          <span className="material-symbols-outlined text-text-secondary text-lg group-hover/btn:text-text-primary group-hover/btn:translate-x-[-2px] transition-all transform rotate-180">
                            chevron_right
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {wishlistItems.length > 0 && (
              <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
                <div className="px-4 pt-4 pb-2 border-b bg-surface border-border/50 flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider uppercase text-text-secondary">المفضلة</span>
                  <span className="text-xs text-text-secondary">{wishlistItems.length} عنصر</span>
                </div>
                <div className="divide-y divide-border">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${item.image}')` }} />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate">{item.name}</p>
                          {item.price && <p className="text-xs text-primary font-semibold">{item.price}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItem(item)}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-error/10 active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
                          favorite
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full py-3.5 mt-4 bg-white rounded-2xl border border-error/30 flex items-center justify-center gap-2 text-error hover:bg-error/5 transition-colors active:scale-[0.98] text-sm font-bold shadow-sm"
            >
              <span className="text-xl material-symbols-outlined">logout</span>
              <span>تسجيل الخروج</span>
            </button>
            <p className="text-center text-[11px] text-text-secondary mt-2 font-mono">Dreefree إصدار v4.2.1-stable</p>

          </div>

        </div>
      </main>
    </div>
  );
}
