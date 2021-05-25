import React from 'react';

type Props = {
  save: (value: string) => void;
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

  handleClick = () => {
    const { newTaskValue } = this.state;
    const { save } = this.props;
    save(newTaskValue);
    this.setState({ newTaskValue: '' });
  };

  handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { newTaskValue } = this.state;
    const { save } = this.props;
    if (e.key === 'Enter') save(newTaskValue);
  };

  render() {
    const { newTaskValue } = this.state;
    const { handleChange, handleClick, handleKeyDownEnter } = this;
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
  }
}
