import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsService from "../../services/projects.api";
import { Project, ProjectEdit } from "../../types";

function EditProject() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProjectDetails = useCallback(async (): Promise<void> => {
    try {
      if (!projectId) {
        return;
      }
      const project: Project = await projectsService.getProject(projectId);
      setTitle(project.title);
      setDescription(project.description);
    } catch (error) {
      console.error(error);
    }
  }, [projectId]);

  useEffect(() => {
    getProjectDetails();
  }, [getProjectDetails]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!projectId) {
      return;
    }

    const requestBody: ProjectEdit = { title, description, _id: projectId };
    try {
      await projectsService.updateProject(requestBody);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (): Promise<void> => {
    if (!projectId) {
      return;
    }

    try {
      await projectsService.deleteProject(projectId);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
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

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProject;
