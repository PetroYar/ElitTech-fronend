import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user,setUser] = useState('test');

  const cxv = {
    user
  };
  return <AuthContext.Provider value={cxv}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
