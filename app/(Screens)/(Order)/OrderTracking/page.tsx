'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TrackingPage() {
  // محاكاة الحالة المباشرة المتغيرة للطلب باللغة العربية
  const [statusText, setStatusText] = useState('أحمد يقوم باستلام طلبك الآن');

  useEffect(() => {
    const statuses = [
      'أحمد يقوم باستلام طلبك الآن',
      'تم استلام الطلب وهو في الطريق إليك',
      'أحمد قريب جداً من موقعك!',
      'وصل مندوبنا، يرجى الاستلام'
    ];
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % statuses.length;
      setStatusText(statuses[current]);
    }, 8000); // تتغير كل 8 ثوانٍ كمحاكاة للواقع
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* الشريط العلوي - الـ AppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#f3fcef] dark:bg-[#d3ddd1] shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-[#006d34] hover:bg-[#dce5d9] transition-colors p-2 rounded-full active:scale-95 transform rotate-180">
            arrow_back
          </button>
          <h1 className="font-bold text-xl text-[#151e16]">تتبع الطلب</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-[#006d34] hover:bg-[#dce5d9] transition-colors p-2 rounded-full active:scale-95">
            notifications
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-grow w-full max-w-2xl pt-16 pb-24 mx-auto">

        {/* حاوية الخريطة المتجاوبة */}
        <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden md:rounded-2xl md:mt-4 md:shadow-md">
          <div className="w-full h-full bg-[#dce5d9] flex items-center justify-center relative">

            {/* صورة الخريطة بدعم Next.js */}
            <img
              className="w-full h-full object-cover grayscale-[20%] opacity-90"
              alt="خريطة تتبع خط السير في مدينة غزة"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmuzTG4P4reMUHan30yV6qhQvDSE5PAlsvJ6ujIWvn_lxAYIT22R6QfTciMLTg2Lihv864BSNalzZ8okWVOt3cc4wCR0gqL4Q5-RHoxTJpCAfiBbjS6uX1IYDx3Ux5NUvSLol5cHyJ0ZnXmA2BK_FovXE8Jpo3TkdNtK8IzX1_1FG_chXVyoqUV7N6Fiu88HIN7T4sbjUBfPWEXE88m-Uarz888pZKO8gAMwPm3wnqppK7UcJ25wT1pG3EiEeOjq508WVeNmnFdW0"
            />

            {/* غطاء التدرج فوق الخريطة */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f3fcef]/80 via-transparent to-[#f3fcef] pointer-events-none"></div>

            {/* مؤشر الدراجة النارية المتحرك المباشر */}
            <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#006d34]/20 rounded-full animate-ping"></div>
                <div className="bg-[#006d34] text-white p-3 rounded-full shadow-lg relative z-20 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>motorcycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* تفاصيل التتبع السفلى */}
        <div className="relative z-20 px-4 -mt-12 space-y-4">

          {/* كارت الحالة */}
          <div className="bg-white rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] p-5 border border-[#bbcbba]/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-[#006d34] mb-1 uppercase tracking-wider">الحالة الحالية</p>
                <h2 className="text-lg md:text-xl font-bold text-[#151e16] transition-all duration-300">{statusText}</h2>
                <p className="text-sm text-[#3c4a3d] mt-1">الوقت المتوقع للوصول: 12:45 م</p>
              </div>
              <div className="bg-[#00d26a]/10 p-3 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#006d34] text-[32px]">takeout_dining</span>
              </div>
            </div>

            {/* شريط التقدم الزمني للطلب (يدعم الـ RTL) */}
            <div className="relative py-4">
              <div className="relative z-10 flex items-center justify-between">
                {/* المرحلة 1 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#006d34] text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-xs text-[#151e16] font-medium">تم الطلب</span>
                </div>
                {/* المرحلة 2 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#006d34] text-white flex items-center justify-center shadow-sm ring-4 ring-[#00d26a]/30">
                    <span className="material-symbols-outlined text-[18px]">restaurant</span>
                  </div>
                  <span className="text-xs text-[#006d34] font-bold">التجهيز</span>
                </div>
                {/* المرحلة 3 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#dce5d9] text-[#3c4a3d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">delivery_dining</span>
                  </div>
                  <span className="text-xs text-[#3c4a3d]">جاري الشحن</span>
                </div>
                {/* المرحلة 4 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#dce5d9] text-[#3c4a3d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                  </div>
                  <span className="text-xs text-[#3c4a3d]">تم التوصيل</span>
                </div>
              </div>

              {/* الخط الخلفي الرابط بين المراحل */}
              <div className="absolute top-[31px] left-4 right-4 h-1 bg-[#dce5d9] -z-10 rounded-full overflow-hidden">
                {/* تم تعديل الأنيميشن والتدرج ليتوافق مع الـ Tailwind والـ RTL */}
                <div
                  className="h-full bg-gradient-to-r from-[#00d26a] via-[#62ff95] to-[#00d26a] bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear]"
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* كارت معلومات السائق */}
          <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-4 flex items-center justify-between border border-[#bbcbba]/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00d26a] flex-shrink-0">
                <img
                  className="object-cover w-full h-full"
                  alt="صورة السائق أحمد"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPpbdwSgdl2LLrCOYMZbCvb8yp0LTQl2AW3J-rx2FmzMxPZ18rgDqkOvoyQ93KDsb0U5xjpJNdsJddbbd3R1lL2C-4IIjXBqABpJVNd242bH4JpE6reBcZG3AHWGoftTc9RDtWBiPav3hzkzDVz1o_4XZJEs4EorDBUEd90ypHy0RZ7FY-6mb7-3XBWq61jmvypFgsT3LAd2RZCuW3nodLjMH8LYUDo2NPTvwGhiOB6U4r3xExOgd2EwC8JaBS1JdGSxYpJ7OY9eA"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-[#151e16]">أحمد</h3>
                  <div className="flex items-center text-[#006d34] bg-[#00d26a]/10 px-1.5 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="mr-1 text-xs font-bold">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-[#3c4a3d] mt-0.5">دراجة نارية • غزة-2891</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-[#e7f1e4] flex items-center justify-center text-[#006d34] active:scale-90 transition-transform">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#e7f1e4] flex items-center justify-center text-[#006d34] active:scale-90 transition-transform">
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
            </div>
          </div>

          {/* ملخص العنوان */}
          <div className="bg-white rounded-xl p-4 border border-[#bbcbba]/10">
            <div className="flex items-center gap-3">
              <div className="text-[#3c4a3d] flex items-center justify-center">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#151e16]">عنوان التوصيل</p>
                <p className="text-sm text-[#3c4a3d] mt-0.5">شارع الرشيد، شقة 4B، مدينة غزة</p>
              </div>
            </div>
          </div>

          {/* زر الدعم الفني الفوري */}
          <button className="w-full flex items-center justify-center gap-2 font-bold text-sm text-[#5f5e5e] py-3.5 hover:bg-[#dce5d9]/30 transition-colors rounded-xl border border-dashed border-[#outline-variant]">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            تواصل مع الدعم الفني
          </button>
        </div>
      </main>

      {/* زر الإجراء السفلي الثابت - يظهر في الهواتف فقط (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[#f3fcef]/80 backdrop-blur-md z-50 md:hidden">
        <button className="w-full h-14 bg-[#006d34] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined">receipt_long</span>
          عرض تفاصيل الطلب
        </button>
      </div>

      {/* القائمة السفلية للشاشات الكبيرة والتابلت - (Desktop/Tablet Navigation) */}
      <nav className="hidden md:flex fixed bottom-0 left-0 w-full bg-white h-20 border-t border-[#bbcbba] items-center justify-around z-50">
        <button className="flex flex-col items-center justify-center text-[#5f5e5e] hover:text-[#006d34] transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="mt-1 text-xs">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#006d34] bg-[#00d26a]/10 rounded-xl px-5 py-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span className="mt-1 text-xs font-bold">الطلبات</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#5f5e5e] hover:text-[#006d34] transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="mt-1 text-xs">البحث</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#5f5e5e] hover:text-[#006d34] transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="mt-1 text-xs">الحساب</span>
        </button>
      </nav>
    </>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';

// // فئات تتبع مراحل وحالة الطلب
// const TRACKING_STAGES = [
//   { id: 1, label: 'تم الطلب', icon: 'check', done: true, current: false },
//   { id: 2, label: 'قيد التحضير', icon: 'restaurant', done: true, current: true },
//   { id: 3, label: 'جاري الشحن', icon: 'delivery_dining', done: false, current: false },
//   { id: 4, label: 'تم التسليم', icon: 'done_all', done: false, current: false },
// ];

// export default function OrderTrackingPage() {
//   const [statusText, setStatusText] = useState('أحمد يقوم باستلام طلبك الآن');
//   const [eta, setEta] = useState('12:45 م');

//   return (
//     <div className="relative flex flex-col max-w-md min-h-screen pb-24 mx-auto bg-background text-on-surface font-cairo">

//       {/* شريط التطبيق العلوي */}
//       <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-50 flex justify-between items-center px-4 h-16 bg-surface shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
//         <div className="flex items-center gap-2">
//           <button className="p-2 transition-colors transform rotate-180 rounded-full material-symbols-outlined text-primary hover:bg-surface-variant active:scale-95">
//             arrow_back
//           </button>
//           <h1 className="text-xl font-bold text-on-surface">تتبع الطلب الفوري</h1>
//         </div>
//         <button className="p-2 transition-colors rounded-full material-symbols-outlined text-primary hover:bg-surface-variant active:scale-95">
//           notifications
//         </button>
//       </header>

//       {/* المحتوى الرئيسي للتتبع والخريطة */}
//       <main className="flex-grow pt-16 pb-12">

//         {/* حاوية عرض الخريطة الحية */}
//         <div className="relative w-full h-[397px] overflow-hidden bg-surface-container-highest">
//           <img
//             className="w-full h-full object-cover grayscale-[15%] opacity-90"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmuzTG4P4reMUHan30yV6qhQvDSE5PAlsvJ6ujIWvn_lxAYIT22R6QfTciMLTg2Lihv864BSNalzZ8okWVOt3cc4wCR0gqL4Q5-RHoxTJpCAfiBbjS6uX1IYDx3Ux5NUvSLol5cHyJ0ZnXmA2BK_FovXE8Jpo3TkdNtK8IzX1_1FG_chXVyoqUV7N6Fiu88HIN7T4sbjUBfPWEXE88m-Uarz888pZKO8gAMwPm3wnqppK7UcJ25wT1pG3EiEeOjq508WVeNmnFdW0"
//             alt="خريطة تتبع خط سير المندوب في مدينة غزة"
//           />
//           {/* طبقة تدرج لدمج الخريطة مع خلفية التطبيق */}
//           <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/80 via-transparent to-background" />

//           {/* مؤشر موقع المندوب العائم والمتحرك ديناميكياً */}
//           <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//             <div className="relative">
//               <div className="absolute rounded-full -inset-4 bg-primary/20 animate-ping" />
//               <div className="relative z-20 flex items-center justify-center p-3 rounded-full shadow-xl bg-primary text-on-primary">
//                 <span className="text-2xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
//                   motorcycle
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* كتل محتوى وبيانات التتبع الفعلي فوق الخريطة */}
//         <div className="relative z-20 px-4 -mt-12 space-y-4">

//           {/* أولاً: بطاقة الحالة الحالية وشريط التقدم البرمجي */}
//           <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.05)] p-5 border border-outline-variant/20">
//             <div className="flex items-start justify-between mb-5">
//               <div>
//                 <p className="mb-1 text-xs font-bold tracking-wider uppercase text-primary">الحالة الحالية</p>
//                 <h2 className="text-base font-bold leading-tight text-on-surface">{statusText}</h2>
//                 <p className="text-xs text-on-surface-variant mt-1.5">الوقت المتوقع للوصول: <span className="font-mono font-bold text-on-surface">{eta}</span></p>
//               </div>
//               <div className="p-3 bg-primary-container/10 rounded-xl text-primary shrink-0">
//                 <span className="material-symbols-outlined text-[32px]">takeout_dining</span>
//               </div>
//             </div>

//             {/* شريط التقدم بين المراحل الأربعة */}
//             <div className="relative py-2">
//               <div className="relative z-10 flex items-center justify-between">
//                 {TRACKING_STAGES.map((stage) => (
//                   <div key={stage.id} className="flex flex-col items-center gap-1">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
//                       stage.current
//                         ? "bg-primary text-white ring-4 ring-primary-container/30"
//                         : stage.done
//                           ? "bg-primary text-white"
//                           : "bg-surface-container-highest text-on-surface-variant"
//                     }`}>
//                       <span className="text-lg material-symbols-outlined">
//                         {stage.current ? stage.icon : stage.done ? 'check' : stage.icon}
//                       </span>
//                     </div>
//                     <span className={`text-[11px] font-bold ${stage.current ? 'text-primary' : 'text-on-surface-variant'}`}>
//                       {stage.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* خط الاتصال الخلفي الأنيميشن المشع (Shimmer) */}
//               <div className="absolute top-[23px] left-[16px] right-[16px] h-1 bg-surface-container-highest -z-10 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-primary bg-[linear-gradient(90deg,#00d26a_0%,#62ff95_50%,#00d26a_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear]"
//                   style={{ width: '45%' }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ثانياً: بطاقة بيانات كابتن التوصيل وأزرار التواصل الفوري */}
//           <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] p-4 flex items-center justify-between border border-outline-variant/20">
//             <div className="flex items-center min-w-0 gap-3">
//               <div className="overflow-hidden border-2 rounded-full shadow-sm w-14 h-14 border-primary-container shrink-0">
//                 <img className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPpbdwSgdl2LLrCOYMZbCvb8yp0LTQl2AW3J-rx2FmzMxPZ18rgDqkOvoyQ93KDsb0U5xjpJNdsJddbbd3R1lL2C-4IIjXBqABpJVNd242bH4JpE6reBcZG3AHWGoftTc9RDtWBiPav3hzkzDVz1o_4XZJEs4EorDBUEd90ypHy0RZ7FY-6mb7-3XBWq61jmvypFgsT3LAd2RZCuW3nodLjMH8LYUDo2NPTvwGhiOB6U4r3xExOgd2EwC8JaBS1JdGSxYpJ7OY9eA" alt="صورة المندوب أحمد" />
//               </div>
//               <div className="min-w-0">
//                 <div className="flex items-center gap-1.5">
//                   <h3 className="text-sm font-bold truncate text-on-surface">أحمد</h3>
//                   <div className="flex items-center text-primary shrink-0">
//                     <span className="text-xs material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//                     <span className="text-[11px] font-bold mr-0.5">4.9</span>
//                   </div>
//                 </div>
//                 <p className="text-xs text-on-surface-variant mt-0.5 truncate">دراجة نارية • غزة-{'{٢٨٩١}'}</p>
//               </div>
//             </div>
//             {/* أزرار الاتصال والمحادثة الجانبية للمندوب */}
//             <div className="flex gap-2 shrink-0">
//               <button className="flex items-center justify-center w-10 h-10 transition-transform rounded-full shadow-sm bg-surface-container text-primary active:scale-90">
//                 <span className="text-lg material-symbols-outlined">call</span>
//               </button>
//               <button className="flex items-center justify-center w-10 h-10 transition-transform rounded-full shadow-sm bg-surface-container text-primary active:scale-90">
//                 <span className="text-lg material-symbols-outlined">chat_bubble</span>
//               </button>
//             </div>
//           </div>

//           {/* ثالثاً: تلخيص تفاصيل وعنوان توصيل الوجبة */}
//           <div className="flex items-center gap-3 p-4 border shadow-sm bg-surface-container-lowest rounded-2xl border-outline-variant/10">
//             <span className="text-xl material-symbols-outlined text-primary">location_on</span>
//             <div className="min-w-0">
//               <p className="text-xs font-bold text-on-surface">عنوان التوصيل المستهدف</p>
//               <p className="text-xs text-on-surface-variant mt-0.5 truncate">شارع الرشيد، شقة 4B، مدينة غزة</p>
//             </div>
//           </div>

//           {/* رابعاً: زر التواصل السريع مع الدعم الفني والمساعدة */}
//           <button className="w-full flex items-center justify-center gap-2 font-bold text-xs text-secondary py-3.5 hover:bg-surface-variant/30 transition-colors rounded-2xl border-2 border-dashed border-outline-variant/60 active:scale-[0.99]">
//             <span className="text-lg material-symbols-outlined">support_agent</span>
//             <span>التحدث مع الدعم الفني للمساعدة</span>
//           </button>
//         </div>
//       </main>

//       {/* زر عرض تفاصيل الفاتورة والطلب السفلي الثابت (Floating Action Footer) */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md p-4 mx-auto bg-surface/80 backdrop-blur-md">
//         <button className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform">
//           <span className="text-xl material-symbols-outlined">receipt_long</span>
//           <span>عرض تفاصيل الفاتورة والطلب كاملة</span>
//         </button>
//       </div>

//     </div>
//   );
// }