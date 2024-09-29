import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task as TaskType } from "../../../types";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import "./index.scss";
import DetailsModal from "../detailsModal";
import CreateTaskForm from "../createTaskForm";

interface TaskProps {
  task: TaskType;
  index: number;
  columnId: string;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onHandleEditTask: (taskData: TaskType) => void;
}

const { Text } = Typography;

const Task: React.FC<TaskProps> = ({
  task,
  index,
  columnId,
  onDeleteTask,
  onHandleEditTask,
}) => {
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editDetails, setEditDetails] = useState<TaskType | null>(null);

  const truncatedText =
    task.title.length > 45 ? task.title.substring(0, 45) + "..." : task.title;

  const showModal = () => {
    setDetailsModalVisible(true);
  };

  const handleCancel = () => {
    setDetailsModalVisible(false);
  };

  const handleTaskEdit = (task: TaskType) => {
    setEditDetails(task);
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
              {task.img && task.img.length > 0 && (
                <div className="task__imageContainer">
                  <img src={task.img[0]} alt="Task Image" />
                </div>
              )}
              <Text className="task__title">{truncatedText}</Text>
            </div>

            <div
              className="task__iconWrapper task__editIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleTaskEdit(task);
              }}
            >
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
        visible={isDetailsModalVisible}
        task={task}
        onCancel={handleCancel}
      />
      <CreateTaskForm
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        onAddTask={onHandleEditTask}
      />
    </>
  );
};

export default Task;
