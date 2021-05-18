import React from 'react';
import styled from 'styled-components';
import { TTask } from './App';

type Props = {
  task: TTask;
  close: () => void;
};

type TState = { editingTask?: TTask, taskList: TTask[], newTaskValue: string };
export class Modal extends React.Component<Props, TState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingTask: undefined,
      taskList: [],
      newTaskValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  };

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  handleSaveEdit() {
    console.log('===');
  };

  render() {
    const { task, close } = this.props;
    const { handleSaveEdit, handleChange } = this;
    return (
      <StyledModal>
        <Close data-testid='close-edit-modal' onClick={close}>x</Close>
        <h2>Edit todo</h2>
        <input type="text" defaultValue={task.title} onChange={handleChange} />
        <Save onClick={handleSaveEdit}>Save</Save>
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

const Close = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
`;
const Save = styled.button`
  margin-top: 3px;
`;
