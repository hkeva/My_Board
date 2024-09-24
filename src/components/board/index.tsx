import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BoardData } from "../../types";
import List from "./list";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./index.scss";

const initialData: BoardData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Task 1",
    },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

const Board: React.FC = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [columnCount, setColumnCount] = useState(3);
  const [editListId, setEditListId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(boardData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoardData = {
        ...boardData,
        columnOrder: newColumnOrder,
      };

      setBoardData(newBoardData);
      return;
    }

    const startColumn = boardData.columns[source.droppableId];
    const endColumn = boardData.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoardData(newBoardData);
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        },
      };

      setBoardData(newBoardData);
    }
  };

  const onAddListHandler = () => {
    const newColumnId = `column-${columnCount}`;
    const newColumn = {
      id: newColumnId,
      title: `New list`,
      taskIds: [],
    };

    setBoardData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...prevData.columnOrder, newColumnId],
    }));

    setColumnCount((prevCount) => prevCount + 1);
  };

  const onDeleteList = (columnId: string) => {
    setBoardData((prevData) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [columnId]: _, ...remainingColumns } = prevData.columns;

      return {
        ...prevData,
        columns: remainingColumns,
        columnOrder: prevData.columnOrder.filter((id) => id !== columnId),
      };
    });
  };

  const onSetListName = (columnId: string, val: string) => {
    setBoardData((prevData) => {
      const updatedColumns = {
        ...prevData.columns,
        [columnId]: {
          ...prevData.columns[columnId],
          title: val,
        },
      };

      setEditListId(null);

      return {
        ...prevData,
        columns: updatedColumns,
      };
    });
  };

  const onAddTask = (columnId: string) => {
    console.log("columnId ", columnId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <div>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="board__lists"
              >
                {boardData.columnOrder.map((columnId, index) => {
                  const column = boardData.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => boardData.tasks[taskId]
                  );

                  return (
                    <Draggable
                      draggableId={column.id}
                      index={index}
                      key={column.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            margin: "0 8px",
                          }}
                        >
                          <List
                            column={column}
                            tasks={tasks}
                            index={index}
                            onDeleteList={onDeleteList}
                            setListName={onSetListName}
                            editListId={editListId}
                            setEditListId={setEditListId}
                            onAddTask={onAddTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <Button
          icon={<PlusOutlined />}
          className="board__addListBtn"
          onClick={onAddListHandler}
        >
          <h4>Add another list</h4>
        </Button>
      </div>
    </DragDropContext>
  );
};

export default Board;
