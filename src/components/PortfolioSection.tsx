import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-commerce Revolution",
      category: "E-commerce Platform",
      problem: "Low conversion rates",
      solution: "Redesigned UX with optimized checkout flow",
      result: "250% conversion increase",
      image: "gradient-to-br from-purple-600 to-blue-600",
      tags: ["Shopify", "React", "Performance"]
    },
    {
      title: "SaaS Dashboard Transformation",
      category: "B2B SaaS Platform",
      problem: "Complex user interface",
      solution: "Simplified dashboard with data visualization",
      result: "40% reduction in support tickets",
      image: "gradient-to-br from-cyan-500 to-purple-600",
      tags: ["React", "TypeScript", "UX/UI"]
    },
    {
      title: "Brand Identity & Web",
      category: "Restaurant Chain",
      problem: "Outdated brand presence",
      solution: "Complete rebrand with modern website",
      result: "300% online order increase",
      image: "gradient-to-br from-orange-500 to-pink-500",
      tags: ["Branding", "WordPress", "SEO"]
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Projects That <span className="hero-text">Drive Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real transformations, measurable outcomes. See how we've helped brands dominate their markets.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Card key={project.title} className="card-glow overflow-hidden">
              <CardContent className="p-0">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-cols-2' : ''}`}>
                  {/* Project Image */}
                  <div className={`relative h-64 md:h-80 bg-${project.image} ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-destructive mb-1">Challenge</h4>
                        <p className="text-muted-foreground">{project.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-accent mb-1">Solution</h4>
                        <p className="text-muted-foreground">{project.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Result</h4>
                        <p className="font-semibold text-lg">{project.result}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" className="w-fit border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      View Case Study
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="btn-gradient text-lg px-8 py-4 rounded-full">
            See All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;