import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TTask } from './App';

type Props = {
  task: TTask;
  close: () => void;
  save: (v: string) => void;
};

const useClickOutsede = (
  ref: React.RefObject<HTMLInputElement>,
  close: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (ref && !ref.current?.contains(target)) close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
};

export const Modal: React.FC<Props> = ({ task, close, save }) => {
  const [newTaskValue, setNewTaskValue] = useState('');

  const wrapperRef = useRef(null);
  useClickOutsede(wrapperRef, close);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewTaskValue(value);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save(newTaskValue);
  };

  return (
    <StyledModal ref={wrapperRef} data-testid="edit-modal">
      <Close data-testid="close-edit-modal" onClick={close}>
        x
      </Close>
      <h2>Edit todo</h2>
      <input
        type="text"
        data-testid="edit-input"
        defaultValue={task.title}
        onChange={handleChange}
        autoFocus
        onKeyDown={handleKeyDownEnter}
      />
      <Save onClick={() => save(newTaskValue)}>Save</Save>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: fixed;
  top: 30%;
  left: calc(50% - 150px);
  width: 300px;
  border: 1px solid;
  background: #edf;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Close = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
`;
const Save = styled.button`
  margin-top: 3px;
`;
