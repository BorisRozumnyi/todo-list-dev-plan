import React from "react";
import { TTask } from "./App";

type Props = {
  tasks: TTask[];
};

export const TaskList: React.FC<Props> = ({ tasks }) => (
  <ul>
    {tasks.map(({title, isCompleted, id}) =>
      <li key={id}>
        {title}
        <input type="checkbox" id="completed" checked={isCompleted} />
      </li>
    )}
  </ul>
);
