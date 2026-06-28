'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import StoreDetailsSkeleton from "@/components/skeletons/StoreDetailsSkeleton";
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { STORE_CATEGORIES, BEST_SELLERS, ALL_PRODUCTS } from "@/lib/data";



export default function StoreDetails() {
  const params = useParams<{ storeId: string }>();
  const router = useRouter();
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'مخبز الموقد الذهبي | دري فري';
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const { isFavorite: isWishlisted, toggleItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const storeId = params.storeId;

  const handleAddToCart = (product: { id: number; name: string; price: number; image: string }) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      meta: 'مخبز الموقد الذهبي',
    });
  };

  // مراقبة التمرير لتغيير خلفية الهيدر العلوي ديناميكياً لتأثير زجاجي متناسق
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <StoreDetailsSkeleton />;

  return (
    <div className="bg-[#F8FAFC] relative flex flex-col w-full min-h-screen font-cairo" dir="rtl">

      {/* الهيدر العلوي العائم - محاكي لشفافية البار الخاص بك */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 h-16 flex justify-between items-center w-full max-w-6xl mx-auto ${
        isHeaderActive ? 'bg-white/95 backdrop-blur-xl border-b border-[#bbcbba]/20 shadow-[0_4px_20px_rgba(0,109,52,0.03)]' : 'bg-transparent'
      }`}>
        <Link href="/Restaurants" className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-[#006d34] hover:bg-white active:scale-95 border border-[#bbcbba]/20">
          <span className="text-2xl transform rotate-180 material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex gap-2">
          <button className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-[#7f8e7e] hover:bg-white active:scale-95 border border-[#bbcbba]/20 hover:text-[#006d34]">
            <span className="text-xl material-symbols-outlined">share</span>
          </button>
          <button
            onClick={() => toggleItem({ id: Number(params.storeId), name: 'مخبز الموقد الذهبي', image: BEST_SELLERS[0]?.image || '', price: '' })}
            className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm active:scale-95 border border-[#bbcbba]/20 hover:bg-white"
          >
            <span
              className={`material-symbols-outlined text-xl transition-colors ${isWishlisted(Number(params.storeId)) ? 'text-red-500' : 'text-[#7f8e7e]'}`}
              style={{ fontVariationSettings: `'FILL' ${isWishlisted(Number(params.storeId)) ? 1 : 0}` }}
            >
              favorite
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl pb-40 mx-auto">

        {/* واجهة البانر الإعلاني للمتجر */}
        <section className="relative h-[240px] sm:h-[300px] w-full overflow-hidden">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url('${BEST_SELLERS[0].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* شعار المتجر الدائري المتداخل والمصمم بحواف متناسقة [18px] */}
          <div className="absolute z-10 -bottom-6 right-4 sm:right-6">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 p-2 overflow-hidden bg-white border-4 rounded-[20px] shadow-md border-white">
              <img className="object-contain w-full h-full rounded-[12px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLSDbm_tVG1fsHBL7EOZFxy7eBLzZcNtPiHqO98alGT2oVATgz3eIPa4LGdrLCNTKlKEHeSZ8G3HRsHu3nOW0CWWmrST16B4-jVS4DTOK_8Sl71B45y_40L3KV4Egfq7UIyOGamEABnanHTlz94VE7QbYeDOCvsMeDNKIY8gIl9g1kfWqOX1lzEnD-WU43DbhmEpsLyN0g_5cuBxcAtW0MvlvQYT0Uijnm8yJK7tM4A3kFsJYE9HltCezmN1IQiqpHujcyCUBf6Es" alt="شعار المخبز" />
            </div>
          </div>
        </section>

        {/* بيانات المتجر ومقاييس الجودة بالألوان الخضراء والزيتونية المقترحة */}
        <section className="px-4 mt-10 sm:px-6">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold sm:text-2xl text-slate-800">مخبز الموقد الذهبي</h1>
            <span className="material-symbols-outlined text-[#006d34] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#7f8e7e] font-medium">مخبز ومقهى • خبز مخمر طازج • معجنات وحلويات فاخرة</p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#7f8e7e]">
            <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[8px]">
              <span className="material-symbols-outlined text-[#006d34] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-slate-800">4.9</span>
              <span className="text-[11px] text-[#7f8e7e]/80">(١,٢٤٥ تقييم)</span>
            </div>
            <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[8px]">
              <span className="material-symbols-outlined text-[16px]">distance</span>
              <span className="font-bold text-slate-800">١.٢ كم</span>
            </div>
            <div className="bg-[#00d26a]/10 text-[#006d34] px-2.5 py-0.5 rounded-[8px] font-bold text-[11px] border border-[#00d26a]/20">
              مفتوح الآن
            </div>
          </div>

          <div className="flex gap-4 py-3 mt-5 text-center border-y border-[#bbcbba]/20">
            <div className="flex-1">
              <p className="text-[11px] text-[#7f8e7e] font-medium">وقت التوصيل</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">١٥-٢٥ دقيقة</p>
            </div>
            <div className="w-[1px] bg-[#bbcbba]/20" />
            <div className="flex-1">
              <p className="text-[11px] text-[#7f8e7e] font-medium">رسوم التوصيل</p>
              <p className="text-sm font-bold text-[#006d34] mt-0.5">٥.٠0 ₪</p>
            </div>
          </div>
        </section>

        {/* شريط البحث الداخلي المحدث بحواف [24px] متناسقة */}
        <section className="px-4 mt-6 sm:px-6">
          <div className="relative flex items-center w-full max-w-md">
            <span className="absolute text-xl material-symbols-outlined right-4 text-[#7f8e7e]">search</span>
            <input
              className="w-full pl-4 pr-12 text-sm text-right transition-all duration-200 border border-[#bbcbba]/30 outline-none h-12 bg-white rounded-[24px] focus:border-[#006d34] focus:ring-4 focus:ring-[#00d26a]/10 shadow-[0_4px_20px_rgba(0,109,52,0.01)]"
              placeholder="ابحث داخل مخبز الموقد الذهبي..."
              type="text"
            />
          </div>
        </section>

        {/* العروض الترويجية والخصومات بلمسة خضراء مضيئة خفيفة */}
        <section className="px-4 mt-6 sm:px-6">
          <div className="flex items-center justify-between p-4 border bg-[#00d26a]/5 border-[#00d26a]/10 rounded-[24px] max-w-md">
            <div className="flex items-center min-w-0 gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#00d26a]/10 rounded-[14px] text-[#006d34] flex-shrink-0">
                <span className="material-symbols-outlined">local_offer</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate text-slate-800 sm:text-sm">اشترِ ٢ واحصل على ١ مجاناً</h4>
                <p className="text-[11px] text-[#7f8e7e] mt-0.5 truncate">يسري العرض على كافة المعجنات الطازجة اليوم</p>
              </div>
            </div>
            <button className="text-xs font-bold transition-all text-[#006d34] hover:text-[#00d26a] mr-2 flex-shrink-0 active:scale-95 bg-white border border-[#bbcbba]/30 px-3 py-1.5 rounded-[12px] shadow-sm">تفعيل</button>
          </div>
        </section>

        {/* أشرطة الفئات وقوائم التنقل الأفقية (متناسقة مع شريط التصنيفات النشط) */}
        <section className="w-full mt-6 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex gap-2 px-4 py-1 sm:px-6">
            {STORE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-[18px] text-xs sm:text-sm font-medium transition-all border active:scale-95 ${
                    isActive
                      ? "bg-[#006d34] text-white border-[#006d34] shadow-md shadow-[#006d34]/15 font-semibold"
                      : "bg-white text-[#7f8e7e] border-[#bbcbba]/30 hover:bg-slate-50 hover:text-[#006d34]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* قسم الأكثر مبيعاً (Carousel أفقي) */}
        <section className="mt-6">
          <div className="flex items-end justify-between px-4 mb-4 sm:px-6">
            <h2 className="text-sm font-bold sm:text-base text-slate-800">الأكثر مبيعاً 🔥</h2>
            <button className="text-xs font-bold text-[#006d34] hover:text-[#00d26a]">عرض الكل</button>
          </div>
          <div className="flex gap-4 px-4 pb-3 overflow-x-auto no-scrollbar sm:px-6">
            {BEST_SELLERS.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/ProductDetailsPage/${item.id}?storeId=${storeId}`)}
                className="min-w-[190px] bg-white rounded-[24px] shadow-[0px_6px_24px_rgba(0,109,52,0.02)] overflow-hidden flex-shrink-0 border border-[#bbcbba]/20 group transition-all duration-300 hover:shadow-[0px_10px_32px_rgba(0,109,52,0.05)] cursor-pointer"
              >
                <div className="relative w-full h-32">
                  <div className="w-full h-full transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${item.image}')` }} />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleItem({ id: item.id, name: item.name, image: item.image, price: item.priceDisplay || '', storeName: 'مخبز الموقد الذهبي' }); }}
                    className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:scale-90 transition-all"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${isWishlisted(item.id) ? 'text-red-500' : 'text-[#7f8e7e]'}`}
                      style={{ fontVariationSettings: `'FILL' ${isWishlisted(item.id) ? 1 : 0}` }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-3.5">
                  <h5 className="text-xs font-bold truncate text-slate-800 group-hover:text-[#006d34] transition-colors">{item.name}</h5>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#006d34]">{item.priceDisplay}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                      className="flex items-center justify-center w-8 h-8 transition-all rounded-full shadow-sm bg-[#00d26a]/15 text-[#006d34] hover:bg-[#006d34] hover:text-white active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* شبكة كافة المنتجات المتاحة بتجاوب كامل */}
        <section className="px-4 mt-8 sm:px-6">
          <h2 className="mb-4 text-sm font-bold sm:text-base text-slate-800">جميع المنتجات</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ALL_PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/ProductDetailsPage/${product.id}?storeId=${storeId}`)}
                className="bg-white rounded-[24px] shadow-[0px_6px_24px_rgba(0,109,52,0.02)] overflow-hidden border border-[#bbcbba]/20 group transition-all duration-300 hover:shadow-[0px_10px_32px_rgba(0,109,52,0.05)] flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-36">
                    <div className="w-full h-full transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${product.image}')` }} />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleItem({ id: product.id, name: product.name, image: product.image, price: product.priceDisplay || '', storeName: 'مخبز الموقد الذهبي' }); }}
                      className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:scale-90 transition-all"
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${isWishlisted(product.id) ? 'text-red-500' : 'text-[#7f8e7e]'}`}
                        style={{ fontVariationSettings: `'FILL' ${isWishlisted(product.id) ? 1 : 0}` }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-3.5 pb-0">
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#006d34] transition-colors line-clamp-2 min-h-[32px]">{product.name}</h5>
                    <div className="flex items-center gap-0.5 mt-1 bg-slate-50 w-fit px-1.5 py-0.5 rounded-[6px] border border-slate-100">
                      <span className="material-symbols-outlined text-[#006d34] text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[11px] text-slate-700 font-bold">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 pt-2">
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-[#006d34]">{product.priceDisplay}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="flex items-center justify-center transition-all rounded-full shadow-sm w-9 h-9 bg-[#00d26a]/15 text-[#006d34] hover:bg-[#006d34] hover:text-white active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* معلومات التواصل والمراجعات الحالية */}
        <section className="max-w-md px-4 mt-8 space-y-4 sm:px-6 md:max-w-full">
          <h3 className="text-sm font-bold sm:text-base text-slate-800">معلومات المتجر</h3>
          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 text-slate-700">
            <div className="flex gap-3 p-3.5 bg-white border border-[#bbcbba]/20 rounded-[18px]">
              <span className="text-lg material-symbols-outlined text-[#006d34]">location_on</span>
              <div>
                <p className="font-bold text-slate-800">شارع الحرفيين، الحي الشرقي</p>
                <p className="text-[#7f8e7e] mt-0.5">غزة، فلسطين</p>
              </div>
            </div>
            <div className="flex gap-3 p-3.5 bg-white border border-[#bbcbba]/20 rounded-[18px]">
              <span className="text-lg material-symbols-outlined text-[#006d34]">schedule</span>
              <div>
                <p className="font-bold text-slate-800">مفتوح يومياً: ٠٧:٠٠ ص - ٠٨:٠٠ م</p>
                <p className="text-[#006d34] font-medium mt-0.5">ساعات الذروة: ٠٩:٠٠ ص - ١١:٠٠ ص</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#bbcbba]/10 border border-[#bbcbba]/20 rounded-[24px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800">آخر الآراء والتقييمات</h4>
              <button className="text-xs font-bold text-[#006d34]">عرض الكل</button>
            </div>
            <div className="space-y-1">
              <p className="text-xs italic leading-relaxed text-slate-700">"أفضل خبز مخمر في المدينة على الإطلاق! التوصيل كان سريعاً جداً ووصلت المخبوزات وهي لا تزال دافئة وهشة."</p>
              <p className="text-[10px] text-[#7f8e7e] text-left font-medium">— سارة m.، منذ يومين</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// // فئات المنتجات المتاحة في المخبز
// const CATEGORIES = ["الكل", "خبز طازج", "معجنات", "كيك وحلويات", "وجبات الإفطار"];

// // قائمة المنتجات الأكثر مبيعاً
// const BEST_SELLERS = [
//   { id: 1, name: "رغيف خبز العجينة الحامضة (Sourdough)", price: "15.50 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfe7mEciDkjs1aMLK75UiCgJIVMT8iNYchGu2ZcP5fpLgg2PmoOu6ZiPCpS7S7Kr-t81JJbNEwlCrkAfmVmUzrZiEcwUs_wNUVfLSJz1t2JCHIOqRZcr8wRDyQ890yBCLvXURCe4ChrSKY-1KwHDcz_CE0zDEEPYz2vGFrtVIz9mK4K43Pn95AYamQ0HajNcT56ZGevE_DUWLj3-kXdMBTET8Jvv3SRPaqMEXijIICukRN1EgaNHY_Yf8pxFcJN0tHOcJyZk6v9os" },
//   { id: 2, name: "كرواسون اللوز المقرمش", price: "11.00 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbO-5qv342WdqFhw7PJ2Fylg5bcTU06A7mlTaibuqEAQ0iaBxkW-0XuuuMZgkTv5_8vDDCsgHkB6fYE3XvhoGp-wEB5OnGBZYX7-YNWkWHwpt4S0sq6sp9FseyM-XGTZ6Y0JXu6yaTkUScWKkPXNUhi0phngNd235Zu5SPu9o4moV8TFEXUYx3oc9bV96qsqTVuSDPGl8n58NUA4bhHkxP_LaTJeNO9Wrs_VzfIWAUkKzSZTT4KdVjCuQkoiyuzu-iwiYeQVPvxFc" },
//   { id: 3, name: "مافن التوت الأزرق (Blueberry)", price: "9.50 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFfbil7A3IhAIfda5Al2RzVNp9EzK-Wkf9MnTwp_dYrC-syCVvKGEXWzbtGD2A6B7Lup1QASEru5eNQFfsp0B_6p-jQ87V1XPro08lGPP7OCNKvnNM1pQfeOAAaEA52PXPWyQOGHaJR5nTifcNDK4J1RBjwmCG-MSeAZN1WCJp4wva-45_GKb1xNuqAay12aDuyDMT46KLOKTx5yIMINXGhQg9I9CPHag6kl-CqLOALoHOxVl5ZkhCCU1Zxgd0PaxCbGw5dBIU6F4" },
// ];

// // قائمة كافة المنتجات المعروضة في الشبكة
// const ALL_PRODUCTS = [
//   { id: 4, name: "كوكيز بقطع الشوكولاتة الداكنة", price: "18.00 ₪", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkAI0iAfnxSqiIyFYE-yEUBrVdjt7Jikde2zejZHWn4Xgu96peFxx71KFETRLNGNIHfbtxKc4s9PlEmCnPZ7jm3OaGUDBAA06BNROnDagrB0-zRAx_kopWQhrqJjq7bJ6eXyxli69KfUuIDd361DEAvHb0Pdu-VgXRuI3C9-bUXMzS8hp-qzCMgZWgcZhacg2QuOjDmlbgC7oPbp0CmGcTq8btnSxOxW2UDy8pH2CbzHHPQv87v_pMVSsaUv_JXmOT5wZS-6CWb8" },
//   { id: 5, name: "باجيت فرنسي طازج", price: "8.50 ₪", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBmqRwbR-yvv5gAv52wc9pq2_SEdjIGPIUVioM_piKkZiDBaFM2o3-GPHwJgkurQD07KaT0ith7ZT-M9sQw_R-94premis0iONcqmT-NmVCgfaRwOI03AHFGfcT9_hGtKQHFUVsLK-y3vpMUrhayveu5IdPYBhN8ZCiC2cd05vo-9b748gBFv5Cv9CiiC8Dzp4Y5nHzaNkGgdxJXui_4w8BoF8AlEOfHONpV7XbxFVJVGWcoX5N8MEY2v216sTnl1cV3TC5jjXzBo" },
//   { id: 6, name: "تارت الليمون المنعش", price: "13.50 ₪", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPBDCWtbMvAE-OORAI_z9n71CazFxkHJgn8TTir5FSUAhyZYWb9D_StNGiL0bK7RbdsMEmGZASFP4GKc_EuhHo-qIRXGMHp-q5YrsP92i1nyWtt5MXXgwiwOZX9-geT8vVObPCrVhLJYsJVN3HrmiiAAYOJDAsb6zhHOd0uUcdaTjjhp9p8OLDxcwEz-tSsY1u_9om77TaRT7B936NQMcdaovGImCoXXAWs0bEEy1HAPPiYTpghM-gtPDQ6p84j7CF8ZiEKRH43II" },
//   { id: 7, name: "لاتيه مثلج بحليب الشوفان", price: "14.00 ₪", rating: 4.6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkkuJ_GCCmwZaWkPj-CjE7b8vde9IwgHB2CX6M2PptwFoCfzIHyiEkump_iWVRMkoMrCca1tLyOY3tplrNNvOYOI4PdYj3r-CyQqql6Vnlg_49WqjFJCAA_-iIeJQOj2bSV-DA3-0huX77ajNFw-79wx03u-RNMoS9p1nkVkm4HoKjx16CGKtxKvZYN4yi-DtDwDBzWwheuWgMS6bMceEr8bCaEmZ7DflkOwII9HmRmvhMJnySogzdUCZJLxdQRXIL0Qouc4I7zpg" },
// ];

// export default function StoreDetails() {
//   const [isHeaderActive, setIsHeaderActive] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("الكل");
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [cartCount, setCartCount] = useState(2);
//   const [totalPrice, setTotalPrice] = useState("42.50 ₪");

//   // مراقبة التمرير لتغيير خلفية الهيدر العلوي ديناميكياً لتأثير زجاجي متناسق
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 120) {
//         setIsHeaderActive(true);
//       } else {
//         setIsHeaderActive(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="bg-[#F8FAFC] relative flex flex-col w-full min-h-screen font-sans" dir="rtl">

//       {/* الهيدر العلوي العائم - محاكي لشفافية البار الخاص بك */}
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 h-16 flex justify-between items-center w-full max-w-6xl mx-auto ${
//         isHeaderActive ? 'bg-white/95 backdrop-blur-xl border-b border-[#bbcbba]/20 shadow-[0_4px_20px_rgba(0,109,52,0.03)]' : 'bg-transparent'
//       }`}>
//         <Link href="/Restaurants" className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-[#006d34] hover:bg-white active:scale-95 border border-[#bbcbba]/20">
//           <span className="text-2xl transform rotate-180 material-symbols-outlined">arrow_back</span>
//         </Link>
//         <div className="flex gap-2">
//           <button className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-[#7f8e7e] hover:bg-white active:scale-95 border border-[#bbcbba]/20 hover:text-[#006d34]">
//             <span className="text-xl material-symbols-outlined">share</span>
//           </button>
//           <button
//             onClick={() => setIsFavorite(!isFavorite)}
//             className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm active:scale-95 border border-[#bbcbba]/20 hover:bg-white"
//           >
//             <span
//               className={`material-symbols-outlined text-xl transition-colors ${isFavorite ? 'text-red-500' : 'text-[#7f8e7e]'}`}
//               style={{ fontVariationSettings: `'FILL' ${isFavorite ? 1 : 0}` }}
//             >
//               favorite
//             </span>
//           </button>
//         </div>
//       </header>

