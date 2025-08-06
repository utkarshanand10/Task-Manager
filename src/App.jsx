// src/App.jsx
import { useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CalendarView from "./components/CalendarView";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";
import TaskForm from "./components/TaskForm";

const { Header, Content } = Layout;

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
      {/* Header */}
      <Header
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CheckCircleOutlined
          style={{ fontSize: 24, color: "#52c41a", marginRight: 12 }}
        />
        <Typography.Title level={3} style={{ color: "#fff", margin: 0 }}>
          Task Manager
        </Typography.Title>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: "32px" }}>
        <Row gutter={[32, 32]}>
          {/* Calendar + Task List */}
          <Col xs={24} md={12}>
            <CalendarView
              onDateSelect={handleDateSelect}
              onOpenModal={handleOpenModal}
            />
            <div style={{ marginTop: "24px" }}>
              <TaskList
                selectedDate={selectedDate}
                onEditTask={handleEditTask}
              />
            </div>
          </Col>

          {/* Chart */}
          <Col xs={24} md={12}>
            <TaskChart />
          </Col>
        </Row>

        {/* Modal */}
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
