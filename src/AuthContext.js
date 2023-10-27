import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from 'axios';
import Cookies from "universal-cookie";

const AuthContext = createContext();
const cookies = new Cookies();
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const login = (token) => {
    const user = cookies.get('user_data');
    if (user) {
      // La cookie de usuario existe, lo que indica que el usuario está autenticado
      setAuthState({
        isAuthenticated: true,
        token: token, // Asegúrate de que `token` sea el token real obtenido del inicio de sesión
        user: user,   // Establece el usuario a partir de la cookie
      });
    } else {
      // La cookie de usuario no existe, lo que indica que el usuario no está autenticado
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    }
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