//       <main className="flex-1 w-full max-w-5xl pb-40 mx-auto">

//         {/* واجهة البانر الإعلاني للمتجر */}
//         <section className="relative h-[240px] sm:h-[300px] w-full overflow-hidden">
//           <div
//             className="w-full h-full bg-center bg-cover"
//             style={{ backgroundImage: `url('${BEST_SELLERS[0].image}')` }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

//           {/* شعار المتجر الدائري المتداخل والمصمم بحواف متناسقة [18px] */}
//           <div className="absolute z-10 -bottom-6 right-4 sm:right-6">
//             <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 p-2 overflow-hidden bg-white border-4 rounded-[20px] shadow-md border-white">
//               <img className="object-contain w-full h-full rounded-[12px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLSDbm_tVG1fsHBL7EOZFxy7eBLzZcNtPiHqO98alGT2oVATgz3eIPa4LGdrLCNTKlKEHeSZ8G3HRsHu3nOW0CWWmrST16B4-jVS4DTOK_8Sl71B45y_40L3KV4Egfq7UIyOGamEABnanHTlz94VE7QbYeDOCvsMeDNKIY8gIl9g1kfWqOX1lzEnD-WU43DbhmEpsLyN0g_5cuBxcAtW0MvlvQYT0Uijnm8yJK7tM4A3kFsJYE9HltCezmN1IQiqpHujcyCUBf6Es" alt="شعار المخبز" />
//             </div>
//           </div>
//         </section>

