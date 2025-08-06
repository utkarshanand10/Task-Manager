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

  const onSelect = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setEditData(null);
    setFormVisible(true);
  };

  const handleCreate = (task) => {
    if (editData) {
      dispatch(editTask({ ...editData, ...task, date: selectedDate }));
    } else {
      dispatch(addTask({ ...task, date: selectedDate }));
    }
    setFormVisible(false);
  };

  return (
    <div>
      <Calendar fullscreen={false} onSelect={onSelect} />
      <TaskForm
        visible={formVisible}
        onCreate={handleCreate}
        onCancel={() => setFormVisible(false)}
        initialValues={editData}
      />
      <TaskList
        selectedDate={selectedDate}
        onEdit={(task) => {
          setEditData(task);
          setFormVisible(true);
        }}
      />
    </div>
  );
};

export default CalendarView;
