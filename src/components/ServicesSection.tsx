import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Rocket, Search, Smartphone, Zap } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: "Websites That Sell",
      description: "Conversion-optimized designs that turn visitors into customers, not just pretty pictures.",
      features: ["User Psychology", "A/B Testing", "Mobile-First Design"]
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Lightning-fast, scalable websites built with modern tech that outperform the competition.",
      features: ["React/Next.js", "Custom CMS", "API Integration"]
    },
    {
      icon: Search,
      title: "SEO Domination",
      description: "Rank #1 on Google and stay there. Technical SEO that drives organic traffic.",
      features: ["Technical SEO", "Content Strategy", "Local SEO"]
    },
    {
      icon: Smartphone,
      title: "Mobile Excellence",
      description: "Perfect mobile experiences that load instantly and convert like crazy.",
      features: ["Progressive Web Apps", "Mobile Optimization", "Touch Interfaces"]
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Blazing-fast websites that load in under 2 seconds. Speed equals revenue.",
      features: ["Core Web Vitals", "CDN Setup", "Image Optimization"]
    },
    {
      icon: Zap,
      title: "Brand Identity",
      description: "Memorable brands that stick in minds and wallets. Complete visual identity systems.",
      features: ["Logo Design", "Brand Guidelines", "Visual Systems"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Services That <span className="hero-text">Drive Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't just build websites - we create digital experiences that convert visitors into loyal customers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="card-glow group hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;