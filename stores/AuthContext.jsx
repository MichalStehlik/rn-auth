import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  login: () => {}
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const login = (username, password) => {
    console.log("Login");
    axios.post("https://jobs.pslib.cloud/api/v1/login", {username: username, password: password})
    .then(response => {
        authenticate(response.data);
    })
    .catch(error => {
        setAuthToken("");
    })
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    login: login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;