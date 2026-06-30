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
    <div className="bg-background relative flex flex-col w-full min-h-screen" dir="rtl">

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 h-16 flex justify-between items-center w-full max-w-6xl mx-auto ${
        isHeaderActive ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
      }`}>
        <Link href="/Restaurants" className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-primary hover:bg-white active:scale-95 border border-border">
          <span className="text-2xl transform rotate-180 material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex gap-2">
          <button className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-text-secondary hover:bg-white active:scale-95 border border-border hover:text-primary">
            <span className="text-xl material-symbols-outlined">share</span>
          </button>
          <button
            onClick={() => toggleItem({ id: Number(params.storeId), name: 'مخبز الموقد الذهبي', image: BEST_SELLERS[0]?.image || '', price: '' })}
            className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full shadow-sm active:scale-95 border border-border hover:bg-white"
          >
            <span
              className={`material-symbols-outlined text-xl transition-colors ${isWishlisted(Number(params.storeId)) ? 'text-error' : 'text-text-secondary'}`}
              style={{ fontVariationSettings: `'FILL' ${isWishlisted(Number(params.storeId)) ? 1 : 0}` }}
            >
              favorite
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl pb-40 mx-auto">

        <section className="relative h-[240px] sm:h-[300px] w-full overflow-hidden">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url('${BEST_SELLERS[0].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <div className="absolute z-10 -bottom-6 right-4 sm:right-6">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 p-2 overflow-hidden bg-white border-4 rounded-[20px] shadow-md border-white">
              <img className="object-contain w-full h-full rounded-[12px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLSDbm_tVG1fsHBL7EOZFxy7eBLzZcNtPiHqO98alGT2oVATgz3eIPa4LGdrLCNTKlKEHeSZ8G3HRsHu3nOW0CWWmrST16B4-jVS4DTOK_8Sl71B45y_40L3KV4Egfq7UIyOGamEABnanHTlz94VE7QbYeDOCvsMeDNKIY8gIl9g1kfWqOX1lzEnD-WU43DbhmEpsLyN0g_5cuBxcAtW0MvlvQYT0Uijnm8yJK7tM4A3kFsJYE9HltCezmN1IQiqpHujcyCUBf6Es" alt="شعار المخبز" />
            </div>
          </div>
        </section>

        <section className="px-4 mt-10 sm:px-6">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold sm:text-2xl text-text-primary">مخبز الموقد الذهبي</h1>
            <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary font-medium">مخبز ومقهى • خبز مخمر طازج • معجنات وحلويات فاخرة</p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-text-secondary">
            <div className="flex items-center gap-0.5 bg-surface border border-border px-2 py-0.5 rounded-[8px]">
              <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-text-primary">4.9</span>
              <span className="text-[11px] text-text-secondary/80">(١,٢٤٥ تقييم)</span>
            </div>
            <div className="flex items-center gap-0.5 bg-surface border border-border px-2 py-0.5 rounded-[8px]">
              <span className="material-symbols-outlined text-[16px]">distance</span>
              <span className="font-bold text-text-primary">١.٢ كم</span>
            </div>
            <div className="bg-primary-light text-primary px-2.5 py-0.5 rounded-[8px] font-bold text-[11px] border border-primary/20">
              مفتوح الآن
            </div>
          </div>

          <div className="flex gap-4 py-3 mt-5 text-center border-y border-border">
            <div className="flex-1">
              <p className="text-[11px] text-text-secondary font-medium">وقت التوصيل</p>
              <p className="text-sm font-bold text-text-primary mt-0.5">١٥-٢٥ دقيقة</p>
            </div>
            <div className="w-[1px] bg-border" />
            <div className="flex-1">
              <p className="text-[11px] text-text-secondary font-medium">رسوم التوصيل</p>
              <p className="text-sm font-bold text-primary mt-0.5">٥.٠0 ₪</p>
            </div>
          </div>
        </section>

        <section className="px-4 mt-6 sm:px-6">
          <div className="relative flex items-center w-full max-w-md">
            <span className="absolute text-xl material-symbols-outlined right-4 text-text-secondary">search</span>
            <input
              className="w-full pl-4 pr-12 text-sm text-right transition-all duration-200 border border-border/30 outline-none h-12 bg-white rounded-[24px] focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm"
              placeholder="ابحث داخل مخبز الموقد الذهبي..."
              type="text"
            />
          </div>
        </section>

        <section className="px-4 mt-6 sm:px-6">
          <div className="flex items-center justify-between p-4 border bg-primary-light border-primary/10 rounded-[24px] max-w-md">
            <div className="flex items-center min-w-0 gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-[14px] text-primary flex-shrink-0">
                <span className="material-symbols-outlined">local_offer</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate text-text-primary sm:text-sm">اشترِ ٢ واحصل على ١ مجاناً</h4>
                <p className="text-[11px] text-text-secondary mt-0.5 truncate">يسري العرض على كافة المعجنات الطازجة اليوم</p>
              </div>
            </div>
            <button className="text-xs font-bold transition-all text-primary hover:text-primary-dark mr-2 flex-shrink-0 active:scale-95 bg-white border border-border/30 px-3 py-1.5 rounded-[12px] shadow-sm">تفعيل</button>
          </div>
        </section>

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
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/15 font-semibold"
                      : "bg-white text-text-secondary border-border/30 hover:bg-surface hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between px-4 mb-4 sm:px-6">
            <h2 className="text-sm font-bold sm:text-base text-text-primary">الأكثر مبيعاً 🔥</h2>
            <button className="text-xs font-bold text-primary hover:text-primary-dark">عرض الكل</button>
          </div>
          <div className="flex gap-4 px-4 pb-3 overflow-x-auto no-scrollbar sm:px-6">
            {BEST_SELLERS.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/ProductDetailsPage/${item.id}?storeId=${storeId}`)}
                className="min-w-[190px] bg-white rounded-[24px] shadow-sm overflow-hidden flex-shrink-0 border border-border group transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full h-32">
                  <div className="w-full h-full transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${item.image}')` }} />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleItem({ id: item.id, name: item.name, image: item.image, price: item.priceDisplay || '', storeName: 'مخبز الموقد الذهبي' }); }}
                    className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:scale-90 transition-all"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${isWishlisted(item.id) ? 'text-error' : 'text-text-secondary'}`}
                      style={{ fontVariationSettings: `'FILL' ${isWishlisted(item.id) ? 1 : 0}` }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-3.5">
                  <h5 className="text-xs font-bold truncate text-text-primary group-hover:text-primary transition-colors">{item.name}</h5>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-primary">{item.priceDisplay}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                      className="flex items-center justify-center w-8 h-8 transition-all rounded-full shadow-sm bg-primary-light text-primary hover:bg-primary hover:text-white active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 mt-8 sm:px-6">
          <h2 className="mb-4 text-sm font-bold sm:text-base text-text-primary">جميع المنتجات</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ALL_PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/ProductDetailsPage/${product.id}?storeId=${storeId}`)}
                className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-border group transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-36">
                    <div className="w-full h-full transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${product.image}')` }} />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleItem({ id: product.id, name: product.name, image: product.image, price: product.priceDisplay || '', storeName: 'مخبز الموقد الذهبي' }); }}
                      className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:scale-90 transition-all"
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${isWishlisted(product.id) ? 'text-error' : 'text-text-secondary'}`}
                        style={{ fontVariationSettings: `'FILL' ${isWishlisted(product.id) ? 1 : 0}` }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-3.5 pb-0">
                    <h5 className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 min-h-[32px]">{product.name}</h5>
                    <div className="flex items-center gap-0.5 mt-1 bg-surface w-fit px-1.5 py-0.5 rounded-[6px] border border-border">
                      <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[11px] text-text-primary font-bold">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 pt-2">
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-primary">{product.priceDisplay}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="flex items-center justify-center transition-all rounded-full shadow-sm w-9 h-9 bg-primary-light text-primary hover:bg-primary hover:text-white active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-md px-4 mt-8 space-y-4 sm:px-6 md:max-w-full">
          <h3 className="text-sm font-bold sm:text-base text-text-primary">معلومات المتجر</h3>
          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 text-text-primary">
            <div className="flex gap-3 p-3.5 bg-white border border-border rounded-[18px]">
              <span className="text-lg material-symbols-outlined text-primary">location_on</span>
              <div>
                <p className="font-bold text-text-primary">شارع الحرفيين، الحي الشرقي</p>
                <p className="text-text-secondary mt-0.5">غزة، فلسطين</p>
              </div>
            </div>
            <div className="flex gap-3 p-3.5 bg-white border border-border rounded-[18px]">
              <span className="text-lg material-symbols-outlined text-primary">schedule</span>
              <div>
                <p className="font-bold text-text-primary">مفتوح يومياً: ٠٧:٠٠ ص - ٠٨:٠٠ م</p>
                <p className="text-primary font-medium mt-0.5">ساعات الذروة: ٠٩:٠٠ ص - ١١:٠٠ ص</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded-[24px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-text-primary">آخر الآراء والتقييمات</h4>
              <button className="text-xs font-bold text-primary">عرض الكل</button>
            </div>
            <div className="space-y-1">
              <p className="text-xs italic leading-relaxed text-text-secondary">"أفضل خبز مخمر في المدينة على الإطلاق! التوصيل كان سريعاً جداً ووصلت المخبوزات وهي لا تزال دافئة وهشة."</p>
              <p className="text-[10px] text-text-secondary text-left font-medium">— سارة m.، منذ يومين</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
