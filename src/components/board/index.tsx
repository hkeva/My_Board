import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BoardData, Task } from "../../types";
import List from "./list";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./index.scss";
import CreateTaskForm from "./createTaskForm";

const initialBoardData: BoardData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title:
        "Conduct Comprehensive Stakeholder Analysis for Upcoming Product Launch",
      img: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    "task-2": {
      id: "task-2",
      title: "Implement New Project Tracking Software",
      img: null,
    },
    "task-3": {
      id: "task-3",
      title: "Develop Project Risk Management Plan",
      img: [
        "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    "task-4": {
      id: "task-4",
      title: "Organize Team Building Event",

      img: [
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
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
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-4"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Board: React.FC = () => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [columnCount, setColumnCount] = useState(4);
  const [editListId, setEditListId] = useState<string | null>(null);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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
    setSelectedListId(columnId);
  };

  const handleAddTask = (taskData: Task) => {
    const newTaskId = `task-${Object.keys(boardData.tasks).length + 1}`;

    const newTask: Task = {
      id: newTaskId,
      title: taskData.title,
      img: taskData.img,
    };

    setBoardData((prevData) => ({
      ...prevData,
      tasks: {
        ...prevData.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prevData.columns,
        [selectedListId!]: {
          ...prevData.columns[selectedListId!],
          taskIds: [...prevData.columns[selectedListId!].taskIds, newTaskId],
        },
      },
    }));
  };

  return (
    <>
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
      <CreateTaskForm
        visible={selectedListId ? true : false}
        setVisible={setSelectedListId}
        onAddTask={handleAddTask}
      />
    </>
  );
};

export default Board;
