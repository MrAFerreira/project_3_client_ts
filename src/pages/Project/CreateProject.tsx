import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectsService from "../../services/projects.api";
import { ProjectCreation } from "../../types";

function CreateProject() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const requestBody: ProjectCreation = { title, description };
    try {
      await projectsService.createProject(requestBody);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitle}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleDescription}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProject;
