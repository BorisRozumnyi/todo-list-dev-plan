import React from 'react';
import styled from 'styled-components';

export type TTask = {
  title: string; isCompleted: boolean, id: number
};
export type TRemove = {
  remove: (id: number) => void;
};


type TState = { editingTask?: TTask, taskList: TTask[], newTaskValue: string };

export class Modal extends React.Component<{}, TState> {
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
    return (
      <StyledModal>
        <h2>Edit todo</h2>
        <input type="text" name="new task name" placeholder="Enter the task name" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Save</button>
      </StyledModal>
    );
  }
};

const StyledModal = styled.section`
  position: fixed;
  top: 30%;
  left: calc(50% - 150px);
  width: 300px;
  border: 1px solid;
  background: #edf;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
