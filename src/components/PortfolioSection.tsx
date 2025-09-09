import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ScrollAnimation from "./ui/ScrollAnimation";

const PortfolioSection = () => {
  const projects = [
    {
      title: "Peng Flooring",
      category: "B2B Platform",
      image: "/peng-flooring.png",
      tags: ["Small Business", "Lead Generation", "B2B"],
      url: "https://www.pengfloor.com",
    },
  ];

  return (
    <section id="portfolio" className="py-20 pb-0 sm:pb-20 px-2">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ScrollAnimation delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="hero-text">Websites We Have Built</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A look at <span className="font-bold text-white">real</span>{" "}
              projects we&apos;ve designed and built — and the difference
              they&apos;ve made for our clients.
            </p>
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ScrollAnimation key={project.title} delay={0.4 + index * 0.2}>
              <Card className="card-glow overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${
                      index % 2 === 1 ? "md:grid-cols-2" : ""
                    }`}
                  >
                    {/* Project Image */}
                    <div
                      className={`relative h-64 md:h-80 cursor-pointer ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                      onClick={() =>
                        window.open(
                          project.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div
                      className={`p-8 flex flex-col justify-center ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        {project.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-transparent text-white px-4 py-2 rounded-lg text-sm font-medium border-2 border-blue-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-fit border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        onClick={() =>
                          window.open(
                            project.url,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        View Website
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="text-center mt-16">
          <Button
            size="lg"
            className="btn-gradient text-lg px-8 py-4 rounded-full"
          >
            See All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default PortfolioSection;
