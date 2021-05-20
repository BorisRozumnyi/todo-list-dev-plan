import React from "react";
import styled from "styled-components";
import { TTask } from "./App";

type Props = {
  title: string; isCompleted: boolean, id: number
};

type TState = { isCompleted: boolean, taskList: TTask[], newTaskValue: string };

export class Task extends React.Component<Props, TState>{
  constructor(props: Props) {
    super(props);
    this.state = {
      isCompleted: false,
      taskList: [],
      newTaskValue: '',
    };
  }
  render() {
    const { title, id, isCompleted } = this.props;
    return (
      <StyledTask key={id}>
        {title}
        <input type="checkbox" id="completed" checked={isCompleted} />
      </StyledTask>
    );
  }
};

export const StyledTask = styled.li`
  display: flex;
  justify-content: space-between;
  border: solid black 1px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  };
`;
