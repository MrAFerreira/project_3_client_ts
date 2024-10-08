import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Project/Home";
import CreateProject from "./pages/Project/CreateProject";
import ProjectDetails from "./pages/Project/ProjectDetails";
import ProjectList from "./pages/Project/ProjectList";
import EditProject from "./pages/Project/EditProject";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Anon from "./components/Anon";
import Private from "./components/Private";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/projects"
          element={
            <Private>
              <ProjectList />
            </Private>
          }
        />
        <Route
          path="/projects/create"
          element={
            <Private>
              <CreateProject />
            </Private>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <Private>
              <ProjectDetails />
            </Private>
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <Private>
              <EditProject />
            </Private>
          }
        />
        <Route
          path="/signup"
          element={
            <Anon>
              <Signup />
            </Anon>
          }
        />
        <Route
          path="/login"
          element={
            <Anon>
              <Login />
            </Anon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
