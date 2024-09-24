import { Droppable, Draggable } from "react-beautiful-dnd";
import { Column, Task as TaskType } from "../../../types";
import Task from "../task";
import "./index.scss";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Input from "../../input";

interface ListProps {
  column: Column;
  tasks: TaskType[];
  index: number;
  onDeleteList: (id: string) => void;
  setListName: (columnId: string, val: string) => void;
  editListId: string | null;
  setEditListId: (val: string | null) => void;
  onAddTask: (id: string) => void;
}

const List: React.FC<ListProps> = ({
  column,
  tasks,
  index,
  onDeleteList,
  setListName,
  editListId,
  setEditListId,
  onAddTask,
}) => {
  const handleAddTask = (columnId: string) => {
    onAddTask(columnId);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className="list"
        >
          <div className="list__header">
            {editListId !== column.id && <h4>{column.title}</h4>}
            {editListId === column.id && (
              <Input
                setListName={setListName}
                columnId={column.id}
                title={column.title}
              />
            )}

            <div>
              <EditTwoTone
                className="list__editIcon"
                onClick={() => setEditListId(column.id)}
              />
              <DeleteTwoTone
                twoToneColor="#ff4d4f"
                className="list__deleteIcon"
                onClick={() => onDeleteList(column.id)}
              />
            </div>
          </div>

          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list__taskContainer"
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div
            className="list__addCardContainer"
            onClick={() => handleAddTask(column.id)}
          >
            <PlusOutlined className="list__addIcon" /> Add a card
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
