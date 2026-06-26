'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function LocationPicker() {
  const [addressDetails, setAddressDetails] = useState('شارع الرشيد، مقابل الفندق، غزة');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  // نظام تتبع إحداثيات الدبوس التفاعلي (اسحب الدبوس للحركة)
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 }); // النسبة المئوية لتموضع الدبوس في حاوية الخريطة
  const mapRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    // حساب موقع الماوس أو اللمس كنسبة مئوية داخل الخريطة
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // إبقاء الدبوس داخل النطاق المرئي للجزء العلوي من الخريطة
    if (x >= 5 && x <= 95 && y >= 10 && y <= 55) {
      setPinPosition({ x, y });
    }
  };

  return (
    // هنا الحل: تم إنقاص الارتفاع بمقدار pb-24 لرفع الشاشة بالكامل فوق الـ TabBar ومنع اختفاء زر التأكيد
    <div
      ref={mapRef}
      onDragOver={handleDragOver}
      className="relative w-full h-[calc(100vh-80px)] bg-[#F8FAFC] text-[#2d3732] overflow-hidden font-cairo pb-24"
      dir="rtl"
    >

      {/* شريط التطبيق العلوي */}
      <header className="absolute top-0 left-0 right-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-[0px_4px_20px_rgba(0,109,52,0.03)] flex justify-between items-center px-4 h-16 border-b border-[#bbcbba]/10">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#006d34]/5 transition-colors active:scale-95 duration-150 text-[#006d34]">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-[#006d34]">تحديد موقع التسليم</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-[#006d34]">2/3</span>
        </div>
      </header>

      {/* منطقة الخارطة التفاعلية الكاملة */}
      <div className="absolute inset-0 z-0 w-full h-full bg-slate-100">
        <div
          className="w-full h-full bg-center bg-cover select-none opacity-90"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')" }}
        />

        {/* [1] الدبوس الافتراضي الثابت لموقع الاستلام (مطعم العافية) */}
        <div className="absolute top-[20%] right-[25%] z-10 flex flex-col items-center pointer-events-none">
          <div className="bg-[#006d34] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md mb-1 flex items-center gap-1 whitespace-nowrap">
            <span className="text-xs material-symbols-outlined">restaurant</span>
            مطعم العافية
          </div>
          <div className="w-7 h-7 bg-[#006d34] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
        </div>

        {/* [2] الدبوس التفاعلي المطور: يمكنك الآن الضغط عليه وسحبه بالماوس في أي اتجاه على الخريطة */}
        <div
          draggable
          onDrag={(e) => handleDragOver(e)}
          style={{ top: `${pinPosition.y}%`, left: `${pinPosition.x}%` }}
          className="absolute z-20 flex flex-col items-center transition-shadow duration-150 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group"
        >
          <div className="bg-gradient-to-r from-[#006d34] to-[#00d26a] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg mb-1 flex items-center gap-1 whitespace-nowrap group-active:scale-105 transition-transform">
            <span className="text-xs material-symbols-outlined animate-bounce">hand_gesture</span>
            اسحب الدبوس لتغيير موقعك
          </div>
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#006d34] to-[#00d26a] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-xl text-white material-symbols-outlined">
                location_on
              </span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#006d34] rotate-45 border-r-4 border-b-4 border-white"></div>
          </div>
          <div className="w-4 h-1 bg-black/30 rounded-full blur-[2px] mt-1"></div>
        </div>
      </div>

      {/* زر تحديد الموقع الحالي بالـ GPS */}
      <button
        aria-label="الموقع الحالي"
        className="absolute top-[42%] left-4 z-30 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-[#2d3732] hover:bg-slate-50 transition-all active:scale-90 border border-[#bbcbba]/20"
      >
        <span className="material-symbols-outlined text-[#006d34] text-xl">
          my_location
        </span>
      </button>

      {/* اللوحة السفلية المنبثقة (Bottom Sheet) معدلة الارتفاع للـ TabBar */}
      <div
        className={`absolute left-0 right-0 bg-white rounded-t-[28px] shadow-[0px_-12px_40px_rgba(0,109,52,0.08)] border-t border-[#bbcbba]/30 z-30 flex flex-col transition-all duration-300 ${
          isSheetExpanded ? 'bottom-0 h-[68vh]' : 'bottom-0 h-[38vh]'
        }`}
      >
        {/* مقبض التحكم باللوحة السفلية */}
        <div
          className="flex justify-center w-full py-3 cursor-pointer touch-none"
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
          <div className="w-12 h-1 bg-[#bbcbba]/60 rounded-full"></div>
        </div>

        {/* محتويات تفاصيل المواقع */}
        <div className="flex-1 px-4 pb-2 space-y-4 overflow-y-auto no-scrollbar">

          {/* شريط البحث */}
          <div className="relative">
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#7f8e7e] text-xl">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSheetExpanded(true)}
              className="w-full h-12 pr-11 pl-4 text-xs bg-slate-50 border border-[#bbcbba]/20 rounded-xl focus:border-[#006d34] focus:ring-0 text-[#2d3732]"
              placeholder="ابحث عن منطقة للتسليم..."
            />
          </div>

          {/* العنوان المختار والمكتوب */}
          <div className="bg-[#006d34]/5 border border-[#006d34]/10 rounded-xl p-3 flex gap-2.5 items-start">
            <span className="material-symbols-outlined text-[#006d34] text-lg mt-0.5">near_me</span>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-[#006d34]">تفاصيل عنوان التوصيل الحالي</p>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-[#2d3732] mt-0.5 focus:ring-0 outline-none"
                placeholder="اكتب رقم البناية، المعلم، أو تفاصيل الشقة..."
              />
            </div>
          </div>

          {/* المواقع المحفوظة */}
          <div>
            <h3 className="text-[11px] font-bold text-[#7f8e7e] mb-2 px-1">الأماكن المحفوظة</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button className="flex items-center gap-2 p-2.5 bg-white border border-[#bbcbba]/25 rounded-xl hover:bg-slate-50 text-right">
                <div className="w-8 h-8 rounded-lg bg-[#006d34]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#006d34] text-lg">home</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2d3732]">المنزل</p>
                  <p className="text-[9px] text-[#7f8e7e] truncate w-24">شارع الرمال، غزة</p>
                </div>
              </button>

              <button className="flex items-center gap-2 p-2.5 bg-white border border-[#bbcbba]/25 rounded-xl hover:bg-slate-50 text-right">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shrink-0">
                  <span className="material-symbols-outlined text-[#7f8e7e] text-lg">work</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2d3732]">المكتب</p>
                  <p className="text-[9px] text-[#7f8e7e] truncate w-24">برج السعيد، ط 5</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* زر تأكيد الموقع - تم إبقاؤه في أسفل اللوحة ومرتفعاً بالكامل عن الـ TabBar لحمايته من الاختفاء */}
        <div className="p-3 bg-white border-t border-[#bbcbba]/10">
          <Link
          href="/Cart"
            className="w-full h-12 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white text-sm font-bold rounded-xl flex items-center justify-center shadow-[0px_6px_15px_rgba(0,210,106,0.15)] active:scale-98 transition-all"
          >
            تأكيد موقع التسليم والمتابعة
          </Link>
        </div>
      </div>

    </div>
  );
}



