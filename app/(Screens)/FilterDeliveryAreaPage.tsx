'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SORT_OPTIONS, AREAS } from "@/lib/data";
import { useFilterStore } from '@/lib/store/filterStore';

export default function FilterDeliveryAreaPage() {
  const router = useRouter();
  const { selectedArea: storeArea, selectedSort: storeSort, setSelectedArea, setSelectedSort, resetFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSort, setSelectedSortLocal] = useState(storeSort);
  const [selectedArea, setSelectedAreaLocal] = useState<string | null>(storeArea);

  // إغلاق الشاشة المنبثقة
  const handleClose = () => {
    setIsOpen(false);
  };

  // إعادة ضبط التصفية
  const handleReset = () => {
    setSelectedSortLocal('nearest');
    setSelectedAreaLocal(null);
  };

  // تطبيق التصفية
  const handleApply = () => {
    if (!selectedArea) {
      alert('الرجاء اختيار منطقة أولاً');
      return;
    }
    setSelectedArea(selectedArea);
    setSelectedSort(selectedSort);
    const areaName = AREAS.find(a => a.id === selectedArea)?.name;
    console.log('تطبيق الفلترة للمنطقة:', areaName, 'والترتيب:', selectedSort);
    setIsOpen(false);
    router.push('/Restaurants');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface flex flex-col relative overflow-hidden">

      {/* محاكاة المحتوى الخلفي للواجهة الأساسية */}
      <div className="w-full p-4 space-y-4 opacity-40 pointer-events-none">
        <header className="flex justify-between items-center h-16 border-b border-outline-variant">
          <div className="flex items-center gap-4 text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-bold text-xl">دري فري</span>
          </div>
          <button className="text-primary font-medium px-3 py-1 rounded-lg bg-surface-container-low">تصفية</button>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-surface-container rounded-3xl animate-pulse"></div>
          <div className="aspect-square bg-surface-container rounded-3xl animate-pulse"></div>
          <div className="aspect-square bg-surface-container rounded-3xl animate-pulse"></div>
          <div className="aspect-square bg-surface-container rounded-3xl animate-pulse"></div>
        </div>
      </div>

      {/* الـ Modal المنبثق للتصفية */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/40 backdrop-blur-sm transition-opacity duration-300">

          {/* حاوية الـ Modal الداخلية */}
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] md:max-h-[795px] transition-transform duration-300 translate-y-0">

            {/* رأس الـ Modal */}
            <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">تغيير المنطقة</h2>
                  <p className="text-xs text-secondary leading-tight mt-0.5">اختر منطقة التوصيل لتصفح المطاعم</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* جسم الـ Modal القابل للتمرير عمودياً */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar space-y-8">

              {/* قسم خيارات الترتيب */}
              <section>
                <h3 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">sort</span>
                  ترتيب حسب
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SORT_OPTIONS.map((option) => {
                    const isChecked = selectedSort === option.id;
                    return (
                      <label key={option.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          checked={isChecked}
                          onChange={() => setSelectedSortLocal(option.id)}
                          className="hidden"
                        />
                        <div className={`px-4 py-3 rounded-2xl border-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
                          isChecked
                            ? "border-primary bg-primary-container/10 text-primary"
                            : "border-transparent bg-surface-container-low text-on-surface-variant"
                        }`}>
                          <span className="material-symbols-outlined text-[20px]">{option.icon}</span>
                          <span>{option.label}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* قسم شبكة اختيار مناطق التوصيل */}
              <section>
                <h3 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">map</span>
                  اختر منطقة التوصيل
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AREAS.map((area) => {
                    const isSelected = selectedArea === area.id;
                    return (
                      <div
                        key={area.id}
                        onClick={() => setSelectedAreaLocal(area.id)}
                        className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 ${
                          isSelected
                            ? "bg-primary/10 border-primary ring-1 ring-primary"
                            : "bg-surface-container-low border-outline-variant/30 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`material-symbols-outlined transition-colors ${isSelected ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}>
                            home_pin
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-transform duration-200 ${isSelected ? 'scale-100' : 'scale-0'}`} />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-on-surface">{area.name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* تذييل الـ Modal وأزرار التحكم */}
            <div className="px-6 py-5 border-t border-outline-variant bg-surface-container-low flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={handleApply}
                className="flex-1 h-14 bg-primary-container text-on-primary-container font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 hover:scale-[1.01] active:scale-95 transition-all duration-200"
              >
                تطبيق الفلتر
                <span className="material-symbols-outlined text-xl">check_circle</span>
              </button>
              <button
                onClick={handleReset}
                className="px-8 h-14 bg-surface text-secondary border border-outline-variant font-medium rounded-2xl hover:bg-surface-variant active:scale-95 transition-all duration-200"
              >
                إعادة ضبط
              </button>
            </div>

          </div>
        </div>
      )}

      {/* شريط التنقل السفلي الاحتياطي */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-surface border-t border-outline-variant/30 flex justify-around items-center opacity-40 pointer-events-none">
        <div className="flex flex-col items-center text-primary font-bold">
          <span className="material-symbols-outlined">home</span>
          <span className="text-xs mt-0.5">الرئيسية</span>
        </div>
        <div className="flex flex-col items-center text-secondary">
          <span className="material-symbols-outlined">search</span>
          <span className="text-xs mt-0.5">الفئات</span>
        </div>
      </nav>

    </div>
  );
}