import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

import { AuthContextType } from "../types";

// Custom hook to get the auth context values
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default useAuthContext;
