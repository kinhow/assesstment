import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './allTask.module.scss';

const AllTask = (props) => {
  const { taskList } = props;

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskName}>Latest Created Tasks</div>

      {taskList.map(item => {
        const disabledClassName = item.completed === true ? styles.disabled : '';

        return (
          <li key={item._id} className={`${styles.listItem} ${disabledClassName}`}>{item.name}</li>
        );
      })}
    </div>
  );
};

AllTask.propTypes = {
  taskList: PropTypes.array,
};

AllTask.defaultProps = {
  taskList: [],
};

export default AllTask;
