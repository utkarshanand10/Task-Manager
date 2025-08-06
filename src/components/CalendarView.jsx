import { Calendar } from "antd";
import React, { useState } from "react";
import TaskModal from "./TaskModal";
import dayjs from "dayjs";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelect = (date, info) => {
    if (info.source === "date") {
      setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
    }
  };
  return (
    <>
      <Calendar fullscreen={false} onSelect={onSelect} />
      {selectedDate && (
        <TaskModal date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </>
  );
};

export default CalendarView;
