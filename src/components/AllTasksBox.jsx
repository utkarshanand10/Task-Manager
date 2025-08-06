import { useSelector, useDispatch } from "react-redux";
import { List, Button, Tag, Modal, Form, Input, Select } from "antd";
import { deleteTask, editTask } from "../features/tasks/taskSlice";
import { selectTasks } from "../features/tasks/selectors";
import { useState } from "react";

const { Option } = Select;

const colorMap = {
  success: "green",
  warning: "gold",
  issue: "red",
  info: "blue",
};

const AllTasksBox = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form] = Form.useForm();

  const showEditModal = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      dispatch(editTask({ ...editingTask, ...values }));
      setIsModalOpen(false);
      setEditingTask(null);
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Tasks</h2>
      <List
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showEditModal(task)}>
                Edit
              </Button>,
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

      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="success">Success</Option>
              <Option value="warning">Warning</Option>
              <Option value="issue">Issue</Option>
              <Option value="info">Info</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllTasksBox;
