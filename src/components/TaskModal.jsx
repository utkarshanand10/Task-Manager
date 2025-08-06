import { Modal, Form, Input, Select, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";

const categories = ["success", "warning", "issue", "info"];

const TaskModal = ({ date, onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
  });

  return (
    <Modal open={true} title="Add Task" onCancel={onClose} footer={null}>
      <Formik
        initialValues={{
          id: uuidv4(),
          title: "",
          description: "",
          date,
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addTask(values));
          resetForm();
          onClose();
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              validateStatus={touched.title && errors.title ? "error" : ""}
              help={errors.title}
            >
              <Input
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Category"
              validateStatus={
                touched.category && errors.category ? "error" : ""
              }
              help={errors.category}
            >
              <Select
                name="category"
                value={values.category}
                onChange={(value) =>
                  handleChange({ target: { name: "category", value } })
                }
              >
                {categories.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TaskModal;
