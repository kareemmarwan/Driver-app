'use client';

import { useState } from 'react';

const SAVED_LOCATIONS = [
  { id: 1, title: 'ساحة السرايا المركزية', desc: 'وسط مدينة غزة', icon: 'location_on', color: 'bg-primary-container text-primary' },
  { id: 2, title: 'هايبر ماركت كيرفور', desc: 'شارع النصر، غزة', icon: 'store', color: 'bg-secondary-container text-secondary' },
];

const RECENT_LOCATIONS: { id: number; title: string; desc: string }[] = [];

export default function PickupLocationPage() {
  const [sheetHeight, setSheetHeight] = useState('45vh'); // التحكم بارتفاع الـ Bottom Sheet
  const [searchQuery, setSearchQuery] = useState('');

  // تغيير حجم نافذة المواقع عند النقر على حقل البحث
  const handleSearchFocus = () => {
    setSheetHeight('85vh');
  };

  const handleConfirmPickup = () => {
    console.log('تم تأكيد موقع الاستلام الحالي بنجاح.');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden antialiased bg-background text-on-background font-cairo">

      {/* شريط التطبيق العلوي الثابت */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-md px-4 py-2 mx-auto shadow-sm bg-surface/80 backdrop-blur-md">
        <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-surface-container hover:bg-surface-container-highest active:scale-95 text-primary">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-primary">طلب توصيل جديد</h1>
        <div className="flex items-center justify-center w-10 h-10 font-mono text-sm font-bold text-primary">1/3</div>
      </header>

      {/* كانفاس الخريطة الحية ملء الشاشة */}
      <main className="relative w-full h-full">
        <div className="absolute inset-0 z-0 overflow-hidden bg-surface-dim">
          <div
            className="w-full h-full bg-cover bg-center grayscale-[10%] opacity-90"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAELo7SiMhkjpePMCg_DdIBtjQlQWCfVocgCl8-zsX8VIxITyMflQT4tWD7jpJxF68_LrT4Tt1u9GMdKDPDLAQ-3MReSCdACpQGIwGlpZ26RypwoC19DnJn6vAjzEPtkOGjSeJGHxIwPRzNUCs3P1IooA-d4VYvLHggnjZ_EommQhOHm2Dpa86_ZxKAWIjVk5zyAZy9fMf9vkEQl-OyIHiRaE5uxWZrD9cCgnateFKTT0kBVd3gd4Y4bELfV08USt8blmPNb6__iqQ')` }}
          />
        </div>

        {/* دبوس تحديد الموقع الجغرافي المخصص في منتصف الشاشة */}
        <div className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
          {/* بالون التأكيد العلوي */}
          <div className="bg-primary text-on-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-lg mb-2 flex items-center gap-1">
            استلام من هنا
          </div>
          {/* الدبوس */}
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 border-4 border-white rounded-full shadow-xl bg-primary">
              <span className="text-2xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
            </div>
            {/* رأس مثلث الدبوس السفلي المتداخل */}
            <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 border-b-4 border-r-4 border-white -bottom-1 left-1/2 bg-primary" />
          </div>
          {/* ظل الدبوس على الأرض */}
          <div className="w-4 h-1 bg-on-surface/20 rounded-full blur-[2px] mt-2" />
        </div>

        {/* زر تحديد الموقع الحالي السريع عائم فوق الورقة السفلى */}
        <button
          aria-label="موقعي الحالي"
          className="absolute bottom-[48%] left-4 z-30 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-on-surface hover:bg-surface-container-low transition-all active:scale-90"
        >
          <span className="text-2xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            my_location
          </span>
        </button>

        {/* نافذة الخيارات السفلية (Bottom Sheet) */}
        <div
          className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-[0px_-12px_40px_rgba(0,0,0,0.12)] z-40 flex flex-col overflow-hidden transition-all duration-300"
          style={{ height: sheetHeight }}
        >
          {/* مقبض السحب العلوي للشكل الجمالي */}
          <div
            className="flex justify-center w-full py-3 cursor-pointer"
            onClick={() => setSheetHeight(sheetHeight === '45vh' ? '85vh' : '45vh')}
          >
            <div className="w-12 h-1.5 bg-outline-variant rounded-full" />
          </div>

          {/* محتوى الورقة الداخلية (القابل للتمرير) */}
          <div className="flex-1 px-4 space-y-6 overflow-y-auto no-scrollbar">

            {/* حقل البحث عن مواقع استلام جديدة */}
            <div className="relative">
              <span className="absolute -translate-y-1/2 material-symbols-outlined right-4 top-1/2 text-secondary">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full pl-4 pr-12 text-sm text-right border-none shadow-sm outline-none h-14 bg-surface-container-low rounded-xl focus:ring-2 focus:ring-primary placeholder:text-secondary-fixed-dim"
                placeholder="ابحث عن موقع الاستلام..."
                type="text"
              />
            </div>

            {/* المواقع المحفوظة مسبقاً (شبكة ثنائية) */}
            <div>
              <h3 className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-3 px-1">المواقع المحفوظة</h3>
              <div className="grid grid-cols-2 gap-3">
                {SAVED_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => { setSheetHeight('45vh'); setSearchQuery(loc.title); }}
                    className="flex items-center gap-3 p-3 text-right transition-colors bg-white border border-outline-variant/30 rounded-2xl hover:bg-surface-container-lowest group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${loc.color}`}>
                      <span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{loc.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-on-surface">{loc.title}</p>
                      <p className="text-[10px] text-secondary truncate mt-0.5">{loc.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* سجل عمليات البحث الأخيرة */}
            <div className="pb-4">
              <h3 className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-2 px-1">عمليات البحث الأخيرة</h3>
              <div className="space-y-1">
                {RECENT_LOCATIONS.map((recent) => (
                  <div
                    key={recent.id}
                    onClick={() => { setSheetHeight('45vh'); setSearchQuery(recent.title); }}
                    className="flex items-center gap-4 px-1 py-3 border-b cursor-pointer border-outline-variant/10 active:bg-surface-container-low"
                  >
                    <span className="text-xl material-symbols-outlined text-secondary-fixed-dim shrink-0">history</span>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-xs font-bold text-on-surface">{recent.title}</p>
                      <p className="text-[10px] text-secondary mt-0.5">{recent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* زر التأكيد السفلي الثابت للـ Bottom Sheet */}
          <div className="p-4 bg-white border-t border-outline-variant/20 pb-safe shadow-[0px_-4px_12px_rgba(0,0,0,0.02)]">
            <button
              onClick={handleConfirmPickup}
              className="flex items-center justify-center w-full text-sm font-bold transition-transform shadow-md h-14 bg-primary-container text-on-primary-container rounded-xl shadow-primary-container/10 active:scale-95"
            >
              تأكيد موقع الاستلام
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}