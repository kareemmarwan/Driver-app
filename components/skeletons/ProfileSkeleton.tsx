export default function ProfileSkeleton() {
  return (
    <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="skeleton w-20 h-20 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="skeleton h-6 w-1/2" />
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton h-5 w-24 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="skeleton h-9 w-9 rounded-xl" />
                <div className="skeleton h-6 w-12" />
                <div className="skeleton h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:col-span-7">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-4 pt-4 pb-2 border-b bg-slate-50/50">
                <div className="skeleton h-3 w-20" />
              </div>
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="px-4 py-3.5 flex items-center gap-3">
                  <div className="skeleton h-8 w-8 rounded-lg" />
                  <div className="skeleton h-4 w-32" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
