'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipientDetailsPage() {
  const router = useRouter();
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [directHandoff, setDirectHandoff] = useState(true);

  const handleNextStep = () => {
    console.log('الانتقال إلى شاشة ملخص الطلب والتأكيد المالي.');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background text-text-primary flex flex-col relative pb-36">

      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-50 flex justify-between items-center px-4 h-16 bg-white shadow-sm border-b border-border/50">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 text-primary">
            <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-primary">توصيل جديد</h1>
        </div>
        <div className="flex items-center justify-center px-3 py-1 rounded-full bg-primary/5">
          <span className="text-xs font-bold text-primary font-mono">1/3</span>
        </div>
      </header>

      <main className="flex-1 mt-16 px-4 pt-4 space-y-6 overflow-y-auto no-scrollbar">

        <div className="flex gap-2 mt-2">
          <div className="flex-grow h-1 bg-primary rounded-full" />
          <div className="flex-grow h-1 bg-primary rounded-full" />
          <div className="flex-grow h-1 bg-border rounded-full" />
        </div>

        <section>
          <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI3WSTP2odKtW4RjLAwN0S9XQbn27xuZG7h0l4SIW3kKcnY3xRknVKe7iCZ2L7ZPYcqmNYVxn-rhCPVRk1vw3vZU65X0IrJ64sfDRgyuiXe4D7cY4RFbHjK-uGRUs_OhcmNKdz8jFMsGIjdf5o8mHhe2tfGasfi6jKyd0isyzpmfduW0O30oFWaGb9xvBQRZH2kq3x61CYzoEFBujNu_vjA1QJRRJ-sB4vD332bXOMD8IRBI_xrqOc78ejoW9AJHX9dfHeyyV4nI')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <div className="text-right">
                <h2 className="text-base font-bold text-white mb-0.5">بيانات الشخص المستلم</h2>
                <p className="text-xs text-white/80">يرجى تزويدنا بموقع التسليم الدقيق وهوية المستلم.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl">person</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">تفاصيل الاتصال</h3>
            </div>

            <div className="space-y-3 text-right">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1 mr-1" htmlFor="recipient_name">
                  اسم المستلم ثنائي أو ثلاثي
                </label>
                <div className="relative flex items-center border border-border/50 bg-white rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 px-4 py-3.5 text-sm placeholder:text-placeholder text-right outline-none"
                    id="recipient_name"
                    placeholder="من الشخص الذي سيستلم الطرد؟"
                    type="text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1 mr-1" htmlFor="phone_number">
                  رقم الجوال الفعال
                </label>
                <div className="relative flex items-center border border-border/50 bg-white rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all" dir="ltr">
                  <div className="flex items-center pl-4 pr-3 border-r border-border/50 text-sm font-bold text-text-secondary font-mono">
                    +970
                  </div>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 px-4 py-3.5 text-sm placeholder:text-placeholder font-mono text-left outline-none"
                    id="phone_number"
                    placeholder="59-XXXX-XXX"
                    type="tel"
                  />
                  <button className="pr-4 text-primary active:scale-95 transition-transform shrink-0">
                    <span className="material-symbols-outlined text-xl">contact_page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl">location_on</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">تفاصيل مكان التسليم</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-right">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1 mr-1" htmlFor="floor">الطابق</label>
                <div className="relative flex items-center border border-border/50 bg-white rounded-xl focus-within:border-primary transition-all">
                  <input className="w-full bg-transparent border-none focus:ring-0 px-4 py-3.5 text-sm placeholder:text-placeholder text-right outline-none" id="floor" placeholder="مثال: الطابق الرابع" type="text" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1 mr-1" htmlFor="apartment">رقم الشقة / المكتب</label>
                <div className="relative flex items-center border border-border/50 bg-white rounded-xl focus-within:border-primary transition-all">
                  <input className="w-full bg-transparent border-none focus:ring-0 px-4 py-3.5 text-sm placeholder:text-placeholder text-right outline-none" id="apartment" placeholder="مثال: شقة رقم ١٢" type="text" />
                </div>
              </div>
            </div>

            <div className="text-right">
              <label className="block text-xs font-bold text-text-secondary mb-1 mr-1" htmlFor="instructions">تعليمات تسليم خاصة للمندوب</label>
              <div className="relative flex items-start border border-border/50 bg-white rounded-xl focus-within:border-primary transition-all">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 px-4 py-3.5 text-sm placeholder:text-placeholder resize-none text-right outline-none"
                  id="instructions"
                  placeholder="أكواد البوابة الأمنية، رن الجرس، اترك الأغراض عند موظف الاستقبال، إلخ."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label
              onClick={() => setLeaveAtDoor(!leaveAtDoor)}
              className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-2xl shadow-sm cursor-pointer active:scale-[0.99] transition-transform select-none"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl">door_front</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">اترك الطلب عند عتبة الباب</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">سيقوم الكابتن بالتقاط صورة فوتوغرافية وإرسالها لك للتأكيد</p>
                </div>
              </div>
              <input
                checked={leaveAtDoor}
                onChange={() => {}}
                className="w-5 h-5 rounded-md border-border/50 text-primary focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </label>

            <label
              onClick={() => setDirectHandoff(!directHandoff)}
              className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-2xl shadow-sm cursor-pointer active:scale-[0.99] transition-transform select-none"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl">notifications_active</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">تسليم يدوي مباشر مشروط</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">يجب على المستلم التوقيع على شاشة الهاتف لاستلام الطرد</p>
                </div>
              </div>
              <input
                checked={directHandoff}
                onChange={() => {}}
                className="w-5 h-5 rounded-md border-border/50 text-primary focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </label>
          </div>

        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border/50 p-4 z-50">
        <button
          onClick={handleNextStep}
          className="w-full h-14 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-all"
        >
          <span>الانتقال لمراجعة ملخص الطلب</span>
          <span className="material-symbols-outlined text-xl transform rotate-180">arrow_forward</span>
        </button>
      </footer>

    </div>
  );
}
