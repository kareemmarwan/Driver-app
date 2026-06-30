"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-center">
      <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
      <h2 className="text-xl font-bold text-text-primary mb-2">حدث خطأ!</h2>
      <p className="text-text-secondary mb-4 text-sm">لم نتمكن من تحميل هذه الصفحة</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
