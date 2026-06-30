"use client";

import { useEffect, useState, useRef } from "react";

export default function SplashScreen({ onReady }: { onReady?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

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
            onReady?.();
          }, 300);
          return 100;
        }
      });
    };

    const startTimeout = setTimeout(simulateProgress, 400);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [onReady]);

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
    <main className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-background text-text-primary">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div
          ref={glowRef1}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-light blur-[120px] rounded-full transition-transform duration-300 ease-out"
        ></div>
        <div
          ref={glowRef2}
          className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full transition-transform duration-300 ease-out"
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs text-center px-6">

        <div className="mb-8 animate-logo animate-entry">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary-light flex items-center justify-center drop-shadow-xl">
              <span className="material-symbols-outlined text-[64px] md:text-[80px] text-primary">local_shipping</span>
            </div>
            <div className="absolute inset-0 transition-all duration-700 scale-125 rounded-full bg-primary/20 blur-2xl -z-10 group-hover:bg-primary/30"></div>
          </div>
        </div>

        <div className="animate-entry [animation-delay:200ms] opacity-0 fill-mode-forwards">
          <h1 className="text-[24px] leading-[32px] font-bold md:text-[32px] md:leading-[40px] text-text-primary tracking-tight mb-2">
            Gaza <span className="text-primary">Express</span>
          </h1>
          <p className="text-[14px] leading-[20px] font-normal text-text-secondary tracking-wide opacity-80 uppercase">
            Agile • Local • Indispensable
          </p>
        </div>

        <div className="mt-8 w-full animate-entry [animation-delay:400ms] opacity-0 fill-mode-forwards">
          <div className="relative w-full h-1 overflow-hidden rounded-full bg-surface mb-2">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_12px_rgba(239,43,45,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 loading-shimmer"></div>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] leading-[16px] font-medium text-text-secondary animate-pulse">
              {isReady ? "Ready" : "Initializing..."}
            </span>
            <span className={`text-[12px] leading-[16px] font-bold ${isReady ? 'text-primary' : 'text-primary'}`}>
              {isReady ? "Ready" : `${Math.floor(progress)}%`}
            </span>
          </div>
        </div>
      </div>

    </main>
  );
}
