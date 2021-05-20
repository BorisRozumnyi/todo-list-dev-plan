import React from 'react';

type Props = {
  newTaskValue: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleCreateTask: any;
  // handleCreateTask:
  //   | React.FormEventHandler<HTMLFormElement>
  //   | React.MouseEventHandler<HTMLButtonElement>;
};
// type State = {};

export const CreateTaskForm: React.FC<Props> = ({
  handleCreateTask,
  newTaskValue,
  handleChange,
}) => {
  return (
    <form onSubmit={handleCreateTask}>
      <input
        type="text"
        name="new-task-name"
        placeholder="Enter the task name"
        value={newTaskValue}
        onChange={handleChange}
      />
      <button onClick={handleCreateTask}>Add task</button>
    </form>
  );
};
