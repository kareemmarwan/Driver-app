interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "حدث خطأ غير متوقع", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
      <h3 className="text-lg font-bold text-text-primary mb-1">عذراً، حدث خطأ</h3>
      <p className="text-sm text-text-secondary mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
