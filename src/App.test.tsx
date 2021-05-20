import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { CostInput } from './CostInput';

it('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/todo list/i);
  expect(title).toBeInTheDocument();
  const task = screen.queryByText(/add task/i);
  expect(task).toBeInTheDocument();
  expect(screen.queryByText('*')).toBeNull();
  expect(screen.getByPlaceholderText(/enter the task name/i)).toBeInTheDocument();
  expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('name', 'new task name');
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByRole('list').childElementCount).toBe(0);
});

it('renders the task item', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.queryByText('*')).toBeInTheDocument();
});

it('adding new task', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.queryByText('*')).toBeInTheDocument();
  // expect(screen.getByRole('list').children[0]).toBe(1);
  expect(screen.getByRole('list').childElementCount).toBe(1);
});

const setup = () => {
  const utils = render(<CostInput />)
  const input = utils.getByLabelText('cost-input')
  return {
    input,
    ...utils,
  }
};

test('It should keep a $ in front of the input', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: '23' } })
  console.log(input)
  expect(input.value).toBe('$23')
});

test('It should allow a $ to be in the input when the value is changed', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: '$23.0' } })
  expect(input._valueTracker.getValue()).toBe('$23.0')
});

test('It should not allow letters to be inputted', () => {
  const { input } = setup()
  expect(input.value).toBe('') // empty before
  fireEvent.change(input, { target: { value: 'Good Day' } })
  expect(input._valueTracker.getValue()).toBe('') //empty after
});

xit('It should allow the $ to be deleted', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('$23') // need to make a change so React registers "" as a change
  fireEvent.change(input, { target: { value: '' } })
  expect(input._valueTracker.getValue()).toBe('')
})