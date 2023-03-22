import React, { useState, useReducer } from 'react'
import { types } from '../reducers/types/types';
import { initialState, userReducer } from '../reducers/userReducer';

import UserContext from './UserContext'


 const UserProvider = ({children}) => {
    const [isLoggin, setIsLoggin] = useState(true);

  const [state, dispatch] = useReducer(userReducer, initialState)

  const loginUser = (user) =>{
    dispatch({type: types.login, payload: user})
  }

  const register = (user) =>{
    dispatch({ type: types.register, payload: user })
  }

  return (
    <UserContext.Provider value={{isLoggin, setIsLoggin, loginUser, state, register}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider
