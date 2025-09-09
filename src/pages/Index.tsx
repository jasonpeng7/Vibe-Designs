import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import FrequentlyAsked from "@/components/FrequentlyAsked";

const Index = () => {
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
          <PricingSection />
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
