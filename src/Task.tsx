import React from "react";
import styled from "styled-components";
import { TTask, TRemove } from "./App";

type Props = {
  title: string; isCompleted: boolean, id: number,
  remove: (id: number) => void;
  check: (id: number) => void;
  openEdit: (id: number) => void;
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
    const { title, id, isCompleted, remove, check, openEdit } = this.props;
    return (
      <StyledTask key={id}>
        <Flex width='80%'>
          <Checkbox type="checkbox" id="completed" checked={isCompleted} onChange={() => check(id)} />
          <Title>{title}</Title>
        </Flex>
        <Flex width='20%' justifyContent='flex-end'>
          <Button onClick={() => remove(id)}>Remove</Button>
          <Button onClick={() => openEdit(id)}>Edit</Button>
        </Flex>
      </StyledTask>
    );
  }
};

export const Checkbox = styled.input`
  align-self: center;
  margin-right: 15px;
`;

export const Title = styled.h3`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Button = styled.button`
  margin-left: 5px;
`;

export const StyledTask = styled.li`
  display: flex;
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
  width?: string;
}>`
  display: flex;
  ${({ justifyContent }) => (justifyContent && `justify-content: ${justifyContent};`)}
  ${({ width }) => `width: ${width};`}
`;
