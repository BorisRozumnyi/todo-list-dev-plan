import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/todo list/i);
  expect(title).toBeInTheDocument();
  const task = screen.queryByText(/add task/i);
  expect(task).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter the task name/i)).toBeInTheDocument();
  expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('name', 'new task name');
});

it('adding new tasks', () => {
  render(<App />);
  expect(screen.getByRole('list').childElementCount).toBe(0);
  const input = screen.getByPlaceholderText("Enter the task name");
  fireEvent.change(input, { target: { value: 'task 1' } })
  expect(input.value).toBe('task 1')
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.getByRole('list').childElementCount).toBe(1);
  expect(screen.getByRole('list').children[0].textContent).toBe('task 1');
  
  fireEvent.change(input, { target: { value: 'task 2' } })
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.getByRole('list').childElementCount).toBe(2);
  expect(screen.getByRole('list').children[1].textContent).toBe('task 2');
});
