import React, { useState } from "react";
import useTaskStore from "../../store/task.ts";
import { TaskStatus } from "../../types";
import { TextField } from "../TextField/TextField.tsx";
import { Button } from "../Button/Button.tsx";

import styles from "./TaskForm.module.css";

const TaskForm: React.FC = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    addTask({
      title,
      description,
      status: TaskStatus.Pending,
      dueDate,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form className={styles.TaskForm} onSubmit={handleSubmit} data-testid="task-form">
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;
