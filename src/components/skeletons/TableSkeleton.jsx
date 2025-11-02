function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse" />
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 h-4 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
        {[1, 2].map((row) => (
          <div key={row} className="p-4 border-t">
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default TableSkeleton;
