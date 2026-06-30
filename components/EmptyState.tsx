interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon = "inbox", title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="material-symbols-outlined text-6xl text-disabled mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
      {description && <p className="text-sm text-text-secondary mb-4 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
