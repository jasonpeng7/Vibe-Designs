import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import ScrollAnimation from "./ui/ScrollAnimation";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 container mx-auto pt-28 px-6 text-center pb-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Trust indicators */}
          {/* <ScrollAnimation delay={0.2}>
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">
                Trusted by local businesses
              </span>
            </div>
          </ScrollAnimation> */}

          {/* Headline */}
          <ScrollAnimation delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your website is an <span className="hero-text">investment</span>.
              Our sites <span className="hero-text"> pay</span> for themselves
              by bringing in a new <span className="hero-text">market</span>.
            </h1>
          </ScrollAnimation>

          {/* Supporting text */}
          <ScrollAnimation delay={0.2}>
            <p className="text-md md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              We create websites that don't just look great — they work 24/7 to
              bring you leads, calls, and customers. The digital market is huge,
              let&apos;s make it yours <span className="hero-text">today</span>.
            </p>
          </ScrollAnimation>

          {/* CTAs */}
          <ScrollAnimation delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                size="lg"
                className="btn-gradient text-lg px-8 py-4 rounded-full"
                onClick={scrollToContact}
              >
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={scrollToPortfolio}
              >
                See Our Work
              </Button>
            </div>
          </ScrollAnimation>

          {/* Client logos placeholder */}
          <ScrollAnimation delay={0.5}>
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-6">
                Our recent partners
              </p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                {["Peng Flooring"].map((logo) => (
                  <div key={logo} className="px-4 py-2 bg-muted rounded-lg">
                    <span className="font-semibold text-xs">{logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full floating" />
      <div
        className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full floating"
        style={{ animationDelay: "2s" }}
        role="presentation"
      />
      <div
        className="absolute top-1/2 right-8 w-12 h-12 bg-primary-glow/20 rounded-full floating"
        style={{ animationDelay: "4s" }}
        role="presentation"
      />
    </section>
  );
};

export default HeroSection;
