import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './taskProgress.module.scss';

const TaskProgress = (props) => {
  const { percentage } = props;

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskName}>Completed Task</div>
      <div className={styles.taskInner}>
        <div className={styles.taskCircle}>
          <CircularProgressbar
            value={percentage}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: "butt",
              textColor: "#537178",
              pathColor: "#5285EC"
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;