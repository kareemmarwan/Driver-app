"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="absolute flex items-center justify-center transition-all border border-transparent top-4 left-14 w-9 h-9 text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-100 rounded-xl active:scale-95"
    >
      <span className="text-xl material-symbols-outlined">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
