'use client';

import { useState, useEffect } from 'react';
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

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
    <div className="min-h-screen pb-16 font-sans antialiased bg-slate-50 text-slate-800" dir="rtl">

      {/* الحاوية المرنة الرئيسية */}
      <main className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* تقسيم الشاشة: عمودين في الشاشات الكبيرة، وعمود واحد في الشاشات الصغيرة */}
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">

          {/* العمود الأيمن: البيانات الشخصية والإحصائيات والملخص (يأخذ 5 أعمدة على الـ Desktop) */}
          <div className="space-y-6 lg:col-span-5">

            {/* بطاقة المستخدم الشخصية الفاخرة */}
            <section className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(15,23,42,0.02)] border border-slate-100 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 transition-all rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10" />
              <div className="relative w-20 h-20 overflow-hidden rounded-full shadow-md ring-4 ring-emerald-50/50 shrink-0">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="كريم مروان"
                />
              </div>
              <div className="z-10 flex flex-col gap-1">
                <h2 className="text-xl font-bold text-slate-800">كريم مروان</h2>
                <p className="text-sm font-medium text-slate-500" dir="ltr">+970 59-123-4567</p>
                <span className="text-[11px] text-emerald-700 font-semibold px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 w-fit rounded-full mt-1.5">
                  عضو فضي منذ ٢٠٢٣
                </span>
              </div>
              <button className="absolute flex items-center justify-center transition-all border border-transparent top-4 left-4 w-9 h-9 text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-100 rounded-xl active:scale-95">
                <span className="text-xl material-symbols-outlined">edit</span>
              </button>
            </section>

            {/* شبكة الإحصائيات الذكية المستجوبة (Bento Grid) */}
            <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 text-slate-600"><span className="text-xl material-symbols-outlined">package_2</span></div>
                <span className="mt-1 text-xl font-black text-slate-800">٢٤</span>
                <span className="text-xs font-medium text-slate-400">طلب سابق</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border-2 border-emerald-500/30 transition-all hover:translate-y-[-2px] hover:shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600"><span className="text-xl material-symbols-outlined animate-pulse">local_shipping</span></div>
                <span className="mt-1 text-xl font-black text-slate-800">١</span>
                <span className="text-xs font-bold text-emerald-600">طلب نشط حالياً</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 text-slate-600"><span className="text-xl material-symbols-outlined">location_on</span></div>
                <span className="mt-1 text-xl font-black text-slate-800">٣</span>
                <span className="text-xs font-medium text-slate-400">عناوين مسجلة</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100 transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 text-amber-600"><span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span></div>
                <span className="mt-1 text-xl font-black text-slate-800">١,٢٠٠</span>
                <span className="text-xs font-medium text-slate-400">نقاط المكافآت</span>
              </div>
            </section>

            {/* قسم العناوين المحفوظة بالتمرير الأفقي الذكي */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">العناوين المحفوظة</h3>
                <button className="flex items-center gap-1 px-2 py-1 text-xs font-bold transition-all rounded-lg text-emerald-600 active:scale-95 hover:text-emerald-700 hover:bg-emerald-50">
                  <span className="text-sm font-bold material-symbols-outlined">add</span> إضافة جديد
                </button>
              </div>
              <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-none snap-x">
                <div className="min-w-[260px] max-w-[280px] bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-slate-100 flex gap-3 snap-start transition-all hover:border-slate-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-50 text-slate-600 rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">home</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-slate-800">المنزل</span>
                    <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">غزة، الرمال، شارع الشهداء، عمارة الأمل</span>
                  </div>
                </div>
                <div className="min-w-[260px] max-w-[280px] bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-slate-100 flex gap-3 snap-start transition-all hover:border-slate-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-50 text-slate-600 rounded-xl shrink-0">
                    <span className="text-lg material-symbols-outlined">work</span>
                  </div>
                  <div className="flex flex-col overflow-hidden text-right">
                    <span className="text-sm font-bold text-slate-800">المكتب (العمل)</span>
                    <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">برج التناغم، الطابق الرابع عشر</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* العمود الأيسر: خيارات القوائم والإعدادات (يأخذ 7 أعمدة على الـ Desktop لعرض منظم وشبكي مريح) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {MENU_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.01)] border border-slate-100 overflow-hidden h-fit">
                  <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50 border-slate-50">
                    <span className="text-xs font-black tracking-wider uppercase text-slate-400">{group.title}</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-all active:bg-slate-100 text-right group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 transition-all rounded-lg bg-slate-50 text-slate-500 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600">
                            <span className="text-xl material-symbols-outlined">{item.icon}</span>
                          </div>
                          <span className="text-sm font-bold transition-colors text-slate-700 group-hover/btn:text-slate-900">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                              {item.badge}
                            </span>
                          )}
                          {item.extra && (
                            <span className="text-xs font-bold text-slate-400 group-hover/btn:text-emerald-600 transition-colors bg-slate-50 px-2 py-0.5 rounded-md">
                              {item.extra}
                            </span>
                          )}
                          <span className="material-symbols-outlined text-slate-300 text-lg group-hover/btn:text-slate-500 group-hover/btn:translate-x-[-2px] transition-all transform rotate-180">
                            chevron_right
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>


          </div>

        </div>
      </main>
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';

