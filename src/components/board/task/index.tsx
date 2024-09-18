import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task as TaskType } from "../../../types";
import "./index.scss";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
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
        >
          {task.content}
          <div className="task__iconWrapper task__editIcon">
            <EditTwoTone />
          </div>

          <div className="task__iconWrapper task__deleteIcon">
            <DeleteTwoTone twoToneColor="#ff4d4f" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
