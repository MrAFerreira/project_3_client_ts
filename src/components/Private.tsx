import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function Private({ children }: { children: ReactNode }) {
  const { loading, user } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
}

export default Private;
