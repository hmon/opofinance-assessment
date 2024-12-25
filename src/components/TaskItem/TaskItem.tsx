import React, { useMemo } from "react";
import { Calendar, Trash } from "react-feather";
import { SortableHandle } from "react-sortable-hoc";
import useTaskStore from "../../store/task.ts";
import { Task, TaskStatus } from "../../types";
import { cx } from "class-variance-authority";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
}

const DragHandle = SortableHandle(() => (
  <span className={styles.TaskItemDragHandle}>
    <svg width="24" height="24">
      <path fill="currentColor"
            d="M14.5 15.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 14.5 15.5zm-5 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9.5 15.5zm5-5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 14.5 10.5zm-5 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9.5 10.5zm5-5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 14.5 5.5zm-5 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9.5 5.5z">
      </path>
    </svg>
  </span>
));

const TaskItem: React.FC<TaskItemProps> = React.memo(({
  task
}) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const editTask = useTaskStore((state) => state.editTask);
  const handleDelete = () => deleteTask(task.id);
  const changeStatus = (status: TaskStatus) => editTask({ ...task, status });
  const handleToggleStatus = () => {
    switch (task.status) {
      case TaskStatus.Pending:
        return changeStatus(TaskStatus.InProgress);
      case TaskStatus.InProgress:
        return changeStatus(TaskStatus.Completed);
      case TaskStatus.Completed:
        return changeStatus(TaskStatus.InProgress);
    }
  };

  const classes = cx(styles.TaskItem, {
    [styles.TaskItemOverdue]: new Date(task.dueDate) < new Date(),
    [styles.TaskItemCompleted]: task.status === "Completed"
  });

  const formattedDueDate = useMemo(() => {
    const dueDate = new Date(task.dueDate);

    const intl = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    return intl.format(dueDate);
  }, [task.dueDate]);

  return (
    <li
      className={classes}
      onClick={handleToggleStatus}
      data-testid="task-item"
    >
      <DragHandle />

      <button className={styles.TaskItemCheckbox}>
        <span className={styles.TaskItemCheckboxCircle}></span>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={styles.TaskItemCheckboxCheck}>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
                fill="currentColor"></path>
        </svg>
      </button>

      <div className={styles.TaskItemWrapper}>
        <div className={styles.TaskItemContent}>
          <div className={styles.TaskTitle}>{task.title}</div>
          <div className={styles.TaskDescription}>{task.description}</div>
          <span className={styles.TaskItemDate}>
          <Calendar size={14}/>
            {formattedDueDate}
        </span>
        </div>

        <div className={styles.TaskItemActions}>
          <div className={styles.TaskItemStatus}>{task.status}</div>
          <button className={styles.TaskItemDelete} data-testid="delete-button" onClick={handleDelete}>
            <Trash size={16}/>
          </button>
        </div>
      </div>
    </li>
  );
});

export default TaskItem;
