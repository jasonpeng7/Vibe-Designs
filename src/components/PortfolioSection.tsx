import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "./ui/ProjectCard";

const projects = [
  {
    title: "Peng Flooring",
    slug: "peng-flooring",
    client_logo: "/path/to/peng-logo.svg", // Placeholder
    impact: "Elevated a local business with a 200% increase in online leads.",
    hero_image: "/peng-flooring.png",
    services: ["Web Design", "SEO", "Lead Generation"],
    year: "2023",
  },
  {
    title: "Atharva's Portfolio",
    slug: "atharva-portfolio",
    client_logo: "/path/to/atharva-logo.svg", // Placeholder
    impact:
      "Designed a high-performance personal site for a software engineer.",
    hero_image: "/atharva-portfolio.png",
    services: ["Web Development", "Performance"],
    year: "2024",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      className="py-24 bg-border"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-16">
          <div>
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold leading-tight text-foreground"
            >
              Curated <span className="hero-text">Creations</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              A showcase of our passion for design and development.
            </p>
          </div>
          <div className="flex-shrink-0 mt-2">
            {projects.length > 6 && ( // Example: show if more than 6 projects
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  aria-label="See all projects"
                >
                  See all
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-6 gap-4">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className={
                i === 0
                  ? "col-span-6 md:col-span-4"
                  : "col-span-6 md:col-span-2"
              }
            >
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
