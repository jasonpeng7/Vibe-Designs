import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ParticleLogo from "./ui/ParticleLogo";
import "./HeroSection.css";

const heroWords = ["Vision", "Branding", "Elevate"];

const HeroSection = () => {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Start animation when 10% of the section is visible
  });

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={viewRef}
      className="hero-container relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0 max-w-6xl mx-auto"
    >
      <div className="container mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Content */}
        <div className="text-center md:text-left py-12">
          <h1
            className={`text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white fade-in-on-scroll ${
              inView ? "start-animation" : ""
            }`}
          >
            Websites built for <span className="hero-text">growth</span>,
            <br />
            not just <span className="hero-text">presence</span>.
            <svg
              viewBox="0 0 300 10"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-2"
            >
              <defs>
                <linearGradient id="heroGradient">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <path
                d="M 5 5 C 50 10, 250 0, 295 5"
                stroke="url(#heroGradient)"
                strokeWidth="2"
                fill="none"
                className="hero-underline"
              />
            </svg>
          </h1>
          <p
            className={`mt-6 text-sm sm:text-md md:text-xl text-muted-foreground max-w-lg fade-in-on-scroll ${
              inView ? "start-animation" : ""
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            We create websites that don't just look great — they work 24/7 to
            bring you leads, calls, and customers. The digital market is huge,
            let&apos;s make it yours <span className="hero-text">today</span>.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 mt-8 fade-in-on-scroll ${
              inView ? "start-animation" : ""
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="btn-gradient text-lg px-8 py-4 rounded-full"
              onClick={() => smoothScrollTo("contact")}
            >
              Build Your Website <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={() => smoothScrollTo("portfolio")}
            >
              Our Work
            </Button>
          </div>
        </div>

        {/* Right Panel: Particle Animation */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]">
          <ParticleLogo words={heroWords} startAnimation={inView} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
