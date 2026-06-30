
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const TIMELINE_STEPS = [
  { id: 1, label: 'تم قبول الطلب', icon: 'check', active: true, current: false },
  { id: 2, label: 'الاستلام من المتجر', icon: 'store', active: true, current: false },
  { id: 3, label: 'تم الاستلام', icon: 'local_mall', active: true, current: false },
  { id: 4, label: 'في الطريق إليك', icon: 'local_shipping', active: true, current: true },
  { id: 5, label: 'تم التسليم', icon: 'home_pin', active: false, current: false },
];

export default function LiveTrackingPage() {
  const router = useRouter();
  const driverRef = useRef<HTMLDivElement>(null);
  const [etaMinutes] = useState(12);
  const [arrivalTime] = useState('06:45 م');
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  const currentStepIndex = TIMELINE_STEPS.findIndex(step => step.current);
  const progressPercentage = (currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100;

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let angle = 0;

    const animateDriver = () => {
      if (driverRef.current) {
        angle += 0.012;
        const x = Math.sin(angle) * 6;
        const y = Math.cos(angle * 0.6) * 3;
        driverRef.current.style.transform = `translate(calc(50% + ${x}px), calc(-50% + ${y}px))`;
      }
      animationRef.current = requestAnimationFrame(animateDriver);
    };

    animationRef.current = requestAnimationFrame(animateDriver);
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-slate-50 text-slate-900" dir="rtl">

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-16 max-w-md px-4 mx-auto border-b shadow-sm bg-white border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-800">طلب رقم #DF-7829</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-[11px] text-slate-500 font-medium">التتبع المباشر نشط الآن</span>
            </div>
          </div>
        </div>
        <button className="relative flex items-center justify-center w-10 h-10 transition-all rounded-full hover:bg-slate-100 active:scale-95 text-slate-700 bg-slate-50/50">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full" />
        </button>
      </header>

      <main className="relative z-0 w-full h-full bg-slate-100">
        <div
          className="w-full h-full transition-opacity duration-500 bg-center bg-cover opacity-85 mix-blend-multiply"
          style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/34.45,31.5,13/800x1200?access_token=mock')`, backgroundColor: '#e5e7eb' }}
        />

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute z-10 flex flex-col items-center translate-x-1/2 -translate-y-1/2 top-1/4 right-1/4">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full shadow-lg bg-primary">
              <span className="text-sm text-white material-symbols-outlined">store</span>
            </div>
            <div className="mt-1.5 px-2 py-0.5 bg-slate-900/90 text-white rounded-md shadow-sm text-[10px] font-bold backdrop-blur-sm">المتجر</div>
          </div>

          <div
            ref={driverRef}
            className="absolute top-[45%] right-1/2 translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-linear z-20"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 duration-1000 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute w-20 h-20 duration-700 rounded-full bg-primary/10 animate-pulse" />
              <div className="flex items-center justify-center text-white border-4 border-white rounded-full shadow-2xl w-14 h-14 bg-primary">
                <span className="text-2xl material-symbols-outlined animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  moped
                </span>
              </div>
            </div>
          </div>

          <div className="absolute z-10 flex flex-col items-center -translate-x-1/2 translate-y-1/2 bottom-1/3 left-1/4">
            <div className="flex items-center justify-center border-2 border-white rounded-full shadow-xl w-9 h-9 bg-primary">
              <span className="text-base font-bold text-white material-symbols-outlined">person_pin_circle</span>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 800" preserveAspectRatio="none">
            <path
              d="M 300,200 C 280,300 150,320 200,360 C 250,400 120,480 100,530"
              fill="none"
              stroke="#EF2B2D"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="animate-[dash_30s_linear_infinite]"
              style={{ strokeDashoffset: 100 }}
            />
          </svg>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 via-transparent to-slate-900/10" />
      </main>

      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white rounded-t-[32px] shadow-[0px_-10px_40px_rgba(15,23,42,0.08)] border-t border-slate-100 transition-all duration-300 ${isSheetExpanded ? 'h-[75vh]' : 'h-auto'}`}>

        <div
          className="flex justify-center pt-3 pb-3 cursor-pointer"
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors" />
        </div>

        <div className="px-5 pb-8 space-y-6 overflow-y-auto max-h-[calc(100%-24px)]">

          <div className="flex items-end justify-between">
            <div className="text-right">
              <h2 className="text-2xl font-black tracking-tight text-slate-800">{etaMinutes} دقيقة متبقية</h2>
              <p className="mt-1 text-xs font-medium text-slate-500">الوقت المتوقع للوصول: {arrivalTime}</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 text-xs font-bold border rounded-full shadow-sm text-primary bg-primary/5 border-primary/10 animate-pulse">
              <span className="text-base font-bold material-symbols-outlined">bolt</span>
              <span>توصيل إكسبرس</span>
            </div>
          </div>

          <div className="relative flex items-start justify-between pt-2">
            <div className="absolute top-[18px] right-4 left-4 h-[3px] bg-slate-100 rounded-full z-0" />

            <div
              className="absolute top-[18px] right-4 h-[3px] bg-primary rounded-full z-0 transition-all duration-500"
              style={{ width: `calc(${progressPercentage}% - 16px)` }}
            />

            {TIMELINE_STEPS.map((step) => (
              <div key={step.id} className={`flex flex-col items-center relative z-10 w-1/5 ${!step.active && 'opacity-35'}`}>
                {step.current ? (
                  <div className="relative flex items-center justify-center w-9 h-9">
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full shadow-md bg-primary">
                      <span className="text-sm font-semibold text-white material-symbols-outlined">
                        {step.icon}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.active
                      ? "bg-primary/5 border-primary text-primary"
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    <span className="text-xs font-bold material-symbols-outlined">
                      {step.active && !step.current ? 'check' : step.icon}
                    </span>
                  </div>
                )}
                <span className={`text-[10px] font-bold text-center mt-2 tracking-tight ${step.current ? 'text-primary font-extrabold' : 'text-slate-600'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 border shadow-sm bg-slate-50 rounded-2xl border-slate-100">
            <div className="flex items-center gap-3.5 min-w-0 text-right">
              <div className="relative shrink-0">
                <div
                  className="overflow-hidden bg-center bg-cover border-2 border-white shadow-sm w-14 h-14 rounded-2xl ring-1 ring-slate-200/50"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop')` }}
                />
                <div className="absolute -bottom-1.5 left-1/2 translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-slate-100">
                  <span className="material-symbols-outlined text-[11px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-[10px] font-black text-slate-700">4.9</span>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold truncate text-slate-800">الكابتن عمر</h3>
                <p className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 bg-white border rounded-full shadow-xs border-slate-300" />
                  دراجة هوندا SH 150i (بيضاء)
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 shrink-0">
              <button className="flex items-center justify-center transition-all bg-white border rounded-full shadow-xs w-11 h-11 text-slate-700 border-slate-200 hover:bg-slate-50 active:scale-90">
                <span className="text-lg material-symbols-outlined">chat</span>
              </button>
              <button className="flex items-center justify-center text-white transition-all rounded-full shadow-md w-11 h-11 bg-primary shadow-primary/10 hover:bg-primary-dark active:scale-90">
                <span className="text-lg material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 text-xs border-t border-slate-100">
            <div className="flex items-center gap-2 text-right text-slate-600">
              <span className="text-lg material-symbols-outlined text-slate-400">shopping_bag</span>
              <span>عدد ٢ غرض من <b className="font-bold text-slate-800">سوق الشام المركزي</b></span>
            </div>
            <button className="px-2 py-1 font-bold transition-colors rounded-lg text-primary hover:text-primary-dark hover:bg-primary/5">عرض الفاتورة</button>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
