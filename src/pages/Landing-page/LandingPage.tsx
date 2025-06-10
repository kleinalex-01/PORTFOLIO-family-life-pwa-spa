import { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import { taskRef } from '../../FirebaseConfig';
import { set, push, onValue } from 'firebase/database';

interface TaskData {
  task: string;
}

const Dashboard = () => {
  const [DbTask, setDbTask] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setDbTask([]);
        return;
      }
      const tasks: string[] = Object.entries(data as Record<string, TaskData>).map(([, value]) => {
        return value.task;
      });
      setDbTask(tasks);
    });
    return () => unsubscribe();
  }, []);

  const addToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskRef = push(taskRef);
    const id = newTaskRef.key;
    set(newTaskRef, {
      id: id,
      task: newTask
    }).then(() => {
      setNewTask("");
    }).catch((error) => {
      console.error("Hiba történt a teendő hozzáadásakor:", error);
    });
  }

  const formattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    const dateDormat = date.toLocaleDateString('hu-HU', options);
    return dateDormat.charAt(0).toUpperCase() + dateDormat.slice(1);
  }
  

  return (
    <>
    <div className={`container vh-100`}>
      {/* Header */}
      <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
        <h1 className='fw-semibold mx-1'>Családi Központ</h1>
        <i className={`${styles.bellIcon} fa-regular fa-bell mx-3`}></i>
      </div>
      {/* Közelső események + naptár kártya */}
      <div className={`container-fluid`}>
        <div className='d-flex align-items-center'>
          <Link to="/calendar"><i className={`${styles.calendarIcon} fa-regular fa-calendar`}></i></Link>
          <h2 className='mx-2'>Közelgő Események</h2>
        </div>
        <div className='card my-3'>
          <h2 className={`card-title mx-2 my-1`}>{formattedDate(new Date())}</h2>
          <div className='card-body'>
            <p className='card-text'>Nincs esemény a mai napra.</p>
          </div>
        </div>
        {/* Teljes naptár megtekintése */}
        <div className='d-flex justify-content-end align-items-center'>
          <Link to="/calendar" className={styles.calendarLink}>Naptár megnyitása</Link>
        </div>
      </div>
      {/* Teendő lista kártya */}
      <div className='container-fluid'>
        <div className='d-flex align-items-center my-3'>
          <i className={`fa-solid fa-list-check ${styles.checklistIcon}`}></i>
          <h2 className='mx-2'>Teendők</h2>
        </div>
        <div className='card my-3'>
          <div className='card-body'>
            {DbTask.length <= 0 ? <p className='card-text'>Nincs esemény a mai napra.</p>
              : (
                <ul className="list-unstyled mb-0">
                  {DbTask.map((task, index) => (
                    <li key={index}>
                      {task}
                    </li>
                  ))}
                </ul>
              )
            }
          <div>
          <form onSubmit={addToDo} className='d-flex align-items-center'>
              <input type='text' className='form-control border-0' placeholder='Új teendő hozzáadása' 
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
              />
              <button
                type='submit' 
                className={`${styles.button} btn btn-light rounded-0 border`}
                disabled={!newTask.trim()}
              >
                Hozzáadás
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Dashboard;
