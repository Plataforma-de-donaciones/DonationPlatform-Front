import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();
const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    itemId: null,
    conversationId: null, 
  });

  useEffect(() => {
    const user = cookies.get("user_data");
    const token = cookies.get("token");

    if (user && token) {
      setAuthState({
        isAuthenticated: true,
        token: token,
        user: user,
        itemId: null,
        conversationId: null, 
      });
    }
  }, []); 
  const login = (token) => {
    const user = cookies.get("user_data");
    if (user) {
      setAuthState({
        isAuthenticated: true,
        token: token,
        user: user,
        itemId: null,
        conversationId: null, 
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        itemId: null,
        conversationId: null, 
      });
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      itemId: null,
      conversationId: null, 
    });
  };

  const setItemId = (newItemId) => {
    setAuthState({
      ...authState,
      itemId: newItemId,
    });
  };

  const setConversationId = (newConversationId) => {
    setAuthState({
      ...authState,
      conversationId: newConversationId,
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, setItemId, setConversationId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
