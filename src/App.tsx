import React, { FormEvent } from 'react';
import './App.css';
import { CostInput } from './CostInput';
import { TaskList } from './TaskList';

export type TTask = {
  title: string; isCompleted: boolean, id: number
};

type MyState = { isOpen: boolean, taskList: TTask[], newTaskValue: string };

class App extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false,
      taskList: [],
      newTaskValue: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleClick() {
    const { newTaskValue } = this.state;
    this.setState({ isOpen: !this.state.isOpen })
    const newTask = {
      title: newTaskValue, isCompleted: false, id: Date.now(),
    };
    // this.state.taskList.push(newTask)
    const tasks = [...this.state.taskList, newTask];
    this.setState({ taskList: tasks })
  };

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <input type="text" name="new task name" placeholder="Enter the task name" onChange={this.handleChange} />
        <CostInput />
        <button onClick={this.handleClick}>Add task</button>
        {this.state.isOpen && <span>*</span>}
        <TaskList tasks={this.state.taskList} />
      </div>
    );
  }
}

export default App;
