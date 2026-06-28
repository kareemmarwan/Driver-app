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
      <div className="min-h-screen bg-[#F8FAFC] pb-32" dir="rtl">
        <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 flex justify-between items-center px-4 h-16 bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.03)] border-b border-[#bbcbba]/10">
          <button onClick={() => router.back()} className="p-2 transition-colors transition-transform rounded-full hover:bg-[#006d34]/5 active:scale-95 text-[#2d3732]">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-[#006d34]">سلة المشتريات</h1>
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
    // زيادة pb-36 إلى pb-52 لمنع المحتوى من الاختفاء خلف الـ TabBar الثابت في أسفل التطبيق
    <div className="relative flex flex-col max-w-md min-h-screen mx-auto bg-[#F8FAFC] text-[#2d3732] pb-52 font-cairo" dir="rtl">

      {/* شريط التطبيق العلوي */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 flex justify-between items-center px-4 h-16 bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.03)] border-b border-[#bbcbba]/10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 transition-colors transition-transform rounded-full hover:bg-[#006d34]/5 active:scale-95 text-[#2d3732]">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-[#006d34]">سلة المشتريات</h1>
        </div>
        <button className="p-2 transition-colors transition-transform rounded-full hover:bg-[#006d34]/5 active:scale-95 text-[#006d34]">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* المحتوى الرئيسي لعملية الطلب والدفع */}
      <main className="flex-1 px-4 py-4 mt-16 space-y-6 overflow-y-auto no-scrollbar">

        {/* قسم تفاصيل وعناصر الطلب */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#006d34]">تفاصيل الطلب</h2>
            <span className="text-xs font-medium text-[#7f8e7e]">{cartItems.length} وجبات</span>
          </div>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-2xl shadow-[0px_4px_20px_rgba(0,109,52,0.02)] border border-[#bbcbba]/20 flex items-center gap-4">
                <div className="w-20 h-20 overflow-hidden rounded-xl bg-slate-50 border border-[#bbcbba]/10 shrink-0">
                  <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate text-[#2d3732]">{item.name}</h3>
                  <p className="text-[#7f8e7e] text-[11px] mt-0.5">{item.meta}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#006d34]">₪{item.price.toFixed(2)}</span>

                    {/* متحكم زيادة ونقصان كمية الوجبة متناسق مع الأخضر */}
                    <div className="flex items-center gap-3 px-2.5 py-1 rounded-full bg-slate-50 border border-[#bbcbba]/10">
                      <button
                        onClick={() => updateQuantity(item.id, false)}
                        className="flex items-center justify-center w-6 h-6 font-bold text-[#006d34] transition-transform active:scale-75"
                      >
                        <span className="text-base material-symbols-outlined">remove</span>
                      </button>
                      <span className="text-xs font-bold text-[#2d3732]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, true)}
                        className="flex items-center justify-center w-6 h-6 font-bold text-[#006d34] transition-transform active:scale-75"
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

        {/* قسم عنوان التوصيل الفعلي للمستخدم */}
        <section>
          <h2 className="mb-3 text-sm font-bold text-[#006d34]">عنوان التوصيل</h2>
          <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,109,52,0.02)] border border-[#bbcbba]/20 overflow-hidden">
            {/* خريطة مصغرة افتراضية للموقع */}
            <div className="relative w-full h-32 bg-slate-100">
              <div
                className="w-full h-full bg-center bg-cover grayscale opacity-80"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAg6MgwC-9MEHTtrlVO3EH4sxXu-G48bZx9DEa1duWqqCHSoDOXxvBf3iZBhlA5bzEbMNS2s9WdsAb_oDhv8hKqn8PKap0lUMCmMaZTc-hE-y3yjRRvdn33FVJmZhtrRSe9MC67lBXuhMP4dO86VvvvRK_A9NKtBcrG6hJuocMice-R21T-H07nGe9zqtaH4esyASu-HDc2UGOIz3IZuRhCDyYdPLfofJrZeaR1h0VZqacfiOn3xZXWRkI9XDEQP8kD9QwjoTuOHE')` }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="bg-[#006d34] p-2.5 rounded-full shadow-lg shadow-[#006d34]/20">
                  <span className="text-xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <span className="material-symbols-outlined text-[#7f8e7e] mt-0.5">home</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#2d3732]">المنزل</h4>
                <p className="text-[#7f8e7e] text-xs mt-0.5 leading-relaxed">غزة، شارع الرمال، عمارة رقم ٤٥، الطابق الثالث</p>
              </div>
              <Link
          href="/LocationPicker" className="text-xs font-bold text-[#006d34] hover:opacity-80 shrink-0">تغيير العنوان</Link>
            </div>
          </div>
        </section>

        {/* قسم طرق الدفع المتاحة ملوّن بالأخضر المعتمد */}
        <section>
          <h2 className="mb-3 text-sm font-bold text-[#006d34]">طريقة الدفع</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('cod')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                paymentMethod === 'cod'
                  ? "border-[#006d34] bg-[#006d34]/5 text-[#006d34] font-bold"
                  : "border-[#bbcbba]/20 bg-white text-[#7f8e7e] hover:bg-slate-50"
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
                  ? "border-[#006d34] bg-[#006d34]/5 text-[#006d34] font-bold"
                  : "border-[#bbcbba]/20 bg-white text-[#7f8e7e] hover:bg-slate-50"
              }`}
            >
              <span className="mb-2 text-2xl material-symbols-outlined" style={{ fontVariationSettings: ` 'FILL' ${paymentMethod === 'card' ? 1 : 0} ` }}>
                credit_card
              </span>
              <span className="text-xs font-medium">بطاقة ائتمان / فيزا</span>
            </button>
          </div>
        </section>

        {/* حقل إدخال قسيمة ورمز الخصم */}
        <section>
          <div className="relative flex items-center">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full pl-28 pr-4 text-sm text-right border outline-none h-14 bg-white border-[#bbcbba]/30 rounded-xl focus:border-[#006d34] focus:ring-0"
              placeholder="أدخل كود الخصم (كوبون)"
              type="text"
            />
            <button
              onClick={() => setIsPromoApplied(true)}
              className="absolute px-4 text-xs font-bold transition-all h-10 rounded-lg left-2 top-2 bottom-2 bg-[#006d34]/10 text-[#006d34] hover:bg-[#006d34]/20"
            >
              تطبيق الأكواد
            </button>
          </div>
        </section>

        {/* الفاتورة وتلخيص الحساب النهائي للفاتورة */}
        <section className="p-4 border bg-white rounded-xl border-[#bbcbba]/20 shadow-[0px_4px_20px_rgba(0,109,52,0.01)]">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">المجموع الفرعي للوجبات</span>
              <span className="font-bold text-[#2d3732]">₪{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">رسوم توصيل المندوب</span>
              <span className="font-bold text-[#2d3732]">₪{deliveryFee.toFixed(2)}</span>
            </div>
            {isPromoApplied && (
              <div className="flex items-center justify-between text-[#006d34]">
                <span>خصم الكوبون المطبق</span>
                <span className="font-bold">- ₪{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-3 mt-3 text-base border-t border-dashed border-[#bbcbba]/30">
              <span className="font-bold text-[#2d3732]">إجمالي الفاتورة النهائي</span>
              <span className="text-lg font-extrabold text-[#006d34]">₪{total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* شريط الدفع السفلي الطائر الثابت المرفوع فوق الـ TabBar */}
      <footer className="fixed bottom-28 left-4 right-4 max-w-[26rem] mx-auto bg-white/95 backdrop-blur-md p-4 shadow-[0px_-8px_30px_rgba(0,109,52,0.05)] border border-[#bbcbba]/30 z-40 rounded-2xl">
        <div className="flex items-center justify-between px-1 mb-3">
          <div>
            <p className="text-[10px] font-bold text-[#7f8e7e] text-right">المبلغ الإجمالي المطلوب</p>
            <p className="text-xl font-extrabold text-[#006d34] font-mono mt-0.5">₪{total.toFixed(2)}</p>
          </div>
          <div className="text-left">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#00d26a]/10 text-[#006d34] font-bold">
              {paymentMethod === 'cod' ? 'نقداً عند الاستلام' : 'بطاقة ائتمان'}
            </span>
          </div>
        </div>

        {/* زر الانتقال الملون بالتدرج اللوني المتوافق مع شريط التحكم الرئيسي */}
        <button
          onClick={handleProceedToOrder}
          className="w-full h-14 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0px_8px_20px_rgba(0,210,106,0.2)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>الانتقال لتأكيد الطلب</span>
          <span className="text-xl transform rotate-180 material-symbols-outlined">chevron_right</span>
        </button>
      </footer>

    </div>
  );
}

// 'use client';

// import { useState } from 'react';

// // قائمة العناصر الافتراضية داخل سلة المشتريات مترجمة للعربية
// const INITIAL_ITEMS = [
//   {
//     id: 1,
//     name: 'لفافة دجاج بالزعتر والبهارات',
//     meta: 'صوص إضافي، بدون بصل',
//     price: 45.00,
//     quantity: 1,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqY8R1dlKX28szKvlNi5j8s6p2Njr5GwhJbWXj-dNmS52v1Mu4OrGx8H7K2WNk5RQybeU3rpbiZZfWtWkfLyosFQm_2tvqZLlGMWCVhlh0yUkzbE-7DpQmu_1-GN1AikWRkm2v2DIgZmo3ExrFpaElIGUkJj5XP9d8A3ZDesxOAPIxGlxX6dFq6KN00JUKnmY5vM_NZygq4w-hujEWSsXH1EVxEtFAon8YcY2XLxVle0LNaDPU8_Q2mLwH5NWhAgNTW6lBx9Wbkaw'
//   },
//   {
//     id: 2,
//     name: 'سلطة غزة الخضراء البلدية',
//     meta: 'حجم كبير عائلي',
//     price: 28.00,
//     quantity: 2,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY1AT5rlb0rm_nUxho964uSn73A9doV7cZQO56AuwvBQTcHzRqY8_DZw0K47AfH4rbtdcETZxM-30Rk7b7bzu-lz5GHR9wUEqEMhd_HxGEpBsrW5FpLuFmxy8dvoGjn-EO2HnWgYmbkLMdJhes7tn1EopDRodxzbdGLIxAxkkk8FX4sswjk2N6nwfSbGurh42xYrHW-IlBz8opODLQTBZwezEKJL-hMYv2lfmSpiqwB30lAeg3seifPnYXf52PRpw1gAHm2PI4PYM'
//   }
// ];

// export default function Cart() {
//   const [cartItems, setCartItems] = useState(INITIAL_ITEMS);
//   const [paymentMethod, setPaymentMethod] = useState('cod'); // cod: الدفع عند الاستلام، card: بطاقة ائتمان
//   const [promoCode, setPromoCode] = useState('');
//   const [isPromoApplied, setIsPromoApplied] = useState(true);

//   // حساب المجموع الفرعي بناءً على الكميات والأسعار بالشيكل
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const deliveryFee = 7.00; // رسوم التوصيل الافتراضية بالشيكل
//   const discount = isPromoApplied ? 15.00 : 0.00; // قيمة الخصم المسجلة
//   const total = subtotal + deliveryFee - discount;

//   // تحديث كميات المنتجات داخل السلة
//   const updateQuantity = (id: number, increment: boolean) => {
//     setCartItems(prevItems =>
//       prevItems.map(item => {
//         if (item.id === id) {
//           const newQty = increment ? item.quantity + 1 : item.quantity - 1;
//           return newQty > 0 ? { ...item, quantity: newQty } : item;
//         }
//         return item;
//       })
//     );
//   };

//   return (
//     <div className="relative flex flex-col max-w-md min-h-screen mx-auto bg-background text-on-surface pb-36 font-cairo">

//       {/* شريط التطبيق العلوي */}
//       <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-50 flex justify-between items-center px-4 h-16 bg-surface shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
//         <div className="flex items-center gap-4">
//           <button className="p-2 transition-colors transition-transform rounded-full hover:bg-surface-variant active:scale-95 text-on-surface">
//             <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
//           </button>
//           <h1 className="text-xl font-bold text-on-surface">سلة المشتريات</h1>
//         </div>
//         <button className="p-2 transition-colors transition-transform rounded-full hover:bg-surface-variant active:scale-95 text-primary">
//           <span className="material-symbols-outlined">notifications</span>
//         </button>
//       </header>

//       {/* المحتوى الرئيسي لعملية الطلب والدفع */}
//       <main className="flex-1 px-4 py-4 mt-16 space-y-6 overflow-y-auto no-scrollbar">

//         {/* قسم تفاصيل وعناصر الطلب */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-base font-bold text-on-surface">تفاصيل الطلب</h2>
//             <span className="text-xs font-medium text-secondary">{cartItems.length} وجبات</span>
//           </div>
//           <div className="space-y-3">
//             {cartItems.map((item) => (
//               <div key={item.id} className="bg-surface-container-lowest p-3 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/20 flex items-center gap-4">
//                 <div className="w-20 h-20 overflow-hidden rounded-xl bg-surface-container shrink-0">
//                   <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-sm font-bold truncate text-on-surface">{item.name}</h3>
//                   <p className="text-secondary text-[11px] mt-0.5">{item.meta}</p>

//                   <div className="flex items-center justify-between mt-3">
//                     <span className="text-sm font-bold text-primary">₪{item.price.toFixed(2)}</span>
//                     {/* متحكم زيادة ونقصان كمية الوجبة */}
//                     <div className="flex items-center gap-3 px-2 py-1 rounded-full bg-surface-container">
//                       <button
//                         onClick={() => updateQuantity(item.id, false)}
//                         className="flex items-center justify-center w-6 h-6 font-bold text-primary active:scale-70"
//                       >
//                         <span className="text-base material-symbols-outlined">remove</span>
//                       </button>
//                       <span className="text-xs font-bold text-on-surface">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, true)}
//                         className="flex items-center justify-center w-6 h-6 font-bold text-primary active:scale-70"
//                       >
//                         <span className="text-base material-symbols-outlined">add</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* قسم عنوان التوصيل الفعلي للمستخدم */}
//         <section>
//           <h2 className="mb-3 text-base font-bold text-on-surface">عنوان التوصيل</h2>
//           <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/20 overflow-hidden">
//             {/* خريطة مصغرة افتراضية للموقع */}
//             <div className="relative w-full h-32 bg-surface-container-high">
//               <div
//                 className="w-full h-full bg-center bg-cover"
//                 style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAg6MgwC-9MEHTtrlVO3EH4sxXu-G48bZx9DEa1duWqqCHSoDOXxvBf3iZBhlA5bzEbMNS2s9WdsAb_oDhv8hKqn8PKap0lUMCmMaZTc-hE-y3yjRRvdn33FVJmZhtrRSe9MC67lBXuhMP4dO86VvvvRK_A9NKtBcrG6hJuocMice-R21T-H07nGe9zqtaH4esyASu-HDc2UGOIz3IZuRhCDyYdPLfofJrZeaR1h0VZqacfiOn3xZXWRkI9XDEQP8kD9QwjoTuOHE')` }}
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black/5">
//                 <div className="bg-primary p-2.5 rounded-full shadow-lg">
//                   <span className="text-xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
//                     location_on
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-4">
//               <span className="material-symbols-outlined text-secondary mt-0.5">home</span>
//               <div className="flex-1 min-w-0">
//                 <h4 className="text-sm font-bold text-on-surface">المنزل</h4>
//                 <p className="text-secondary text-xs mt-0.5 leading-relaxed">غزة، شارع الرمال، عمارة رقم ٤٥، الطابق الثالث</p>
//               </div>
//               <button className="text-xs font-bold text-primary hover:opacity-80 shrink-0">تغيير العنوان</button>
//             </div>
//           </div>
//         </section>

//         {/* قسم طرق الدفع المتاحة */}
//         <section>
//           <h2 className="mb-3 text-base font-bold text-on-surface">طريقة الدفع</h2>
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               onClick={() => setPaymentMethod('cod')}
//               className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
//                 paymentMethod === 'cod'
//                   ? "border-primary bg-primary/5 text-primary font-bold"
//                   : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant"
//               }`}
//             >
//               <span className="mb-2 text-2xl material-symbols-outlined" style={{ fontVariationSettings: ` 'FILL' ${paymentMethod === 'cod' ? 1 : 0} ` }}>
//                 payments
//               </span>
//               <span className="text-xs font-medium">نقداً عند الاستلام</span>
//             </button>
//             <button
//               onClick={() => setPaymentMethod('card')}
//               className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
//                 paymentMethod === 'card'
//                   ? "border-primary bg-primary/5 text-primary font-bold"
//                   : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant"
//               }`}
//             >
//               <span className="mb-2 text-2xl material-symbols-outlined" style={{ fontVariationSettings: ` 'FILL' ${paymentMethod === 'card' ? 1 : 0} ` }}>
//                 credit_card
//               </span>
//               <span className="text-xs font-medium">بطاقة ائتمان / فيزا</span>
//             </button>
//           </div>
//         </section>

//         {/* حقل إدخال قسيمة ورمز الخصم */}
//         <section>
//           <div className="relative flex items-center">
//             <input
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value)}
//               className="w-full pl-24 pr-4 text-sm text-right border outline-none h-14 bg-surface-container-lowest border-outline-variant rounded-xl focus:border-primary-container focus:ring-0"
//               placeholder="أدخل كود الخصم (كوبون)"
//               type="text"
//             />
//             <button
//               onClick={() => setIsPromoApplied(true)}
//               className="absolute px-4 text-xs font-bold transition-colors rounded-lg left-2 top-2 bottom-2 bg-secondary-container text-on-secondary-container hover:bg-outline-variant"
//             >
//               تطبيق الأكواد
//             </button>
//           </div>
//         </section>

//         {/* الفاتورة وتلخيص الحساب النهائي للفاتورة */}
//         <section className="p-4 border bg-surface-container-low rounded-xl border-outline-variant/10">
//           <div className="space-y-3 text-sm">
//             <div className="flex items-center justify-between">
//               <span className="text-secondary">المجموع الفرعي للوجبات</span>
//               <span className="font-bold text-on-surface">₪{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-secondary">رسوم توصيل المندوب</span>
//               <span className="font-bold text-on-surface">₪{deliveryFee.toFixed(2)}</span>
//             </div>
//             {isPromoApplied && (
//               <div className="flex items-center justify-between text-primary">
//                 <span>خصم الكوبون المطبق</span>
//                 <span className="font-bold">- ₪{discount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex items-center justify-between pt-3 mt-3 text-base border-t border-outline-variant/40">
//               <span className="font-bold text-on-surface">إجمالي الفاتورة النهائي</span>
//               <span className="text-lg font-extrabold text-primary">₪{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </section>
//       </main>



//     </div>
//   );
// }