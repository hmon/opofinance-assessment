import { render, screen } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('TaskManager Component', () => {
  it('renders TaskManager component', () => {
    render(<TaskManager />);
    const taskManagerElement = screen.getByTestId('task-manager');
    expect(taskManagerElement).toBeInTheDocument();
    expect(taskManagerElement).toMatchSnapshot();
  });

  test('renders TasksWrapper inside TaskManager', () => {
    render(<TaskManager />);
    const tasksWrapperElement = screen.getByTestId('tasks-wrapper');
    expect(tasksWrapperElement).toBeInTheDocument();
  });

  test('renders TaskList inside TasksWrapper', () => {
    render(<TaskManager />);
    const taskListElement = screen.getByTestId('task-list');
    expect(taskListElement).toBeInTheDocument();
  });
});
