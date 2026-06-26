'use client';

import { useState } from 'react';
import Link from 'next/link';
export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState('bop'); // bop | jawwal | paypal | cash
  const [copiedText, setCopiedText] = useState(false);
  const [notes, setNotes] = useState('');

  // دالة نسخ أرقام الحسابات إلى الحافظة
  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    // تم زيادة الـ pb-52 حتى نضمن عدم تداخل تفاصيل وملاحظات الطلب مع الـ TabBar الثابت في الأسفل
    <div className="relative flex flex-col max-w-md min-h-screen mx-auto bg-[#F8FAFC] text-[#2d3732] pb-52 font-cairo" dir="rtl">

      {/* شريط التطبيق العلوي */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-white/90 backdrop-blur-md shadow-[0px_4px_20px_rgba(0,109,52,0.03)] flex flex-row justify-between items-center px-4 h-16 border-b border-[#bbcbba]/10">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#006d34]/5 transition-colors active:scale-95 duration-150 text-[#006d34]">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-[#006d34]">اختر طريقة الدفع</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-[#006d34]">3/3</span>
        </div>
      </header>

      {/* المحتوى الرئيسي للعمليات والبطاقات المخصصة للفواتير */}
      <main className="flex-1 px-4 pt-6 mt-16 space-y-6 overflow-y-auto no-scrollbar">

        {/* بطاقة ملخص الطلب بالألوان المتناسقة المحددة سابقاً */}
        <section className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,109,52,0.02)] p-4 border border-[#bbcbba]/20 space-y-4">
          <h2 className="text-sm font-bold text-[#006d34] flex items-center gap-2">
            <span className="text-lg material-symbols-outlined">receipt</span>
            ملخص مالي مبدئي
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">إجمالي المنتجات والوجبات</span>
              <span className="font-bold text-[#2d3732] font-mono">₪٢٠.٠٠</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7f8e7e]">رسوم خدمة التوصيل</span>
              <span className="font-bold text-[#2d3732] font-mono">₪٥.٠٠</span>
            </div>
            <div className="pt-3 border-t border-dashed border-[#bbcbba]/30 flex justify-between items-center">
              <span className="font-bold text-[#2d3732] text-sm">المجموع النهائي المطلوب</span>
              <span className="text-[#006d34] font-extrabold text-lg font-mono">₪٢٥.٠٠</span>
            </div>
          </div>
        </section>

        {/* قسم طرق الدفع المحسّنة تفاعلياً */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#006d34] px-1">طرق الدفع الإلكترونية والمحلية المتاحة</h2>
          <div className="space-y-3">

            {/* خيار 1: بنك فلسطين */}
            <div
              onClick={() => setSelectedMethod('bop')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'bop'
                  ? 'border-[#006d34] bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.04)]'
                  : 'border-[#bbcbba]/20 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 border border-[#bbcbba]/10 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <img className="object-contain w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAiDXX4n5KMYKNf89RAFCarQ8NQ2MCe2S7KQkH0bWsliDI1PtXE9Xi8x3p9EJ5Vf7FOVQT4TKfQo9Pu0Cq3uu0pzTegkKIgPqOpJ_ktxNx_03zgs5tNTZdfzpjEw8qLWTllwojmubrz-NWr-h5BqXbzpYAK8_ixsl8TxBjYULLglyj9pPvFO5HsavKkGbKRlgfLkpJ1UpvEDHw6GxmDyOppXnEafxmQSs9QtxVK2tPeg0dLdyIN3VoDnnaY1Rr9DEnQiGQaE0TF70" alt="بنك فلسطين" />
                  </div>
                  <span className="font-bold text-xs text-[#2d3732]">حساب بنك فلسطين</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'bop' ? 'border-[#006d34]' : 'border-[#bbcbba]'
                }`}>
                  {selectedMethod === 'bop' && <div className="w-2.5 h-2.5 rounded-full bg-[#006d34]" />}
                </div>
              </div>

              {/* تفاصيل بنك فلسطين التوسعية */}
              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'bop' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-slate-50 border border-[#bbcbba]/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#7f8e7e]">رقم الحساب للتحويل المباشر</span>
                      <span className="font-bold font-mono text-xs text-[#2d3732] tracking-wider mt-0.5">20</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('20', e)}
                      className="bg-[#006d34]/10 text-[#006d34] px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>{copiedText ? 'تم النسخ' : 'نسخ الحساب'}</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-[#bbcbba]/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-[#006d34]/5 transition-colors">
                    <span className="material-symbols-outlined text-[#006d34] text-2xl">photo_camera</span>
                    <p className="text-[11px] font-bold text-[#2d3732]">إرفاق صورة أو لقطة شاشة لوصل الدفع</p>
                    <p className="text-[9px] text-[#7f8e7e]">اضغط هنا لتحديث الملف أو الصورة المرفقة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* خيار 2: محفظة جوال بي (Jawwal Pay) */}
            <div
              onClick={() => setSelectedMethod('jawwal')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'jawwal'
                  ? 'border-[#006d34] bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.04)]'
                  : 'border-[#bbcbba]/20 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 border shadow-sm bg-amber-400/10 border-amber-400/20 rounded-xl shrink-0">
                    <img className="object-contain w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCus_yHMMsYkD_CTbvzeiNsDgubTjblRla9Pj9uKyvUnaqF-20xfMkc-Hs5PHjPGGxmemR6Rvu7WOsMFKO1c4me9bzCAfGfq6HhkP_5m-1ZlDhuzGwg_YjP60zDRtphUmMLFSo9lBGt5o6YGZjaKZ50xVNKbJagtS72WM_mBMRYZhZcOaAepEEjya8TfDuiecZCd1HHCBSAbkiwCCLBGDxMsRzOhBA9Kmn_uitSlVBqcZdiWAbb4Qq47e4BAA5WgdB8PYt45bqiYKw" alt="جوال بي" />
                  </div>
                  <span className="font-bold text-xs text-[#2d3732]">المحفظة الإلكترونية (جوال بي)</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'jawwal' ? 'border-[#006d34]' : 'border-[#bbcbba]'
                }`}>
                  {selectedMethod === 'jawwal' && <div className="w-2.5 h-2.5 rounded-full bg-[#006d34]" />}
                </div>
              </div>

              {/* تفاصيل جوال بي */}
              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'jawwal' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-slate-50 border border-[#bbcbba]/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#7f8e7e]">رقم المحفظة المستهدفة للتحويل</span>
                      <span className="font-bold font-mono text-xs text-[#2d3732] tracking-wider mt-0.5">0597747128</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('0597747128', e)}
                      className="bg-[#006d34]/10 text-[#006d34] px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>{copiedText ? 'تم النسخ' : 'نسخ الرقم'}</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-[#bbcbba]/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-[#006d34]/5 transition-colors">
                    <span className="material-symbols-outlined text-[#006d34] text-2xl">cloud_upload</span>
                    <p className="text-[11px] font-bold text-[#2d3732]">تحميل وصل التحويل المباشر من التطبيق</p>
                    <p className="text-[9px] text-[#7f8e7e]">PNG، JPG بحد أقصى 5 ميجابايت</p>
                  </div>
                </div>
              </div>
            </div>

            {/* خيار 3: بايبال */}
            <div
              onClick={() => setSelectedMethod('paypal')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'paypal'
                  ? 'border-[#006d34] bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.04)]'
                  : 'border-[#bbcbba]/20 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 border border-blue-100 shadow-sm bg-blue-50 rounded-xl shrink-0">
                    <img className="object-contain w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Xaqa2K9MSJEqfj4yOmSBIkZXyNCB5L0FsAdv4iMDf89lj1lznVMzTzbxlb1ytGUtTIzjX7XeUyWdahnEsiaiNsMUw48oqcnQILMSj8a2rWSNyp20pFZASR1kRg95FAzFq1DYcjbr4Zg7tlI0SfLfbKCQI0BxiZv2dM987YzCIm9_99a14eYQwZ-FkuijrPLeK9TvLMPTXw9zay2m3fJy-evMkdBeYd9kaA9BQRJ9UVGACrR_CkN22jzHYTXOTGACQq-ZM7Gm6p8" alt="بايبال" />
                  </div>
                  <span className="font-bold text-xs text-[#2d3732]">حساب بايبال المعتمد (PayPal)</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'paypal' ? 'border-[#006d34]' : 'border-[#bbcbba]'
                }`}>
                  {selectedMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-[#006d34]" />}
                </div>
              </div>

              {/* تفاصيل حساب بايبال */}
              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'paypal' ? 'max-h-56 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-1 space-y-3">
                  <div className="bg-slate-50 border border-[#bbcbba]/10 p-3 rounded-xl flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#7f8e7e]">البريد الإلكتروني للإرسال</span>
                      <span className="font-bold font-mono text-xs text-[#2d3732] mt-0.5">0597747128</span>
                    </div>
                    <button
                      onClick={(e) => copyToClipboard('0597747128', e)}
                      className="bg-[#006d34]/10 text-[#006d34] px-2.5 py-1.5 rounded-lg active:scale-90 transition-transform flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span className="text-sm material-symbols-outlined">{copiedText ? 'check' : 'content_copy'}</span>
                      <span>نسخ الحساب</span>
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-[#bbcbba]/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 bg-slate-50">
                    <span className="material-symbols-outlined text-[#006d34] text-2xl">upload_file</span>
                    <p className="text-[11px] font-bold text-[#2d3732]">أرفق إشعار تحويل الأموال وصورة المعاملة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* خيار 4: الدفع نقداً عند الاستلام */}
            <div
              onClick={() => setSelectedMethod('cash')}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                selectedMethod === 'cash'
                  ? 'border-[#006d34] bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.04)]'
                  : 'border-[#bbcbba]/20 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 border border-[#bbcbba]/10 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[#006d34] text-xl">payments</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#2d3732]">الدفع نقداً بالكامل</span>
                    <p className="text-[10px] text-[#7f8e7e]">عند استلام وجبتك الفورية</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'cash' ? 'border-[#006d34]' : 'border-[#bbcbba]'
                }`}>
                  {selectedMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-[#006d34]" />}
                </div>
              </div>

              {/* تفاصيل كاش للتسليم */}
              <div className={`transition-all duration-300 overflow-hidden ${selectedMethod === 'cash' ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-[#005426] bg-[#00d26a]/10 p-3 rounded-xl border-r-4 border-[#006d34] font-medium">
                  يرجى تسليم المبلغ المالي يداً بيد للكابتن المندوب عند استلام طلب الشحنة بالكامل وبأمان.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* قسم تدوين ملاحظات وتعليمات العميل الإضافية */}
        <section className="space-y-2">
          <label className="text-xs font-bold text-[#006d34] px-1" htmlFor="notes">ملاحظات وتعليمات كابتن التوصيل (اختياري)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white border border-[#bbcbba]/30 rounded-2xl shadow-[0px_4px_20px_rgba(0,109,52,0.01)] focus:border-[#006d34] focus:ring-0 p-4 text-xs font-medium text-[#2d3732] placeholder:text-[#7f8e7e]/50 outline-none"
            placeholder="اكتب اسم العمارة، رقم الشقة، أو تفاصيل لسهولة الوصول من المندوب..."
            rows={3}
          />
        </section>

      </main>

      {/* شريط تأكيد العمليات النهائي - تم تعديل تموضعه ليكون طائراً في bottom-28 لحمايته من الـ TabBar */}
      <footer className="fixed bottom-28 left-4 right-4 max-w-[26rem] mx-auto bg-white/95 backdrop-blur-md p-4 shadow-[0px_-8px_30px_rgba(0,109,52,0.05)] border border-[#bbcbba]/30 z-40 rounded-2xl">
        <Link
                  href="/OrderConfirmed" className="w-full h-14 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white rounded-xl font-bold text-sm shadow-[0px_8px_20px_rgba(0,210,106,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span>تأكيد عمليات الدفع والطلب</span>
          <span className="text-lg material-symbols-outlined">check_circle</span>
        </Link>
      </footer>

    </div>
  );
}