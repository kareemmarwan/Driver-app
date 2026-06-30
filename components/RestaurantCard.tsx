'use client';

import { memo } from 'react';
import Link from "next/link";

type Restaurant = {
  id: string;
  name: string;
  image: string;
  logo: string;
  rating: string;
  tags: string;
  address: string;
  deliveryTime: string;
  deliveryFee: string;
  isOpen: boolean;
  isNearest: boolean;
};

function RestaurantCard({
  restaurant,
  isFav,
  onToggleFav,
}: {
  restaurant: Restaurant;
  isFav: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={`/StoreDetails/${restaurant.id}`}
      className="bg-white border border-border/50 rounded-[24px] overflow-hidden shadow-sm group active:scale-[0.99] transition-all duration-300 hover:shadow-md hover:border-border/50 cursor-pointer flex flex-col"
    >
      <div className="relative w-full h-40 overflow-hidden sm:h-48">
        <div
          className="absolute inset-0 transition-transform duration-700 bg-center bg-cover group-hover:scale-105"
          style={{ backgroundImage: `url('${restaurant.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        <div className="absolute flex flex-wrap gap-1.5 top-3 right-3">
          {restaurant.isNearest && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-[8px] shadow-sm">الأقرب</span>
          )}
          {restaurant.isOpen && (
            <span className="bg-white/95 backdrop-blur-sm text-text-primary text-[10px] font-bold px-2 py-1 rounded-[8px] shadow-sm">مفتوح</span>
          )}
        </div>

        <button
          onClick={onToggleFav}
          className="absolute flex items-center justify-center text-white transition-all rounded-full w-9 h-9 sm:w-10 sm:h-10 top-3 left-3 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-error hover:scale-105 active:scale-95"
        >
          <span
            className={`material-symbols-outlined text-xl transition-colors ${isFav ? 'text-error' : ''}`}
            style={{ fontVariationSettings: `'FILL' ${isFav ? 1 : 0}` }}
          >
            favorite
          </span>
        </button>

        <div className="absolute z-10 w-12 h-12 overflow-hidden bg-white border-2 shadow-sm -bottom-5 right-4 sm:w-14 sm:h-14 rounded-[14px] border-white">
          <img loading="lazy" decoding="async" className="object-cover w-full h-full" src={restaurant.logo} alt={restaurant.name} />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 pt-7 sm:p-5 sm:pt-8">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-bold truncate sm:text-lg text-text-primary group-hover:text-primary transition-colors">{restaurant.name}</h2>
            <div className="flex items-center flex-shrink-0 gap-0.5 px-2 py-0.5 rounded-[8px] bg-primary-light border border-primary/20">
              <span className="text-xs sm:text-sm material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-xs font-bold text-primary">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 line-clamp-1">{restaurant.tags}</p>
          <p className="flex items-center gap-1 mt-2 text-xs truncate text-text-secondary/80">
            <span className="flex-shrink-0 text-xs sm:text-sm material-symbols-outlined">location_on</span>
            <span className="truncate">{restaurant.address}</span>
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 mt-4 text-[11px] sm:text-xs border-t border-border/50 text-text-secondary">
          <div className="flex items-center gap-1 bg-surface px-2 py-1 rounded-[8px] border border-border/50">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span className="font-medium">{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-surface px-2 py-1 rounded-[8px] border border-border/50">
            <span className="material-symbols-outlined text-xs">motorcycle</span>
            <span className="font-medium">{restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(RestaurantCard);
