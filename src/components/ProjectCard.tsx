import { Link } from "react-router-dom";

// Declaring a new interface here instead of using Project for clarity since we're not using all Project fields
interface ProjectCardProps {
  title: string;
  description: string;
  _id: string;
}

function ProjectCard({ title, description, _id }: ProjectCardProps) {
  return (
    <div>
      <Link to={`/projects/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default ProjectCard;
