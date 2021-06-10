import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TaskList } from './TaskList';
import { Modal } from './Modal';
import { CreateTaskForm } from './CreateTaskForm';

const apiUrls = {
  todos: 'http://localhost:1337/todos',
};

export type TTask = {
  title: string;
  isCompleted: boolean;
  id: number;
};

type Props = { test: boolean };

export const App: React.FC<Props> = () => {
  const [editingTask, setEditingTask] = useState<TTask | undefined>(undefined);
  const [taskList, setTaskList] = useState([] as TTask[]);

  useEffect(() => {
    axios.get(apiUrls.todos).then((response) => {
      setTaskList(response.data);
    });
  }, []);

  const handleCreateTask = (newTaskValue: string) => {
    const newTask = {
      title: newTaskValue,
      isCompleted: false,
    };

    axios.post(apiUrls.todos, newTask).then((response) => {
      const tasks = [...taskList, response.data];
      setTaskList(tasks);
    });
  };

  const handleRemove = (id: number) => {
    axios.delete(`${apiUrls.todos}/${id}`).then((response) => {
      const copyTodos = taskList.slice();
      const findedIndex = copyTodos.findIndex(
        (todo) => todo.id === response.data.id,
      );
      copyTodos.splice(findedIndex, 1);
      setTaskList(copyTodos);
    });
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
    setEditingTask(undefined);
    axios
      .put(`${apiUrls.todos}/${editingTask?.id}`, {
        title: value,
      })
      .then((response) => {
        const copyTodos = taskList.slice();
        const findedIndex = copyTodos.findIndex(
          (todo) => todo.id === response.data.id,
        );
        copyTodos.splice(findedIndex, 1, response.data);
        setTaskList(copyTodos);
      });
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
