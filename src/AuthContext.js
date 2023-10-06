import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const login = (token, user) => {
    setAuthState({
      isAuthenticated: true,
      token,
      user,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
