
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      const {
        id,
        token,
        username: loggedInUsername,
        role,
      } = response.data;

      console.log("LOGIN ID:", id);

      const userData = {
        id: id,
        username: loggedInUsername,
        role: role,
      };

      console.log("USER DATA SAVED:", userData);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

