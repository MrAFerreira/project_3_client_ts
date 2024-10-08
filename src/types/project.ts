import { Task } from "./task";

export interface Project {
  _id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectCreation = Pick<Project, "title" | "description">;

export type ProjectEdit = Pick<Project, "_id" | "title" | "description">;