//         {/* بيانات المتجر ومقاييس الجودة بالألوان الخضراء والزيتونية المقترحة */}
//         <section className="px-4 mt-10 sm:px-6">
//           <div className="flex items-center gap-1.5">
//             <h1 className="text-xl font-bold sm:text-2xl text-slate-800">مخبز الموقد الذهبي</h1>
//             <span className="material-symbols-outlined text-[#006d34] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
//               verified
//             </span>
//           </div>
//           <p className="mt-1 text-xs sm:text-sm text-[#7f8e7e] font-medium">مخبز ومقهى • خبز مخمر طازج • معجنات وحلويات فاخرة</p>

//           <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#7f8e7e]">
//             <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[8px]">
//               <span className="material-symbols-outlined text-[#006d34] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//               <span className="font-bold text-slate-800">4.9</span>
//               <span className="text-[11px] text-[#7f8e7e]/80">(١,٢٤٥ تقييم)</span>
//             </div>
//             <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[8px]">
//               <span className="material-symbols-outlined text-[16px]">distance</span>
//               <span className="font-bold text-slate-800">١.٢ كم</span>
//             </div>
//             <div className="bg-[#00d26a]/10 text-[#006d34] px-2.5 py-0.5 rounded-[8px] font-bold text-[11px] border border-[#00d26a]/20">
//               مفتوح الآن
//             </div>
//           </div>

