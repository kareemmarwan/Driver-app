"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  // 1. محاكاة شريط التحميل (Progress Bar)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const simulateProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          const increment = Math.random() * 15;
          const nextProgress = Math.min(prevProgress + increment, 100);

          const delay = Math.random() * 400 + 100;
          timeoutId = setTimeout(simulateProgress, delay);

          return nextProgress;
        } else {
          setTimeout(() => {
            setIsReady(true);
          }, 500);
          return 100;
        }
      });
    };

    // بدء المحاكاة بعد 800ms من تحميل المكون
    const startTimeout = setTimeout(simulateProgress, 400);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // 2. حركة توهج الخلفية مع الماوس (Parallax Effect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (glowRef1.current) {
        glowRef1.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      if (glowRef2.current) {
        glowRef2.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-surface text-on-surface">

      {/* عناصر الخلفية التفاعلية */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div
          ref={glowRef1}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/10 blur-[120px] rounded-full transition-transform duration-300 ease-out"
        ></div>
        <div
          ref={glowRef2}
          className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full transition-transform duration-300 ease-out"
        ></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs text-center px-margin-mobile">

        {/* شعار البراند */}
        <div className="mb-xl animate-logo animate-entry">
          <div className="relative group">
            <Image
              alt="Dreefree Logo"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuFTV1kyg-SOdb3WTGVYMR8mteKkOECkjk49I3gJirXRy5uL4yYSItB9leXuo_RThdBOZ4iu2bcFei3h7wOEbWJIEYyME05hK-Y0doeNwjvqtVgIIUa9ZRzw9H-uFKuIrePRzBd3L1YnA1vg7wmnVoGtlONSFHEXuWPLgu6g6PAJx-xYtl1g_EVxke0A3LcnabvOUZPmulx8bOo7Wv_eyvST2K5v9sXieRexScZKEDHQfs-3sqvCg1fxA" // يمكنك استبداله بمسار محلي مثل /logo.png
              width={128}
              height={128}
              className="object-contain w-24 h-24 md:w-32 md:h-32 drop-shadow-xl rounded-xl"
              priority
            />
            {/* تأثير التوهج خلف الشعار */}
            <div className="absolute inset-0 transition-all duration-700 scale-125 rounded-full bg-primary-container/20 blur-2xl -z-10 group-hover:bg-primary-container/30"></div>
          </div>
        </div>

        {/* اسم البراند والنصوص */}
        <div className="animate-entry [animation-delay:200ms] opacity-0 fill-mode-forwards">
          <h1 className="text-[24px] leading-[32px] font-bold md:text-[32px] md:leading-[40px] text-on-surface tracking-tight mb-xs">
            Gaza <span className="text-primary">Express</span>
          </h1>
          <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant tracking-wide opacity-80 uppercase">
            Agile • Local • Indispensable
          </p>
        </div>

        {/* مؤشر التحميل */}
        <div className="mt-2xl w-full animate-entry [animation-delay:400ms] opacity-0 fill-mode-forwards">
          <div className="relative w-full h-1 overflow-hidden rounded-full bg-surface-container mb-sm">
            {/* شريط التقدم الفعلي */}
            <div
              className="h-full bg-primary-container transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,210,106,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
            {/* تأثير الشيمر فوق شريط التحميل */}
            <div className="absolute inset-0 loading-shimmer"></div>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] leading-[16px] font-medium text-secondary animate-pulse">
              {isReady ? "Ready" : "Initializing..."}
            </span>
            <span className={`text-[12px] leading-[16px] font-bold ${isReady ? 'text-primary-container' : 'text-primary'}`}>
              {isReady ? "Ready" : `${Math.floor(progress)}%`}
            </span>
          </div>
        </div>
      </div>


    </main>
  );
}