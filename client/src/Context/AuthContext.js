import React, { createContext, useContext, useState } from "react";
import { Login } from "../services/user.service";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const login = async (user) => {
    try {
      console.log(user);
      const response = await Login(user);
      if (response?.data?.success) {
        localStorage.setItem("AccessToken", response?.data?.AccessToken);
        localStorage.setItem("userId", response?.data?.user?._id);
        localStorage.setItem(
          "serviceProvider",
          response?.data?.user?.isServiceProvider
        );
        localStorage.setItem("userName", response?.data?.user?.name);
        setUser(true);
        toast.success(response?.data?.message);
        return true;
      } else {
        toast.error(response?.data?.message);
        return false;
      }
    } catch (error) {
      toast.error("Something went wrong");
      setUser(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.clear();
      setUser(false);
    } catch (error) {
      setUser(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
