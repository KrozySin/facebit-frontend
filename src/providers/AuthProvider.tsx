import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setIsLoggedIn(true);
      setUser(JSON.parse(window.localStorage.getItem("user") ?? ""));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ logout, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
