import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Button from '../../components/button';
import styles from './login.module.scss';

const Login = (props) => {
  const { history } = props;
  const { dispatch } = useContext(UserContext);
  const [values, setValues] = useState({
    apiKey: '',
    name: ''
  });

  const onChangeInputs = event => {
    setValues({
      ...values,
      [event.target.name]: `${event.target.value}`
    });
  };

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...values})
  };

  const submitLogin = async () => {
    try {
      const url = 'https://dev.teledirectasia.com:3092/login';
      const response = await fetch(url, config);
      const data = await response.json();

      dispatch({ type: 'LOGIN', payload: data });
      history.push('/task');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.text}>Login</div>

        <form>
          <input 
            name={"apiKey"}
            type={"text"}
            placeholder={"Id"}
            value={values.apiKey}
            onChange={onChangeInputs}
          />

          <input 
            name={"name"}
            type={"text"}
            placeholder={"Name"}
            value={values.name}
            onChange={onChangeInputs}
          />
        </form>

        <Button name={'Login'} onClick={submitLogin} />
      </div>
    </div>
  );
};

export default Login;
