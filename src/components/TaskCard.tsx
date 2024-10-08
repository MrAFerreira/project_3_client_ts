// Same as project, declaring a new interface here instead of using Task for clarity since we're not using all Task fields
interface TaskCardProps {
  title: string;
  description: string;
}

function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div className="TaskCard card">
      <h3>{title}</h3>
      <h4>Description:</h4>
      <p>{description}</p>
    </div>
  );
}

export default TaskCard;