// interface MenuItem {
//   id: string;
//   label: string;
//   icon: string;
//   badge?: number;
//   extra?: string;
// }

// interface MenuGroup {
//   title: string;
//   items: MenuItem[];
// }

// // فئات مجموعات الروابط والقوائم مترجمة بالكامل
// const MENU_GROUPS: MenuGroup[] = [
//   {
//     title: 'الطلبات',
//     items: [
//       { id: 'active_orders', label: 'الطلبات النشطة', icon: 'order_approve', badge: 1 },
//       { id: 'order_history', label: 'سجل الطلبات', icon: 'history' },
//       { id: 'reorder', label: 'إعادة طلب سريع', icon: 'replay' },
//     ]
//   },
//   {
//     title: 'المحفظة والمدفوعات',
//     items: [
//       { id: 'payment_methods', label: 'طرق الدفع', icon: 'payments' },
//       { id: 'wallet', label: 'المحفظة الرقمية', icon: 'account_balance_wallet', extra: '₪150.00' },
//       { id: 'promo_codes', label: 'الكوبونات وأكواد الخصم', icon: 'sell' },
//     ]
//   },
//   {
//     title: 'التفضيلات والإعدادات',
//     items: [
//       { id: 'language', label: 'اللغة', icon: 'language', extra: 'العربية' },
//       { id: 'theme', label: 'المظهر', icon: 'contrast', extra: 'فاتح' },
//       { id: 'delivery_prefs', label: 'تفضيلات التوصيل', icon: 'hail' },
//     ]
//   },
//   {
//     title: 'الدعم والأمان',
//     items: [
//       { id: 'help_center', label: 'مركز المساعدة والدعم', icon: 'help' },
//       { id: 'security', label: 'أمان الحساب', icon: 'security' },
//     ]
//   }
// ];

// export default function ProfilePage() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   // منطق تحول الهيدر لشريط زجاجي شفاف عند التمرير لأسفل
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="relative flex flex-col max-w-xl min-h-screen pb-32 mx-auto bg-surface-container-low">

//       {/* شريط التطبيق العلوي */}
//       <header className={`w-full sticky top-0 z-50 flex justify-between items-center px-4 h-16 transition-all duration-300 ${
//         isScrolled ? 'bg-surface/80 backdrop-blur-md shadow-sm' : 'bg-surface'
//       }`}>
//         <div className="flex items-center gap-3">
//           <button className="transition-transform active:scale-95 text-primary">
//             <span className="material-symbols-outlined">menu</span>
//           </button>
//           <h1 className="text-xl font-bold text-primary">دري فري</h1>
//         </div>
//         <button className="transition-transform active:scale-95 text-primary">
//           <span className="material-symbols-outlined">notifications</span>
//         </button>
//       </header>

//       {/* المحتوى الرئيسي للملف الشخصي */}
//       <main className="flex-1 px-4 pt-6 space-y-6">

//         {/* بطاقة المستخدم الشخصية */}
//         <section className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 relative overflow-hidden border border-outline-variant/10">
//           <div className="w-20 h-20 overflow-hidden border-2 rounded-full shadow-inner border-primary-container shrink-0">
//             <img
//               className="object-cover w-full h-full"
//               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAg7q0QVcXTOS7WQKciUxFN80uL8lC0q_cBq4RvSS717pXgExOj6-vCWUmiWN-CtWypztrZiYZm5y_FJPW-Ufjx-Nu3c1oSX6814aG_dZx7Qp9_HWZEvNPt_FeOwUaTYdjyZes8qHBsT1m2tuLAMsqOmL-XKMoS2_PLimM-3xzwlUfoens3_RGlUGEwXUxbdA00jLSmXuH6yag3KHv7llgM5j6F5iVXxxXc4_btBeBMiCcVNUGRd4hBJcQV3sLNzd03gGh-gtTgLc"
//               alt="كريم مروان"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <h2 className="text-lg font-bold text-on-surface">كريم مروان</h2>
//             <p className="font-mono text-sm text-on-surface-variant" dir="ltr">+970 59-123-4567</p>
//             <span className="text-xs text-outline px-2.5 py-0.5 bg-surface-container w-fit rounded-full font-medium mt-1">
//               عضو منذ ٢٠٢٣
//             </span>
//           </div>
//           <button className="absolute p-2 transition-colors rounded-full top-4 left-4 text-primary hover:bg-surface-container-low active:scale-95">
//             <span className="text-xl material-symbols-outlined">edit</span>
//           </button>
//         </section>

