import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Card, Select, Button } from "antd";
import { setFilters, resetFilters } from "../features/tasks/taskSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
  const dispatch = useDispatch();
  const { tasks, filters } = useSelector((state) => state.tasks);

  const filteredTasks = filters.category
    ? tasks.filter((t) => t.category === filters.category)
    : tasks;

  const categoryCounts = filteredTasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  const categoryColors = {
    success: "#4caf50", // Green
    warning: "#ff9800", // Orange
    issue: "#f44336", // Red
    info: "#2196f3", // Blue
  };

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "# of Tasks",
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(
          (cat) => categoryColors[cat] || "#9e9e9e" // fallback gray
        ),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <Card
      title="Task Chart"
      style={{
        marginTop: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        maxWidth: 1000,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Select
          placeholder="Filter by category"
          style={{ width: 200, marginRight: 10 }}
          value={filters.category || undefined}
          onChange={(value) => dispatch(setFilters({ category: value }))}
          allowClear
        >
          <Select.Option value="success">Success</Select.Option>
          <Select.Option value="warning">Warning</Select.Option>
          <Select.Option value="issue">Issue</Select.Option>
          <Select.Option value="info">Info</Select.Option>
        </Select>
        <Button onClick={() => dispatch(resetFilters())}>Reset Filter</Button>
      </div>

      <div style={{ height: 200 }}>
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default TaskChart;
