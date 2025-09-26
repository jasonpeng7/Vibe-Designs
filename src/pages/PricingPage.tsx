import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

const PricingPage = () => {
  return (
    <>
      <SEO
        title="Pricing Plans - ViBE Creative Web Agency"
        description="Choose the perfect plan that grows with your needs and budget. Our pricing plans scale with your business from startup to enterprise."
      />
      <main className="min-h-screen bg-background text-foreground">
        <MaxWidthWrapper>
          <PricingSection />
        </MaxWidthWrapper>
        <Footer />
      </main>
    </>
  );
};

export default PricingPage;
