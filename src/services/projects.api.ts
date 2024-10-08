import axios, { AxiosResponse } from "axios";
import {
  Project,
  ProjectCreation,
  ProjectEdit,
  Task,
  TaskCreation,
} from "../types";

class ProjectsAPIService {
  baseURL: string;
  authToken: string | null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
    this.authToken = localStorage.getItem("authToken");
  }

  async getProject(id: string): Promise<Project> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const { data }: AxiosResponse<Project[]> = await axios.get(
        `${this.baseURL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  async createProject(project: ProjectCreation): Promise<Project> {
    try {
      const { data }: AxiosResponse = await axios.post(
        `${this.baseURL}/api/projects`,
        project,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(project: ProjectEdit): Promise<Project> {
    try {
      const { data }: AxiosResponse = await axios.put(
        `${this.baseURL}/api/projects/${project._id}`,
        project,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }

  // Leaving the add task here for now, but it should be moved to a separate service if more task actions are added

  async addTask(task: TaskCreation): Promise<Task> {
    try {
      const { data }: AxiosResponse<Task> = await axios.post(
        `${this.baseURL}/api/tasks`,
        task,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
}

const projectsService = new ProjectsAPIService();
export default projectsService;
