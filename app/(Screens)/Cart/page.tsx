'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useOrderStore } from '@/lib/store/orderStore';
import EmptyState from '@/components/EmptyState';

export default function Cart() {
  const router = useRouter();
  const cartItems = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal());
  const setCurrentOrder = useOrderStore((s) => s.setCurrentOrder);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(true);

  const deliveryFee = 7.00;
  const discount = isPromoApplied ? 15.00 : 0.00;
  const total = subtotal + deliveryFee - discount;

  const handleProceedToOrder = () => {
    setCurrentOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod,
      notes: '',
      storeName: cartItems[0]?.meta || '',
      deliveryAddress: 'غزة، شارع الرمال، عمارة رقم ٤٥، الطابق الثالث',
    });
    router.push('/OrderSummary');
  };

  useEffect(() => { document.title = 'سلة المشتريات | دري فري'; }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-32" dir="rtl">
        <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 flex justify-between items-center px-4 h-16 bg-white shadow-sm border-b border-border/50">
          <button onClick={() => router.back()} className="p-2 transition-colors transition-transform rounded-full hover:bg-primary/5 active:scale-95 text-text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-primary">سلة المشتريات</h1>
          <div className="w-10" />
        </header>
        <main className="pt-20">
          <EmptyState
            icon="shopping_cart"
            title="سلتك فارغة"
            description="لم تقم بإضافة أي منتجات إلى السلة بعد. تصفح المطاعم وأضف ما تريد."
            actionLabel="تصفح المطاعم"
            onAction={() => window.location.href = '/Restaurants'}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col max-w-md min-h-screen mx-auto bg-background text-text-primary" dir="rtl">

      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 flex justify-between items-center px-4 h-16 bg-white shadow-sm border-b border-border/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 transition-colors transition-transform rounded-full hover:bg-primary/5 active:scale-95 text-text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-primary">سلة المشتريات</h1>
        </div>
        <button className="p-2 transition-colors transition-transform rounded-full hover:bg-primary/5 active:scale-95 text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 px-4 py-4 mt-16 space-y-6 overflow-y-auto no-scrollbar">

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-text-primary">تفاصيل الطلب</h2>
            <span className="text-xs font-medium text-text-secondary">{cartItems.length} وجبات</span>
          </div>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-border/50 flex items-center gap-4">
                <div className="w-20 h-20 overflow-hidden rounded-xl bg-surface border border-border/10 shrink-0">
                  <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate text-text-primary">{item.name}</h3>
                  <p className="text-text-secondary text-[11px] mt-0.5">{item.meta}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-primary">₪{item.price.toFixed(2)}</span>

                    <div className="flex items-center gap-3 px-2.5 py-1 rounded-full bg-surface border border-border/10">
                      <button
                        onClick={() => updateQuantity(item.id, false)}
                        className="flex items-center justify-center w-6 h-6 font-bold text-primary transition-transform active:scale-75"
                      >
                        <span className="text-base material-symbols-outlined">remove</span>
                      </button>
                      <span className="text-xs font-bold text-text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, true)}
                        className="flex items-center justify-center w-6 h-6 font-bold text-primary transition-transform active:scale-75"
                      >
                        <span className="text-base material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold text-text-primary">عنوان التوصيل</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="relative w-full h-32 bg-surface">
              <div
                className="w-full h-full bg-center bg-cover grayscale opacity-80"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAg6MgwC-9MEHTtrlVO3EH4sxXu-G48bZx9DEa1duWqqCHSoDOXxvBf3iZBhlA5bzEbMNS2s9WdsAb_oDhv8hKqn8PKap0lUMCmMaZTc-hE-y3yjRRvdn33FVJmZhtrRSe9MC67lBXuhMP4dO86VvvvRK_A9NKtBcrG6hJuocMice-R21T-H07nGe9zqtaH4esyASu-HDc2UGOIz3IZuRhCDyYdPLfofJrZeaR1h0VZqacfiOn3xZXWRkI9XDEQP8kD9QwjoTuOHE')` }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="bg-primary p-2.5 rounded-full shadow-lg shadow-primary/20">
                  <span className="text-xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <span className="material-symbols-outlined text-text-secondary mt-0.5">home</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-text-primary">المنزل</h4>
                <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">غزة، شارع الرمال، عمارة رقم ٤٥، الطابق الثالث</p>
              </div>
              <Link
          href="/LocationPicker" className="text-xs font-bold text-primary hover:opacity-80 shrink-0">تغيير العنوان</Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold text-text-primary">طريقة الدفع</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('cod')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                paymentMethod === 'cod'
                  ? "border-primary bg-primary/5 text-primary font-bold"
                  : "border-border/20 bg-white text-text-secondary hover:bg-surface"
              }`}
            >
              <span className="mb-2 text-2xl material-symbols-outlined" style={{ fontVariationSettings: ` 'FILL' ${paymentMethod === 'cod' ? 1 : 0} ` }}>
                payments
              </span>
              <span className="text-xs font-medium">نقداً عند الاستلام</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                paymentMethod === 'card'
                  ? "border-primary bg-primary/5 text-primary font-bold"
                  : "border-border/20 bg-white text-text-secondary hover:bg-surface"
              }`}
            >
              <span className="mb-2 text-2xl material-symbols-outlined" style={{ fontVariationSettings: ` 'FILL' ${paymentMethod === 'card' ? 1 : 0} ` }}>
                credit_card
              </span>
              <span className="text-xs font-medium">بطاقة ائتمان / فيزا</span>
            </button>
          </div>
        </section>

        <section>
          <div className="relative flex items-center">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full pl-28 pr-4 text-sm text-right border outline-none h-14 bg-white border-border/30 rounded-xl focus:border-primary focus:ring-0"
              placeholder="أدخل كود الخصم (كوبون)"
              type="text"
            />
            <button
              onClick={() => setIsPromoApplied(true)}
              className="absolute px-4 text-xs font-bold transition-all h-10 rounded-lg left-2 top-2 bottom-2 bg-primary/10 text-primary hover:bg-primary/20"
            >
              تطبيق الأكواد
            </button>
          </div>
        </section>

        <section className="p-4 border bg-white rounded-xl border-border/20 shadow-sm">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">المجموع الفرعي للوجبات</span>
              <span className="font-bold text-text-primary">₪{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">رسوم توصيل المندوب</span>
              <span className="font-bold text-text-primary">₪{deliveryFee.toFixed(2)}</span>
            </div>
            {isPromoApplied && (
              <div className="flex items-center justify-between text-primary">
                <span>خصم الكوبون المطبق</span>
                <span className="font-bold">- ₪{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-3 mt-3 text-base border-t border-dashed border-border/30">
              <span className="font-bold text-text-primary">إجمالي الفاتورة النهائي</span>
              <span className="text-lg font-extrabold text-primary">₪{total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/95 backdrop-blur-md p-4 mx-4 mb-4 shadow-sm border border-border/30 rounded-2xl">
        <div className="flex items-center justify-between px-1 mb-3">
          <div>
            <p className="text-[10px] font-bold text-text-secondary text-right">المبلغ الإجمالي المطلوب</p>
            <p className="text-xl font-extrabold text-primary font-mono mt-0.5">₪{total.toFixed(2)}</p>
          </div>
          <div className="text-left">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary-light text-primary font-bold">
              {paymentMethod === 'cod' ? 'نقداً عند الاستلام' : 'بطاقة ائتمان'}
            </span>
          </div>
        </div>

        <button
          onClick={handleProceedToOrder}
          className="w-full h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>الانتقال لتأكيد الطلب</span>
          <span className="text-xl transform rotate-180 material-symbols-outlined">chevron_right</span>
        </button>
      </footer>

    </div>
  );
}
