function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-800 ${className}`}
    />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="flex gap-5 rounded-xl bg-gray-900 border border-gray-800 p-4">
      <Bone className="w-28 h-40 flex-shrink-0 rounded-lg" />
      <div className="flex flex-col justify-center gap-3 flex-1">
        <Bone className="h-5 w-3/4" />
        <Bone className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function MovieListSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Bone className="h-9 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 6 }, (_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function MovieDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Bone className="h-4 w-32 mb-6" />
      <div className="flex flex-col md:flex-row gap-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <Bone className="w-56 md:w-64 h-80 rounded-lg flex-shrink-0" />
        <div className="flex flex-col gap-3 flex-1">
          <Bone className="h-8 w-3/4" />
          <Bone className="h-4 w-1/3" />
          <Bone className="h-4 w-full mt-2" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-2/3" />
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <Bone className="h-7 w-40 mb-5" />
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
            <div className="flex justify-between">
              <Bone className="h-4 w-28" />
              <Bone className="h-4 w-20" />
            </div>
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
