import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, message, Modal, Tooltip } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Task } from "../../../types";
import { UploadChangeParam } from "antd/es/upload";
import "./index.scss";
interface CreateTaskFormProps {
  visible?: boolean;
  setVisible?: (val: string | null) => void;
  onAddTask: (taskData: Task, existingImages?: string[]) => void;
  editDetails?: Task | null;
  setEditDetails?: (val: Task | null) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  visible,
  setVisible,
  onAddTask,
  editDetails,
  setEditDetails,
}) => {
  const [form] = Form.useForm<Task>();
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[] | null>([]);

  const handleCancel = () => {
    if (setVisible) setVisible(null);
    if (setEditDetails) setEditDetails(null);
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
      ...(editDetails ? { id: editDetails.id } : {}),
    };

    onAddTask(taskData, existingImages);
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

  useEffect(() => {
    if (editDetails) {
      form.setFieldsValue({
        title: editDetails.title,
        description: editDetails.description,
      });
      setExistingImages(editDetails.img);
    } else {
      form.resetFields();
    }
  }, [editDetails, form]);

  const handleDeleteExistingImage = (imageToDelete: string) => {
    if (!existingImages) return;

    const updatedImages = existingImages?.filter(
      (image) => image !== imageToDelete
    );
    setExistingImages(updatedImages.length > 0 ? updatedImages : null);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title="Upload Images"
      open={visible || editDetails ? true : false}
      footer={null}
      onCancel={handleCancel}
      className="createTask"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          images: [],
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input your title!" },
            { max: 100, message: "Title cannot be more than 100 characters!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
            {
              max: 500,
              message: "Description cannot be more than 500 characters!",
            },
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
            accept=".jpg,.jpeg,.png"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={{ showPreviewIcon: true }}
            itemRender={() => null}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess(file);
                }
              }, 500);
            }}
          >
            <Tooltip
              title={images.length > 0 ? "" : "You can upload more than one"}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Tooltip>
          </Upload>
        </Form.Item>

        <div className="createTask__imageContainer">
          {images.map((image, index) => {
            return (
              <div className="createTask__image">
                <img src={URL.createObjectURL(image)} />
                <div
                  className="createTask__deleteIconContainer"
                  onClick={() => handleDeleteImage(index)}
                >
                  <CloseOutlined className="createTask__deleteIcon" />
                </div>
              </div>
            );
          })}
          {existingImages?.map((image) => {
            return (
              <div className="createTask__image">
                <img src={image} />
                <div
                  className="createTask__deleteIconContainer"
                  onClick={() => handleDeleteExistingImage(image)}
                >
                  <CloseOutlined className="createTask__deleteIcon" />
                </div>
              </div>
            );
          })}
        </div>

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
