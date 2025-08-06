import React, { useState } from "react";
import { Layout, Typography, Divider } from "antd";
import CalendarView from "./components/CalendarView";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";
import AllTasksBox from "./components/AllTasksBox";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#001529", padding: "10px 24px" }}>
        <Title style={{ color: "#fff", margin: 0 }} level={3}>
          📝 Task Manager
        </Title>
      </Header>

      <Content style={{ padding: "24px" }}>
        <CalendarView onDateSelect={setSelectedDate} />
        <Divider />
        {selectedDate && <TaskList selectedDate={selectedDate} />}
        <Divider />
        <TaskChart />
        <AllTasksBox />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Task Manager ©2025 Created by Utkarsh
      </Footer>
    </Layout>
  );
};

export default App;
