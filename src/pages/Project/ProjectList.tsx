import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard";
import projectsService from "../../services/projects.api";

import { Project } from "../../types";

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  const getAllProjects = async () => {
    try {
      const projectsList: Project[] = await projectsService.getAllProjects();
      setProjects(projectsList);
    } catch (error) {
      setProjects([]);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>

      {projects.map(project => (
        <ProjectCard
          key={project._id}
          {...project}
        />
      ))}
    </div>
  );
}

export default ProjectList;
