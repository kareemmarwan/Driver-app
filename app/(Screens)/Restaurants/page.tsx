'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import RestaurantsSkeleton from "@/components/skeletons/RestaurantsSkeleton";
import EmptyState from '@/components/EmptyState';

// بيانات تجريبية للمطاعم مترجمة للعربية
const RESTAURANTS = [
  {
    id: 1,
    name: "مطعم جنين",
    tags: "شاورما • مشويات • سندويشات",
    address: "شارع النصيرات الرئيسي",
    rating: 4.8,
    distance: "0.8 كم",
    time: "15-20 دقيقة",
    deliveryFee: "3 ₪",
    isNearest: true,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
  },
  {
    id: 2,
    name: "برجر باي",
    tags: "برجر • مقبلات • وجبات سريعة",
    address: "طريق بحر دير البلح",
    rating: 4.5,
    distance: "1.2 كم",
    time: "25-30 دقيقة",
    deliveryFee: "5 ₪",
    isNearest: false,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
  },
  {
    id: 3,
    name: "بيتزا روما",
    tags: "إيطالي • بيتزا • باستا",
    address: "ميدان المغازي الرئيسي",
    rating: 4.9,
    distance: "0.5 كم",
    time: "10-15 دقيقة",
    deliveryFee: "2 ₪",
    isNearest: true,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
  }
];

const RESTAURANTS_EXTENDED = [
  ...RESTAURANTS,
  {
    id: 4,
    name: "مطعم الشرقية",
    tags: "أكل عربي • مشاوي • مقبلات",
    address: "شارع الأقصى",
    rating: 4.7,
    distance: "2 كم",
    time: "30-35 دقيقة",
    deliveryFee: "4 ₪",
    isNearest: false,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
  },
  {
    id: 5,
    name: "كافيه الحصن",
    tags: "قهوة • حلويات • مشروبات",
    address: "طريق بحر شاطئ",
    rating: 4.6,
    distance: "1.5 كم",
    time: "15-20 دقيقة",
    deliveryFee: "3 ₪",
    isNearest: false,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
  },
  {
    id: 6,
    name: "مطعم السندس",
    tags: "دجاج • مشويات • أكل صحي",
    address: "ميدان النواصرة",
    rating: 4.8,
    distance: "0.9 كم",
    time: "20-25 دقيقة",
    deliveryFee: "2.5 ₪",
    isNearest: false,
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
  }
];

const CATEGORIES = ["الكل", "شاورما", "مشويات", "بيتزا", "برجر", "حلويات", "مشروبات", "أكل عربي"];

