import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function Navbar() {
  const { user, loading, logout } = useAuthContext();

  return (
    <nav>
      <p>{user ? user.username : "Hello"}</p>
      {user && <img src={user.profilePic} />}
      <ul>
        <Link to="/">
          <button>Home</button>
        </Link>

        {!loading && user ? (
          <>
            <Link to="/projects">
              <button>Projects</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
