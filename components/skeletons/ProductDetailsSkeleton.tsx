export default function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6 px-4">
      <div className="skeleton w-full aspect-square rounded-3xl" />
      <div className="space-y-3">
        <div className="skeleton h-6 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        {[1,2,3].map(i => <div key={i} className="skeleton h-16 flex-1 rounded-2xl" />)}
      </div>
      <div className="skeleton h-14 w-full rounded-2xl" />
    </div>
  );
}
