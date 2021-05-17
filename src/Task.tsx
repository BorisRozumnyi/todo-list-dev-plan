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
        <Flex>
          <Title>{title}</Title>
          <Checkbox type="checkbox" id="completed" checked={isCompleted} />
        </Flex>
        <Flex>
          <Button>Remove</Button>
          <Button>Edit</Button>
        </Flex>
      </StyledTask>
    );
  }
};

export const Checkbox = styled.input`
  position: absolute;
  right: 0;
`;
export const Title = styled.h3`
  background: #efd
`;

export const Button = styled.button`
  margin-left: 5px;
`;

export const Flex = styled.div`
  position: relative;
  display: flex;
`;


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
