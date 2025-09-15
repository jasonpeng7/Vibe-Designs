import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Rocket, Search, Smartphone, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ScrollAnimation from "./ui/ScrollAnimation";

const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Palette,
      title: "Websites That Sell",
      description:
        "Optimized designs following best UI/UX practices that turn visitors into customers.",
      features: ["User Psychology", "Mobile-First Design"],
    },
    {
      icon: Code,
      title: "Rapid Development",
      description:
        "Get your website live in days, not months. Built to look great, work fast, and grow with your business.",
      features: ["Launch Ready", "Curated Visuals"],
    },
    {
      icon: Search,
      title: "SEO",
      description:
        "We help you rank higher on Google by directing more organic traffic to your website.",
      features: ["Search Engine Optimization", "Google Search"],
    },
    {
      icon: Smartphone,
      title: "Mobile Design",
      description:
        "We carefully design your website to be responsive and work perfectly on all devices.",
      features: ["Responsive Design", "Mobile Components"],
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: (
        <>
          Fast websites that load almost instantly.{" "}
          <span className="font-bold text-accent">Speed equals revenue.</span>
        </>
      ),
      features: ["CDN Setup", "Image Optimization", "Lazy Loading"],
    },
    {
      icon: Zap,
      title: "Marketing & Branding",
      description: "Memorable brands that stick in minds AND wallets.",
      features: ["Logo Design", "Ongoing Marketing", "Google Ads"],
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch/swipe handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < services.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < services.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-2 bg-gradient-to-b from-black to-blue-600/20 "
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Services We <span className="hero-text">Provide For You</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These are the key aspects that drive more customers to your
              business.
            </p>
          </div>
        </ScrollAnimation>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollAnimation key={service.title} delay={index * 0.1}>
                <Card className="card-glow group hover:scale-105 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold relative inline-block">
                      {service.title}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ScrollAnimation>
            <div className="relative overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className="w-full flex-shrink-0 px-2"
                    >
                      <Card className="card-glow group hover:scale-105 transition-all duration-300">
                        <CardHeader>
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-xl font-bold relative inline-block">
                            {service.title}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimation>

          {/* Navigation Dots */}
          <ScrollAnimation delay={0.1}>
            <div className="flex justify-center mt-6 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-accent w-8"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </ScrollAnimation>

          {/* Navigation Arrows */}
          <ScrollAnimation delay={0.2}>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentSlide === 0
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : "text-accent hover:bg-accent/10"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} of {services.length}
              </span>

              <button
                onClick={nextSlide}
                disabled={currentSlide === services.length - 1}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentSlide === services.length - 1
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : "text-accent hover:bg-accent/10"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
