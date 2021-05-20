import React from 'react';
import styled from 'styled-components';
import { TTask } from './App';

type Props = {
  task: TTask;
  close: () => void;
  save: (v: string) => void;
};

type TState = { newTaskValue: string };
export class Modal extends React.Component<Props, TState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newTaskValue: '',
    };
  }

  private wrapperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  handleClickOutside = (e: any) => {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(e.target)) {
      this.props.close();
    }
  };

  render() {
    const { task, close, save } = this.props;
    const { newTaskValue } = this.state;
    const { handleChange } = this;
    return (
      <StyledModal ref={this.wrapperRef} data-testid="edit-modal">
        <Close data-testid="close-edit-modal" onClick={close}>
          x
        </Close>
        <h2>Edit todo</h2>
        <input
          type="text"
          data-testid="edit-task"
          defaultValue={task.title}
          onChange={handleChange}
        />
        <Save onClick={() => save(newTaskValue)}>Save</Save>
      </StyledModal>
    );
  }
}

const StyledModal = styled.div`
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
