import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, Select, Row, Col } from "antd";
import { useState } from "react";
import { selectTaskCountsByCategory } from "../features/tasks/selectors";

const { Title } = Typography;
const { Option } = Select;

const COLORS = {
  success: "#52c41a",
  warning: "#faad14",
  issue: "#ff4d4f",
  info: "#1890ff",
};

const TaskChart = () => {
  const tasks = useSelector((state) => state.tasks.items); // ✅ always inside component
  const counts = useSelector(selectTaskCountsByCategory); // ✅ moved here
  const [filter, setFilter] = useState(null);

  const filteredTasks = filter
    ? tasks.filter((task) => task.category === filter)
    : tasks;

  const data = Object.keys(COLORS)
    .map((cat) => ({
      name: cat,
      value: filteredTasks.filter((task) => task.category === cat).length,
    }))
    .filter((item) => item.value > 0);

  return (
    <Card bordered style={{ maxWidth: 600, margin: "auto" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            📊 Task Category Distribution
          </Title>
        </Col>
        <Col>
          <Select
            value={filter || ""}
            onChange={(value) => setFilter(value)}
            placeholder="Filter by category"
            style={{ width: 180 }}
            allowClear
          >
            <Option value="">All</Option>
            <Option value="success">Success</Option>
            <Option value="warning">Warning</Option>
            <Option value="issue">Issue</Option>
            <Option value="info">Info</Option>
          </Select>
        </Col>
      </Row>

      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No data to display</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              isAnimationActive={true}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TaskChart;
