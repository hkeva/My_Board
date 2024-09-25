import React, { useEffect, useState } from "react";
import { Modal, Carousel, Spin } from "antd";
import { Task } from "../../../types";
import "./index.scss";

interface DetailsModalProps {
  visible: boolean;
  task: Task;
  onCancel: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  visible,
  task,
  onCancel,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      title={task.title}
      onCancel={onCancel}
      footer={null}
      centered
      className="modal"
    >
      {task.img &&
        task.img.length > 0 &&
        (loading ? (
          <div className="spinner-container">
            <Spin size="small" />
          </div>
        ) : (
          <Carousel arrows={task.img.length > 1}>
            {task.img.map((image, index) => (
              <div
                key={index}
                className={
                  task.img && task.img?.length > 1
                    ? "modal__imageContainer"
                    : ""
                }
              >
                <img
                  className={
                    task.img && task.img?.length === 1 ? "modal__image" : ""
                  }
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        ))}
      <p className="mt-15">{task.description}</p>
    </Modal>
  );
};

export default DetailsModal;
