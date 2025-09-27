import PricingSection from "@/components/PricingSection";
import WavesBuffer from "@/components/WavesBuffer";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import PricingCursor from "@/components/ui/PricingCursor";

const PricingPage = () => {
  return (
    <>
      <SEO
        title="Pricing Plans - ViBE Creative Web Agency"
        description="Choose the perfect plan that grows with your needs and budget. Our pricing plans scale with your business from startup to enterprise."
      />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden overflow-y-visible">
        <MaxWidthWrapper>
          <PricingSection />
        </MaxWidthWrapper>
        <WavesBuffer />
        <Footer />
        <PricingCursor />
      </main>
    </>
  );
};

export default PricingPage;
