import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskStatus } from "../types";

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (fromIndex: number, toIndex: number) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: uuidv4(),
      title: "Create a new project 1",
      description: "Create a new project using React and TypeScript",
      status: TaskStatus.InProgress,
      dueDate: "2021-09-30",
    },
    {
      id: uuidv4(),
      title: "Add a new task 2",
      description: "Add a new task to the project",
      status: TaskStatus.Pending,
      dueDate: "2021-10-01"
    },
    {
      id: uuidv4(),
      title: "Complete the project 3",
      description: "Complete the project and deploy to production",
      status: TaskStatus.Completed,
      dueDate: "2021-10-15"
    },
    {
      id: uuidv4(),
      title: "Complete the project 4",
      description: "Complete the project and deploy to production",
      status: TaskStatus.Completed,
      dueDate: "2021-10-15"
    }
  ],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: uuidv4() }]
    })),
  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),
  moveTask: (fromIndex: number, toIndex: number) =>
    set((state) => {
      const tasks = [...state.tasks];
      const [removedTask] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, removedTask);

      return { tasks };
    })
}));

export default useTaskStore;
