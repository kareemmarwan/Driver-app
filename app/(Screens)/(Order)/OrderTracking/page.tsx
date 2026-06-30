'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TrackingPage() {
  const router = useRouter();
  const [statusText, setStatusText] = useState('أحمد يقوم باستلام طلبك الآن');

  useEffect(() => {
    const statuses = [
      'أحمد يقوم باستلام طلبك الآن',
      'تم استلام الطلب وهو في الطريق إليك',
      'أحمد قريب جداً من موقعك!',
      'وصل مندوبنا، يرجى الاستلام'
    ];
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % statuses.length;
      setStatusText(statuses[current]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-bold text-xl text-text-primary">تتبع الطلب</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-primary hover:bg-surface transition-colors p-2 rounded-full active:scale-95">
            notifications
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-2xl pt-16 pb-24 mx-auto">

        <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden md:rounded-2xl md:mt-4 md:shadow-md">
          <div className="w-full h-full bg-surface flex items-center justify-center relative">

            <img loading="lazy" decoding="async"
              className="w-full h-full object-cover grayscale-[20%] opacity-90"
              alt="خريطة تتبع خط السير في مدينة غزة"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmuzTG4P4reMUHan30yV6qhQvDSE5PAlsvJ6ujIWvn_lxAYIT22R6QfTciMLTg2Lihv864BSNalzZ8okWVOt3cc4wCR0gqL4Q5-RHoxTJpCAfiBbjS6uX1IYDx3Ux5NUvSLol5cHyJ0ZnXmA2BK_FovXE8Jpo3TkdNtK8IzX1_1FG_chXVyoqUV7N6Fiu88HIN7T4sbjUBfPWEXE88m-Uarz888pZKO8gAMwPm3wnqppK7UcJ25wT1pG3EiEeOjq508WVeNmnFdW0"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none"></div>

            <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                <div className="bg-primary text-white p-3 rounded-full shadow-lg relative z-20 flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>motorcycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 px-4 -mt-12 space-y-4">

          <div className="bg-white rounded-xl shadow-md p-5 border border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">الحالة الحالية</p>
                <h2 className="text-lg md:text-xl font-bold text-text-primary transition-all duration-300">{statusText}</h2>
                <p className="text-sm text-text-secondary mt-1">الوقت المتوقع للوصول: 12:45 م</p>
              </div>
              <div className="bg-primary-light p-3 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]">takeout_dining</span>
              </div>
            </div>

            <div className="relative py-4">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-xs text-text-primary font-medium">تم الطلب</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm ring-4 ring-primary/30">
                    <span className="material-symbols-outlined text-[18px]">restaurant</span>
                  </div>
                  <span className="text-xs text-primary font-bold">التجهيز</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-border text-text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">delivery_dining</span>
                  </div>
                  <span className="text-xs text-text-secondary">جاري الشحن</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-border text-text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                  </div>
                  <span className="text-xs text-text-secondary">تم التوصيل</span>
                </div>
              </div>

              <div className="absolute top-[31px] left-4 right-4 h-1 bg-border -z-10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-primary-light to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear]"
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <img loading="lazy" decoding="async"
                  className="object-cover w-full h-full"
                  alt="صورة السائق أحمد"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPpbdwSgdl2LLrCOYMZbCvb8yp0LTQl2AW3J-rx2FmzMxPZ18rgDqkOvoyQ93KDsb0U5xjpJNdsJddbbd3R1lL2C-4IIjXBqABpJVNd242bH4JpE6reBcZG3AHWGoftTc9RDtWBiPav3hzkzDVz1o_4XZJEs4EorDBUEd90ypHy0RZ7FY-6mb7-3XBWq61jmvypFgsT3LAd2RZCuW3nodLjMH8LYUDo2NPTvwGhiOB6U4r3xExOgd2EwC8JaBS1JdGSxYpJ7OY9eA"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-text-primary">أحمد</h3>
                  <div className="flex items-center text-primary bg-primary-light px-1.5 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="mr-1 text-xs font-bold">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-0.5">دراجة نارية • غزة-2891</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary active:scale-90 transition-transform">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary active:scale-90 transition-transform">
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="text-text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">عنوان التوصيل</p>
                <p className="text-sm text-text-secondary mt-0.5">شارع الرشيد، شقة 4B، مدينة غزة</p>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 font-bold text-sm text-text-secondary py-3.5 hover:bg-surface transition-colors rounded-xl border border-dashed border-border/50">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            تواصل مع الدعم الفني
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-md z-50 md:hidden">
        <button className="w-full h-14 bg-primary text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined">receipt_long</span>
          عرض تفاصيل الطلب
        </button>
      </div>

      <nav className="hidden md:flex fixed bottom-0 left-0 w-full bg-white h-20 border-t border-border/50 items-center justify-around z-50">
        <button className="flex flex-col items-center justify-center text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="mt-1 text-xs">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center justify-center text-primary bg-primary-light rounded-xl px-5 py-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span className="mt-1 text-xs font-bold">الطلبات</span>
        </button>
        <button className="flex flex-col items-center justify-center text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="mt-1 text-xs">البحث</span>
        </button>
        <button className="flex flex-col items-center justify-center text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="mt-1 text-xs">الحساب</span>
        </button>
      </nav>
    </>
  );
}
