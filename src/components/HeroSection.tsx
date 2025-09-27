import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import BrandQualities from "./BrandQualities";
import "./HeroSection.css";

const HeroSection = () => {
  const fillRef = React.useRef<HTMLSpanElement | null>(null);
  const initialYRef = React.useRef<number>(0);
  const currentRef = React.useRef<number>(0); // 0..1 smoothed
  const targetRef = React.useRef<number>(0); // 0..1 target
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = fillRef.current;
    if (el) el.style.setProperty("--fill", `0%`); // start gray
    initialYRef.current = window.scrollY;
    let threshold = Math.max(60, Math.min(window.innerHeight * 0.25, 160));

    const tick = () => {
      const el2 = fillRef.current;
      if (!el2) return;
      const current = currentRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * 1.5; // even faster smoothing
      currentRef.current = next;
      el2.style.setProperty("--fill", `${Math.round(next * 100)}%`);
      if (Math.abs(target - next) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      const delta = window.scrollY - initialYRef.current; // positive when scrolling down
      const progress = Math.min(Math.max(delta / threshold, 0), 1); // 0..1
      targetRef.current = progress;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      threshold = Math.max(60, Math.min(window.innerHeight * 0.25, 160));
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
    <section className="hero relative min-h-screen overflow-hidden ">
      {/* Bottom-Right qualities */}
      <div className="absolute bottom-4 right-4 z-20 poppins-regular text-xs">
        <BrandQualities qualities={["Proven Results", "Measurable Growth", "Premium Branding"]} durationMs={2000} />
      </div>

      <div className="mx-auto flex flex-col items-center text-center px-4 mt-44 xs:mt-52 md:mt-0">
        <h1 className="poppins-regular text-black text-3xl xs:text-4xl md:text-5xl lg:text-6xl max-w-[500px] tagline-container">
          <span className="tagline-slide-up">AI-Driven Design for Growth.</span>
        </h1>
        <p className="poppins-regular text-black text-sm xs:text-md md:text-lg max-w-[600px] mt-3 tagline-container">
          <span className="description-slide-down">
            We build smart, AI powered websites complete with chatbots, auditing, and growth-driven solutions. <span ref={fillRef} className="hero-fill" data-text="Designed">Designed</span> to attract more customers and accelerate your business.
          </span>
        </p>
        <div className="hero-buttons justify-center items-center mt-6">
          <Button
            size="lg"
            className="rounded-none bg-transparent border border-purple-500 text-lg px-4 py-2 xs:px-8 xs:py-4"
            onClick={() => smoothScrollTo("contact")}
          >
            <p className="text-xs md:text-md text-black poppins-regular ">Start a Project</p> <ArrowRight className="text-black ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-none bg-transparent border border-blue-500 text-lg px-4 py-2 xs:px-8 xs:py-4"
            onClick={() => smoothScrollTo("portfolio")}
          >
            <p className="text-xs  md:text-md text-black poppins-regular ">Our Work</p> <ArrowRight className="text-black ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Waves container (pure CSS animation) */}
      <div className="waves" aria-hidden="true">
        {/* wave 1: foreground (fastest, smallest) */}
        <svg className="wave wave--1" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M0 160 C220 100 420 220 720 200 C1020 180 1220 80 1440 120 L1440 320 L0 320 Z" />
        </svg>

        {/* wave 2: middle (medium speed, medium size) */}
        <svg className="wave wave--2" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M0 200 C180 140 360 260 720 240 C1080 220 1260 120 1440 160 L1440 320 L0 320 Z" />
        </svg>

        {/* wave 3: background (slowest, largest, blurred) */}
        <svg className="wave wave--3" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M0 240 C200 180 400 300 720 280 C1040 260 1240 160 1440 200 L1440 320 L0 320 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