export default function Restaurants() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = RESTAURANTS_EXTENDED.filter(r =>
    r.name.includes(searchQuery) || r.tags.includes(searchQuery)
  );

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (isLoading) return <RestaurantsSkeleton />;

  return (
    <div className="bg-[#F8FAFC] relative flex flex-col w-full min-h-screen" dir="rtl">

      {/* شريط التطبيق العلوي متناسق مع شفافية البار */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 transition-all border-b border-[#bbcbba]/20 shadow-[0_2px_12px_rgba(0,109,52,0.02)] sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md h-14 sm:h-16">
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="transition-transform duration-200 active:scale-95 text-[#006d34]">
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
            <button className="absolute p-2 transition-colors duration-200 rounded-full left-3 text-[#7f8e7e] hover:bg-slate-50 active:scale-95">
              <span className="text-xl material-symbols-outlined">tune</span>
            </button>
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
              <h3 className="text-sm font-bold sm:text-base text-slate-800">موقع التوصيل الحالي: مخيم المغازي</h3>
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
              const isFav = favorites.includes(restaurant.id);
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
                        toggleFavorite(restaurant.id);
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

// 'use client';

// import { useState } from 'react';

// // بيانات تجريبية للمطاعم مترجمة للعربية
// const RESTAURANTS = [
//   {
//     id: 1,
//     name: "مطعم جنين",
//     tags: "شاورما • مشويات • سندويشات",
//     address: "شارع النصيرات الرئيسي",
//     rating: 4.8,
//     distance: "0.8 كم",
//     time: "15-20 دقيقة",
//     deliveryFee: "3 ₪",
//     isNearest: true,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
//   },
//   {
//     id: 2,
//     name: "برجر باي",
//     tags: "برجر • مقبلات • وجبات سريعة",
//     address: "طريق بحر دير البلح",
//     rating: 4.5,
//     distance: "1.2 كم",
//     time: "25-30 دقيقة",
//     deliveryFee: "5 ₪",
//     isNearest: false,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
//   },
//   {
//     id: 3,
//     name: "بيتزا روما",
//     tags: "إيطالي • بيتزا • باستا",
//     address: "ميدان المغازي الرئيسي",
//     rating: 4.9,
//     distance: "0.5 كم",
//     time: "10-15 دقيقة",
//     deliveryFee: "2 ₪",
//     isNearest: true,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
//   }
// ];

// // إضافة مطاعم إضافية لـ Demo على الشاشات الكبيرة
// const RESTAURANTS_EXTENDED = [
//   ...RESTAURANTS,
//   {
//     id: 4,
//     name: "مطعم الشرقية",
//     tags: "أكل عربي • مشاوي • مقبلات",
//     address: "شارع الأقصى",
//     rating: 4.7,
//     distance: "2 كم",
//     time: "30-35 دقيقة",
//     deliveryFee: "4 ₪",
//     isNearest: false,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
//   },
//   {
//     id: 5,
//     name: "كافيه الحصن",
//     tags: "قهوة • حلويات • مشروبات",
//     address: "طريق بحر شاطئ",
//     rating: 4.6,
//     distance: "1.5 كم",
//     time: "15-20 دقيقة",
//     deliveryFee: "3 ₪",
//     isNearest: false,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
//   },
//   {
//     id: 6,
//     name: "مطعم السندس",
//     tags: "دجاج • مشويات • أكل صحي",
//     address: "ميدان النواصرة",
//     rating: 4.8,
//     distance: "0.9 كم",
//     time: "20-25 دقيقة",
//     deliveryFee: "2.5 ₪",
//     isNearest: false,
//     isOpen: true,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
//     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
//   }
// ];

// const CATEGORIES = ["الكل", "شاورما", "مشويات", "بيتزا", "برجر", "حلويات", "مشروبات", "أكل عربي"];

// export default function Restaurants() {
//   const [activeCategory, setActiveCategory] = useState("الكل");
//   const [favorites, setFavorites] = useState<number[]>([2]);

//   const toggleFavorite = (id: number) => {
//     if (favorites.includes(id)) {
//       setFavorites(favorites.filter(favId => favId !== id));
//     } else {
//       setFavorites([...favorites, id]);
//     }
//   };

//   const restaurantsList = RESTAURANTS_EXTENDED;

//   return (
//     <div className="bg-[#F8FAFC] relative flex flex-col w-full min-h-screen" dir="rtl">

//       {/* شريط التطبيق العلوي */}
//       <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 transition-all border-b  border-[#bbcbba]/30shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:px-6 lg:px-8 bg-white h-14 sm:h-16">
//         <div className="flex items-center gap-3 sm:gap-4">
//           <button className="transition-transform duration-200 active:scale-95 text-primary">
//             <span className="text-xl transform rotate-180 sm:text-2xl material-symbols-outlined">arrow_back</span>
//           </button>
//           <h1 className="text-lg font-bold sm:text-xl lg:text-2xl text-slate-800">المطاعم</h1>
//         </div>
//         <button className="p-2 transition-colors duration-200 rounded-full active:scale-95 text-slate-500 hover:bg-slate-50">
//           <span className="text-xl sm:text-2xl material-symbols-outlined">search</span>
//         </button>
//       </header>

//       <main className="flex-1 w-full max-w-6xl mx-auto">

//         {/* قسم البحث */}
//         <section className="px-4 mt-4 sm:px-6 lg:px-8">
//           <div className="relative flex items-center w-full">
//             <span className="absolute text-xl material-symbols-outlined right-4 text-slate-400">search</span>
//             <input
//               className="w-full h-12 pl-12 pr-12 text-sm text-right transition-all duration-200 bg-white border shadow-sm outline-none border-slate-200/60 sm:text-base sm:h-14 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/10"
//               placeholder="ابحث عن مطعم أو وجبة..."
//               type="text"
//             />
//             <button className="absolute p-2 transition-colors duration-200 rounded-full left-3 text-slate-500 hover:bg-slate-50 active:scale-95">
//               <span className="text-xl material-symbols-outlined">tune</span>
//             </button>
//           </div>
//         </section>

//         {/* فئات التصنيف (التمرير الأفقي) */}
//         <section className="flex gap-2 px-4 mt-4 overflow-x-auto sm:px-6 lg:px-8 no-scrollbar scroll-smooth">
//           <div className="flex gap-2 py-1">
//             {CATEGORIES.map((category) => {
//               const isActive = activeCategory === category;
//               return (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-5 py-2 rounded-full font-medium text-xs sm:text-sm flex-shrink-0 transition-all border active:scale-95 ${
//                     isActive
//                       ? "bg-primary text-white border-primary shadow-sm shadow-primary/20 font-semibold"
//                       : "bg-white text-slate-600 border-slate-200/70 hover:bg-slate-50"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {/* قسم الموقع الحالي */}
//         <section className="px-4 mt-4 sm:px-6 lg:px-8">
//           <div className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
//             <span className="flex-shrink-0 text-xl material-symbols-outlined text-primary sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
//               location_on
//             </span>
//             <div className="flex-1">
//               <h3 className="text-sm font-bold sm:text-base text-slate-800">موقع التوصيل الحالي: مخيم المغازي</h3>
//               <p className="text-xs text-slate-500 mt-0.5">عرض المطاعم الأقرب لموقعك الحالي</p>
//             </div>
//           </div>
//         </section>

//         {/* قائمة المطاعم - Grid Layout احترافي وعالي التباين */}
//         <section className="px-4 pb-24 mt-6 sm:px-6 lg:px-8 sm:mt-8 lg:pb-12">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
//             {restaurantsList.map((restaurant) => {
//               const isFav = favorites.includes(restaurant.id);
//               return (
//                 <div
//                   key={restaurant.id}
//                   className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] group active:scale-[0.99] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.07)] hover:border-slate-200/80 cursor-pointer flex flex-col"
//                 >
//                   {/* صورة الغلاف */}
//                   <div className="relative w-full h-40 overflow-hidden sm:h-48">
//                     <div
//                       className="absolute inset-0 transition-transform duration-700 bg-center bg-cover group-hover:scale-105"
//                       style={{ backgroundImage: `url('${restaurant.image}')` }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

//                     {/* الشارات المرفقة */}
//                     <div className="absolute flex flex-wrap gap-1.5 top-3 right-3">
//                       {restaurant.isNearest && (
//                         <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">الأقرب</span>
//                       )}
//                       {restaurant.isOpen && (
//                         <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">مفتوح</span>
//                       )}
//                     </div>

//                     {/* زر المفضلة */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(restaurant.id);
//                       }}
//                       className="absolute flex items-center justify-center text-white transition-all rounded-full w-9 h-9 sm:w-10 sm:h-10 top-3 left-3 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-error hover:scale-105 active:scale-95"
//                     >
//                       <span
//                         className="text-xl transition-colors material-symbols-outlined"
//                         style={{ fontVariationSettings: `'FILL' ${isFav ? 1 : 0}` }}
//                       >
//                         favorite
//                       </span>
//                     </button>

//                     {/* شعار المطعم التراكبي بحواف محددة */}
//                     <div className="absolute z-10 w-12 h-12 overflow-hidden bg-white border-[3px] shadow-sm -bottom-5 right-4 sm:w-14 sm:h-14 rounded-xl border-white">
//                       <img className="object-cover w-full h-full" src={restaurant.logo} alt={restaurant.name} />
//                     </div>
//                   </div>

//                   {/* تفاصيل المطعم */}
//                   <div className="flex flex-col justify-between flex-1 p-4 pt-7 sm:p-5 sm:pt-8">
//                     <div className="flex items-start justify-between gap-2">
//                       <div className="flex-1 min-w-0">
//                         <h2 className="text-base font-bold truncate transition-colors sm:text-lg text-slate-800 group-hover:text-primary">{restaurant.name}</h2>
//                         <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">{restaurant.tags}</p>
//                         <p className="flex items-center gap-1 mt-2 text-xs truncate text-slate-400">
//                           <span className="flex-shrink-0 text-xs sm:text-sm material-symbols-outlined">location_on</span>
//                           <span className="truncate">{restaurant.address}</span>
//                         </p>
//                       </div>
//                       <div className="flex items-center flex-shrink-0 gap-0.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100">
//                         <span className="text-xs sm:text-sm material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//                         <span className="text-xs font-bold text-slate-700">{restaurant.rating}</span>
//                       </div>
//                     </div>

//                     {/* معلومات التوصيل والمسافة */}
//                     <div className="flex items-center justify-between pt-3 mt-4 text-[11px] sm:text-xs border-t border-slate-100 text-slate-500">
//                       <div className="flex items-center gap-1 px-2 py-1 border rounded-md bg-slate-50/60 border-slate-100/40">
//                         <span className="text-sm sm:text-base material-symbols-outlined text-slate-400">distance</span>
//                         <span>{restaurant.distance}</span>
//                       </div>
//                       <div className="flex items-center gap-1 px-2 py-1 border rounded-md bg-slate-50/60 border-slate-100/40">
//                         <span className="text-sm sm:text-base material-symbols-outlined text-slate-400">schedule</span>
//                         <span>{restaurant.time}</span>
//                       </div>
//                       <div className="flex items-center gap-1 px-2 py-1 border rounded-md bg-slate-50/60 border-slate-100/40">
//                         <span className="text-sm sm:text-base material-symbols-outlined text-slate-400">payments</span>
//                         <span className="font-medium text-slate-700">توصيل {restaurant.deliveryFee}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       </main>

//       {/* شريط التنقل السفلي الاحترافي ذو المظهر الزجاجي */}
//       <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 sm:h-18 bg-white/90 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.04)] border-t border-slate-200/50 max-w-md md:max-w-xl mx-auto md:rounded-t-2xl">
//         <a className="flex flex-col items-center justify-center px-4 py-1 transition-all text-slate-400 hover:text-primary active:scale-90" href="#">
//           <span className="text-xl sm:text-2xl material-symbols-outlined">home</span>
//           <span className="text-[10px] sm:text-xs mt-0.5">الرئيسية</span>
//         </a>
//         <a className="flex flex-col items-center justify-center px-4 py-1 text-white transition-all shadow-sm rounded-xl bg-primary shadow-primary/20 active:scale-90" href="#">
//           <span className="text-xl sm:text-2xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
//           <span className="text-[10px] sm:text-xs mt-0.5">الفئات</span>
//         </a>
//         <a className="flex flex-col items-center justify-center px-4 py-1 transition-all text-slate-400 hover:text-primary active:scale-90" href="#">
//           <span className="text-xl sm:text-2xl material-symbols-outlined">receipt_long</span>
//           <span className="text-[10px] sm:text-xs mt-0.5">الطلبات</span>
//         </a>
//         <a className="flex flex-col items-center justify-center px-4 py-1 transition-all text-slate-400 hover:text-primary active:scale-90" href="#">
//           <span className="text-xl sm:text-2xl material-symbols-outlined">person</span>
//           <span className="text-[10px] sm:text-xs mt-0.5">الحساب</span>
//         </a>
//       </nav>

//     </div>
//   );
// }


// // 'use client';

// // import { useState } from 'react';

// // // بيانات تجريبية للمطاعم مترجمة للعربية
// // const RESTAURANTS = [
// //   {
// //     id: 1,
// //     name: "مطعم جنين",
// //     tags: "شاورما • مشويات • سندويشات",
// //     address: "شارع النصيرات الرئيسي",
// //     rating: 4.8,
// //     distance: "0.8 كم",
// //     time: "15-20 دقيقة",
// //     deliveryFee: "3 ₪",
// //     isNearest: true,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
// //   },
// //   {
// //     id: 2,
// //     name: "برجر باي",
// //     tags: "برجر • مقبلات • وجبات سريعة",
// //     address: "طريق بحر دير البلح",
// //     rating: 4.5,
// //     distance: "1.2 كم",
// //     time: "25-30 دقيقة",
// //     deliveryFee: "5 ₪",
// //     isNearest: false,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
// //   },
// //   {
// //     id: 3,
// //     name: "بيتزا روما",
// //     tags: "إيطالي • بيتزا • باستا",
// //     address: "ميدان المغازي الرئيسي",
// //     rating: 4.9,
// //     distance: "0.5 كم",
// //     time: "10-15 دقيقة",
// //     deliveryFee: "2 ₪",
// //     isNearest: true,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
// //   }
// // ];

// // // إضافة مطاعم إضافية لـ Demo على الشاشات الكبيرة
// // const RESTAURANTS_EXTENDED = [
// //   ...RESTAURANTS,
// //   {
// //     id: 4,
// //     name: "مطعم الشرقية",
// //     tags: "أكل عربي • مشاوي • مقبلات",
// //     address: "شارع الأقصى",
// //     rating: 4.7,
// //     distance: "2 كم",
// //     time: "30-35 دقيقة",
// //     deliveryFee: "4 ₪",
// //     isNearest: false,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68"
// //   },
// //   {
// //     id: 5,
// //     name: "كافيه الحصن",
// //     tags: "قهوة • حلويات • مشروبات",
// //     address: "طريق بحر شاطئ",
// //     rating: 4.6,
// //     distance: "1.5 كم",
// //     time: "15-20 دقيقة",
// //     deliveryFee: "3 ₪",
// //     isNearest: false,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc"
// //   },
// //   {
// //     id: 6,
// //     name: "مطعم السندس",
// //     tags: "دجاج • مشويات • أكل صحي",
// //     address: "ميدان النواصرة",
// //     rating: 4.8,
// //     distance: "0.9 كم",
// //     time: "20-25 دقيقة",
// //     deliveryFee: "2.5 ₪",
// //     isNearest: false,
// //     isOpen: true,
// //     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
// //     logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM"
// //   }
// // ];

// // const CATEGORIES = ["الكل", "شاورما", "مشويات", "بيتزا", "برجر", "حلويات", "مشروبات", "أكل عربي"];

// // export default function Restaurants() {
// //   const [activeCategory, setActiveCategory] = useState("الكل");
// //   const [favorites, setFavorites] = useState<number[]>([2]);

// //   const toggleFavorite = (id: number) => {
// //     if (favorites.includes(id)) {
// //       setFavorites(favorites.filter(favId => favId !== id));
// //     } else {
// //       setFavorites([...favorites, id]);
// //     }
// //   };

// //   // اختيار البيانات حسب حجم الشاشة
// //   const restaurantsList = RESTAURANTS_EXTENDED;

// //   return (
// //     <div className=" bg-[#F8FAFC] relative flex flex-col w-full min-h-screen bg-surface" dir="rtl">

// //       {/* شريط التطبيق العلوي */}
// //       <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 transition-colors duration-200 shadow-sm sm:px-6 lg:px-8 bg-surface h-14 sm:h-16">
// //         <div className="flex items-center gap-3 sm:gap-4">
// //           <button className="transition-transform duration-200 active:scale-95 text-primary">
// //             <span className="text-xl transform rotate-180 sm:text-2xl material-symbols-outlined">arrow_back</span>
// //           </button>
// //           <h1 className="text-lg font-bold sm:text-xl lg:text-2xl text-primary">المطاعم</h1>
// //         </div>
// //         <button className="p-2 transition-colors duration-200 rounded-full active:scale-95 text-on-surface-variant hover:bg-surface-container-low">
// //           <span className="text-xl sm:text-2xl material-symbols-outlined">search</span>
// //         </button>
// //       </header>

// //       <main className="flex-1 w-full">
// //         {/* قسم البحث */}
// //         <section className="px-4 mt-3 sm:px-6 lg:px-8 sm:mt-4">
// //           <div className="relative flex items-center max-w-6xl mx-auto">
// //             <span className="absolute text-xl material-symbols-outlined right-3 sm:right-4 text-on-surface-variant">search</span>
// //             <input
// //               className="w-full pl-10 pr-10 text-sm text-right transition-all duration-200 border-none outline-none sm:pl-12 sm:pr-12 sm:text-base h-11 sm:h-14 bg-surface-container rounded-2xl focus:ring-2 focus:ring-primary"
// //               placeholder="ابحث عن مطعم أو وجبة..."
// //               type="text"
// //             />
// //             <button className="absolute p-2 transition-colors duration-200 rounded-full left-2 sm:left-3 text-on-surface-variant hover:bg-surface-container-low active:scale-95">
// //               <span className="text-xl material-symbols-outlined">tune</span>
// //             </button>
// //           </div>
// //         </section>

// //         {/* فئات التصنيف (التمرير الأفقي) */}
// //         <section className="flex gap-2 px-4 mt-3 overflow-x-auto sm:px-6 lg:px-8 sm:mt-4 no-scrollbar scroll-smooth">
// //           <div className="flex max-w-6xl gap-2 mx-auto">
// //             {CATEGORIES.map((category) => {
// //               const isActive = activeCategory === category;
// //               return (
// //                 <button
// //                   key={category}
// //                   onClick={() => setActiveCategory(category)}
// //                   className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm flex-shrink-0 transition-all active:scale-95 ${
// //                     isActive
// //                       ? "bg-primary-container text-on-primary-container shadow-sm"
// //                       : "bg-surface-container-highest text-on-surface-variant"
// //                   }`}
// //                 >
// //                   {category}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </section>

// //         {/* قسم الموقع الحالي */}
// //         <section className="px-4 mt-4 sm:px-6 lg:px-8 sm:mt-6">
// //           <div className="flex items-start max-w-6xl gap-2 p-3 mx-auto sm:gap-3 sm:p-4 bg-primary-container/10 rounded-2xl">
// //             <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0 text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
// //               location_on
// //             </span>
// //             <div className="flex-1">
// //               <h3 className="text-sm font-bold sm:text-base text-primary">موقع التوصيل الحالي: مخيم المغازي</h3>
// //               <p className="text-xs text-on-surface-variant mt-0.5">عرض المطاعم الأقرب لموقعك الحالي</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* قائمة المطاعم - Grid Layout محسّن */}
// //         <section className="px-4 pb-20 mt-6 sm:px-6 lg:px-8 sm:mt-8 sm:pb-24 lg:pb-8">
// //           <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
// //             {restaurantsList.map((restaurant) => {
// //               const isFav = favorites.includes(restaurant.id);
// //               return (
// //                 <div
// //                   key={restaurant.id}
// //                   className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] group active:scale-[0.99] transition-transform duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] cursor-pointer"
// //                 >
// //                   {/* صورة الغلاف */}
// //                   <div className="relative w-full h-40 overflow-hidden sm:h-48">
// //                     <div
// //                       className="absolute inset-0 transition-transform duration-500 bg-center bg-cover group-hover:scale-110"
// //                       style={{ backgroundImage: `url('${restaurant.image}')` }}
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

// //                     {/* الشارات المرفقة */}
// //                     <div className="absolute flex flex-wrap gap-1 sm:gap-2 top-2 sm:top-3 right-2 sm:right-3">
// //                       {restaurant.isNearest && (
// //                         <span className="bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg">الأقرب</span>
// //                       )}
// //                       {restaurant.isOpen && (
// //                         <span className="bg-white/90 backdrop-blur-md text-on-surface text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg">مفتوح</span>
// //                       )}
// //                     </div>

// //                     {/* زر المفضلة */}
// //                     <button
// //                       onClick={() => toggleFavorite(restaurant.id)}
// //                       className="absolute flex items-center justify-center text-white transition-colors rounded-full w-9 h-9 sm:w-10 sm:h-10 top-2 sm:top-3 left-2 sm:left-3 bg-black/20 backdrop-blur-md hover:bg-white hover:text-error"
// //                     >
// //                       <span
// //                         className={`material-symbols-outlined transition-colors text-xl`}
// //                         style={{ fontVariationSettings: `'FILL' ${isFav ? 1 : 0}` }}
// //                       >
// //                         favorite
// //                       </span>
// //                     </button>

// //                     {/* شعار المطعم التراكبي */}
// //                     <div className="absolute z-10 w-12 h-12 overflow-hidden bg-white border-4 shadow-md -bottom-5 sm:-bottom-6 right-3 sm:right-4 sm:w-14 sm:h-14 rounded-2xl border-surface-container-lowest">
// //                       <img className="object-cover w-full h-full" src={restaurant.logo} alt={restaurant.name} />
// //                     </div>
// //                   </div>

// //                   {/* تفاصيل المطعم */}
// //                   <div className="p-3 pt-6 sm:p-4 sm:pt-8">
// //                     <div className="flex items-start justify-between gap-2">
// //                       <div className="flex-1 min-w-0">
// //                         <h2 className="text-base font-bold truncate sm:text-lg text-on-surface">{restaurant.name}</h2>
// //                         <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 line-clamp-2">{restaurant.tags}</p>
// //                         <p className="flex items-center gap-1 mt-1 text-xs truncate text-on-surface-variant">
// //                           <span className="flex-shrink-0 text-xs sm:text-sm material-symbols-outlined">location_on</span>
// //                           <span className="truncate">{restaurant.address}</span>
// //                         </p>
// //                       </div>
// //                       <div className="flex items-center flex-shrink-0 gap-1 px-2 py-1 rounded-lg bg-surface-container-low">
// //                         <span className="text-xs sm:text-sm material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
// //                         <span className="text-xs font-bold text-on-surface">{restaurant.rating}</span>
// //                       </div>
// //                     </div>

// //                     {/* معلومات التوصيل والمسافة */}
// //                     <div className="flex flex-col gap-2 pt-3 mt-3 text-xs border-t sm:flex-row sm:items-center sm:gap-3 sm:pt-4 sm:mt-4 text-on-surface-variant border-outline-variant">
// //                       <div className="flex items-center gap-1">
// //                         <span className="flex-shrink-0 text-sm sm:text-base material-symbols-outlined">distance</span>
// //                         <span className="truncate">{restaurant.distance}</span>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         <span className="flex-shrink-0 text-sm sm:text-base material-symbols-outlined">schedule</span>
// //                         <span className="truncate">{restaurant.time}</span>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         <span className="flex-shrink-0 text-sm sm:text-base material-symbols-outlined">payments</span>
// //                         <span className="truncate">توصيل {restaurant.deliveryFee}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </section>
// //       </main>



// //     </div>
// //   );
// // }

