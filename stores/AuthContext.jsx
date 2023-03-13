import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  login: () => {}
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    console.log(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const login = (username, password) => {
    console.log("Login");
    axios.post("https://localhost:44496/api/v1/Account/login", {username: username, password: password})
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