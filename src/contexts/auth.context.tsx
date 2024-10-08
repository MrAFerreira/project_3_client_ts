import { useState, useEffect, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import projectsService from "../services/projects.api";
import { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const storeToken = (token: string): void => {
    localStorage.setItem("authToken", token);
    projectsService.authToken = token;
  };

  const authenticateUser = async (): Promise<void> => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        setLoading(true);
        const response: AxiosResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        setUser(null);
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, user, storeToken, authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
