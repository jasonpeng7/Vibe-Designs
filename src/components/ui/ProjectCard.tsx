import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  slug: string;
  client_logo: string;
  impact: string;
  hero_image: string;
  services: string[];
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <article className="group relative w-full h-full">
      <Link
        to={`/portfolio/${project.slug}`}
        className="block w-full h-full rounded-lg overflow-hidden shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-accent motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out motion-safe:hover:scale-105"
        aria-label={`Open project ${project.title}`}
      >
        {/* Image */}
        <img
          src={project.hero_image}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100 p-8 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {project.title}
          </h3>
          <p className="text-white/90 mt-2 text-lg drop-shadow-md">
            {project.impact}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                {service}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center text-white font-semibold group-hover:underline">
            View Case Study <ArrowUpRight className="ml-2 h-5 w-5" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
