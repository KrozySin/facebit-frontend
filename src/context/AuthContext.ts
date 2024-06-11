import { createContext } from "react";

export interface AuthContextValue {
  logout: () => void;
  isLoggedIn: boolean;
  user: any;
}

export const AuthContext = createContext<null | AuthContextValue>(null);
