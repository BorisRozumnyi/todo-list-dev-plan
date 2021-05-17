import React from "react";
import styled from "styled-components";
import { TTask } from "./App";

type Props = {
  tasks: TTask[];
};

export const TaskList: React.FC<Props> = ({ tasks }) => (
  <List>
    {tasks.map(({ title, isCompleted, id }) =>
      <Task key={id}>
        {title}
        <input type="checkbox" id="completed" checked={isCompleted} />
      </Task>
    )}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;

export const Task = styled.li`
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
