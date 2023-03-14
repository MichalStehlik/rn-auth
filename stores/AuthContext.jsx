import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { createContext, useEffect, useState } from 'react';

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => { console.log(response); return response},
  (error) => {console.error(error); return Promise.reject(error);}
);

export const AuthContext = createContext({
  token: null,
  authenticate: (token) => {},
  logout: () => {},
  login: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        console.log("Token restored");
        authenticate(storedToken);
      }
    }
    fetchToken();
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const login = async (username, password) => {
    const response = await axios.post(
      "https://localhost:44496/api/v1/Account/login", 
      {username: username, password: password});
    return response.data;
  }

  const value = {
    token: authToken,
    authenticate: authenticate,
    logout: logout,
    login: login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;