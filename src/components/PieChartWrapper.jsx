import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { listenToFeedback } from "../firebase/controllers/firebaseFeedback";

const colors = ["#4CAF50", "#2196F3", "#FF9800", "#F44336", "#9C27B0"];

export default function PieChartWrapper() {
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToFeedback(setScoreData);
    return () => unsubscribe();
  }, []);

  const _scoreData = [1, 2, 3, 4, 5].map((score) => ({
    name: `${score} Stars`,
    value: scoreData.filter((f) => f.score === score).length,
  }));

  return (
    <div className="h-fit p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">KPI Score Distribution</h2>
      <PieChart width="100%" height={300}>
        <Pie
          data={_scoreData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {scoreData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
