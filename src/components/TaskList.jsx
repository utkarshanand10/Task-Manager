import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Card, List, Button, Tag } from "antd";

const categoryColors = {
  success: "green",
  warning: "orange",
  issue: "red",
  info: "blue",
};

const TaskList = ({ selectedDate, onEdit }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.tasks);

  const tasksToDisplay = allTasks;

  return (
    <Card
      title={
        selectedDate
          ? `Tasks on ${selectedDate}`
          : "All Tasks (No Date Selected)"
      }
      style={{ marginTop: 20 }}
    >
      {tasksToDisplay.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <List
          dataSource={tasksToDisplay}
          renderItem={(task) => (
            <List.Item
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
              <List.Item.Meta
                title={`${task.title} (${task.date})`}
                description={task.description}
              />
              <Tag color={categoryColors[task.category]}>{task.category}</Tag>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default TaskList;
