import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Task } from "../../../types";
import { UploadChangeParam } from "antd/es/upload";

interface CreateTaskFormProps {
  visible: boolean;
  setVisible: (val: string | null) => void;
  onAddTask: (taskData: Task) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  visible,
  setVisible,
  onAddTask,
}) => {
  const [form] = Form.useForm<Task>();
  const [images, setImages] = useState<File[]>([]);

  const handleCancel = () => {
    setVisible(null);
    form.resetFields();
    setImages([]);
  };

  const onFinish = (values: Task) => {
    const imgSrc: string[] = images.map((image: File) =>
      URL.createObjectURL(image)
    );

    const taskData: Task = {
      ...values,
      img: imgSrc.length > 0 ? imgSrc : null,
    };

    onAddTask(taskData);
    handleCancel();
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleChange = (info: UploadChangeParam) => {
    const { fileList } = info;
    setImages(fileList.map((file: any) => file.originFileObj).filter(Boolean));
  };

  return (
    <Modal
      title="Upload Images"
      open={visible}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ images: [] }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Upload Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            multiple
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={{ showPreviewIcon: true }}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess(file);
                }
              }, 1000);
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskForm;
