import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const TaskForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const isEditing = Boolean(initialValues && initialValues.id); // detect edit mode

  return (
    <Formik
      initialValues={{
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        category: initialValues?.category || "",
      }}
      enableReinitialize //
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        onCreate({ ...initialValues, ...values });
        resetForm();
      }}
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
        <Modal
          title={isEditing ? "Edit Task" : "Add Task"}
          open={visible}
          onOk={handleSubmit}
          onCancel={() => {
            onCancel();
          }}
          okText={isEditing ? "Update" : "Add"}
        >
          <Form layout="vertical">
            <Form.Item
              label="Title"
              validateStatus={errors.title && "error"}
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

            <Form.Item label="Category">
              <Select
                placeholder="Select category"
                value={values.category}
                onChange={(val) => setFieldValue("category", val)}
              >
                <Option value="success">Success</Option>
                <Option value="warning">Warning</Option>
                <Option value="issue">Issue</Option>
                <Option value="info">Info</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default TaskForm;
