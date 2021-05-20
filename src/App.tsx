import React from 'react';
import styled from 'styled-components';
import './App.css';
import { TaskList } from './TaskList';
import { Modal } from './Modal';

export type TTask = {
  title: string; isCompleted: boolean, id: number
};
export type TRemove = {
  remove: (id: number) => void;
};


type TState = { editingTask?: TTask, taskList: TTask[], newTaskValue: string };

class App extends React.Component<{}, TState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      editingTask: undefined,
      taskList: [],
      newTaskValue: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handelCheck = this.handelCheck.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
  };

  handleClick() {
    const { newTaskValue } = this.state;
    const newTask = {
      title: newTaskValue, isCompleted: false, id: Date.now(),
    };
    const tasks = [...this.state.taskList, newTask];
    this.setState({ taskList: tasks })
  };

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  handleRemove(id: number) {
    const { taskList } = this.state;
    const filtered = taskList.filter(task => task.id !== id);
    this.setState({ taskList: filtered });
  };

  handelCheck(id: number) {
    const { taskList } = this.state;
    const maped = taskList.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });
    this.setState({ taskList: maped });
  };

  handleOpenEdit(id: number) {
    const { taskList } = this.state;
    const finded = taskList.find((task) => task.id === id);
    this.setState({ editingTask: finded });
  };

  render() {
    const { taskList, editingTask } = this.state;
    const { handleClick, handleOpenEdit, handelCheck, handleChange, handleRemove } = this;
    return (
      <StyledApp>
        <h1>Todo List</h1>
        <input type="text" name="new task name" placeholder="Enter the task name" onChange={handleChange} />
        <button onClick={handleClick}>Add task</button>
        <TaskList tasks={taskList} remove={handleRemove} check={handelCheck} openEdit={handleOpenEdit}/>
        {editingTask && <Modal />}
      </StyledApp>
    );
  }
};

export default App;

export const StyledApp = styled.section`
  padding: 0 20px;
`;
