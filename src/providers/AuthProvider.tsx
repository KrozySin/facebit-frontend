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
        .get(`${process.env.REACT_APP_API_URL}/user/balance`, {
          params: {
            token,
          },
        })
        .then((result) => {
          if (result.data !== false) setUserBalance(result.data);
          else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
            setIsLoggedIn(false);
          }
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
