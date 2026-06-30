'use client';

import { memo } from 'react';

export type ProductItem = {
  id: string;
  name: string;
  image: string;
  priceDisplay: string;
  rating: string;
};

function ProductCard({
  product,
  isWishlisted,
  onToggleFav,
  onAddToCart,
  onClick,
}: {
  product: ProductItem;
  isWishlisted: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
  onAddToCart: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-border/50 group transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="relative w-full h-36">
          <div className="w-full h-full transition-transform duration-500 bg-center bg-cover group-hover:scale-102" style={{ backgroundImage: `url('${product.image}')` }} />
          <button
            onClick={onToggleFav}
            className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:scale-90 transition-all"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${isWishlisted ? 'text-error' : 'text-text-secondary'}`}
              style={{ fontVariationSettings: `'FILL' ${isWishlisted ? 1 : 0}` }}
            >
              favorite
            </span>
          </button>
        </div>
        <div className="p-3.5 pb-0">
          <h5 className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 min-h-[32px]">{product.name}</h5>
          <div className="flex items-center gap-0.5 mt-1 bg-surface w-fit px-1.5 py-0.5 rounded-[6px] border border-border/50">
            <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-[11px] text-text-primary font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-3.5 pt-2">
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-primary">{product.priceDisplay}</span>
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center transition-all rounded-full shadow-sm w-9 h-9 bg-primary-light text-primary hover:bg-primary hover:text-white active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
