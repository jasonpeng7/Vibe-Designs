import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Essential Web",
      price: "$499",
      description:
        "Perfect for small businesses ready to establish their online presence",
      features: [
        "Custom website design",
        "Mobile-responsive development",
        "Basic SEO optimization",
        "Contact form integration",
        "1-month of free support",
        "Domain setup",
      ],
      designBuild: "$499",
      hostingDomain: "$10/month",
      maintenance: "$5/month",
      popular: false,
    },
    {
      name: "Essential Pro",
      price: "$999",
      description:
        "For growing businesses that need advanced features and conversion optimization",
      features: [
        "Tailored website design",
        "API integration",
        "Contact form integration",
        "Advanced SEO & analytics",
        "1 year free support",
        "Domain setup",
      ],
      designBuild: "$999",
      hostingDomain: "$15/month",
      maintenance: "$10/month",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Contact",
      description:
        "Fully custom solutions for enterprises with complex requirements",
      features: [
        "Unlimited pages & features",
        "Tailored web design",
        "Priority + 2 years free support",
        "Payment gateway integration",
        "Custom training",
        "Domain setup",
      ],
      designBuild: "Custom Quote",
      hostingDomain: "Up to $200/month",
      maintenance: "Up to $100/month",
      popular: false,
    },
  ];

  const handlePlanSelect = (planName: string) => {
    // Emit custom event with selected plan
    const event = new CustomEvent("planSelected", {
      detail: { plan: planName },
    });
    window.dispatchEvent(event);

    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="pricing" className="pt-20pb-0 sm:py-20 px-2">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="hero-text">Perfect Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Pick the plan that fits
            your business needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`card-glow relative ${
                plan.popular
                  ? "ring-2 ring-accent scale-105"
                  : "hover:scale-105"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-4xl font-bold text-accent mb-2">
                  {plan.price}
                  {plan.price !== "Contact" && (
                    <span className="text-muted-foreground text-lg">
                      {" "}
                      starting
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Design & Build:</span>
                    <span className="font-medium">{plan.designBuild}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hosting & Domain:</span>
                    <span className="font-medium">{plan.hostingDomain}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Maintenance:</span>
                    <span className="font-medium">{plan.maintenance}</span>
                  </div>
                </div>

                <Button
                  className={plan.popular ? "btn-gradient w-full" : "w-full"}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.price === "Custom" ? "Get Quote" : "Select"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            All plans include free consultations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ No hidden fees</span>
            <span>✓ Free domain setup</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
