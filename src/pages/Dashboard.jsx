import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { listenToFeedback } from "../firebase/controllers/firebaseFeedback";
import { DataTable } from "../components/DataTable";
import PieChartWrapper from "../components/PieChartWrapper";
import PieChartSkeleton from "../components/skeletons/PieChartSkeleton";
import TableSkeleton from "../components/skeletons/TableSkeleton";

function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToFeedback((data) => {
      setFeedback(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const _feedback = feedback.map((item) => ({
    date: new Date(item.date.seconds * 1000).toLocaleDateString(),
    employeeName: item.employeeName,
    score: item.score,
    notes: item.notes,
  }));

  const header = [
    { accessorKey: "date", text: "Date" },
    { accessorKey: "employeeName", text: "Employee Name" },
    { accessorKey: "score", text: "Score" },
    { accessorKey: "notes", text: "Notes" },
  ];

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="p-4 bg-white border rounded-md lg:w-[60%] h-fit">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable data={_feedback} header={header} />
          )}
        </div>
        <div className="bg-white border rounded-md lg:w-[40%]">
          {isLoading ? <PieChartSkeleton /> : <PieChartWrapper />}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
