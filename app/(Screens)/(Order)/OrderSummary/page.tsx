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
      <div className="max-w-md mx-auto min-h-screen bg-[#F8FAFC] flex items-center justify-center" dir="rtl">
        <p className="text-[#7f8e7e]">لا توجد بيانات طلب. الرجاء العودة للسلة.</p>
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
    <div className="max-w-md mx-auto min-h-screen bg-[#F8FAFC] text-[#2d3732] flex flex-col relative pb-52 font-cairo" dir="rtl">

      {/* شريط التطبيق العلوي */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.03)] flex justify-between items-center px-4 h-16 border-b border-[#bbcbba]/10">
        <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-[#006d34]/5 active:scale-95 text-[#006d34]">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-[#006d34]">توصيل جديد</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-[#006d34]">1/3</span>
        </div>
      </header>

      {/* المحتوى الرئيسي لملخص الفاتورة والمسار */}
      <main className="flex-1 px-4 pt-6 mt-16 space-y-6">

        {/* عنوان القسم */}
        <div>
          <h2 className="text-xl font-bold text-[#006d34]">ملخص الطلب</h2>
          <p className="mt-1 text-xs text-[#7f8e7e]">راجع تفاصيل التوصيل والوجهة بعناية قبل التأكيد</p>
        </div>

        {/* أولاً: بطاقة مسار خط سير التوصيل (Timeline) */}
        <section className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(0,109,52,0.02)] border border-[#bbcbba]/20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#006d34]">
              <span className="text-lg material-symbols-outlined">route</span>
              مسار التوصيل للطلب
            </span>
            <span className="px-2.5 py-0.5 bg-[#00d26a]/10 text-[#006d34] text-xs rounded-full font-bold font-mono">٢.٤ كم</span>
          </div>

          {/* التايم لاين الرأسي */}
          <div className="relative pt-2 space-y-6">

            {/* نقطة الاستلام */}
            <div className="relative flex gap-3">
              <div className="relative flex flex-col items-center shrink-0">
                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-[#006d34]">
                  <span className="text-xs text-white material-symbols-outlined">trip_origin</span>
                </div>
                <div className="absolute right-[11px] top-6 bottom-[-30px] w-0 border-r-2 border-dashed border-[#bbcbba]/40" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-[#7f8e7e] uppercase tracking-wider">نقطة الاستلام (من)</p>
                <h3 className="text-sm font-bold text-[#2d3732] mt-0.5">{currentOrder.storeName || 'المتجر'}</h3>
              </div>
            </div>

            {/* نقطة التسليم */}
            <div className="relative flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-[#00d26a]/15">
                  <span className="text-sm material-symbols-outlined text-[#006d34]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-[#7f8e7e] uppercase tracking-wider">وجهة التسليم (إلى)</p>
                <h3 className="text-sm font-bold text-[#2d3732] mt-0.5">{currentOrder.deliveryAddress}</h3>
              </div>
            </div>
          </div>
        </section>

        {/* ثانياً: بطاقة تفاصيل الطلب */}
        <section className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(0,109,52,0.02)] border border-[#bbcbba]/20">
          <h3 className="mb-3 text-sm font-bold text-[#006d34]">محتويات الطلب</h3>
          <div className="space-y-3">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-14 h-14 overflow-hidden border shadow-sm rounded-xl bg-slate-50 shrink-0 border-[#bbcbba]/20">
                  <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs font-bold text-[#2d3732]">{item.name}</p>
                  {item.meta && <p className="text-[10px] text-[#7f8e7e]">{item.meta}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] font-bold text-[#006d34]">₪{item.price.toFixed(2)}</span>
                    <span className="text-[10px] text-[#7f8e7e]">الكمية: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ثالثاً: تفاصيل ملخص عمليات الدفع والرسوم */}
        <section className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(0,109,52,0.02)] border border-[#bbcbba]/20">
          <h3 className="mb-3 text-sm font-bold text-[#006d34]">ملخص الرسوم المالي</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">المجموع الفرعي للوجبات</span>
              <span className="font-mono font-bold text-[#2d3732]">₪{currentOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">رسوم التوصيل</span>
              <span className="font-mono font-bold text-[#2d3732]">₪{currentOrder.deliveryFee.toFixed(2)}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex items-center justify-between text-[#006d34]">
                <span>الخصم المطبق</span>
                <span className="font-mono">- ₪{currentOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 mt-2 font-bold border-t border-dashed border-[#bbcbba]/30 text-[#006d34]">
              <span>إجمالي الفاتورة النهائي</span>
              <span className="font-mono text-base">₪{currentOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* رابعاً: خريطة المعاينة المصغرة للمسار */}
        <div className="h-32 overflow-hidden border shadow-sm rounded-2xl border-[#bbcbba]/20 grayscale opacity-80">
          <img className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZEn8juJJamZi2psisQo_Mkpib_udnUjbL0uP6naqWtXYrIuxoDtuhHVlTLvvuvQaQUriawAv-nve9cvb9SuRVheDri-sBJWgk74kbKUvGJZbJmCuxEL8oAhLfu6KzPxPSLoYEN94LfNBuexJlc1bUBevDvHj-u-qCY5wRPQfbQCA9wURVvMEEIsNy2xoGnI5F5zGu493VzUkfxHBqS0izYtY0nN-eECNQr_399SOdRlX8oi9vDn0watuzCBhSgPKuq7f0C7eypw8" alt="خريطة المسار المصغرة للتوصيل" />
        </div>

      </main>

      {/* شريط الإرسال وتأكيد الفاتورة السفلي الثابت */}
      <footer className="fixed bottom-28 left-4 right-4 max-w-[26rem] mx-auto bg-white/95 backdrop-blur-md p-4 shadow-[0px_-8px_30px_rgba(0,109,52,0.05)] border border-[#bbcbba]/30 z-40 rounded-2xl">
        <div className="flex items-end justify-between px-1 mb-4">
          <div className="text-right">
            <p className="text-[11px] font-bold text-[#7f8e7e]">إجمالي المبلغ النهائي</p>
            <p className="mt-1 font-mono text-xl font-extrabold leading-none text-[#006d34]">₪{currentOrder.total.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[#2d3732] text-xs font-bold bg-slate-50 px-2.5 py-1.5 rounded-full border border-[#bbcbba]/10">
            <span className="text-base text-[#006d34] material-symbols-outlined">account_balance_wallet</span>
            <span>الدفع {currentOrder.paymentMethod === 'cod' ? 'عند الاستلام' : 'ببطاقة ائتمان'}</span>
          </div>
        </div>

        {/* زر التفاعل الذكي المتغير حسب الحالة */}
        {isProcessing ? (
          <button disabled className="w-full h-14 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white shadow-[0px_8px_20px_rgba(0,210,106,0.2)]">
            <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>جاري إرسال طلبك الآن...</span>
          </button>
        ) : (
          <button
            onClick={handleConfirmOrder}
            className="w-full h-14 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white shadow-[0px_8px_20px_rgba(0,210,106,0.2)] active:scale-[0.98]"
          >
            <span>تأكيد وإرسال الطلب</span>
            <span className="text-xl transform rotate-180 material-symbols-outlined">chevron_right</span>
          </button>
        )}
      </footer>

    </div>
  );
}
