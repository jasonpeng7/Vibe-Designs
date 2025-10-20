import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollAnimation from "./ScrollAnimation";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string | React.ReactNode;
  features: string[];
};

type Props = {
  services: Service[];
  className?: string;
};

export default function MobileServiceCards({ services, className = "" }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Map service titles to corresponding background images (same as desktop)
  const getBackgroundImage = (title: string) => {
    switch (title) {
      case "Websites That Sell":
        return "/accordion-sell.webp";
      case "Rapid Development":
        return "/accordion-rapid-development.webp";
      case "SEO Optimization":
        return "/accordion-seo.webp";
      case "Mobile Design":
        return "/accordion-mobile-design.webp";
      case "Performance Optimization":
        return "/accordion-performance-optimization.webp";
      case "Marketing & Branding":
        return "/accordion-branding.webp";
      default:
        return "/accordion-sell.webp";
    }
  };

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
    <div className={`md:hidden px-2 ${className}`}>
      <ScrollAnimation>
        <div className="relative overflow-visible">
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
                  className="w-full flex-shrink-0 px-2 py-2"
                >
                  <Card 
                    className="card-glow group hover:scale-105 transition-all duration-300 h-full relative overflow-hidden p-0 rounded-2xl"
                    style={{
                      backgroundImage: `url(${getBackgroundImage(service.title)})`,
                      backgroundSize: '110%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                      padding: '1.5rem'
                    }}
                  >
                    {/* Dimming overlay - the natural way to keep image visible yet let text stand out */}
                    <div 
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: 'rgba(0, 0, 0, 0.45)',
                      }}
                    ></div>
                    
                    {/* Content layered above the overlay - positioned at bottom-left */}
                    <div className="relative z-10 w-full poppins-regular">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <CardTitle 
                        className="text-md text-white mb-4 leading-tight text-left"
                        style={{
                          textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                          maxWidth: '40ch'
                        }}
                      >
                        {service.title}
                      </CardTitle>
                      
                      <p 
                        className="text-white mb-4 leading-relaxed text-left text-sm"
                        style={{
                          textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                          maxWidth: '40ch'
                        }}
                      >
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 max-w-xs">
                        {service.features.map((feature) => (
                          <li 
                            key={feature} 
                            className="flex items-center text-sm text-white text-left"
                            style={{
                              textShadow: '0 2px 6px rgba(0,0,0,0.6)'
                            }}
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollAnimation>

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
  );
}

/**
 * USAGE EXAMPLE
 * ----------------------------------------------------------
 * <MobileServiceCards
 *   services={[
 *     {
 *       icon: Palette,
 *       title: "Websites That Sell",
 *       description: "Optimized designs following best UI/UX practices that turn visitors into customers.",
 *       features: ["User Psychology", "Mobile-First Design"]
 *     },
 *     // ... more services
 *   ]}
 * />
 *
 * Mobile-optimized service cards carousel with same styling as desktop cards.
 */
