import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import projectsService from "../../services/projects.api";
import AddTask from "../../components/AddTask";
import TaskCard from "../../components/TaskCard";

import { Project } from "../../types";

function ProjectDetails() {
  const [project, setProject] = useState<Project | null>(null);

  const { projectId } = useParams<string>();

  const getProjectDetails = useCallback(async (): Promise<void> => {
    try {
      if (!projectId) {
        return;
      }
      const project: Project = await projectsService.getProject(projectId);
      setProject(project);
    } catch (error) {
      console.error(error);
    }
  }, [projectId]);

  useEffect(() => {
    getProjectDetails();
  }, [getProjectDetails]);

  if (!project || !projectId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      {project &&
        project.tasks.map(task => (
          <TaskCard
            key={task._id}
            {...task}
          />
        ))}

      <AddTask
        refreshProject={getProjectDetails}
        projectId={projectId}
      />

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetails;
