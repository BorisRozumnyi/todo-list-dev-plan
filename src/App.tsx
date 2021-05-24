import React, { useState } from 'react';
import styled from 'styled-components';
import { TaskList } from './TaskList';
import { Modal } from './Modal';
import { CreateTaskForm } from './CreateTaskForm';

export type TTask = {
  title: string;
  isCompleted: boolean;
  id: number;
};

type Props = { test: boolean };

export const App: React.FC<Props> = () => {
  const [editingTask, setEditingTask] = useState<TTask | undefined>(undefined);
  const [taskList, setTaskList] = useState([] as TTask[]);

  const handleCreateTask = (newTaskValue: string) => {
    const newTask = {
      title: newTaskValue,
      isCompleted: false,
      id: Date.now(),
    };
    const tasks = [...taskList, newTask];
    setTaskList(tasks);
  };

  const handleRemove = (id: number) => {
    const filtered = taskList.filter((task) => task.id !== id);
    setTaskList(filtered);
  };

  const handleCheck = (id: number) => {
    const maped = taskList.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });
    setTaskList(maped);
  };

  const handleOpenEdit = (id: number) => {
    const finded = taskList.find((task) => task.id === id);
    setEditingTask(finded);
  };

  const handleCloseEdit = () => {
    setEditingTask(undefined);
  };

  const handleSaveEdit = (value: string) => {
    const maped = taskList.map((task) => {
      if (task.id === editingTask?.id) task.title = value;
      return task;
    });
    setEditingTask(undefined);
    setTaskList(maped);
  };

  return (
    <StyledApp>
      <h1>Todo List</h1>
      <CreateTaskForm save={handleCreateTask} />
      <TaskList
        tasks={taskList}
        remove={handleRemove}
        check={handleCheck}
        openEdit={handleOpenEdit}
      />
      {editingTask && (
        <Modal
          task={editingTask}
          close={handleCloseEdit}
          save={handleSaveEdit}
        />
      )}
    </StyledApp>
  );
};

const StyledApp = styled.section`
  padding: 0 20px;
`;
