export default function ProductDetailsSkeleton() {
  return (
    <div className="px-4 max-w-lg mx-auto">
      <div className="skeleton aspect-square rounded-3xl" />
      <div className="mt-4 space-y-3">
        <div className="skeleton h-7 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-1/3" />
      </div>
      <div className="flex gap-2 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 skeleton h-16 rounded-2xl" />
        ))}
      </div>
      <div className="mt-6 skeleton h-16 rounded-2xl" />
      <div className="mt-6 space-y-3">
        <div className="skeleton h-5 w-1/4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-14 rounded-2xl" />
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <div className="skeleton h-5 w-1/4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-14 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
