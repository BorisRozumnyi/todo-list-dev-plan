import React from 'react';
import styled from 'styled-components';
import { TTask } from './App';
import { Task } from './Task';

type Props = {
  tasks: TTask[];
  check: (id: number) => void;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const TaskList: React.FC<Props> = ({
  tasks,
  remove,
  check,
  openEdit,
}) => (
  <List>
    {tasks.map(({ title, isCompleted, id }) => {
      const props = { title, isCompleted, id, remove, check, openEdit };
      return <Task key={id} {...props} />;
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;