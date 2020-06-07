import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Header from '../components/header';
import AddTask from './addTask';

const MainPage = (props) => {
  const { history } = props;
  const { state, dispatch } = useContext(UserContext);

  const Logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  return (
    <>
      {state.isLoggedIn &&
        <>
          <Header onClick={Logout}/>
          <AddTask />
        </>
      }
    </>
  );
};

export default MainPage;
