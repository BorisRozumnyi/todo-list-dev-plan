import React from "react";
import styled from "styled-components";
import { TTask, TRemove } from "./App";
import { Task } from "./Task";

type Props = {
  tasks: TTask[];
  check: (id: number) => void;
};

export const TaskList: React.FC<Props & TRemove> = ({ tasks, remove, check }) => (
  <List>
    {tasks.map(({ title, isCompleted, id }) => {
      const props = { title, isCompleted, id, remove, check };
      return <Task key={id} {...props} />
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;
