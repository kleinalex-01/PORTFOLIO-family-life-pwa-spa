import { useState, useEffect, useRef } from 'react';
import styles from './LandingPage.module.css';
import { taskRef } from '../../FirebaseConfig';
import { set, push, onValue, update, child, remove } from 'firebase/database';
import { Calendar } from '../../components/Calendar';
import { CalendarTaskList } from '../../components/CalendarTaskList';

interface TaskData {
  id: string;
  task: string;
  isCompleted: boolean;
  isModified: boolean;
}

const Dashboard = () => {
  const [DbTask, setDbTask] = useState<TaskData[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [modifyTaskInput, setModifyTaskinput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const unsubscribe = onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setDbTask([]);
        return;
      }
      const tasks: TaskData[] = Object.entries(data as Record<string, TaskData>).map(([, value]) => {
        return value;
      });
      setDbTask(tasks);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [DbTask]);

  const addToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskRef = push(taskRef);
    const id = newTaskRef.key;
    const isCompleted = true;
    const isModified = false;
    set(newTaskRef, {
      id: id,
      task: newTask,
      isCompleted: isCompleted,
      isModified: isModified
    }).then(() => {
      setNewTask("");
    }).catch((error) => {
      console.error("Hiba történt a teendő hozzáadásakor:", error);
    });
  }

  const deleteToDo = (taskId: string) => {
    const taskToDelete = child(taskRef, taskId);
    remove(taskToDelete)
  }

  const modifyTask = (taskId: string, updatedTask: {task?: string, isModified?: boolean, isCompleted?: boolean}) => {
    const taskToModify = child(taskRef, taskId);
    update(taskToModify, updatedTask)
      .then(() => {
        console.log("Teendő módosítva:", taskId);
      })
      .catch((error) => {
        console.error("Hiba történt a teendő módosításakor:", error);
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
    <CalendarTaskList/>
    <div className={`container vh-100`}>
      {/* Header */}
      <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
        <h1 className='fw-semibold mx-1'>Családi Központ</h1>
        <i className={`${styles.bellIcon} fa-regular fa-bell mx-3`}></i>
      </div>
      {/* Közelső események + naptár kártya */}
      <div className={`container-fluid`}>
        <div className='d-flex align-items-center'>
          <i className={`${styles.calendarIcon} fa-regular fa-calendar`}></i>
          <h2 className='mx-2'>Közelgő Események</h2>
        </div>
        <div className='card my-3'>
          <h2 className={`card-title mx-2 my-1`}>{formattedDate(new Date())}</h2>
          <div className='card-body'>
            <Calendar/>
          </div>
        </div>
      </div>
      {/* Teendő lista kártya */}
      <div className='container-fluid'>
        <div className='d-flex align-items-center my-3'>
          <i className={`fa-solid fa-list-check ${styles.checklistIcon}`}></i>
          <h2 className='mx-2'>Teendők</h2>
        </div>
      {/* Teendők listázása */}
        <div className='card my-3'>
          <div className='card-body'>
            {DbTask.length <= 0 ? <p className='card-text'>Nincs esemény a mai napra.</p>
              : (
                <ul className="list-unstyled mb-0">
                  {DbTask.map((task, index) => (
                    <li key={index} className='d-flex align-items-center'>
                      <div className='d-flex align-items-center justify-content-start w-100'>
                        {task.isCompleted ?
                        <button onClick={() => {
                          modifyTask(task.id, {isCompleted: false, isModified: false});
                        }} className={styles.completedBtn}><i className="fa-regular fa-square"></i></button>
                        :
                        <button onClick={() => {
                          modifyTask(task.id, {isCompleted: true, isModified: false});
                        }} className={styles.completedBtn}><i className="fa-regular fa-square-check"></i></button>}
                        {!task.isModified ?
                        <p className={`${styles.taskName} mx-3`}>{task.task}</p> 
                        : 
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (modifyTaskInput.trim() === "") return;
                          modifyTask(task.id, {task: modifyTaskInput, isModified: false});
                          setModifyTaskinput("");
                          }}>
                          <input type='text'
                                 defaultValue={task.task}
                                 onChange={(e) => setModifyTaskinput(e.target.value)}
                                 className='form-control border-0 mx-3 my-2'
                                 ref={inputRef}
                          ></input>
                        </form>
                        }
                      </div>
                      <button onClick={() => {
                              modifyTask(task.id, {isModified: true})
                           }} type='button' 
                              className={`${styles.buttons} btn btn-warning mx-2`}
                              disabled={!task.isCompleted || task.isModified}
                              >Módosítás</button>
                      <button onClick={() => {deleteToDo(task.id)}} type='button' className={`${styles.buttons} btn btn-danger`}>Törlés</button>
                    </li>
                  ))}
                </ul>
              )
            }
          <div>
          <form onSubmit={addToDo} className='d-flex align-items-center my-3'>
              <input type='text' className='form-control border-0' placeholder='Új teendő hozzáadása' 
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
              />
              <button
                type='submit' 
                className={`${styles.button} btn btn-light rounded border`}
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
