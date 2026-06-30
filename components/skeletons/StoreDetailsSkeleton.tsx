export default function StoreDetailsSkeleton() {
  return (
    <div className="bg-background min-h-screen" dir="rtl">
      <div className="skeleton h-[240px] w-full" />
      <div className="px-4 mt-10 space-y-4">
        <div className="skeleton h-8 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="skeleton h-8 w-20 rounded-lg" />)}
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {[1,2,3].map(i => <div key={i} className="skeleton h-48 w-[190px] rounded-[24px] shrink-0" />)}
        </div>
      </div>
    </div>
  );
}
