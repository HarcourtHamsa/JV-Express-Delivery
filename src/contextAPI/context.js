import React, { createContext, useState } from "react";
import { auth } from "../firebase";

export const AppContext = createContext();

function AppProvider({ children }) {
  let user = localStorage.getItem("currentUser");
  // eslint-disable-next-line
  const [authState, setAuthState] = useState({
    user: user ? JSON.parse(user) : {},
  });

  const setAuthData = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
    setAuthState(auth.currentUser);
  };

  const getUserData = () => {
    let data = localStorage.getItem("currentUser");
    let result = JSON.parse(data);
    return result;
  };

  const isAuthenticated = () => {
    return user ? true : false;
  };

  return (
    <AppContext.Provider value={{ setAuthData, isAuthenticated, getUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
