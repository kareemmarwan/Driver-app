'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import RestaurantsSkeleton from "@/components/skeletons/RestaurantsSkeleton";
import EmptyState from '@/components/EmptyState';
import RestaurantCard from '@/components/RestaurantCard';
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, toggleItem } = useWishlistStore();
  const { selectedArea, selectedSort } = useFilterStore();

  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANTS_DATA];

    if (searchQuery) {
      list = list.filter(r =>
        r.name.includes(searchQuery) || r.tags.includes(searchQuery)
      );
    }

    if (selectedArea) {
      list = list.filter(r => r.areaId === selectedArea);
    }

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
    <div className="bg-background relative flex flex-col w-full min-h-screen" dir="rtl">

      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 transition-all border-b border-border/50 shadow-sm sm:px-6 lg:px-8 bg-white h-14 sm:h-16">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl text-primary">المطاعم</h1>
        </div>
        <button className="p-2 transition-colors duration-200 rounded-full active:scale-95 text-text-secondary hover:bg-surface">
          <span className="text-xl sm:text-2xl material-symbols-outlined">search</span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto">

        <section className="px-4 mt-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center w-full">
            <span className="absolute text-xl material-symbols-outlined right-4 text-text-secondary">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 text-sm text-right transition-all duration-200 border border-border/50 outline-none sm:text-base h-12 sm:h-14 bg-white rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="ابحث عن مطعم أو وجبة..."
              type="text"
            />
            <Link href="/FilterDeliveryAreaPage" className="absolute p-2 transition-colors duration-200 rounded-full left-3 text-text-secondary hover:bg-surface active:scale-95">
              <span className="text-xl material-symbols-outlined">tune</span>
            </Link>
          </div>
        </section>

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
                      ? "bg-primary text-white border-primary shadow-sm font-semibold"
                      : "bg-white text-text-secondary border-border/30 hover:bg-surface hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="px-4 mt-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 bg-white border border-border/50 rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-primary flex-shrink-0 text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div className="flex-1">
              <h3 className="text-sm font-bold sm:text-base text-text-primary">موقع التوصيل الحالي: {selectedAreaName || 'الكل'}</h3>
              <p className="text-xs text-text-secondary mt-0.5">عرض المطاعم الأقرب لموقعك الحالي</p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-32 mt-6 sm:px-6 lg:px-8 sm:mt-8">
          {filteredRestaurants.length === 0 ? (
            <EmptyState
              icon="search_off"
              title="لا توجد نتائج"
              description="لم نتمكن من العثور على مطاعم تطابق بحثك. حاول بكلمات أخرى."
            />
          ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFav={isFavorite(restaurant.id)}
                onToggleFav={(e) => {
                  e.stopPropagation();
                  toggleItem({ id: restaurant.id, name: restaurant.name, image: restaurant.image, price: '', storeName: '' });
                }}
              />
            ))}
          </div>
        )}
        </section>
      </main>

    </div>
  );
}
