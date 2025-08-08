import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const TaskForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const isEditing = Boolean(initialValues && initialValues.id);

  return (
    <Formik
      initialValues={{
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        category: initialValues?.category || "",
      }}
      enableReinitialize
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
        category: Yup.string().required("Category is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        onCreate({ ...initialValues, ...values });
        resetForm();
      }}
      validateOnBlur={true}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        setTouched,
      }) => {
        useEffect(() => {
          if (!visible) {
            resetForm();
            setTouched({});
          }
        }, [visible, resetForm, setTouched]);

        return (
          <Modal
            title={isEditing ? "Edit Task" : "Add Task"}
            open={visible}
            onCancel={onCancel}
            onOk={() => {
              setTouched({ title: true, category: true });
              handleSubmit();
            }}
            okText={isEditing ? "Update" : "Add"}
            okButtonProps={{
              type: "primary",
            }}
          >
            <Form layout="vertical">
              <Form.Item
                required
                label="Title"
                validateStatus={touched.title && errors.title ? "error" : ""}
                help={touched.title && errors.title}
              >
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, title: true }))}
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
                required
                label="Category"
                validateStatus={
                  touched.category && errors.category ? "error" : ""
                }
                help={touched.category && errors.category}
              >
                <Select
                  placeholder="Select category"
                  value={values.category}
                  onChange={(val) => setFieldValue("category", val)}
                  onBlur={() => setTouched((t) => ({ ...t, category: true }))}
                >
                  <Option value="success">Success</Option>
                  <Option value="warning">Warning</Option>
                  <Option value="issue">Issue</Option>
                  <Option value="info">Info</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default TaskForm;
