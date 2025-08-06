// src/App.jsx
import { useState } from "react";
import { Layout, Row, Col } from "antd";
import dayjs from "dayjs";
import CalendarView from "./components/CalendarView";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";
import TaskForm from "./components/TaskForm";

const { Content } = Layout;

function App() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDateSelect = (date) => setSelectedDate(date);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTaskToEdit(null);
  };
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <CalendarView
              onDateSelect={handleDateSelect}
              onOpenModal={handleOpenModal}
            />
            <TaskList selectedDate={selectedDate} onEditTask={handleEditTask} />
          </Col>
          <Col xs={24} md={12}>
            <TaskChart />
          </Col>
        </Row>

        <TaskForm
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          taskToEdit={taskToEdit}
        />
      </Content>
    </Layout>
  );
}

export default App;
