import { createContext, useState, useEffect } from "react";
import { getData, postData } from "../libs/Services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUser(token);
    } else {
      setIsLoading(false); 
    }
  }, []);
  const getUser = async (token) => {
    try {
      const userData = await getData("/user", token);

      setUser(userData);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (user) => {
    try {
      const res = await postData("/auth/login", user);
      localStorage.setItem("token", res.token);
      getUser(res.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);

      return res;
    } catch (error) {
      if (error.message) {
        console.log("Помилка з сервера:", error.message);
        toast.error(error.message);
      } else {
        console.log("Не вдалося отримати відповідь від сервера:", error);
        toast.error("Спробуйте пізніше");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success(`До нових зустрічей ${user.username}`);
    navigate("/login");
  };

  const registration = async (newUser) => {
    try {
      const res = await postData("/auth/registration", newUser);
      console.log(res);
      toast.success(`Регістрація успішна`);

      navigate("/");
    } catch (error) {
       if (error.message) {
         console.log("Помилка з сервера:", error.message);
         toast.error(error.message);
       } else {
         console.log("Не вдалося отримати відповідь від сервера:", error);
         toast.error("Спробуйте пізніше");
       }
    }
  };

  const cxv = {
    user,
    registration,
    login,
    logout,
    getUser,
    isLoading
  };
  return <AuthContext.Provider value={cxv}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
