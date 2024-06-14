import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({});
  const [userBalance, setUserBalance] = useState(0);

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

  const updateUserBalance = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .get("http://192.168.6.244:4000/user/balance", {
          params: {
            token,
          },
        })
        .then((result) => {
          setUserBalance(result.data);
        });
    }
  };

  useEffect(() => {
    updateUserBalance();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoggedIn,
        user,
        balance: userBalance,
        updateBalance: updateUserBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
