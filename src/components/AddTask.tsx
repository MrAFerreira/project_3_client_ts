import { ChangeEvent, FormEvent, useState } from "react";
import { TaskCreation } from "../types";
import projectsService from "../services/projects.api";

interface AddTaskProps {
  projectId: string;
  refreshProject: () => void;
}

function AddTask(props: AddTaskProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { projectId, refreshProject } = props;
    const requestBody: TaskCreation = { title, description, projectId };
    try {
      await projectsService.addTask(requestBody);
      setTitle("");
      setDescription("");
      refreshProject();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add New Task</h3>

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

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
