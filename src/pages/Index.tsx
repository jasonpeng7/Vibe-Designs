import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // We use a timeout to ensure the element is available in the DOM
        // after the page transition.
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <SEO
        title="ViBE Creative Web Agency"
        description="Our creative web agency build high-performance websites for small businesses that drive growth and generate leads. Establish your online presence today."
      />
      <main className="min-h-screen bg-background text-foreground">
        <MaxWidthWrapper>
          <HeroSection />
          <PortfolioSection />
          <ServicesSection />
          <TeamSection />
          <ContactSection />
          <FrequentlyAsked />
        </MaxWidthWrapper>
        <Footer />
      </main>
    </>
  );
};

export default Index;
