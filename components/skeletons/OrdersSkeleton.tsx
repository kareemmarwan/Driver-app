export default function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex gap-3">
            <div className="skeleton w-16 h-16 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
