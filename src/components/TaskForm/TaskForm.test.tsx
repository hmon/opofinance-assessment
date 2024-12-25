import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renders TaskForm component', () => {
    render(<TaskForm />);
    const taskFormElement = screen.getByTestId('task-form');
    expect(taskFormElement).toBeInTheDocument();
    expect(taskFormElement).toMatchSnapshot();
  });

  test('calls addTask when form is submitted', () => {
    render(<TaskForm />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2023-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('');
  });

  test('does not call addTask if form is incomplete', () => {
    render(<TaskForm />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2023-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByLabelText(/title/i)).toHaveValue('New Task');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('2023-12-31');
  });
});
