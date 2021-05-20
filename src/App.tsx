import React from 'react';
import styled from 'styled-components';
import './App.css';
import { TaskList } from './TaskList';

export type TTask = {
  title: string; isCompleted: boolean, id: number
};
export type TRemove = {
  remove: (id: number) => void;
};


type TState = { isOpen: boolean, taskList: TTask[], newTaskValue: string };

class App extends React.Component<{}, TState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false,
      taskList: [],
      newTaskValue: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handelCheck = this.handelCheck.bind(this);
  };

  handleClick() {
    const { newTaskValue } = this.state;
    this.setState({ isOpen: !this.state.isOpen })
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
    const filtered = taskList.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });
    this.setState({ taskList: filtered });
  };

  // handleEdit(id: number) {
  //   const { taskList } = this.state;
  //   const filtered = taskList.map((task) => {
  //     if (task.id === id) {
  //       task.isCompleted = true;
  //       return task;
  //     }
  //     return task;
  //   });
  //   this.setState({ taskList: filtered });
  

  // };

  render() {
    return (
      <StyledApp>
        <h1>Todo List</h1>
        <input type="text" name="new task name" placeholder="Enter the task name" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add task</button>
        <TaskList tasks={this.state.taskList} remove={this.handleRemove} check={this.handelCheck} />
      </StyledApp>
    );
  }
};

export default App;

export const StyledApp = styled.section`
  padding: 0 20px;
`;
