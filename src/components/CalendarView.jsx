import React, { useState } from "react";
import { Calendar } from "antd";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import TaskList from "./TaskList";
import dayjs from "dayjs";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const onSelect = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);

    if (!editData) {
      setFormVisible(true);
    }
  };

  const handleCreate = (task) => {
    if (editData) {
      dispatch(editTask({ ...editData, ...task, date: selectedDate }));
    } else {
      dispatch(addTask({ ...task, date: selectedDate }));
    }
    setFormVisible(false);
    setEditData(null);
  };

  const getColor = (category) => {
    switch (category) {
      case "success":
        return "#52c41a"; // green
      case "warning":
        return "#faad14"; // yellow
      case "issue":
        return "#f5222d"; // red
      case "info":
        return "#1890ff"; // blue
      default:
        return "#d9d9d9"; // gray
    }
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const dayTasks = tasks.filter((task) => task.date === formattedDate);

    return (
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {dayTasks.slice(0, 3).map((task, index) => (
          <li key={index}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: getColor(task.category),
              }}
            ></span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={(date, { source }) => {
          if (source === "date") {
            onSelect(date);
          }
        }}
      />

      {/* Optional: Legend below calendar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "16px 0",
          paddingLeft: 12,
        }}
      >
        <span>
          <span style={legendDotStyle("#52c41a")}></span> success
        </span>
        <span>
          <span style={legendDotStyle("#faad14")}></span> warning
        </span>
        <span>
          <span style={legendDotStyle("#f5222d")}></span> issue
        </span>
        <span>
          <span style={legendDotStyle("#1890ff")}></span> info
        </span>
      </div>

      <TaskForm
        visible={formVisible}
        onCreate={handleCreate}
        onCancel={() => setFormVisible(false)}
        initialValues={editData}
      />
      <TaskList
        selectedDate={selectedDate}
        onEdit={(task) => {
          setSelectedDate(task.date);
          setEditData(task);
          setFormVisible(true);
        }}
      />
    </div>
  );
};

// Reusable style for legend dots
const legendDotStyle = (color) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: 4,
});

export default CalendarView;
