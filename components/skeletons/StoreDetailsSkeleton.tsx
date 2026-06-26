export default function StoreDetailsSkeleton() {
  return (
    <div className="px-4 pb-40">
      <div className="skeleton h-[240px] sm:h-[300px] w-full rounded-2xl" />
      <div className="mt-4 w-20 h-20 rounded-[20px] skeleton -mt-10 mr-4" />
      <div className="mt-4 space-y-3">
        <div className="skeleton h-7 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex gap-3 mt-3">
          <div className="skeleton h-6 w-20 rounded-[8px]" />
          <div className="skeleton h-6 w-16 rounded-[8px]" />
          <div className="skeleton h-6 w-16 rounded-[8px]" />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-[190px]">
            <div className="skeleton h-32 rounded-2xl" />
            <div className="mt-2 skeleton h-4 w-3/4" />
            <div className="mt-2 skeleton h-6 w-1/3" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton h-36 rounded-2xl" />
            <div className="mt-2 skeleton h-4 w-3/4" />
            <div className="mt-2 skeleton h-6 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
