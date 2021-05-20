import React from 'react';

type Props = {
  handleCreateTask: (e: React.FormEvent, value: string) => void;
};
type State = { newTaskValue: string };

export class CreateTaskForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newTaskValue: '',
    };
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.setState({ newTaskValue: value });
  };

  handleClick = (e: any) => {
    const { newTaskValue } = this.state;
    const { handleCreateTask } = this.props;
    handleCreateTask(e, newTaskValue);
    this.setState({ newTaskValue: '' });
  };

  render() {
    const { newTaskValue } = this.state;
    const { handleChange, handleClick } = this;
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
  }
}
