function PieChartSkeleton() {
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-48 h-6 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="w-64 h-64 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white" />
      </div>
    </div>
  );
}

export default PieChartSkeleton;
