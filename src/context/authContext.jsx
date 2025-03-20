import { createContext, useState, useEffect } from "react";
import { getData, postData } from "../libs/Services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  const getUser = async (token) => {
    try {
      const userData = await getData("/user", token);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const login = async (user) => {
    try {
      const res = await postData("/auth/login", user);
      localStorage.setItem("token", res.token);
      getUser(res.token);
      navigate("/");
      setErrorsMsg("");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const registration = async (newUser) => {
    try {
      const res = await postData("/auth/registration", newUser);
      console.log(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const cxv = {
    user,
    registration,
    login,
    logout
  };
  return <AuthContext.Provider value={cxv}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
