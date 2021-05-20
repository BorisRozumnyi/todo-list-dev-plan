import React from "react";
import styled from "styled-components";
import { TTask, TRemove } from "./App";

type Props = {
  title: string; isCompleted: boolean, id: number,
  remove: (id: number) => void;
};

type TState = { isCompleted: boolean, taskList: TTask[], newTaskValue: string };

export class Task extends React.Component<Props & TRemove, TState>{
  constructor(props: Props & TRemove) {
    super(props);
    this.state = {
      isCompleted: false,
      taskList: [],
      newTaskValue: '',
    };
  }
  render() {
    const { title, id, isCompleted, remove } = this.props;
    return (
      <StyledTask key={id}>
        <Flex>
          <Title>{title}</Title>
          <Checkbox type="checkbox" id="completed" checked={isCompleted} />
        </Flex>
        <Flex justifyContent='flex-end'>
          <Button onClick={() => remove(id)}>Remove</Button>
          <Button>Edit</Button>
        </Flex>
      </StyledTask>
    );
  }
};

export const Checkbox = styled.input`
  align-self: center;
`;

export const Title = styled.h3`
  width: 100%;
`;

export const Button = styled.button`
  margin-left: 5px;
`;

export const StyledTask = styled.li`
  display: flex;
  justify-content: space-around;
  border: solid black 1px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  };
`;

export const Flex = styled.div<{
  justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}>`
  width: 100%;
  display: flex;
  ${({ justifyContent }) => (justifyContent && `justify-content: ${justifyContent};`)}
`;
