/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({}); 
  const value = {
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
