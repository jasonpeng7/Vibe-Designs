import ScrollAnimation from "./ui/ScrollAnimation";
import { useState, useRef, useEffect } from "react";
import HeritageSeal from "./ui/HeritageSeal";
import "./TeamSection.css";
import { useInView } from "react-intersection-observer";

const teamMembers = [
  {
    name: "Jason Peng",
    role: "Founder & Lead Engineer",
    education: "CompSci @ UC Davis",
    image: "/jason_crop.webp",
  },
  {
    name: "Amanda Antonious",
    role: "Consultant & Lead Designer",
    education: "CogSci + DataSci @ UC Berkeley",
    image: "/amanda_crop.webp",
  },
];

const useAnimatedCounter = (
  target: number,
  inView: boolean,
  duration = 2000
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = target;
      const increment = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setCount(Math.ceil(start));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return count;
};

const ExperienceRibbon = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const yearsCount = useAnimatedCounter(4, inView);
  const projectsCount = useAnimatedCounter(7, inView);
  const clientsCount = useAnimatedCounter(10, inView);

  return (
    <ScrollAnimation delay={0.5}>
      <div ref={ref} className="mt-20 border-b border-white/10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="text-white">
            <p className="text-4xl font-bold">
              <span>{yearsCount}</span>+
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Years of Experience
            </p>
          </div>
          <div className="text-white">
            <p className="text-4xl font-bold">
              <span>{projectsCount}</span>+
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Websites Delivered
            </p>
          </div>
          <div className="text-white pb-4">
            <p className="text-4xl font-bold">
              <span>{clientsCount}</span>+
            </p>
            <p className="text-sm text-muted-foreground mt-2">Happy Clients</p>
          </div>
        </div>
        {/* <div className="mt-16">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {["Peng Flooring", "Antonious Cosmetics", ""].map(
              (logo) => (
                <div key={logo} className="px-4 py-2 bg-white/5 rounded-lg">
                  <span className="font-semibold text-xs text-white/70">
                    {logo}
                  </span>
                </div>
              )
            )}
          </div>
        </div> */}
      </div>
    </ScrollAnimation>
  );
};

const TeamCard = ({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 200 + index * 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateY = (x / (width / 2)) * 6; // Max 6 degrees
    const rotateX = -(y / (height / 2)) * 6; // Max 6 degrees
    cardRef.current.style.setProperty("--rotateX", `${rotateX}deg`);
    cardRef.current.style.setProperty("--rotateY", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotateX", "0deg");
    cardRef.current.style.setProperty("--rotateY", "0deg");
  };

  return (
    <div ref={ref} className="flex justify-center">
      <div
        ref={cardRef}
        className={`team-card-container ${inView ? "in-view" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sticker-wrapper">
          <img src={member.image} alt={member.name} />
          <HeritageSeal />
        </div>
        <div className="info-layer">
          <h3 className="font-bold text-lg text-white">{member.name}</h3>
          <h4 className="text-sm text-white/70">{member.education}</h4>
          <p className="text-sm hero-text italic">{member.role}</p>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="team-section-container py-24">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Header */}
        <ScrollAnimation>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 relative inline-block text-white">
            Meet the <span className="hero-text">Team</span>
            <div className="underline-animation absolute bottom-0 left-0 h-1 bg-gradient-primary" />
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 mb-16">
            Two college students with a dream fueled by passion. With a blend of
            creativity and <span className="hero-text">5+</span> years of
            combined industry experience, your project is in the best hands. Our
            promise is simple: We bring your{" "}
            <span className="hero-text">Vision</span> to life, build your{" "}
            <span className="hero-text">Brand</span>, and{" "}
            <span className="hero-text">Elevate</span> your business
          </p>
        </ScrollAnimation>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-28 sm:gap-y-20 justify-center">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        <ExperienceRibbon />
      </div>
    </section>
  );
};

export default TeamSection;
