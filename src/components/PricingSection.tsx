import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Essential Web",
      price: "$2,999",
      description: "Perfect for small businesses ready to establish their online presence",
      features: [
        "Custom 5-page website design",
        "Mobile-responsive development", 
        "Basic SEO optimization",
        "Contact form integration",
        "1-month of free support",
        "Domain setup assistance"
      ],
      designBuild: "$2,999",
      hostingDomain: "$199/year",
      maintenance: "$99/month",
      popular: false
    },
    {
      name: "Growth Pro",
      price: "$7,999",
      description: "For growing businesses that need advanced features and conversion optimization",
      features: [
        "Custom 10-page website design",
        "E-commerce functionality",
        "Advanced SEO & analytics",
        "CMS integration",
        "Payment gateway setup",
        "3-months free support",
        "Performance optimization",
        "Social media integration"
      ],
      designBuild: "$7,999",
      hostingDomain: "$299/year",
      maintenance: "$199/month",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Fully custom solutions for enterprises with complex requirements",
      features: [
        "Unlimited pages & features",
        "Custom web applications",
        "Advanced integrations",
        "Dedicated project manager",
        "Priority support",
        "6-months free support",
        "A/B testing setup",
        "Advanced analytics",
        "Custom training"
      ],
      designBuild: "Custom Quote",
      hostingDomain: "$499/year",
      maintenance: "$399/month",
      popular: false
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Transparent <span className="hero-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees, no surprises. Choose the plan that fits your business goals.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`card-glow relative ${plan.popular ? 'ring-2 ring-accent scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground"> starting</span>}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing Breakdown */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-3">Pricing Breakdown:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Design & Build:</span>
                      <span className="font-semibold">{plan.designBuild}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hosting & Domain:</span>
                      <span className="font-semibold">{plan.hostingDomain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="font-semibold">{plan.maintenance}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className={plan.popular ? "btn-gradient w-full" : "w-full"} 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.price === "Custom" ? "Get Quote" : "Get Started"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 p-8 bg-secondary/30 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">Need something different?</h3>
          <p className="text-muted-foreground mb-4">
            We create custom packages tailored to your specific needs and budget.
          </p>
          <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            Schedule Custom Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;