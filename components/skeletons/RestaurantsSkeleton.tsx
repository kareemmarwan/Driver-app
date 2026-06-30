export default function RestaurantsSkeleton() {
  return (
    <div className="bg-background min-h-screen p-4" dir="rtl">
      <div className="flex gap-3 mb-6">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="skeleton h-10 flex-1 rounded-2xl" />
      </div>
      <div className="flex gap-2 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="skeleton h-8 w-20 rounded-[14px]" />)}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white border border-border rounded-[24px] overflow-hidden">
            <div className="skeleton h-40 w-full" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
