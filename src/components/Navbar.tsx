import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function Navbar() {
  const { user, loading, logout } = useAuthContext();

  return (
    <nav className="bg-white shadow-md p-4">
      <p className="text-lg font-semibold">{user ? user.username : "Hello"}</p>
      {user && <img className="w-10 h-10 rounded-full" src={user.profilePic} />}
      <ul className="flex space-x-4">
        <Link to="/">
          <button className="text-blue-500 hover:text-blue-700">Home</button>
        </Link>

        {!loading && user ? (
          <>
            <Link to="/projects">
              <button className="text-blue-500 hover:text-blue-700">Projects</button>
            </Link>
            <button className="text-blue-500 hover:text-blue-700" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="text-blue-500 hover:text-blue-700">Signup</button>
            </Link>
            <Link to="/login">
              <button className="text-blue-500 hover:text-blue-700">Login</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
