import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "./ui/ProjectCard";
import { useEffect, useRef, useState } from "react";

// Add CSS for slot machine animation
const slotMachineCSS = `
  @keyframes slide-down {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  .animate-slide-down {
    animation: slide-down 0.1s ease-out;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = slotMachineCSS;
  document.head.appendChild(style);
}

// Slot Machine Button Component
const SlotMachineButton = ({ children, className, ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatingLetters, setAnimatingLetters] = useState<{[key: number]: string}>({});
  const targetText = children;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  // Select 3-4 random positions to animate (excluding spaces)
  const getRandomPositions = () => {
    const positions = [];
    const nonSpacePositions = targetText.split('').map((char, index) => 
      char !== ' ' ? index : -1
    ).filter(index => index !== -1);
    
    const numToAnimate = Math.min(4, nonSpacePositions.length);
    const shuffled = [...nonSpacePositions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numToAnimate);
  };

  useEffect(() => {
    if (!isHovered) {
      setAnimatingLetters({});
      return;
    }

    const positionsToAnimate = getRandomPositions();
    let iteration = 0;
    const maxIterations = 8;
    
    const interval = setInterval(() => {
      const newAnimatingLetters: {[key: number]: string} = {};
      
      positionsToAnimate.forEach(pos => {
        newAnimatingLetters[pos] = letters[Math.floor(Math.random() * letters.length)];
      });
      
      setAnimatingLetters(newAnimatingLetters);
      
      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setAnimatingLetters({});
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isHovered, targetText]);

  return (
    <Button
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="inline-block">
        {targetText.split('').map((letter, index) => (
          <span key={index} className="inline-block relative" style={{ height: '1.2em', lineHeight: '1.2em' }}>
            <span 
              className={`inline-block transition-all duration-100 ${
                animatingLetters[index] ? 'animate-slide-down' : ''
              }`}
            >
              {animatingLetters[index] || letter}
            </span>
            {letter === ' ' && <span className="inline-block w-1"></span>}
          </span>
        ))}
        {isHovered && <span className="ml-2">→</span>}
      </div>
    </Button>
  );
};

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            video.play().catch(console.error);
          } else {
            setIsInView(false);
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
        rootMargin: "0px 0px -10% 0px", // Start playing slightly before fully in view
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section
      id="portfolio"
      className="py-5 md:py-10 bg-black"
      aria-labelledby="projects-heading"
    >
      {/* Tags and Button Row */}
      <div className="flex items-center justify-between w-full max-w-[1500px] mx-auto px-5 md:px-20 mb-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-15">
          <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            VISION
          </span>
          <span className="text-white poppins-regular text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            HOME IMPROVEMENT
          </span>
          <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            APLUS4HOME
          </span>
        </div>
        
        {/* Desktop Button */}
        <SlotMachineButton
          className="hidden md:block poppins-regular uppercase text-white bg-transparent rounded-none hover:bg-transparent"
        >
          View Case Study
        </SlotMachineButton>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-start justify-between w-full">
          {/* Left side - HOME IMPROVEMENT */}
          <span className="text-white poppins-regular text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            HOME IMPROVEMENT
          </span>
          
          {/* Right side - VISION, APLUS4HOME, VIEW CASE STUDY stacked vertically */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-white poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              VISION
            </span>
            <span className="text-white poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              APLUS4HOME
            </span>
            <SlotMachineButton
              className="poppins-regular uppercase text-white bg-transparent rounded-none hover:bg-transparent text-sm px-0"
            >
              View Case Study
            </SlotMachineButton>
          </div>
        </div>
      </div>

      <video 
        ref={videoRef}
        loop 
        muted 
        playsInline 
        className="mx-auto block w-full max-w-[1500px] px-5 md:px-20 max-h-[750px]"
        preload="metadata"
      >
        <source src="/aplus4home-demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* <div className="container mx-auto max-w-7xl"> */}
        {/* <div className="flex items-start justify-between gap-6 mb-16">
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
      </div> */}


    </section>
  );
};

export default PortfolioSection;