//           <div className="flex gap-4 py-3 mt-5 text-center border-y border-[#bbcbba]/20">
//             <div className="flex-1">
//               <p className="text-[11px] text-[#7f8e7e] font-medium">وقت التوصيل</p>
//               <p className="text-sm font-bold text-slate-800 mt-0.5">١٥-٢٥ دقيقة</p>
//             </div>
//             <div className="w-[1px] bg-[#bbcbba]/20" />
//             <div className="flex-1">
//               <p className="text-[11px] text-[#7f8e7e] font-medium">رسوم التوصيل</p>
//               <p className="text-sm font-bold text-[#006d34] mt-0.5">٥.٠0 ₪</p>
//             </div>
//           </div>
//         </section>

//         {/* شريط البحث الداخلي المحدث بحواف [24px] متناسقة */}
//         <section className="px-4 mt-6 sm:px-6">
//           <div className="relative flex items-center w-full max-w-md">
//             <span className="absolute text-xl material-symbols-outlined right-4 text-[#7f8e7e]">search</span>
//             <input
//               className="w-full pl-4 pr-12 text-sm text-right transition-all duration-200 border border-[#bbcbba]/30 outline-none h-12 bg-white rounded-[24px] focus:border-[#006d34] focus:ring-4 focus:ring-[#00d26a]/10 shadow-[0_4px_20px_rgba(0,109,52,0.01)]"
//               placeholder="ابحث داخل مخبز الموقد الذهبي..."
//               type="text"
//             />
//           </div>
//         </section>

