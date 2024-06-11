import { useContext } from "react";
import { AuthContext, AuthContextValue } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextValue;
  if (!context) {
    throw new Error(
      "Make sure useAuth to only call use within a <AuthProvider>"
    );
  }
  return context;
};
