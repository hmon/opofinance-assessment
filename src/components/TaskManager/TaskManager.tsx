import React, { useMemo, useState } from "react";
import useTaskStore from "../../store/task.ts";
import TaskForm from "../TaskForm/TaskForm.tsx";
import { TextField } from "../TextField/TextField.tsx";
import styles from "./TaskManager.module.css";
import { TaskList } from "../TaskList/TaskList.tsx";
import useDebounce from "../../hooks/useDebounce.ts";

const TaskManager: React.FC = () => {
  const { tasks } = useTaskStore();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredTasks = useMemo(() => tasks.filter(
    (task) =>
      (filter === "All" || task.status === filter) &&
      task.title.toLowerCase().includes(debouncedSearchQuery)
  ), [debouncedSearchQuery, filter, tasks]);

  return (
    <div className={styles.TaskManager} data-testid="task-manager">
      <TaskForm/>

      <div className={styles.TasksWrapper} data-testid="tasks-wrapper">
        <div className="controls">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <TextField
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TaskList tasks={filteredTasks}/>
      </div>
    </div>
  );
};

export default TaskManager;
