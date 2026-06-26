export default function OrdersSkeleton() {
  return (
    <div className="px-4 mt-2 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex gap-3">
            <div className="skeleton w-16 h-16 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-5 w-20 rounded-full" />
              </div>
              <div className="skeleton h-5 w-2/3" />
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
