import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, Button, Tag } from "antd";
import { deleteTask } from "../features/tasks/taskSlice";
import { selectAllTasks } from "../features/tasks/taskSelectors";

const categoryColors = {
  success: "green",
  warning: "orange",
  issue: "red",
  info: "blue",
};

const TaskBox = ({ onEdit }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);

  return (
    <Card title="All Tasks" style={{ marginTop: 20 }}>
      <List
        dataSource={allTasks}
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
    </Card>
  );
};

export default TaskBox;
