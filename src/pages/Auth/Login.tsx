import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { storeToken, authenticateUser } = useAuthContext();

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // Example implementation outside of a service
      const response: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label htmlFor="password"> Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <p>Don't have an account?</p>
      <Link to="/signup"> Signup</Link>
    </div>
  );
}

export default Login;