//         {/* العروض الترويجية والخصومات بلمسة خضراء مضيئة خفيفة */}
//         <section className="px-4 mt-6 sm:px-6">
//           <div className="flex items-center justify-between p-4 border bg-[#00d26a]/5 border-[#00d26a]/10 rounded-[24px] max-w-md">
//             <div className="flex items-center min-w-0 gap-3">
//               <div className="flex items-center justify-center w-10 h-10 bg-[#00d26a]/10 rounded-[14px] text-[#006d34] flex-shrink-0">
//                 <span className="material-symbols-outlined">local_offer</span>
//               </div>
//               <div className="min-w-0">
//                 <h4 className="text-xs font-bold truncate text-slate-800 sm:text-sm">اشترِ ٢ واحصل على ١ مجاناً</h4>
//                 <p className="text-[11px] text-[#7f8e7e] mt-0.5 truncate">يسري العرض على كافة المعجنات الطازجة اليوم</p>
//               </div>
//             </div>
//             <button className="text-xs font-bold transition-all text-[#006d34] hover:text-[#00d26a] mr-2 flex-shrink-0 active:scale-95 bg-white border border-[#bbcbba]/30 px-3 py-1.5 rounded-[12px] shadow-sm">تفعيل</button>
//           </div>
//         </section>