// 'use client';

// import { useState } from 'react';

// export default function LocationPicker() {
//   const [addressDetails, setAddressDetails] = useState('شارع الرشيد، مقابل الفندق، غزة');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSheetExpanded, setIsSheetExpanded] = useState(false);

//   return (
//     // هنا السر: أضفنا w-full و h-[100vh] ثابت لضمان عدم انكماش الشاشة داخل الـ TabBarWrapper
//     <div className="relative w-full h-screen bg-[#F8FAFC] text-[#2d3732] overflow-hidden font-cairo" dir="rtl">

//       {/* شريط التطبيق العلوي */}
//       <header className="absolute top-0 left-0 right-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-[0px_4px_20px_rgba(0,109,52,0.03)] flex justify-between items-center px-4 h-16 border-b border-[#bbcbba]/10">
//         <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#006d34]/5 transition-colors active:scale-95 duration-150 text-[#006d34]">
//           <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
//         </button>
//         <h1 className="text-base font-bold text-[#006d34]">تحديد موقع التسليم</h1>
//         <div className="flex items-center justify-center w-10">
//           <span className="font-mono text-sm font-bold text-[#006d34]">2/3</span>
//         </div>
//       </header>

//       {/* منطقة الخارطة التفاعلية الكاملة */}
//       <div className="absolute inset-0 z-0 w-full h-full bg-slate-100">
//         {/* استخدمنا صورة خارطة حقيقية واضحة للتأكد من أنها ليست المشكلة */}
//         <div
//           className="w-full h-full bg-center bg-cover opacity-90"
//           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')" }}
//         />

//         {/* [1] الدبوس الافتراضي الثابت لموقع الاستلام (مطعم العافية) */}
//         <div className="absolute top-[28%] right-[30%] z-10 flex flex-col items-center pointer-events-none">
//           <div className="bg-[#006d34] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md mb-1 flex items-center gap-1.5 whitespace-nowrap">
//             <span className="text-xs material-symbols-outlined">restaurant</span>
//             مطعم العافية (نقطة الاستلام)
//           </div>
//           <div className="w-8 h-8 bg-[#006d34] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
//             <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
//           </div>
//         </div>

//         {/* [2] الدبوس المركزي التفاعلي المتحرك الخاص بالمستخدم (نقطة التسليم) */}
//         <div className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
//           <div className="bg-gradient-to-r from-[#006d34] to-[#00d26a] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg mb-2 flex items-center gap-1.5 whitespace-nowrap">
//             <span className="text-sm material-symbols-outlined">person_pin_circle</span>
//             اسحب الخريطة للتحديد هنا
//           </div>
//           <div className="relative">
//             <div className="w-12 h-12 bg-gradient-to-tr from-[#006d34] to-[#00d26a] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
//               <span className="text-2xl text-white material-symbols-outlined">
//                 location_on
//               </span>
//             </div>
//             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#006d34] rotate-45 border-r-4 border-b-4 border-white"></div>
//           </div>
//           <div className="w-5 h-1.5 bg-black/20 rounded-full blur-[2px] mt-2"></div>
//         </div>
//       </div>

