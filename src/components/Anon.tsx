import { ReactNode } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function Anon({ children }: { children: ReactNode }) {
  const { loading, user } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  if (user) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
}

export default Anon;