//         {/* شبكة الإحصائيات السريعة (Bento Grid) */}
//         <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//           <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center gap-1 border border-outline-variant/10">
//             <span className="text-2xl material-symbols-outlined text-primary">package_2</span>
//             <span className="text-lg font-bold text-on-surface">٢٤</span>
//             <span className="text-xs font-medium text-secondary">طلب سابق</span>
//           </div>
//           <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center gap-1 border-b-4 border-primary-container border-x border-t border-outline-variant/10">
//             <span className="text-2xl material-symbols-outlined text-primary-container">local_shipping</span>
//             <span className="text-lg font-bold text-on-surface">١</span>
//             <span className="text-xs font-medium text-secondary">طلب نشط</span>
//           </div>
//           <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center gap-1 border border-outline-variant/10">
//             <span className="text-2xl material-symbols-outlined text-primary">location_on</span>
//             <span className="text-lg font-bold text-on-surface">٣</span>
//             <span className="text-xs font-medium text-secondary">عناوين مسجلة</span>
//           </div>
//           <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center gap-1 border border-outline-variant/10">
//             <span className="text-2xl material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
//             <span className="text-lg font-bold text-primary-container">١.٢ألف</span>
//             <span className="text-xs font-medium text-secondary">نقاط الولاء</span>
//           </div>
//         </section>

//         {/* قسم العناوين المحفوظة */}
//         <section className="space-y-3">
//           <div className="flex items-end justify-between">
//             <h3 className="text-base font-bold text-on-surface">عناوين التوصيل الخاصة بي</h3>
//             <button className="flex items-center gap-1 text-sm font-bold transition-transform text-primary active:scale-95 hover:opacity-80">
//               <span className="text-base material-symbols-outlined">add</span> إضافة جديد
//             </button>
//           </div>
//           <div className="flex gap-3 pb-2 overflow-x-auto no-scrollbar">
//             <div className="min-w-[240px] bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/40 flex gap-3">
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low shrink-0">
//                 <span className="material-symbols-outlined text-primary">home</span>
//               </div>
//               <div className="flex flex-col overflow-hidden">
//                 <span className="text-sm font-bold text-on-surface">المنزل</span>
//                 <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">غزة، الرمال، شارع الشهداء، عمارة...</span>
//               </div>
//             </div>
//             <div className="min-w-[240px] bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/40 flex gap-3">
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low shrink-0">
//                 <span className="material-symbols-outlined text-primary">work</span>
//               </div>
//               <div className="flex flex-col overflow-hidden">
//                 <span className="text-sm font-bold text-on-surface">المكتب (العمل)</span>
//                 <span className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">المنطقة التكنولوجية، برج ب، الطابق ١٤...</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* مجموعات الروابط والإعدادات التفاعلية */}
//         <div className="space-y-4">
//           {MENU_GROUPS.map((group, gIdx) => (
//             <div key={gIdx} className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/20 overflow-hidden">
//               <div className="px-4 pt-4 pb-1">
//                 <span className="text-xs font-bold tracking-wider text-outline">{group.title}</span>
//               </div>
//               {group.items.map((item, iIdx) => (
//                 <div key={item.id}>
//                   {iIdx > 0 && <div className="mx-4 border-t border-outline-variant/10" />}
//                   <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-container/30 transition-colors active:scale-[0.995]">
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl material-symbols-outlined text-on-surface-variant">{item.icon}</span>
//                       <span className="text-sm font-medium text-on-surface">{item.label}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {item.badge && (
//                         <span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-0.5 rounded-full">
//                           {item.badge}
//                         </span>
//                       )}
//                       {item.extra && (
//                         <span className="text-xs font-bold text-secondary">{item.extra}</span>
//                       )}
//                       <span className="text-lg transform rotate-180 material-symbols-outlined text-outline">chevron_right</span>
//                     </div>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* زر تسجيل الخروج وإصدار التطبيق */}
//         <div className="pt-4 pb-6">
//           <button className="w-full py-4 bg-surface-container-lowest rounded-2xl border border-error/20 flex items-center justify-center gap-2 text-error hover:bg-error/5 transition-colors active:scale-[0.98] text-sm font-bold shadow-sm">
//             <span className="text-xl material-symbols-outlined">logout</span>
//             <span>تسجيل الخروج</span>
//           </button>
//           <p className="text-center text-[11px] text-outline mt-4 font-mono">Dreefree نسخة v4.2.1-stable</p>
//         </div>

//       </main>



//     </div>
//   );
// }