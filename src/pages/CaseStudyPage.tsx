import { useParams, useNavigate, Link } from "react-router-dom";
import { portfolioData } from "@/lib/portfolio-data";
import ParallaxCarousel from "@/components/ParallaxCarousel";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NotFound from "./NotFound";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = portfolioData.find((p) => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const handleBackClick = () => {
    navigate("/#portfolio");
  };

  return (
    <div className="bg-background text-white">
      <ParallaxCarousel slides={project.carouselImages} />
      <div className="relative bg-background z-10">
        <MaxWidthWrapper className="p-20">
          <ScrollAnimation>
            <Button
              variant="ghost"
              className="mb-8 px-0 hover:bg-transparent hover:text-white"
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <ScrollAnimation delay={0.2}>
                <h1 className="text-4xl font-bold hero-text">
                  {project.title}
                </h1>
                <h2 className="text-2xl text-white mt-2">{project.client}</h2>
                <div className="mt-8 pt-8 border-t border-grey space-y-4 ">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tier</span>
                    <span className="font-bold">{project.details.tier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-bold">{project.details.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="font-bold">
                      {project.details.timeline}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Divider */}

            <div className="md:col-span-2 space-y-8">
              <ScrollAnimation delay={0.4}>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 hero-text">
                    The Problem
                  </h3>
                  <p className="text-muted-foreground">
                    {project.content.problem}
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.6}>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 hero-text">
                    The Solution
                  </h3>
                  <p className="text-muted-foreground">
                    {project.content.solution}
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.8}>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 hero-text">
                    The Outcome
                  </h3>
                  <p className="text-muted-foreground">
                    {project.content.outcome}
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
