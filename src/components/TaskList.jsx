import { useSelector, useDispatch } from "react-redux";
import { Tag, Button, List } from "antd";
import { deleteTask } from "../features/tasks/taskSlice";
import { selectTasksByDate } from "../features/tasks/selectors";

const colorMap = {
  success: "green",
  warning: "gold",
  issue: "red",
  info: "blue",
};

const TaskList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByDate(state, selectedDate));

  return (
    <List
      header={`Tasks for ${selectedDate}`}
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Button danger onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </Button>,
          ]}
        >
          <Tag color={colorMap[task.category]}>{task.category}</Tag>{" "}
          {task.title} - {task.description}
        </List.Item>
      )}
    />
  );
};

export default TaskList;
