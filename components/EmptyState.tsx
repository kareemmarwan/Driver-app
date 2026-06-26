'use client';
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon = 'inbox', title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="material-symbols-outlined text-6xl text-[#bbcbba] mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-[#151e16] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#5f5e5e] mb-4 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-[#006d34] text-white rounded-xl text-sm font-bold hover:bg-[#005226] transition-colors active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
