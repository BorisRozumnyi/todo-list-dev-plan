import React, { useState } from 'react';

type Props = {
  save: (value: string) => void;
};

export const CreateTaskForm: React.FC<Props> = ({ save }) => {
  const [newTaskValue, setNewTaskValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewTaskValue(value);
  };

  const handleClick = () => {
    save(newTaskValue);
    setNewTaskValue('');
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save(newTaskValue);
  };

  return (
    <>
      <input
        type="text"
        name="new-task-name"
        placeholder="Enter the task name"
        value={newTaskValue}
        onChange={handleChange}
        onKeyDown={handleKeyDownEnter}
      />
      <button onClick={handleClick}>Add task</button>
    </>
  );
};
