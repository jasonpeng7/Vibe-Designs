import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium">Trusted by 20+ brands</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            We build <span className="hero-text">bold, conversion-focused</span> websites for brands that want to stand out
          </h1>

          {/* Supporting text */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            From stunning design to flawless code deployment - we handle everything so your brand dominates online
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="btn-gradient text-lg px-8 py-4 rounded-full">
              Get Free Mockup
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              See Our Work
            </Button>
          </div>

          {/* Client logos placeholder */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {['TECHCORP', 'DESIGNPLUS', 'INNOVATE', 'GROWTHCO'].map((logo) => (
                <div key={logo} className="px-4 py-2 bg-muted rounded-lg">
                  <span className="font-semibold text-xs">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full floating" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full floating" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-8 w-12 h-12 bg-primary-glow/20 rounded-full floating" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default HeroSection;