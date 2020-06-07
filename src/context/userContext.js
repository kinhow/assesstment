import React, { useReducer, useEffect } from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

const initialState = {
  token: { name: '', token: '07aea76d0db90af12c043860' },
  isLoggedIn: false,
};

const login = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
      };
    
    case "LOGOUT":
      localStorage.clear();

      return {
        ...state,
        token: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export const UserProvider = props => {
  const [state, dispatch] = useReducer(login, initialState);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || null);

    if (token) {
      dispatch({
        type: 'LOGIN',
        payload: { token }
      })
    }
  }, []);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  );
};
