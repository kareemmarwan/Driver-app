'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import RestaurantsSkeleton from "@/components/skeletons/RestaurantsSkeleton";
import EmptyState from '@/components/EmptyState';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useFilterStore } from '@/lib/store/filterStore';
import { RESTAURANTS as RESTAURANTS_DATA, CATEGORIES, AREAS } from '@/lib/data';

function parseDistance(km: string): number {
  return parseFloat(km.replace(' كم', ''));
}

function parseTime(min: string): number {
  const match = min.match(/(\d+)/);
  return match ? parseInt(match[1]) : 999;
}

export default function Restaurants() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, toggleItem } = useWishlistStore();
  const { selectedArea, selectedSort } = useFilterStore();

  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANTS_DATA];

    // filter by search
    if (searchQuery) {
      list = list.filter(r =>
        r.name.includes(searchQuery) || r.tags.includes(searchQuery)
      );
    }

    // filter by delivery area
    if (selectedArea) {
      list = list.filter(r => r.areaId === selectedArea);
    }

    // sort
    switch (selectedSort) {
      case 'rated':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'fastest':
        list.sort((a, b) => parseTime(a.time) - parseTime(b.time));
        break;
      case 'nearest':
      default:
        list.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
        break;
    }

    return list;
  }, [searchQuery, selectedArea, selectedSort]);

  const selectedAreaName = AREAS.find(a => a.id === selectedArea)?.name;

  useEffect(() => {
    document.title = 'المطاعم والمتاجر | دري فري';
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <RestaurantsSkeleton />;

  return (
    <div className="bg-[#F8FAFC] relative flex flex-col w-full min-h-screen" dir="rtl">

      {/* شريط التطبيق العلوي متناسق مع شفافية البار */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 transition-all border-b border-[#bbcbba]/20 shadow-[0_2px_12px_rgba(0,109,52,0.02)] sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md h-14 sm:h-16">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => window.history.back()} className="transition-transform duration-200 active:scale-95 text-[#006d34]">
            <span className="text-xl transform rotate-180 sm:text-2xl material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl text-[#006d34]">المطاعم</h1>
        </div>
        <button className="p-2 transition-colors duration-200 rounded-full active:scale-95 text-[#7f8e7e] hover:bg-slate-50">
          <span className="text-xl sm:text-2xl material-symbols-outlined">search</span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto">

        {/* قسم البحث */}
        <section className="px-4 mt-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center w-full">
            <span className="absolute text-xl material-symbols-outlined right-4 text-[#7f8e7e]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 text-sm text-right transition-all duration-200 border border-[#bbcbba]/40 outline-none sm:text-base h-12 sm:h-14 bg-white rounded-2xl focus:border-[#006d34] focus:ring-4 focus:ring-[#00d26a]/10 shadow-[0_4px_16px_rgba(0,109,52,0.01)]"
              placeholder="ابحث عن مطعم أو وجبة..."
              type="text"
            />
            <Link href="/FilterDeliveryAreaPage" className="absolute p-2 transition-colors duration-200 rounded-full left-3 text-[#7f8e7e] hover:bg-slate-50 active:scale-95">
              <span className="text-xl material-symbols-outlined">tune</span>
            </Link>
          </div>
        </section>

        {/* فئات التصنيف (التمرير الأفقي) مع الألوان الجديدة */}
        <section className="flex gap-2 px-4 mt-4 overflow-x-auto sm:px-6 lg:px-8 no-scrollbar scroll-smooth">
          <div className="flex gap-2 py-1">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-[14px] font-medium text-xs sm:text-sm flex-shrink-0 transition-all border active:scale-95 ${
                    isActive
                      ? "bg-[#006d34] text-white border-[#006d34] shadow-sm shadow-[#006d34]/20 font-semibold"
                      : "bg-white text-[#7f8e7e] border-[#bbcbba]/30 hover:bg-slate-50 hover:text-[#006d34]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* قسم الموقع الحالي بلمسة خضراء هادئة */}
        <section className="px-4 mt-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 bg-white border border-[#bbcbba]/20 rounded-2xl shadow-[0_4px_20px_rgba(0,109,52,0.01)]">
            <span className="material-symbols-outlined text-[#006d34] flex-shrink-0 text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div className="flex-1">
              <h3 className="text-sm font-bold sm:text-base text-slate-800">موقع التوصيل الحالي: {selectedAreaName || 'الكل'}</h3>
              <p className="text-xs text-[#7f8e7e] mt-0.5">عرض المطاعم الأقرب لموقعك الحالي</p>
            </div>
          </div>
        </section>

        {/* قائمة المطاعم - متناسقة كلياً مع كرت وتفاصيل الحواف */}
        <section className="px-4 pb-32 mt-6 sm:px-6 lg:px-8 sm:mt-8">
          {filteredRestaurants.length === 0 ? (
            <EmptyState
              icon="search_off"
              title="لا توجد نتائج"
              description="لم نتمكن من العثور على مطاعم تطابق بحثك. حاول بكلمات أخرى."
            />
          ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredRestaurants.map((restaurant) => {
              const isFav = isFavorite(restaurant.id);
              return (
                <Link
                  key={restaurant.id}
                  href={`/StoreDetails/${restaurant.id}`}
                  className="bg-white border border-[#bbcbba]/20 rounded-[24px] overflow-hidden shadow-[0_6px_24px_rgba(0,109,52,0.02)] group active:scale-[0.99] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,109,52,0.06)] hover:border-[#bbcbba]/50 cursor-pointer flex flex-col"
                >
                  {/* صورة الغلاف */}
                  <div className="relative w-full h-40 overflow-hidden sm:h-48">
                    <div
                      className="absolute inset-0 transition-transform duration-700 bg-center bg-cover group-hover:scale-105"
                      style={{ backgroundImage: `url('${restaurant.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                    {/* الشارات المرفقة مع اللون الأخضر المتدرج والمضيء */}
                    <div className="absolute flex flex-wrap gap-1.5 top-3 right-3">
                      {restaurant.isNearest && (
                        <span className="bg-gradient-to-r from-[#006d34] to-[#00d26a] text-white text-[10px] font-bold px-2 py-1 rounded-[8px] shadow-sm">الأقرب</span>
                      )}
                      {restaurant.isOpen && (
                        <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-[8px] shadow-sm">مفتوح</span>
                      )}
                    </div>

                    {/* زر المفضلة متناسق مع لون الإشعارات الفاقع */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem({ id: restaurant.id, name: restaurant.name, image: restaurant.image, price: '', storeName: '' });
                      }}
                      className="absolute flex items-center justify-center text-white transition-all rounded-full w-9 h-9 sm:w-10 sm:h-10 top-3 left-3 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-red-500 hover:scale-105 active:scale-95"
                    >
                      <span
                        className={`material-symbols-outlined text-xl transition-colors ${isFav ? 'text-red-500' : ''}`}
                        style={{ fontVariationSettings: `'FILL' ${isFav ? 1 : 0}` }}
                      >
                        favorite
                      </span>
                    </button>

                    {/* شعار المطعم التراكبي */}
                    <div className="absolute z-10 w-12 h-12 overflow-hidden bg-white border-2 shadow-sm -bottom-5 right-4 sm:w-14 sm:h-14 rounded-[14px] border-white">
                      <img className="object-cover w-full h-full" src={restaurant.logo} alt={restaurant.name} />
                    </div>
                  </div>

                  {/* تفاصيل المطعم */}
                  <div className="flex flex-col justify-between flex-1 p-4 pt-7 sm:p-5 sm:pt-8">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base font-bold truncate sm:text-lg text-slate-800 group-hover:text-[#006d34] transition-colors">{restaurant.name}</h2>

                        {/* مربع التقييم الأخضر */}
                        <div className="flex items-center flex-shrink-0 gap-0.5 px-2 py-0.5 rounded-[8px] bg-[#00d26a]/10 border border-[#00d26a]/20">
                          <span className="text-xs sm:text-sm material-symbols-outlined text-[#006d34]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-xs font-bold text-[#006d34]">{restaurant.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#7f8e7e] mt-1 line-clamp-1">{restaurant.tags}</p>
                      <p className="flex items-center gap-1 mt-2 text-xs truncate text-[#7f8e7e]/80">
                        <span className="flex-shrink-0 text-xs sm:text-sm material-symbols-outlined">location_on</span>
                        <span className="truncate">{restaurant.address}</span>
                      </p>
                    </div>

                    {/* معلومات التوصيل والمسافة باللون الرمادي الزيتوني المتناسق */}
                    <div className="flex items-center justify-between pt-3 mt-4 text-[11px] sm:text-xs border-t border-slate-100 text-[#7f8e7e]">
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-[8px] border border-slate-100">
                        <span className="text-sm sm:text-base material-symbols-outlined text-[#7f8e7e]/70">distance</span>
                        <span>{restaurant.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-[8px] border border-slate-100">
                        <span className="text-sm sm:text-base material-symbols-outlined text-[#7f8e7e]/70">schedule</span>
                        <span>{restaurant.time}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#00d26a]/5 px-2 py-1 rounded-[8px] border border-[#00d26a]/10">
                        <span className="text-sm sm:text-base material-symbols-outlined text-[#006d34]/70">payments</span>
                        <span className="font-semibold text-[#006d34]">توصيل {restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        </section>
      </main>

    </div>
  );
}

