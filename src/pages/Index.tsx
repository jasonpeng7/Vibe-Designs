import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="ViBE Creative"
        description="Our creative web agency build high-performance websites for small businesses that drive growth and generate leads. Establish your online presence today."
      />
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
