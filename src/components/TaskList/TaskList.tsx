import React from "react";
import { Virtuoso } from "react-virtuoso";
import * as ReactSortableHOC from "react-sortable-hoc";
import { Task } from "../../types";
import TaskItem from "../TaskItem/TaskItem.tsx";
import styles from "./TaskList.module.css";
import useTaskStore from "../../store/task.ts";

interface TaskListProps {
  tasks: Task[];
}

type ListContainerSortableProps = {
  listRef: React.Ref<HTMLDivElement> | null;
}

const ItemContainerSortable = ReactSortableHOC.SortableElement(
  (props: object) => <div {...props} />
);

const ListContainerSortable = ReactSortableHOC.SortableContainer<ListContainerSortableProps>(
  ({ listRef, ...props }: ListContainerSortableProps) => <div ref={listRef} {...props} />);

export const TaskList = React.memo(({ tasks }: TaskListProps) => {
  const moveTask = useTaskStore(state => state.moveTask);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    moveTask(oldIndex, newIndex);
  }

  return (
    <ul className={styles.TaskList} data-testid="task-list">
      <Virtuoso
        useWindowScroll
        data={tasks}
        components={{
          List: React.forwardRef((props, ref) => {
            return <ListContainerSortable {...props} listRef={ref} onSortEnd={onSortEnd} useDragHandle />;
          }),
          Item: (props) => {
            const { ["data-index"]: index } = props;
            return <ItemContainerSortable index={index} {...props} />;
          }
        }}
        style={{ height: "100%" }}
        itemContent={(_, item) => (
          <TaskItem key={item.id} task={item}/>
        )}
      />
    </ul>
  );
});
