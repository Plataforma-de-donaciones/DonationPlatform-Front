// CookieContext.js
import { createContext, useContext, useState } from 'react';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookies, setCookies] = useState({});

  const setCookie = (name, value) => {
    setCookies({ ...cookies, [name]: value });
  };

  const getCookies = () => {
    return cookies;
  };

  return (
    <CookieContext.Provider value={{ setCookie, getCookies }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  return useContext(CookieContext);
};
