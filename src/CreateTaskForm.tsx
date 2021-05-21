import React, { useState } from 'react';

type Props = {
  handleCreateTask: (e: React.FormEvent, value: string) => void;
};

export const CreateTaskForm: React.FC<Props> = ({ handleCreateTask }) => {
  const [newTaskValue, setNewTaskValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewTaskValue(value);
  };

  const handleClick = (e: React.FormEvent<Element>) => {
    handleCreateTask(e, newTaskValue);
    setNewTaskValue('');
  };

  return (
    <form>
      <input
        type="text"
        name="new-task-name"
        placeholder="Enter the task name"
        value={newTaskValue}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add task</button>
    </form>
  );
};
