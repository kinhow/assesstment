import React, { useState, useEffect, useContext } from 'react';
import filter from 'lodash/filter';
import { UserContext } from '../../context/userContext';
import { media } from '../../utils';
import Card from '../../components/card';
import Modal from '../../components/modal';
import Image from '../../components/image';
import Button from '../../components/button';
import AllTasks from './components/allTasks';
import TaskProgress from './components/taskProgress';
import SearchTask from './components/searchTask';
import TaskCompleted from './components/taskCompleted';
import Header from '../../components/header';
import styles from './dashboard.module.scss';

const DashBoard = (props) => {
  const { history } = props;
  const { state, dispatch } = useContext(UserContext);

  const [searchTask, setSearchTask] = useState('');
  const [taskValue, setTaskValue] = useState({ name: '' });
  const [allTasks, setAllTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [tasks, setTasks] = useState({
    totalTask: 0,
    completedTask: 0,
    latestTask: []
  });

  const postConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
    body: JSON.stringify({...taskValue})
  };

  const getConfig = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
  };

  const deleteConfig = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
  };

  const putConfig = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
    body: JSON.stringify({ completed: true })
  };

  const onChangeSearchInput = event => {
    setSearchTask(event.target.value);
  };

  const onChangeInputs = event => {
    setTaskValue({
      ...taskValue,
      [event.target.name]: `${event.target.value}`
    });
  };

  const calCirclePercentage = () => {
    let percentage = 100;
    let taskFinished = tasks.completedTask;
    let taskTotals = tasks.totalTask;
    let finalResult = percentage - (((taskTotals - taskFinished) / taskTotals) * percentage);
    
    setPercentage(finalResult);
  };

  const addNewTask = async () => {
    const newTaskUrl = 'https://dev.teledirectasia.com:3092/tasks';
    const response = await fetch(newTaskUrl, postConfig);
    const data = await response.json();
    console.log(data);
  };

  const getDashBoradData = async () => {
    const dashBoardUrl = 'https://dev.teledirectasia.com:3092/dashboard';
    const response = await fetch(dashBoardUrl, getConfig);
    const data = await response.json();

    setTasks({
      ...tasks,
      totalTask: data.totalTasks,
      completedTask: data.tasksCompleted,
      latestTask: data.latestTasks
    });
  };

  const getAllTasks = async () => {
    const allTaskUrl = 'https://dev.teledirectasia.com:3092/tasks';
    const response = await fetch(allTaskUrl, getConfig);
    const data = await response.json();
    const results = data.tasks;
    const sortResults = results.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1);
    const resultsFilter = filter(sortResults, value => value.name.includes(searchTask));
    
    setAllTasks(resultsFilter);
  }

  const onRemoveTask = async (id) => {
    const removeTaskUrl = `https://dev.teledirectasia.com:3092/tasks/${id}`;
    const response = await fetch(removeTaskUrl, deleteConfig);
    const data = await response.json();
    console.log(data);

    getAllTasks();
    getDashBoradData();
  };

  const submitDoneTask = async (id) => {
    const newTaskUrl = `https://dev.teledirectasia.com:3092/tasks/${id}`;
    const response = await fetch(newTaskUrl, putConfig);
    const data = await response.json();

    console.log('data', data);
    getDashBoradData();
    getAllTasks();
  };
  
  const Logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const submitTask = () => {
    setIsModalOpen(false);
    addNewTask();
    getAllTasks();
    getDashBoradData();
    calCirclePercentage();
  };

  useEffect(() => {
    getAllTasks();
  }, [searchTask]);

  useEffect(() => {
    getDashBoradData();
    calCirclePercentage();
  }, [tasks.completedTask]);

  return (
    <>
      <Header onClick={Logout}/>

      <div className={styles.task}>
        <div className={styles.wrapper}>
          <div className={styles.board}>
            <TaskCompleted
              totalTask={tasks.totalTask}
              completedTask={tasks.completedTask}
            />

            <AllTasks 
              taskList={tasks.latestTask}
            />

            <TaskProgress percentage={percentage}/>
          </div>

          <div className={styles.container}>
            <div className={styles.menu}>
              <div className={styles.title}>Tasks</div>
              <div className={styles.search}>
                <div className={styles.searchBox}>
                  <Image src={media('search-solid.svg')} alt='search-icon' />
                </div>

                <input
                  value={searchTask}
                  name={"name"}
                  type={"name"}
                  placeholder={'Search by task name'}
                  onChange={onChangeSearchInput}
                />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className={styles.add}
                name={'+ New Task'} 
              />
            </div>
          </div>

          <div className={styles.listBox}>
            {allTasks.map(item => (
              <SearchTask
                key={item._id}
                itemId={item._id}
                itemName={item.name}
                disabled={item.completed}
                onChange={() => submitDoneTask(item._id)}
                onDelete={() => onRemoveTask(item._id)}
              />
            ))}
          </div>

          {isModalOpen && (
            <Modal className={styles.mobileModal}>
              <Card
                isTask
                value={taskValue.name}
                name={'+ New Task'}
                onChange={onChangeInputs}
              >
                <Button longButton onClick={submitTask}/>
              </Card>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
