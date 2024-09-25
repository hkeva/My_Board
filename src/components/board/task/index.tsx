import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task as TaskType } from "../../../types";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import "./index.scss";
import DetailsModal from "../detailsModal";

interface TaskProps {
  task: TaskType;
  index: number;
  columnId: string;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

const { Text } = Typography;

const Task: React.FC<TaskProps> = ({ task, index, columnId, onDeleteTask }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const truncatedText =
    task.title.length > 45 ? task.title.substring(0, 45) + "..." : task.title;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task"
            style={{
              ...provided.draggableProps.style,
            }}
            onClick={showModal}
          >
            <div className="task__contentContainer">
              {task.img && (
                <div className="task__imageContainer">
                  <img src={task?.img[0]} />
                </div>
              )}
              <Text className="task__title">{truncatedText}</Text>
            </div>
            <div className="task__iconWrapper task__editIcon">
              <EditTwoTone />
            </div>

            <div
              className="task__iconWrapper task__deleteIcon"
              onClick={() => {
                onDeleteTask(task.id, columnId);
              }}
            >
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </div>
          </div>
        )}
      </Draggable>
      <DetailsModal
        visible={isModalVisible}
        task={task}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Task;
