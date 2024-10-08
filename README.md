# Project 3 Demo with Typescript

This project acts as a simple React CRUD application template created with `vite` and implementing Typescript, routing, sample components, auth, hooks and an API Service.
It can be used with [this project as a backend](https://github.com/MrAFerreira/project_3_server).

## Routes

This project uses `react-router-dom` to handle routing. The components that represent pages are located in the `src/pages` folder which is further divided into `Auth` and `Project` folders.

Some of the routes on the project are meant to only be accessible by logged in users and in the case of the `Signup` and `Login`, only by logged out users. To achieve that, the HOC components `Private` and `Anon` are used to wrap those pages.

Basic navigation is done trough `react-router-dom`'s `Link` component.

The project includes the following pages:

| URL                      | Component          | Description                                            | Protection |
| ------------------------ | ------------------ | ------------------------------------------------------ | ---------- |
| /                        | `<Home>`           | Basic home page                                        | none       |
| /projects                | `<ProjectList>`    | List of all available projects                         | `Private`  |
| /projects/create         | `<CreateProject>`  | Form to submit a new project                           | `Private`  |
| /project/:projectId      | `<ProjectDetails>` | Page with details of a single project, including tasks | `Private`  |
| /project/edit/:projectId | `<EditProject>`    | Edit form for the project with button to delete it     | `Private`  |
| /signup                  | `<Signup>`         | Signup form                                            | `Anon`     |
| /login                   | `<Login>`          | Login form                                             | `Anon`     |

## Components

Besides the `Private` and `Anon` components described above, the project includes a `Navbar` with basic auth conditional rendering and some reusable components like `ProjectCard` and `TaskCard`..
`AddTask` is also provided to demonstrate the modualrity betweeen components and pages and how they can achieve the same results.

## Context and custom hook

The `AuthContext` deals with everything related to authentication on the client, including handling the token storage (and deletion) and authenticating the user when the application is mounted.

Since these functionalities are used troughout the application, a custom hook `useAuthContext` was created to more easily access them.

## API Service

This application can use [this](https://github.com/MrAFerreira/project_3_server) accompanying project as a backend, and to integrate with that, an API service is provided in the form of `projectsService` located in `src/services/projects.api.ts`.

This service uses `axios` to deal with the basic **CRUD** operations of the project. It includes the following methods:

| HTTP Method | Name           | Return      |
| ----------- | -------------- | ----------- |
| GET         | getProject     | `Project`   |
| GET         | getAllProjects | `Project[]` |
| POST        | createProject  | `Project`   |
| PUT         | updateProject  | `Project`   |
| DELETE      | deleteProject  | void        |
| POST        | addTask        | `Task`      |

## Types

The main types used are :

```ts
// For auth
User {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
}

AuthContextType {
  loading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logout: () => void;
}

// Project and Tasks, the main CRUD blocks

 Project {
  _id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

ProjectCreation = Pick<Project, "title" | "description">;
ProjectEdit = Pick<Project, "_id" | "title" | "description">;

Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

TaskCreation = Pick<Task, "title" | "description" | "projectId">;
```

Additional types are provided as needed in the components and services.

Some components like `ProjectCard` opt to use their own props interface, even though the fields needed are present in the `Project` type. This is done mostly for readability and the potential scalability, since currently `Project` is a very simple object but could grow bigger and not all fields could be needed in the components.

## Missing features and next steps

Since this project acts as a basic template for a CRUD application some next steps can be applied to make it more complete:

- **Styling** - Currently there's only the basic styling provided by `vite`. Additional styling should be implemented;
- **Complete `Task` CRUD** - Currently `Task` can only be created and added to `Project`. An update and delete option should be implemented;
- **Services** - The `projectsService` includes most actions needed but in the case of creating more `Task` operations a separate service could be created. An auth service could also be created for login, signup and any future auth needs.
- **Error handling** - Currently errors are logged to the console, mostly for development. Better error handling should be implemented, including giving users feedback .
- **Additional pages** - Pages like an about and profile could be implemented to make it more complete
