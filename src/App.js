import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './_store';
import { ModalProvider } from './context/modalContext';
import { UserProvider } from './context/userContext';
import Login from './pages/login';
import DashBoard from './pages/dashboard';
import Task from './pages';

const App = () => {
  return (
    <UserProvider>
      <Router history={history}>
        <Switch>
          <ModalProvider>
            <Route exact path='/' component={Login} />
            <Route path='/task' component={Task} />
            <Route path='/dashboard' component={DashBoard} />
          </ModalProvider>
        </Switch>
        <Route exact path='/' component={Login} />
      </Router>
    </UserProvider>
  );
};

export default App;
