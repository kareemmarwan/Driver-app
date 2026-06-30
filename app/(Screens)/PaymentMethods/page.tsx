'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/store/orderStore';
import { useCartStore } from '@/lib/store/cartStore';
export default function PaymentMethods() {
  const router = useRouter();
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const setCurrentOrder = useOrderStore((s) => s.setCurrentOrder);
  const clearCart = useCartStore((s) => s.clearCart);
  const [selectedMethod, setSelectedMethod] = useState('bop');
  const [copiedText, setCopiedText] = useState(false);
  const [notes, setNotes] = useState('');

  const handleConfirmPayment = () => {
    if (currentOrder) {
      setCurrentOrder({ ...currentOrder, paymentMethod: selectedMethod, notes });
    }
    clearCart();
    router.push('/OrderConfirmed');
  };

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className="relative flex flex-col max-w-md min-h-screen mx-auto bg-background text-text-primary" dir="rtl">

      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-white/90 backdrop-blur-md shadow-sm flex flex-row justify-between items-center px-4 h-16 border-b border-border">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 duration-150 text-primary">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-primary">اختر طريقة الدفع</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-primary">3/3</span>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 mt-16 space-y-6 overflow-y-auto no-scrollbar">

        <section className="bg-white rounded-2xl shadow-sm p-4 border border-border space-y-4">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="text-lg material-symbols-outlined">receipt</span>
            ملخص مالي مبدئي
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">إجمالي المنتجات والوجبات</span>
              <span className="font-bold text-text-primary font-mono">₪{currentOrder?.subtotal.toFixed(2) || '٠.٠٠'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">رسوم خدمة التوصيل</span>
              <span className="font-bold text-text-primary font-mono">₪{currentOrder?.deliveryFee.toFixed(2) || '٠.٠٠'}</span>
            </div>
            {currentOrder && currentOrder.discount > 0 && (
              <div className="flex items-center justify-between text-primary">
                <span>الخصم المطبق</span>
                <span className="font-mono">- ₪{currentOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-dashed border-border/30 flex justify-between items-center">
              <span className="font-bold text-text-primary text-sm">المجموع النهائي المطلوب</span>
              <span className="text-primary font-extrabold text-lg font-mono">₪{currentOrder?.total.toFixed(2) || '٠.٠٠'}</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-primary px-1">طرق الدفع الإلكترونية والمحلية المتاحة</h2>
          <div className="space-y-3">

            <div
              onClick={() => setSelectedMethod('bop')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'bop'
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-border/20 bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface border border-border/10 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <img className="object-contain w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAiDXX4n5KMYKNf89RAFCarQ8NQ2MCe2S7KQkH0bWsliDI1PtXE9Xi8x3p9EJ5Vf7FOVQT4TKfQo9Pu0Cq3uu0pzTegkKIgPqOpJ_ktxNx_03zgs5tNTZdfzpjEw8qLWTllwojmubrz-NWr-h5BqXbzpYAK8_ixsl8TxBjYULLglyj9pPvFO5HsavKkGbKRlgfLkpJ1UpvEDHw6GxmDyOppXnEafxmQSs9QtxVK2tPeg0dLdyIN3VoDnnaY1Rr9DEnQiGQaE0TF70" alt="بنك فلسطين" />
                  </div>
                  <span className="font-bold text-xs text-text-primary">حساب بنك فلسطين</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'bop' ? 'border-primary' : 'border-border'
                }`}>
                  {selectedMethod === 'bop' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'bop' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-surface border border-border/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-secondary">رقم الحساب للتحويل المباشر</span>
                      <span className="font-bold font-mono text-xs text-text-primary tracking-wider mt-0.5">20</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('20', e)}
                      className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>{copiedText ? 'تم النسخ' : 'نسخ الحساب'}</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-border/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-surface hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">photo_camera</span>
                    <p className="text-[11px] font-bold text-text-primary">إرفاق صورة أو لقطة شاشة لوصل الدفع</p>
                    <p className="text-[9px] text-text-secondary">اضغط هنا لتحديث الملف أو الصورة المرفقة</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedMethod('jawwal')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'jawwal'
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-border/20 bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 border shadow-sm bg-amber-400/10 border-amber-400/20 rounded-xl shrink-0">
                    <img className="object-contain w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCus_yHMMsYkD_CTbvzeiNsDgubTjblRla9Pj9uKyvUnaqF-20xfMkc-Hs5PHjPGGxmemR6Rvu7WOsMFKO1c4me9bzCAfGfq6HhkP_5m-1ZlDhuzGwg_YjP60zDRtphUmMLFSo9lBGt5o6YGZjaKZ50xVNKbJagtS72WM_mBMRYZhZcOaAepEEjya8TfDuiecZCd1HHCBSAbkiwCCLBGDxMsRzOhBA9Kmn_uitSlVBqcZdiWAbb4Qq47e4BAA5WgdB8PYt45bqiYKw" alt="جوال بي" />
                  </div>
                  <span className="font-bold text-xs text-text-primary">المحفظة الإلكترونية (جوال بي)</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'jawwal' ? 'border-primary' : 'border-border'
                }`}>
                  {selectedMethod === 'jawwal' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'jawwal' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-surface border border-border/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-secondary">رقم المحفظة المستهدفة للتحويل</span>
                      <span className="font-bold font-mono text-xs text-text-primary tracking-wider mt-0.5">0597747128</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('0597747128', e)}
                      className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>{copiedText ? 'تم النسخ' : 'نسخ الرقم'}</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-border/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-surface hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                    <p className="text-[11px] font-bold text-text-primary">تحميل وصل التحويل المباشر من التطبيق</p>
                    <p className="text-[9px] text-text-secondary">PNG، JPG بحد أقصى 5 ميجابايت</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedMethod('paypal')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'paypal'
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-border/20 bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 border border-blue-100 shadow-sm bg-blue-50 rounded-xl shrink-0">
                    <img className="object-contain w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Xaqa2K9MSJEqfj4yOmSBIkZXyNCB5L0FsAdv4iMDf89lj1lznVMzTzbxlb1ytGUtTIzjX7XeUyWdahnEsiaiNsMUw48oqcnQILMSj8a2rWSNyp20pFZASR1kRg95FAzFq1DYcjbr4Zg7tlI0SfLfbKCQI0BxiZv2dM987YzCIm9_99a14eYQwZ-FkuijrPLeK9TvLMPTXw9zay2m3fJy-evMkdBeYd9kaA9BQRJ9UVGACrR_CkN22jzHYTXOTGACQq-ZM7Gm6p8" alt="بايبال" />
                  </div>
                  <span className="font-bold text-xs text-text-primary">حساب بايبال المعتمد (PayPal)</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'paypal' ? 'border-primary' : 'border-border'
                }`}>
                  {selectedMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'paypal' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-surface border border-border/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-secondary">البريد الإلكتروني للإرسال</span>
                      <span className="font-bold font-mono text-xs text-text-primary mt-0.5">0597747128</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('0597747128', e)}
                      className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>نسخ الحساب</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-border/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-surface">
                    <span className="material-symbols-outlined text-primary text-2xl">upload_file</span>
                    <p className="text-[11px] font-bold text-text-primary">أرفق إشعار تحويل الأموال وصورة المعاملة</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedMethod('cash')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'cash'
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-border/20 bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface border border-border/10 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">payments</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-text-primary">الدفع نقداً بالكامل</span>
                    <p className="text-[10px] text-text-secondary">عند استلام وجبتك الفورية</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'cash' ? 'border-primary' : 'border-border'
                }`}>
                  {selectedMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'cash' ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-primary bg-primary-light p-3 rounded-xl border-r-4 border-primary font-medium">
                  يرجى تسليم المبلغ المالي يداً بيد للكابتن المندوب عند استلام طلب الشحنة بالكامل وبأمان.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="space-y-2">
          <label className="text-xs font-bold text-primary px-1" htmlFor="notes">ملاحظات وتعليمات كابتن التوصيل (اختياري)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white border border-border/30 rounded-2xl shadow-sm focus:border-primary focus:ring-0 p-4 text-xs font-medium text-text-primary placeholder:text-text-secondary/50 outline-none"
            placeholder="اكتب اسم العمارة، رقم الشقة، أو تفاصيل لسهولة الوصول من المندوب..."
            rows={3}
          />
        </section>

      </main>

      <footer className="bg-white/95 backdrop-blur-md p-4 mx-4 mb-4 shadow-sm border border-border/30 rounded-2xl">
        <button
          onClick={handleConfirmPayment} className="w-full h-14 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span>تأكيد عمليات الدفع والطلب</span>
          <span className="text-lg material-symbols-outlined">check_circle</span>
        </button>
      </footer>

    </div>
  );
}
