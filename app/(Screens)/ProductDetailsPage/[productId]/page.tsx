'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import { getProductById, SIZES, EXTRAS } from '@/lib/data';

type ExtraCategory = 'sauces' | 'drinks' | 'complements';

export default function ProductDetailsPage() {
  const params = useParams<{ productId: string }>();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') || '1';
  const productId = Number(params.productId) || 1;
  const product = getProductById(productId);

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) document.title = product.name + ' | دري فري';
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, [product]);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-text-primary antialiased pb-32" dir="rtl">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white border-b border-border/50">
          <div className="skeleton w-10 h-10 rounded-full" />
          <div className="skeleton h-5 w-24" />
          <div className="w-10" />
        </header>
        <main className="pt-20">
          <ProductDetailsSkeleton />
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-text-secondary">المنتج غير موجود</p>
          <Link href="/" className="text-primary font-bold mt-2 inline-block">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const extrasTotal = Object.entries(selectedExtras).reduce((sum, [id, selected]) => {
    if (!selected) return sum;
    for (const cat of Object.keys(EXTRAS) as ExtraCategory[]) {
      const item = (EXTRAS[cat] as { id: string; price: number }[]).find(e => e.id === id);
      if (item) return sum + item.price;
    }
    return sum;
  }, 0);

  const basePrice = product.price + SIZES[selectedSize].price;
  const totalPrice = (basePrice + extrasTotal) * quantity;

  const addToCart = () => {
    useCartStore.getState().addItem({
      id: product.id,
      name: product.name,
      price: totalPrice / quantity,
      quantity,
      image: product.image,
      meta: SIZES[selectedSize].label,
    });
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const sectionTitle = (icon: string, title: string) => (
    <div className="flex items-center gap-1.5 mb-3">
      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
      <h3 className="text-sm font-bold text-text-primary">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text-primary antialiased pb-32" dir="rtl">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white border-b border-border/50">
        <Link href={`/StoreDetails/${storeId}`} className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white rounded-full shadow-sm text-primary hover:bg-gray-50 active:scale-95 border border-border/50">
          <span className="text-2xl material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-sm font-bold text-text-primary">تفاصيل المنتج</h1>
        <div className="w-10" />
      </header>

      <main className="pt-20 px-4 max-w-lg mx-auto">
        <div className="w-full aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-border/10">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-text-primary">{product.name}</h2>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-[#FFD700] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-sm font-bold text-text-primary">{product.rating}</span>
          </div>
        </div>

        <div className="mt-6">
          {sectionTitle('straighten', 'اختر المقاس')}
          <div className="flex gap-2">
            {SIZES.map((size, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSize(idx)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  selectedSize === idx
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-white text-text-secondary border-border/30 hover:border-primary/30'
                }`}
              >
                <div>{size.label}</div>
                <div className={`text-xs mt-0.5 ${selectedSize === idx ? 'text-white/80' : 'text-text-secondary'}`}>{size.suffix || '—'}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 p-4 bg-white rounded-2xl border border-border/10 shadow-sm">
          <span className="text-sm font-bold text-text-primary">الكمية</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex items-center justify-center w-10 h-10 transition-all bg-primary-light rounded-xl text-primary hover:bg-primary/20 active:scale-90"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="text-lg font-bold w-6 text-center text-text-primary">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="flex items-center justify-center w-10 h-10 transition-all bg-primary-light rounded-xl text-primary hover:bg-primary/20 active:scale-90"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {sectionTitle('restaurant_menu', 'الصلصات')}
        <div className="space-y-2">
          {EXTRAS.sauces.map(sauce => (
            <button
              key={sauce.id}
              onClick={() => toggleExtra(sauce.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                selectedExtras[sauce.id]
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-white border-border/10'
              }`}
            >
              <span className="text-sm font-medium text-text-primary">{sauce.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{sauce.price.toFixed(2)} ₪</span>
                <span className={`material-symbols-outlined text-lg ${selectedExtras[sauce.id] ? 'text-primary' : 'text-border'}`}>
                  {selectedExtras[sauce.id] ? 'check_circle' : 'add_circle'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {sectionTitle('local_cafe', 'المشروبات')}
        <div className="space-y-2">
          {EXTRAS.drinks.map(drink => (
            <button
              key={drink.id}
              onClick={() => toggleExtra(drink.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                selectedExtras[drink.id]
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-white border-border/10'
              }`}
            >
              <span className="text-sm font-medium text-text-primary">{drink.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{drink.price.toFixed(2)} ₪</span>
                <span className={`material-symbols-outlined text-lg ${selectedExtras[drink.id] ? 'text-primary' : 'text-border'}`}>
                  {selectedExtras[drink.id] ? 'check_circle' : 'add_circle'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {sectionTitle('bakery_dining', 'المكملات')}
        <div className="space-y-2">
          {EXTRAS.complements.map(comp => (
            <button
              key={comp.id}
              onClick={() => toggleExtra(comp.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                selectedExtras[comp.id]
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-white border-border/10'
              }`}
            >
              <span className="text-sm font-medium text-text-primary">{comp.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{comp.price.toFixed(2)} ₪</span>
                <span className={`material-symbols-outlined text-lg ${selectedExtras[comp.id] ? 'text-primary' : 'text-border'}`}>
                  {selectedExtras[comp.id] ? 'check_circle' : 'add_circle'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-border/50">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm text-text-secondary">المجموع الكلي</span>
            <span className="text-xl font-bold text-primary">{totalPrice.toFixed(2)} ₪</span>
          </div>
          <button
            onClick={addToCart}
            className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            أضف إلى السلة
          </button>
        </div>
      </div>

      {showSnackbar && (
        <div className="fixed top-24 left-0 right-0 z-[60] flex justify-center animate-entry">
          <div className="bg-primary text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            تمت الإضافة إلى السلة
          </div>
        </div>
      )}
    </div>
  );
}
