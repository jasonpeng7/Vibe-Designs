import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Rocket, Search, Smartphone, Zap } from "lucide-react";
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

export default function DesktopServiceCards({ services, className = "" }: Props) {
  // Map service titles to corresponding background images
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

  return (
    <div className={`hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-24 px-6 pb-20 ${className} bg-white`}>
      {services.map((service, index) => {
        const Icon = service.icon;
        
        return (
          <ScrollAnimation key={service.title} delay={index * 0.1}>
            <Card 
              className="card-glow group scale-105 transition-all duration-300 h-full relative overflow-hidden p-0"
              style={{
                backgroundImage: `url(${getBackgroundImage(service.title)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '350px',
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
                    maxWidth: '25ch'
                  }}
                >
                  {service.title}
                </CardTitle>
                
                <p 
                  className="text-white mb-4 leading-relaxed text-left text-sm min-h-[60px]"
                  style={{
                    textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                    maxWidth: '40ch'
                  }}
                >
                  {service.description}
                </p>
                
                <ul className="space-y-2 max-w-xs min-h-[70px] ">
                  {service.features.map((feature) => (
                    <li 
                      key={feature} 
                      className="flex items-center text-sm text-white text-left  "
                      style={{
                        textShadow: '0 2px 6px rgba(0,0,0,0.6)'
                      }}
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0 min-h-[15px]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </ScrollAnimation>
        );
      })}
    </div>
  );
}

/**
 * USAGE EXAMPLE
 * ----------------------------------------------------------
 * <DesktopServiceCards
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
 * Desktop-optimized service cards with background images and hover effects.
 */
