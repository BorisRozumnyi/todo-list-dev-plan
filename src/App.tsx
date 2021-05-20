import React from 'react';
import styled from 'styled-components';
import './App.css';
import { TaskList } from './TaskList';
import { Modal } from './Modal';

export type TTask = {
  title: string;
  isCompleted: boolean;
  id: number;
};
export type TRemove = {
  remove: (id: number) => void;
};

type Props = { test: boolean };
type State = { editingTask?: TTask; taskList: TTask[]; newTaskValue: string };

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingTask: undefined,
      taskList: [],
      newTaskValue: '',
    };
  }

  handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const { newTaskValue, taskList } = this.state;
    const newTask = {
      title: newTaskValue,
      isCompleted: false,
      id: Date.now(),
    };
    const tasks = [...taskList, newTask];
    this.setState({ taskList: tasks, newTaskValue: '' });
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  handleRemove = (id: number) => {
    const { taskList } = this.state;
    const filtered = taskList.filter((task) => task.id !== id);
    this.setState({ taskList: filtered });
  };

  handelCheck = (id: number) => {
    const { taskList } = this.state;
    const maped = taskList.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });
    this.setState({ taskList: maped });
  };

  handleOpenEdit = (id: number) => {
    const { taskList } = this.state;
    const finded = taskList.find((task) => task.id === id);
    this.setState({ editingTask: finded });
  };

  handleCloseEdit = () => {
    this.setState({ editingTask: undefined });
  };

  handleSaveEdit = (value: string) => {
    const { taskList, editingTask } = this.state;
    const maped = taskList.map((task) => {
      if (task.id === editingTask?.id) task.title = value;
      return task;
    });
    this.setState({ editingTask: undefined, taskList: maped });
  };

  render() {
    const { taskList, editingTask, newTaskValue } = this.state;
    const {
      handleCreateTask,
      handleOpenEdit,
      handelCheck,
      handleChange,
      handleRemove,
      handleCloseEdit,
      handleSaveEdit,
    } = this;
    return (
      <StyledApp>
        <h1>Todo List</h1>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            name="new-task-name"
            placeholder="Enter the task name"
            value={newTaskValue}
            onChange={handleChange}
          />
          <button onClick={handleCreateTask}>Add task</button>
        </form>
        <TaskList
          tasks={taskList}
          remove={handleRemove}
          check={handelCheck}
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
  }
}

const StyledApp = styled.section`
  padding: 0 20px;
`;