//         {/* أشرطة الفئات وقوائم التنقل الأفقية (متناسقة مع شريط التصنيفات النشط) */}
//         <section className="w-full mt-6 overflow-x-auto no-scrollbar scroll-smooth">
//           <div className="flex gap-2 px-4 py-1 sm:px-6">
//             {CATEGORIES.map((cat) => {
//               const isActive = activeCategory === cat;
//               return (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`whitespace-nowrap px-5 py-2 rounded-[18px] text-xs sm:text-sm font-medium transition-all border active:scale-95 ${
//                     isActive
//                       ? "bg-[#006d34] text-white border-[#006d34] shadow-md shadow-[#006d34]/15 font-semibold"
//                       : "bg-white text-[#7f8e7e] border-[#bbcbba]/30 hover:bg-slate-50 hover:text-[#006d34]"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {/* قسم الأكثر مبيعاً (Carousel أفقي) */}
//         <section className="mt-6">
//           <div className="flex items-end justify-between px-4 mb-4 sm:px-6">
//             <h2 className="text-sm font-bold sm:text-base text-slate-800">الأكثر مبيعاً 🔥</h2>
//             <button className="text-xs font-bold text-[#006d34] hover:text-[#00d26a]">عرض الكل</button>
//           </div>
//           <div className="flex gap-4 px-4 pb-3 overflow-x-auto no-scrollbar sm:px-6">
//             {BEST_SELLERS.map((item) => (
//               <div key={item.id} className="min-w-[190px] bg-white rounded-[24px] shadow-[0px_6px_24px_rgba(0,109,52,0.02)] overflow-hidden flex-shrink-0 border border-[#bbcbba]/20 group transition-all duration-300 hover:shadow-[0px_10px_32px_rgba(0,109,52,0.05)]">
//                 <div className="w-full h-32 transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${item.image}')` }} />
//                 <div className="p-3.5">
//                   <h5 className="text-xs font-bold truncate text-slate-800 group-hover:text-[#006d34] transition-colors">{item.name}</h5>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="text-sm font-bold text-[#006d34]">{item.price}</span>
//                     <button className="flex items-center justify-center w-8 h-8 transition-all rounded-full shadow-sm bg-[#00d26a]/15 text-[#006d34] hover:bg-[#006d34] hover:text-white active:scale-90">
//                       <span className="material-symbols-outlined text-[18px]">add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* شبكة كافة المنتجات المتاحة بتجاوب كامل */}
//         <section className="px-4 mt-8 sm:px-6">
//           <h2 className="mb-4 text-sm font-bold sm:text-base text-slate-800">جميع المنتجات</h2>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//             {ALL_PRODUCTS.map((product) => (
//               <div key={product.id} className="bg-white rounded-[24px] shadow-[0px_6px_24px_rgba(0,109,52,0.02)] overflow-hidden border border-[#bbcbba]/20 group transition-all duration-300 hover:shadow-[0px_10px_32px_rgba(0,109,52,0.05)] flex flex-col justify-between">
//                 <div>
//                   <div className="w-full transition-transform duration-500 bg-center bg-cover h-36 group-hover:scale-102" style={{ backgroundImage: `url('${product.image}')` }} />
//                   <div className="p-3.5 pb-0">
//                     <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#006d34] transition-colors line-clamp-2 min-h-[32px]">{product.name}</h5>
//                     <div className="flex items-center gap-0.5 mt-1 bg-slate-50 w-fit px-1.5 py-0.5 rounded-[6px] border border-slate-100">
//                       <span className="material-symbols-outlined text-[#006d34] text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//                       <span className="text-[11px] text-slate-700 font-bold">{product.rating}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-3.5 pt-2">
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-sm font-bold text-[#006d34]">{product.price}</span>
//                     <button className="flex items-center justify-center transition-all rounded-full shadow-sm w-9 h-9 bg-[#00d26a]/15 text-[#006d34] hover:bg-[#006d34] hover:text-white active:scale-90">
//                       <span className="material-symbols-outlined text-[20px]">add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* معلومات التواصل والمراجعات الحالية */}
//         <section className="max-w-md px-4 mt-8 space-y-4 sm:px-6 md:max-w-full">
//           <h3 className="text-sm font-bold sm:text-base text-slate-800">معلومات المتجر</h3>
//           <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 text-slate-700">
//             <div className="flex gap-3 p-3.5 bg-white border border-[#bbcbba]/20 rounded-[18px]">
//               <span className="text-lg material-symbols-outlined text-[#006d34]">location_on</span>
//               <div>
//                 <p className="font-bold text-slate-800">شارع الحرفيين، الحي الشرقي</p>
//                 <p className="text-[#7f8e7e] mt-0.5">غزة، فلسطين</p>
//               </div>
//             </div>
//             <div className="flex gap-3 p-3.5 bg-white border border-[#bbcbba]/20 rounded-[18px]">
//               <span className="text-lg material-symbols-outlined text-[#006d34]">schedule</span>
//               <div>
//                 <p className="font-bold text-slate-800">مفتوح يومياً: ٠٧:٠٠ ص - ٠٨:٠٠ م</p>
//                 <p className="text-[#006d34] font-medium mt-0.5">ساعات الذروة: ٠٩:٠٠ ص - ١١:٠٠ ص</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 bg-[#bbcbba]/10 border border-[#bbcbba]/20 rounded-[24px]">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-xs font-bold text-slate-800">آخر الآراء والتقييمات</h4>
//               <button className="text-xs font-bold text-[#006d34]">عرض الكل</button>
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs italic leading-relaxed text-slate-700">"أفضل خبز مخمر في المدينة على الإطلاق! التوصيل كان سريعاً جداً ووصلت المخبوزات وهي لا تزال دافئة وهشة."</p>
//               <p className="text-[10px] text-[#7f8e7e] text-left font-medium">— سارة m.، منذ يومين</p>
//             </div>
//           </div>
//         </section>
//       </main>


//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';

// // فئات المنتجات المتاحة في المخبز
// const CATEGORIES = ["الكل", "خبز طازج", "معجنات", "كيك وحلويات", "وجبات الإفطار"];

// // قائمة المنتجات الأكثر مبيعاً
// const BEST_SELLERS = [
//   { id: 1, name: "رغيف خبز العجينة الحامضة (Sourdough)", price: "₪15.50", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfe7mEciDkjs1aMLK75UiCgJIVMT8iNYchGu2ZcP5fpLgg2PmoOu6ZiPCpS7S7Kr-t81JJbNEwlCrkAfmVmUzrZiEcwUs_wNUVfLSJz1t2JCHIOqRZcr8wRDyQ890yBCLvXURCe4ChrSKY-1KwHDcz_CE0zDEEPYz2vGFrtVIz9mK4K43Pn95AYamQ0HajNcT56ZGevE_DUWLj3-kXdMBTET8Jvv3SRPaqMEXijIICukRN1EgaNHY_Yf8pxFcJN0tHOcJyZk6v9os" },
//   { id: 2, name: "كرواسون اللوز المقرمش", price: "₪11.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbO-5qv342WdqFhw7PJ2Fylg5bcTU06A7mlTaibuqEAQ0iaBxkW-0XuuuMZgkTv5_8vDDCsgHkB6fYE3XvhoGp-wEB5OnGBZYX7-YNWkWHwpt4S0sq6sp9FseyM-XGTZ6Y0JXu6yaTkUScWKkPXNUhi0phngNd235Zu5SPu9o4moV8TFEXUYx3oc9bV96qsqTVuSDPGl8n58NUA4bhHkxP_LaTJeNO9Wrs_VzfIWAUkKzSZTT4KdVjCuQkoiyuzu-iwiYeQVPvxFc" },
//   { id: 3, name: "مافن التوت الأزرق (Blueberry)", price: "₪9.50", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFfbil7A3IhAIfda5Al2RzVNp9EzK-Wkf9MnTwp_dYrC-syCVvKGEXWzbtGD2A6B7Lup1QASEru5eNQFfsp0B_6p-jQ87V1XPro08lGPP7OCNKvnNM1pQfeOAAaEA52PXPWyQOGHaJR5nTifcNDK4J1RBjwmCG-MSeAZN1WCJp4wva-45_GKb1xNuqAay12aDuyDMT46KLOKTx5yIMINXGhQg9I9CPHag6kl-CqLOALoHOxVl5ZkhCCU1Zxgd0PaxCbGw5dBIU6F4" },
// ];

// // قائمة كافة المنتجات المعروضة في الشبكة
// const ALL_PRODUCTS = [
//   { id: 4, name: "كوكيز بقطع الشوكولاتة الداكنة", price: "₪18.00", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkAI0iAfnxSqiIyFYE-yEUBrVdjt7Jikde2zejZHWn4Xgu96peFxx71KFETRLNGNIHfbtxKc4s9PlEmCnPZ7jm3OaGUDBAA06BNROnDagrB0-zRAx_kopWQhrqJjq7bJ6eXyxli69KfUuIDd361DEAvHb0Pdu-VgXRuI3C9-bUXMzS8hp-qzCMgZWgcZhacg2QuOjDmlbgC7oPbp0CmGcTq8btnSxOxW2UDy8pH2CbzHHPQv87v_pMVSsaUv_JXmOT5wZS-6CWb8" },
//   { id: 5, name: "باجيت فرنسي طازج", price: "₪8.50", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBmqRwbR-yvv5gAv52wc9pq2_SEdjIGPIUVioM_piKkZiDBaFM2o3-GPHwJgkurQD07KaT0ith7ZT-M9sQw_R-94premis0iONcqmT-NmVCgfaRwOI03AHFGfcT9_hGtKQHFUVsLK-y3vpMUrhayveu5IdPYBhN8ZCiC2cd05vo-9b748gBFv5Cv9CiiC8Dzp4Y5nHzaNkGgdxJXui_4w8BoF8AlEOfHONpV7XbxFVJVGWcoX5N8MEY2v216sTnl1cV3TC5jjXzBo" },
//   { id: 6, name: "تارت الليمون المنعش", price: "₪13.50", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPBDCWtbMvAE-OORAI_z9n71CazFxkHJgn8TTir5FSUAhyZYWb9D_StNGiL0bK7RbdsMEmGZASFP4GKc_EuhHo-qIRXGMHp-q5YrsP92i1nyWtt5MXXgwiwOZX9-geT8vVObPCrVhLJYsJVN3HrmiiAAYOJDAsb6zhHOd0uUcdaTjjhp9p8OLDxcwEz-tSsY1u_9om77TaRT7B936NQMcdaovGImCoXXAWs0bEEy1HAPPiYTpghM-gtPDQ6p84j7CF8ZiEKRH43II" },
//   { id: 7, name: "لاتيه مثلج بحليب الشوفان", price: "₪14.00", rating: 4.6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkkuJ_GCCmwZaWkPj-CjE7b8vde9IwgHB2CX6M2PptwFoCfzIHyiEkump_iWVRMkoMrCca1tLyOY3tplrNNvOYOI4PdYj3r-CyQqql6Vnlg_49WqjFJCAA_-iIeJQOj2bSV-DA3-0huX77ajNFw-79wx03u-RNMoS9p1nkVkm4HoKjx16CGKtxKvZYN4yi-DtDwDBzWwheuWgMS6bMceEr8bCaEmZ7DflkOwII9HmRmvhMJnySogzdUCZJLxdQRXIL0Qouc4I7zpg" },
// ];

// export default function StoreDetails() {
//   const [isHeaderActive, setIsHeaderActive] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("الكل");
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [cartCount, setCartCount] = useState(2);
//   const [totalPrice, setTotalPrice] = useState("₪42.50"); // تم تكييف العملة لـ ₪ تماشياً مع الشاشات السابقة

//   // مراقبة التمرير لتغيير خلفية الهيدر العلوي ديناميكياً
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsHeaderActive(true);
//       } else {
//         setIsHeaderActive(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="relative max-w-md min-h-screen pb-32 mx-auto bg-background text-on-background font-cairo">

//       {/* الهيدر العلوي العائم */}
//       <header className={`fixed top-0 left-0 right-0 max-w-md mx-auto z-50 transition-all duration-300 px-4 py-2 flex justify-between items-center ${
//         isHeaderActive ? 'bg-white shadow-md' : 'bg-transparent'
//       }`}>
//         <button className="flex items-center justify-center w-10 h-10 duration-150 bg-white rounded-full shadow-sm text-on-surface active:scale-95">
//           <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
//         </button>
//         <div className="flex gap-2">
//           <button className="flex items-center justify-center w-10 h-10 duration-150 bg-white rounded-full shadow-sm text-on-surface active:scale-95">
//             <span className="material-symbols-outlined">share</span>
//           </button>
//           <button
//             onClick={() => setIsFavorite(!isFavorite)}
//             className="flex items-center justify-center w-10 h-10 duration-150 bg-white rounded-full shadow-sm active:scale-95"
//           >
//             <span
//               className={`material-symbols-outlined transition-colors ${isFavorite ? 'text-error' : 'text-on-surface'}`}
//               style={{ fontVariationSettings: `'FILL' ${isFavorite ? 1 : 0}` }}
//             >
//               favorite
//             </span>
//           </button>
//         </div>
//       </header>

//       <main>
//         {/* واجهة البانر الإعلاني للمتجر */}
//         <section className="relative h-[240px]">
//           <div
//             className="w-full h-full bg-center bg-cover"
//             style={{ backgroundImage: `url('${BEST_SELLERS[0].image}')` }}
//           />
//           {/* شعار المتجر الدائري المتداخل */}
//           <div className="absolute -bottom-10 right-4">
//             <div className="flex items-center justify-center w-20 h-20 p-2 overflow-hidden bg-white border shadow-lg rounded-2xl border-outline-variant">
//               <img className="object-contain w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLSDbm_tVG1fsHBL7EOZFxy7eBLzZcNtPiHqO98alGT2oVATgz3eIPa4LGdrLCNTKlKEHeSZ8G3HRsHu3nOW0CWWmrST16B4-jVS4DTOK_8Sl71B45y_40L3KV4Egfq7UIyOGamEABnanHTlz94VE7QbYeDOCvsMeDNKIY8gIl9g1kfWqOX1lzEnD-WU43DbhmEpsLyN0g_5cuBxcAtW0MvlvQYT0Uijnm8yJK7tM4A3kFsJYE9HltCezmN1IQiqpHujcyCUBf6Es" alt="شعار المخبز" />
//             </div>
//           </div>
//         </section>

//         {/* بيانات المتجر ومقاييس الجودة */}
//         <section className="px-4 mt-14">
//           <div className="flex items-center gap-1">
//             <h1 className="text-xl font-bold text-on-surface">مخبز الموقد الذهبي</h1>
//             <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
//               verified
//             </span>
//           </div>
//           <p className="mt-1 text-xs text-secondary">مخبز ومقهى • خبز مخمر طازج • معجنات وحلويات فاخرة</p>

//           <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
//             <div className="flex items-center gap-0.5">
//               <span className="material-symbols-outlined text-[#FFD700] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//               <span className="font-bold">4.9</span>
//               <span className="text-secondary">(١,٢٤٥ تقييم)</span>
//             </div>
//             <div className="w-1 h-1 rounded-full bg-outline-variant" />
//             <div className="flex items-center gap-0.5 text-secondary">
//               <span className="material-symbols-outlined text-[18px]">distance</span>
//               <span className="font-medium text-on-surface">١.٢ كم</span>
//             </div>
//             <div className="w-1 h-1 rounded-full bg-outline-variant" />
//             <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-bold text-[11px]">
//               مفتوح الآن
//             </div>
//           </div>

//           <div className="flex gap-4 py-3 mt-4 text-center border-y border-outline-variant/30">
//             <div className="flex-1">
//               <p className="text-[10px] text-secondary uppercase font-medium">وقت التوصيل</p>
//               <p className="text-sm font-bold text-on-surface">١٥-٢٥ دقيقة</p>
//             </div>
//             <div className="w-[1px] bg-outline-variant/30" />
//             <div className="flex-1">
//               <p className="text-[10px] text-secondary uppercase font-medium">رسوم التوصيل</p>
//               <p className="text-sm font-bold text-on-surface">₪٥.٠٠</p>
//             </div>
//           </div>
//         </section>

//         {/* شريط البحث الداخلي */}
//         <section className="px-4 mt-6">
//           <div className="relative group">
//             <span className="absolute transition-colors -translate-y-1/2 material-symbols-outlined right-4 top-1/2 text-secondary group-focus-within:text-primary">
//               search
//             </span>
//             <input
//               className="w-full py-3 pl-4 text-sm text-right border-none rounded-full outline-none pr-11 bg-surface-container-low focus:ring-2 focus:ring-primary-container placeholder:text-secondary/60"
//               placeholder="ابحث داخل مخبز الموقد الذهبي..."
//               type="text"
//             />
//           </div>
//         </section>

//         {/* العروض الترويجية والخصومات */}
//         <section className="px-4 mt-6">
//           <div className="flex items-center justify-between p-4 border bg-primary-container/10 border-primary-container/20 rounded-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 bg-primary-container rounded-xl text-on-primary-container">
//                 <span className="material-symbols-outlined">local_offer</span>
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-on-surface">اشترِ ٢ واحصل على ١ مجاناً</h4>
//                 <p className="text-xs text-secondary mt-0.5">يسري العرض على كافة المعجنات الطازجة اليوم</p>
//               </div>
//             </div>
//             <button className="text-sm font-bold transition-opacity text-primary hover:opacity-80">تفعيل</button>
//           </div>
//         </section>

//         {/* أشرطة الفئات وقوائم التنقل الأفقية */}
//         <section className="mt-6">
//           <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar">
//             {CATEGORIES.map((cat) => {
//               const isActive = activeCategory === cat;
//               return (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all ${
//                     isActive
//                       ? "bg-primary text-white shadow-sm"
//                       : "bg-surface-container-high text-secondary hover:bg-secondary-container"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         {/* قسم الأكثر مبيعاً (Carousel أفقي) */}
//         <section className="mt-6">
//           <div className="flex items-end justify-between px-4 mb-4">
//             <h2 className="text-base font-bold text-on-surface">الأكثر مبيعاً 🔥</h2>
//             <button className="text-xs font-bold text-primary hover:opacity-80">عرض الكل</button>
//           </div>
//           <div className="flex gap-4 px-4 pb-2 overflow-x-auto no-scrollbar">
//             {BEST_SELLERS.map((item) => (
//               <div key={item.id} className="min-w-[190px] bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex-shrink-0 border border-outline-variant/10">
//                 <div className="w-full h-32 bg-center bg-cover" style={{ backgroundImage: `url('${item.image}')` }} />
//                 <div className="p-3">
//                   <h5 className="text-xs font-bold truncate text-on-surface">{item.name}</h5>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="text-sm font-bold text-primary">{item.price}</span>
//                     <button className="flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-sm bg-primary-container text-on-primary-container active:scale-90">
//                       <span className="material-symbols-outlined text-[18px]">add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* شبكة كافة المنتجات المتاحة */}
//         <section className="px-4 mt-8">
//           <h2 className="mb-4 text-base font-bold text-on-surface">جميع المنتجات</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {ALL_PRODUCTS.map((product) => (
//               <div key={product.id} className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-outline-variant/10">
//                 <div className="w-full bg-center bg-cover h-36" style={{ backgroundImage: `url('${product.image}')` }} />
//                 <div className="p-3">
//                   <h5 className="text-xs font-bold text-on-surface line-clamp-1">{product.name}</h5>
//                   <div className="flex items-center gap-0.5 mt-1">
//                     <span className="material-symbols-outlined text-[#FFD700] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
//                     <span className="text-[11px] text-secondary font-medium">{product.rating}</span>
//                   </div>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="text-sm font-bold text-primary">{product.price}</span>
//                     <button className="flex items-center justify-center transition-transform rounded-full shadow-sm w-9 h-9 bg-primary-container text-on-primary-container active:scale-90">
//                       <span className="material-symbols-outlined text-[20px]">add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* معلومات التواصل والمراجعات الحالية */}
//         <section className="px-4 pb-12 mt-8 space-y-4">
//           <h3 className="text-base font-bold text-on-surface">معلومات المتجر</h3>
//           <div className="space-y-3 text-xs text-on-surface">
//             <div className="flex gap-3">
//               <span className="text-base material-symbols-outlined text-secondary">location_on</span>
//               <div>
//                 <p className="font-bold">شارع الحرفيين، الحي الشرقي</p>
//                 <p className="text-secondary mt-0.5">غزة، فلسطين</p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-base material-symbols-outlined text-secondary">schedule</span>
//               <div>
//                 <p className="font-bold">مفتوح يومياً: ٠٧:٠٠ ص - ٠٨:٠٠ م</p>
//                 <p className="text-primary font-medium mt-0.5">ساعات الذروة: ٠٩:٠٠ ص - ١١:٠٠ ص</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 mt-6 bg-surface-container rounded-2xl">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-xs font-bold text-on-surface">آخر الآراء والتقييمات</h4>
//               <button className="text-xs font-bold text-primary">عرض الكل</button>
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs italic leading-relaxed text-on-surface">"أفضل خبز مخمر في المدينة على الإطلاق! التوصيل كان سريعاً جداً ووصلت المخبوزات وهي لا تزال دافئة وهشة."</p>
//               <p className="text-[10px] text-secondary text-left">— سارة م.، منذ يومين</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* شريط السلة السفلي المثبت ذو المظهر الزجاجي الرائع */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center max-w-md p-4 mx-auto border-t bg-white/80 backdrop-blur-md border-outline-variant/30">
//         <button className="w-full h-14 bg-primary-container text-on-primary-container rounded-full shadow-lg shadow-primary-container/10 flex items-center justify-between px-6 active:scale-[0.98] transition-transform font-bold text-sm">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-on-primary-container/20">{cartCount}</div>
//             <span>عرض سلة التسوق</span>
//           </div>
//           <span className="text-base">{totalPrice}</span>
//         </button>
//       </div>

//     </div>
//   );
// }