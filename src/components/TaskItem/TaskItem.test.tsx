import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from './TaskItem';
import useTaskStore from "../../store/task";
import { TaskStatus } from "../../types";

const mockTask = {
  id: '1',
  title: 'Foo Task',
  description: 'Foo Description',
  status: TaskStatus.InProgress,
  dueDate: new Date('2022-01-01').toDateString(),
};

describe('TaskItem', () => {
  test('renders TaskItem component', () => {
    render(<TaskItem task={mockTask} />);
    const taskItemElement = screen.getByTestId('task-item');
    expect(taskItemElement).toBeInTheDocument();
    expect(taskItemElement).toMatchSnapshot();
  });

  test('calls handleDelete when delete button is clicked', () => {
    useTaskStore.getState().deleteTask = vi.fn();
    render(<TaskItem task={mockTask} />);
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    deleteButton.click();
    expect(useTaskStore.getState().deleteTask).toHaveBeenCalledWith('1');
  });
});
