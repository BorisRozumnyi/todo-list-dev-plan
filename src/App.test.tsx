import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Task } from './Task';
import { TaskList } from './TaskList';

it('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/todo list/i);
  expect(title).toBeInTheDocument();
  const task = screen.queryByText(/add task/i);
  expect(task).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter the task name/i)).toBeInTheDocument();
  expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('name', 'new task name');
});

it('adding the new tasks, removing, checking', () => {
  render(<App />);
  expect(screen.getByRole('list').childElementCount).toBe(0);
  const input = screen.getByPlaceholderText("Enter the task name");
  fireEvent.change(input, { target: { value: 'task 1' } });
  expect(input.value).toBe('task 1')
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.getByRole('list').childElementCount).toBe(1);
  expect(screen.getByText('task 1')).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'task 2' } });
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.getByRole('list').childElementCount).toBe(2);
  expect(screen.getByText('task 2')).toBeInTheDocument();

  fireEvent.click(screen.getAllByText(/remove/i)[1]);
  expect(screen.getByRole('list').childElementCount).toBe(1);
  expect(screen.getByText(/task 1/i)).toBeInTheDocument();
  // expect(screen.getByText('task 2')).not.toBeInTheDocument();

  expect(screen.getAllByRole('checkbox')[0].checked).toBe(false);
  fireEvent.click(screen.getAllByRole('checkbox')[0]);
  expect(screen.getAllByRole('checkbox')[0].checked).toBe(true);
  fireEvent.click(screen.getAllByRole('checkbox')[0]);
  expect(screen.getAllByRole('checkbox')[0].checked).toBe(false);

  // expect(screen.queryByText(/edit todo/i)).toBeNull();
  // fireEvent.click(screen.getAllByText(/edit/i)[0]);
  // expect(screen.queryByText(/edit todo/i)).toBeInTheDocument();
});

it('Task is rendered', () => {
  const props = { title: 'title', isCompleted: false, id: 123 };
  const { getByRole } = render(<Task {...props} />);
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.checked).toBe(false);
  expect(screen.getByText(/remove/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
});
