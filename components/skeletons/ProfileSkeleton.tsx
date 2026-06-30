export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4" dir="rtl">
      <div className="flex items-center gap-4 mb-6">
        <div className="skeleton w-20 h-20 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
      </div>
      {[1,2].map(i => (
        <div key={i} className="skeleton h-48 rounded-2xl mb-4" />
      ))}
    </div>
  );
}
