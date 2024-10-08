import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadData: FormData = new FormData();
      uploadData.append("imgUrl", e.target.files[0]);

      try {
        setLoading(true);
        const response: AxiosResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/upload`,
          uploadData
        );
        setProfilePic(response.data.fileUrl);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || "An error occurred");
        } else {
          setErrorMessage("An error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        username,
        email,
        password,
        profilePic,
      });
      navigate("/login");
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          onChange={handleFileUpload}
        />

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button
          type="submit"
          disabled={loading}>
          Signup
        </button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;
