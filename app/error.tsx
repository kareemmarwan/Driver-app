'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F8FAFC] text-center">
      <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
      <h2 className="text-xl font-bold text-[#151e16] mb-2">حدث خطأ!</h2>
      <p className="text-[#5f5e5e] mb-4 text-sm">لم نتمكن من تحميل هذه الصفحة</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-[#006d34] text-white rounded-xl hover:bg-[#005226] transition-colors"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
}
