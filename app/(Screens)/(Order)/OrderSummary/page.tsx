'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderStore, generateOrderId } from '@/lib/store/orderStore';

export default function OrderSummary() {
  const router = useRouter();
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const addActiveOrder = useOrderStore((s) => s.addActiveOrder);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <p className="text-text-secondary">لا توجد بيانات طلب. الرجاء العودة للسلة.</p>
      </div>
    );
  }

  const handleConfirmOrder = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const orderId = generateOrderId();
    const itemsSummary = currentOrder.items
      .map((i) => `${i.quantity}× ${i.name}`)
      .join('، ');

    const firstItem = currentOrder.items[0];

    addActiveOrder({
      id: orderId,
      status: 'قيد التجهيز',
      statusIcon: 'receipt_long',
      store: currentOrder.storeName || 'متجر',
      items: itemsSummary,
      eta: '٢٥-٣٥ دقيقة',
      progress: 10,
      driver: null,
      image: firstItem?.image || '',
      price: `₪${currentOrder.total.toFixed(2)}`,
    });

    setTimeout(() => {
      setIsProcessing(false);
      router.push('/PaymentMethods');
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background text-text-primary flex flex-col relative" dir="rtl">

      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-white shadow-sm flex justify-between items-center px-4 h-16 border-b border-border">
        <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-primary/5 active:scale-95 text-primary">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-primary">توصيل جديد</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-primary">1/3</span>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 mt-16 space-y-6">

        <div>
          <h2 className="text-xl font-bold text-primary">ملخص الطلب</h2>
          <p className="mt-1 text-xs text-text-secondary">راجع تفاصيل التوصيل والوجهة بعناية قبل التأكيد</p>
        </div>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-primary">
              <span className="text-lg material-symbols-outlined">route</span>
              مسار التوصيل للطلب
            </span>
            <span className="px-2.5 py-0.5 bg-primary-light text-primary text-xs rounded-full font-bold font-mono">٢.٤ كم</span>
          </div>

          <div className="relative pt-2 space-y-6">

            <div className="relative flex gap-3">
              <div className="relative flex flex-col items-center shrink-0">
                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-primary">
                  <span className="text-xs text-white material-symbols-outlined">trip_origin</span>
                </div>
                <div className="absolute right-[11px] top-6 bottom-[-30px] w-0 border-r-2 border-dashed border-border" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">نقطة الاستلام (من)</p>
                <h3 className="text-sm font-bold text-text-primary mt-0.5">{currentOrder.storeName || 'المتجر'}</h3>
              </div>
            </div>

            <div className="relative flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-primary-light">
                  <span className="text-sm material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">وجهة التسليم (إلى)</p>
                <h3 className="text-sm font-bold text-text-primary mt-0.5">{currentOrder.deliveryAddress}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="mb-3 text-sm font-bold text-primary">محتويات الطلب</h3>
          <div className="space-y-3">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-14 h-14 overflow-hidden border shadow-sm rounded-xl bg-surface shrink-0 border-border">
                  <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs font-bold text-text-primary">{item.name}</p>
                  {item.meta && <p className="text-[10px] text-text-secondary">{item.meta}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] font-bold text-primary">₪{item.price.toFixed(2)}</span>
                    <span className="text-[10px] text-text-secondary">الكمية: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="mb-3 text-sm font-bold text-primary">ملخص الرسوم المالي</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">المجموع الفرعي للوجبات</span>
              <span className="font-mono font-bold text-text-primary">₪{currentOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">رسوم التوصيل</span>
              <span className="font-mono font-bold text-text-primary">₪{currentOrder.deliveryFee.toFixed(2)}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex items-center justify-between text-primary">
                <span>الخصم المطبق</span>
                <span className="font-mono">- ₪{currentOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 mt-2 font-bold border-t border-dashed border-border/30 text-primary">
              <span>إجمالي الفاتورة النهائي</span>
              <span className="font-mono text-base">₪{currentOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <div className="h-32 overflow-hidden border shadow-sm rounded-2xl border-border grayscale opacity-80">
          <img className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZEn8juJJamZi2psisQo_Mkpib_udnUjbL0uP6naqWtXYrIuxoDtuhHVlTLvvuvQaQUriawAv-nve9cvb9SuRVheDri-sBJWgk74kbKUvGJZbJmCuxEL8oAhLfu6KzPxPSLoYEN94LfNBuexJlc1bUBevDvHj-u-qCY5wRPQfbQCA9wURVvMEEIsNy2xoGnI5F5zGu493VzUkfxHBqS0izYtY0nN-eECNQr_399SOdRlX8oi9vDn0watuzCBhSgPKuq7f0C7eypw8" alt="خريطة المسار المصغرة للتوصيل" />
        </div>

      </main>

      <footer className="bg-white/95 backdrop-blur-md p-4 mx-4 mb-4 shadow-sm border border-border/30 rounded-2xl">
        <div className="flex items-end justify-between px-1 mb-4">
          <div className="text-right">
            <p className="text-[11px] font-bold text-text-secondary">إجمالي المبلغ النهائي</p>
            <p className="mt-1 font-mono text-xl font-extrabold leading-none text-primary">₪{currentOrder.total.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-1.5 text-text-primary text-xs font-bold bg-surface px-2.5 py-1.5 rounded-full border border-border">
            <span className="text-base text-primary material-symbols-outlined">account_balance_wallet</span>
            <span>الدفع {currentOrder.paymentMethod === 'cod' ? 'عند الاستلام' : 'ببطاقة ائتمان'}</span>
          </div>
        </div>

        {isProcessing ? (
          <button disabled className="w-full h-14 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg bg-primary text-white shadow-lg shadow-primary/20">
            <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>جاري إرسال طلبك الآن...</span>
          </button>
        ) : (
          <button
            onClick={handleConfirmOrder}
            className="w-full h-14 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            <span>تأكيد وإرسال الطلب</span>
            <span className="text-xl transform rotate-180 material-symbols-outlined">chevron_right</span>
          </button>
        )}
      </footer>

    </div>
  );
}