//       {/* زر تعيين الموقع الجغرافي الحالي (GPS) */}
//       <button
//         aria-label="الموقع الحالي"
//         className="absolute bottom-[48%] left-4 z-30 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-[#2d3732] hover:bg-slate-50 transition-all active:scale-90 border border-[#bbcbba]/20"
//       >
//         <span className="material-symbols-outlined text-[#006d34]">
//           my_location
//         </span>
//       </button>

//       {/* القائمة السفلية المنبثقة التفاعلية (Bottom Sheet) */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] shadow-[0px_-12px_40px_rgba(0,109,52,0.08)] border-t border-[#bbcbba]/30 z-40 flex flex-col transition-all duration-300 ${
//           isSheetExpanded ? 'h-[75vh]' : 'h-[44vh]'
//         }`}
//       >
//         {/* مقبض السحب العلوي للتحكم بارتفاع اللوحة */}
//         <div
//           className="w-full py-3.5 flex justify-center cursor-pointer touch-none"
//           onClick={() => setIsSheetExpanded(!isSheetExpanded)}
//         >
//           <div className="w-14 h-1.5 bg-[#bbcbba]/50 rounded-full"></div>
//         </div>

//         {/* محتويات تفاصيل العناوين */}
//         <div className="flex-1 px-4 pb-4 space-y-5 overflow-y-auto">

//           {/* شريط البحث المطور */}
//           <div className="relative">
//             <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#7f8e7e]">search</span>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setIsSheetExpanded(true)}
//               className="w-full h-14 pr-12 pl-4 text-sm bg-slate-50 border border-[#bbcbba]/20 rounded-xl focus:border-[#006d34] focus:ring-0 text-[#2d3732] placeholder:text-[#7f8e7e]/60"
//               placeholder="ابحث عن منطقة أو معلم قريب للتسليم..."
//             />
//           </div>

//           {/* تفاصيل العنوان المكتوب حالياً بدبوس مركزي */}
//           <div className="bg-[#006d34]/5 border border-[#006d34]/20 rounded-xl p-3 flex gap-3 items-start">
//             <span className="material-symbols-outlined text-[#006d34] mt-0.5">near_me</span>
//             <div className="flex-1">
//               <p className="text-[11px] font-bold text-[#006d34]">العنوان المحدد الحالي</p>
//               <input
//                 type="text"
//                 value={addressDetails}
//                 onChange={(e) => setAddressDetails(e.target.value)}
//                 className="w-full bg-transparent border-none p-0 text-xs font-bold text-[#2d3732] mt-1 focus:ring-0 outline-none"
//                 placeholder="اكتب تفاصيل العنوان الدقيقة هنا"
//               />
//             </div>
//           </div>

//           {/* الأماكن المحفوظة سابقاً */}
//           <div>
//             <h3 className="text-xs font-bold text-[#7f8e7e] mb-3 px-1">الأماكن المحفوظة</h3>
//             <div className="grid grid-cols-2 gap-3">
//               <button className="flex items-center gap-3 p-3 bg-white border border-[#bbcbba]/20 rounded-xl hover:bg-slate-50 transition-colors text-right">
//                 <div className="w-9 h-9 rounded-lg bg-[#006d34]/10 flex items-center justify-center shrink-0">
//                   <span className="material-symbols-outlined text-[#006d34]">home</span>
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-xs font-bold text-[#2d3732]">المنزل</p>
//                   <p className="text-[10px] text-[#7f8e7e] truncate w-28">شارع الرمال، غزة...</p>
//                 </div>
//               </button>

//               <button className="flex items-center gap-3 p-3 bg-white border border-[#bbcbba]/20 rounded-xl hover:bg-slate-50 transition-colors text-right">
//                 <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-slate-100 shrink-0">
//                   <span className="material-symbols-outlined text-[#7f8e7e]">work</span>
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-xs font-bold text-[#2d3732]">المكتب</p>
//                   <p className="text-[10px] text-[#7f8e7e] truncate w-28">برج السعيد، الطابق 5</p>
//                 </div>
//               </button>
//             </div>
//           </div>

//         </div>

//         {/* الزر الرئيسي الثابت لتأكيد وإرسال العنوان المتناسق مع الـ TabBar */}
//         <div className="p-4 bg-white border-t border-[#bbcbba]/20">
//           <button
//             className="w-full h-14 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white font-bold rounded-xl flex items-center justify-center shadow-[0px_8px_20px_rgba(0,210,106,0.2)] active:scale-98 transition-all"
//           >
//             تأكيد موقع التسليم والمتابعة
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }
