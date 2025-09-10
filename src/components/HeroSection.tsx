import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ParticleLogo from "./ui/ParticleLogo";
import "./HeroSection.css";

const heroWords = ["Vision", "Branding", "Elevate"];

const HeroSection = () => {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Start animation when 30% of the section is visible
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
      className="hero-container relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Content */}
        <div className="text-center md:text-left py-12">
          {/* <ScrollAnimation> */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
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
          {/* </ScrollAnimation> */}
          {/* <ScrollAnimation delay={0.2}> */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg">
            We create websites that don't just look great — they work 24/7 to
            bring you leads, calls, and customers. The digital market is huge,
            let&apos;s make it yours <span className="hero-text">today</span>.
          </p>
          {/* </ScrollAnimation> */}
          {/* <ScrollAnimation delay={0.4}> */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[600px]">
          <ParticleLogo words={heroWords} startAnimation={inView} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
