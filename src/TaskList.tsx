import React from "react";
import styled from "styled-components";
import { TTask } from "./App";
import { Task } from "./Task";

type Props = {
  tasks: TTask[];
};

export const TaskList: React.FC<Props> = ({ tasks }) => (
  <List>
    {tasks.map(({ title, isCompleted, id }) => {
      const props = { title, isCompleted, id };
      return <Task {...props} />
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;
