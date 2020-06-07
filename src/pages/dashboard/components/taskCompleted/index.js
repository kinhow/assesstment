import React from 'react';
import styles from './taskCompleted.module.scss';

const TaskCompleted = (props) => {
  const { completedTask, totalTask } = props;

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskName}>Tasks Completed</div>
      <div className={styles.taskNumber}>
        <span>{completedTask}</span>
        / {totalTask}
      </div>
    </div>
  );
};

export default TaskCompleted;
