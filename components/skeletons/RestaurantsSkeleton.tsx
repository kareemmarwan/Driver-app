export default function RestaurantsSkeleton() {
  return (
    <div className="px-4 pb-32 mt-6 sm:px-6 lg:px-8 sm:mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white border border-[#bbcbba]/20 rounded-[24px] overflow-hidden">
            <div className="skeleton h-40 sm:h-48" />
            <div className="p-4 pt-7 sm:p-5 sm:pt-8 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-1/2" />
              <div className="flex gap-2 pt-3 mt-4 border-t border-slate-100">
                <div className="skeleton h-6 w-16 rounded-[8px]" />
                <div className="skeleton h-6 w-16 rounded-[8px]" />
                <div className="skeleton h-6 w-20 rounded-[8px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
