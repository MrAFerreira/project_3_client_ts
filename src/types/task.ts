export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskCreation = Pick<Task, "title" | "description" | "projectId">;
