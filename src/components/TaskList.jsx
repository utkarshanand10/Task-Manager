import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Card, List, Button, Tag, Space, Flex, Select } from "antd";

const { Option } = Select;
const categoryColors = {
  success: "green",
  warning: "orange",
  issue: "red",
  info: "blue",
};

const TaskList = ({ selectedDate, onEdit }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.tasks);

  const [sortByLatest, setSortByLatest] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let tasksToDisplay = [...allTasks];

  if (selectedCategory) {
    tasksToDisplay = tasksToDisplay.filter(
      (task) => task.category === selectedCategory
    );
  }

  tasksToDisplay.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortByLatest ? dateA - dateB : dateB - dateA;
  });

  return (
    <Card
      styles={{
        body: {
          padding: 0,
          background: "#edf6ffff",
        },
      }}
      title={
        <div style={{ padding: "20px" }}>
          {selectedDate ? "All Tasks" : "All Tasks (No Date Selected)"}
          <Space style={{ marginTop: 8, display: "block" }}>
            <Flex gap={"20px"}>
              <Button
                type={sortByLatest ? "primary" : "default"}
                onClick={() => setSortByLatest(!sortByLatest)}
              >
                Sort by Latest Date
              </Button>

              <Select
                placeholder="Filter by Category"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                allowClear
                style={{ width: 160 }}
              >
                {Object.entries(categoryColors).map(([key, color]) => (
                  <Option key={key} value={key}>
                    <Tag color={color} style={{ marginRight: 8 }}>
                      {key}
                    </Tag>
                    {key}
                  </Option>
                ))}
              </Select>
              <Button
                onClick={() => {
                  setSortByLatest(false);
                  setSelectedCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </Flex>
          </Space>
        </div>
      }
      style={{ marginTop: 20 }}
    >
      {tasksToDisplay.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <List
          style={{ borderRadius: "10px" }}
          dataSource={tasksToDisplay}
          renderItem={(task) => (
            <List.Item
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                background: "white",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              actions={[
                <Button type="link" onClick={() => onEdit(task)}>
                  Edit
                </Button>,
                <Button
                  type="link"
                  danger
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete
                </Button>,
              ]}
            >
              <div style={{ width: "100%" }}>
                <h4 style={{ fontWeight: "bold" }}>{task.date}</h4>
                <List.Item.Meta
                  title={task.title}
                  description={task.description}
                />
                <Tag color={categoryColors[task.category]}>{task.category}</Tag>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default TaskList;
