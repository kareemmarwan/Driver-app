'use client';
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'حدث خطأ أثناء تحميل البيانات', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
      <h3 className="text-lg font-bold text-[#151e16] mb-1">عذراً، حدث خطأ</h3>
      <p className="text-sm text-[#5f5e5e] mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[#006d34] text-white rounded-xl text-sm font-bold hover:bg-[#005226] transition-colors active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
