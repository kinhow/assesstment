import React, { useState, useContext } from 'react';
import { Link, Router } from 'react-router-dom';
import { history } from '../../_store';
import { UserContext } from '../../context/userContext';
import Modal from '../../components/modal';
import Card from '../../components/card';
import Button from '../../components/button';

const AddTask = () => {
  const { state } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskValue, setTaskValue] = useState({ name: '' });

  const postConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.token.token
    },
    body: JSON.stringify({...taskValue})
  };

  const onChangeInputs = event => {
    setTaskValue({
      ...taskValue,
      [event.target.name]: `${event.target.value}`
    });
  };

  const addNewTask = async () => {
    const newTask = 'https://dev.teledirectasia.com:3092/tasks';
    const response = await fetch(newTask, postConfig);
    const data = await response.json();
    console.log(data);
  };

  const submitTask = () => {
    setIsModalOpen(false);
    addNewTask();
  };
  
  return (
    <>
      <Card name={'You have no Task.'}>
        <Button
          shortButton
          onClick={() => setIsModalOpen(true)}
        />
      </Card>

      {isModalOpen && (
        <Modal>
          <Card
            isTask
            value={taskValue.name}
            name={'+ New Task'}
            onChange={onChangeInputs}
          >
            <Router history={history}>
              <Link to={'/dashboard'}>
                <Button longButton onClick={submitTask}/>
              </Link>
            </Router>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default AddTask;
