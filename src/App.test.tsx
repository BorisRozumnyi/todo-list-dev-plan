import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import { App } from './App';
import { Task } from './Task';
import { Modal } from './Modal';
import { debug } from 'console';

const mockTask = {
  title: 'task 1',
  isCompleted: false,
  id: 123,
};

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
  expect(queryAllByRole('textbox')[0]).toHaveAttribute('name', 'new-task-name');
});

it('adding new tasks', () => {
  const { createNewTaskInput, createNewTaskButton, list, getByText } = setup();
  expect(list.childElementCount).toBe(0);
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  expect(createNewTaskInput).toHaveValue('task 1');
  fireEvent.click(createNewTaskButton);
  expect(list.childElementCount).toBe(1);
  expect(getByText('task 1')).toBeInTheDocument();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 2' } });
  fireEvent.click(createNewTaskButton);
  expect(list.childElementCount).toBe(2);
  expect(getByText('task 2')).toBeInTheDocument();
});

it('creating a task by pressing the enter key', () => {
  const { createNewTaskInput, queryByText } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  expect(createNewTaskInput).toHaveValue('task 1');
  userEvent.type(createNewTaskInput, `${specialChars.enter}`); // the enter key down doesn't work
  expect(queryByText('task 1')).toBeInTheDocument();
});

it('editing a task by pressing the enter key in the App', () => {
  const { createNewTaskInput, createNewTaskButton, queryByText, queryByTestId, debug } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);
  fireEvent.click(queryByText(/edit/i));
  fireEvent.change(queryByTestId('edit-input'), { target: { value: 'task 1 was change' } });
  userEvent.type(queryByTestId('edit-input'), `${specialChars.enter}`); // the enter key down doesn't work
  expect(queryByText('task 1')).not.toBeInTheDocument();
  expect(queryByText('task 1 was change')).toBeInTheDocument();
});

it('clear the add new task input', () => {
  const { createNewTaskInput, createNewTaskButton } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);
  expect(createNewTaskInput).toHaveValue('');
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

  expect(queryAllByRole('checkbox')[0]).not.toBeChecked();
  fireEvent.click(queryAllByRole('checkbox')[0]);
  expect(queryAllByRole('checkbox')[0]).toBeChecked();
  fireEvent.click(queryAllByRole('checkbox')[0]);
  expect(queryAllByRole('checkbox')[0]).not.toBeChecked();
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

it('close the edit window by click outside', () => {
  const {
    createNewTaskInput,
    createNewTaskButton,
    queryAllByText,
    queryByTestId,
  } = setup();
  fireEvent.change(createNewTaskInput, { target: { value: 'task 1' } });
  fireEvent.click(createNewTaskButton);
  fireEvent.click(queryAllByText(/edit/i)[0]);

  expect(queryByTestId('edit-modal')).toBeInTheDocument();
  userEvent.click(document.body);
  expect(queryByTestId('edit-modal')).toBeNull();
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

  expect(queryByTestId('edit-input')).toHaveValue('task 1');
  fireEvent.change(queryByTestId('edit-input'), {
    target: { value: 'task 1 was change' },
  });
  fireEvent.click(queryByText(/save/i));
  expect(queryByText('task 1')).toBeNull();
  expect(queryByText('task 1 was change')).toBeInTheDocument();
});

it('The edit input has focus', () => {
  const { queryByTestId } = render(
    <Modal task={mockTask} close={() => {}} save={() => {}} />,
  );
  const editInput = queryByTestId('edit-input');
  expect(editInput).toBeInTheDocument();
  expect(editInput).toHaveFocus();
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
  expect(checkbox).not.toBeChecked();
  expect(getByText(/remove/i)).toBeInTheDocument();
  expect(getByText(/edit/i)).toBeInTheDocument();
});
