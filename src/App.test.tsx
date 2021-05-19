import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { App } from './App';
import { Task } from './Task';

const setup = () => {
  const app = render(<App test />);
  const createNewTaskInput = app.getByPlaceholderText(/enter the task name/i);
  const createNewTaskButton = app.getByText(/add task/i);
  const list = app.getByRole('list');
  return {
    createNewTaskInput,
    createNewTaskButton,
    list,
    ...app,
  };
};

it('renders the App', () => {
  const { createNewTaskInput, getByText, queryAllByRole } = setup();
  expect(getByText(/todo list/i)).toBeInTheDocument();
  expect(createNewTaskInput).toBeInTheDocument();
  expect(queryAllByRole('textbox')[0]).toHaveAttribute('name', 'new task name');
});

it('adding new tasks', () => {
  const { createNewTaskInput, createNewTaskButton, list, getByText } = setup();
  expect(list.childElementCount).toBe(0);
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  expect(createNewTaskInput.value).toBe('task 1');
  fireEvent.click(createNewTaskButton);
  expect(list.childElementCount).toBe(1);
  expect(getByText('task 1')).toBeInTheDocument();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 2' } });
  fireEvent.click(createNewTaskButton);
  expect(list.childElementCount).toBe(2);
  expect(getByText('task 2')).toBeInTheDocument();
});

it('removing a task', () => {
  const {
    createNewTaskInput,
    createNewTaskButton,
    list,
    queryByText,
    queryAllByText,
  } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);
  fireEvent.change(createNewTaskInput, { target: { value: 'task 2' } });
  fireEvent.click(createNewTaskButton);

  fireEvent.click(queryAllByText(/remove/i)[1]);
  expect(list.childElementCount).toBe(1);
  expect(queryByText(/task 1/i)).toBeInTheDocument();
  expect(queryByText('task 2')).toBeNull();
});

it('checking', () => {
  const { createNewTaskInput, createNewTaskButton, queryAllByRole } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);

  expect(queryAllByRole('checkbox')[0].checked).toBe(false);
  fireEvent.click(queryAllByRole('checkbox')[0]);
  expect(queryAllByRole('checkbox')[0].checked).toBe(true);
  fireEvent.click(queryAllByRole('checkbox')[0]);
  expect(queryAllByRole('checkbox')[0].checked).toBe(false);
});

it('open and close the edit window', () => {
  const {
    createNewTaskInput,
    createNewTaskButton,
    queryByText,
    getAllByText,
    getByTestId,
  } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);

  expect(queryByText(/edit todo/i)).toBeNull();
  fireEvent.click(getAllByText(/edit/i)[0]);
  expect(queryByText(/edit todo/i)).toBeInTheDocument();
  fireEvent.click(getByTestId('close-edit-modal'));
  expect(queryByText(/edit todo/i)).toBeNull();
});

it('editing a task', () => {
  const {
    createNewTaskInput,
    createNewTaskButton,
    queryByText,
    getAllByText,
    queryByTestId,
  } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);
  fireEvent.click(getAllByText(/edit/i)[0]);
  
  expect(queryByTestId('edit-task').value).toBe('task 1');
  fireEvent.change(queryByTestId('edit-task'), { target: { value: 'task 1 was change' } });
  fireEvent.click(queryByText(/save/i));
  expect(queryByText('task 1')).toBeNull();
  expect(queryByText('task 1 was change')).toBeInTheDocument();
});

it('Task is rendered', () => {
  const props = {
    title: 'title',
    isCompleted: false,
    id: 123,
    remove: () => {},
    check: () => {},
    openEdit: () => {},
  };
  const { getByRole, getByText } = render(<Task {...props} />);
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.checked).toBe(false);
  expect(getByText(/remove/i)).toBeInTheDocument();
  expect(getByText(/edit/i)).toBeInTheDocument();
});
