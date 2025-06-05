import React from 'react';
import styles from './Landingpage.module.css';

const TasksMenu = () => {
  const alexTasks = ['Buy groceries', 'Clean garage', 'Call plumber'];
  const agiTasks = ['Prepare dinner', 'Laundry', 'Book doctor appointment'];

  return (
    <div className={`container ${styles.tasksContainer}`}>
      <div className="row">
        {/* Alex's Column */}
        <div className={`col-6 ${styles.column}`}>
          <h3 className={styles.name}>Alex</h3>
          <ul className={styles.taskList}>
            {alexTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>

        {/* Divider Line */}
        <div className={styles.divider}></div>

        {/* Ági's Column */}
        <div className={`col-6 ${styles.column}`}>
          <h3 className={styles.name}>Ági</h3>
          <ul className={styles.taskList}>
            {agiTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TasksMenu;
