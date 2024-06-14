import { createContext } from "react";

export interface AuthContextValue {
  logout: () => void;
  isLoggedIn: boolean;
  user: any;
  balance: number;
  updateBalance: () => void;
}

export const AuthContext = createContext<null | AuthContextValue>(null);
