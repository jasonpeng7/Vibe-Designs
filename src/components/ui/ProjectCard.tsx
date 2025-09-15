import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  category: string;
  image: string;
  tags: string[];
  url: string;
  slug: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <article className="group">
      <Link
        to={`/portfolio/${project.slug}`}
        className="block bg-secondary border border-border rounded-lg overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform will-change-transform hover:-translate-y-1.5 duration-300"
        aria-label={`Open project ${project.title}`}
      >
        <div className="w-full aspect-[4/3] bg-secondary overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title}`}
            className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300"
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            {project.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {/* <span className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-background text-muted-foreground">
              {project.city}
            </span> */}
            <span className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-background text-muted-foreground">
              {project.year}
            </span>
            <span className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-background text-muted-foreground">
              {project.category}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
