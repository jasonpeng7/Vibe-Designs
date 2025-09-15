import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "./ui/ProjectCard";

const projects = [
  {
    title: "Peng Flooring",
    category: "B2B Platform",
    image: "/peng-flooring.png",
    tags: ["Local Business", "Lead Generation", "B2B", "SEO"],
    url: "https://www.pengfloor.com",
    slug: "peng-flooring",
    year: "2023",
  },
  {
    title: "Atharva's Portfolio",
    category: "Personal Portfolio",
    image: "/atharva-portfolio.png",
    tags: ["Portfolio", "Engineering"],
    url: "https://atharvapk.com",
    slug: "atharva-portfolio",
    year: "2024",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      className="py-24 bg-background"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-16">
          <div>
            <h2
              id="projects-heading"
              className="text-3xl md:text-5xl font-bold leading-tight text-foreground"
            >
              Some selected <br /> <span className="hero-text">projects</span>
            </h2>
          </div>
          <div className="flex-shrink-0">
            {projects.length >= 3 && (
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
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
