import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollAnimation from "./ui/ScrollAnimation";
import "./PricingSection.css";
import PricingMobileCarousel from "./PricingMobileCarousel";

const PricingSection = () => {
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: "free",
      name: "Free",
      priceMonthly: 0,
      priceYearly: 0,
      isFeatured: false,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
    },
    {
      id: "premium",
      name: "Premium",
      priceMonthly: 45,
      priceYearly: 432, // 20% off
      isFeatured: true,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
      badge: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceMonthly: 99,
      priceYearly: 950, // 20% off
      isFeatured: false,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
      notes: "Includes priority support",
    },
  ];

  const features = [
    { id: "pages", label: "Website Pages", availability: { free: true, premium: true, enterprise: true } },
    { id: "basic-seo", label: "Basic SEO", availability: { free: true, premium: true, enterprise: true } },
    { id: "domain", label: "Domain + Hosting", availability: { free: true, premium: true, enterprise: true } },
    { id: "advanced-seo", label: "Advanced SEO", availability: { free: false, premium: true, enterprise: true } },
    { id: "contact", label: "Contact Form", availability: { free: false, premium: true, enterprise: true } },
    { id: "booking", label: "Booking Integration", availability: { free: false, premium: true, enterprise: true } },
    { id: "auth", label: "Authentication", availability: { free: false, premium: true, enterprise: true } },
    { id: "chatbot", label: "Live Chatbot", availability: { free: false, premium: true, enterprise: true } },
    { id: "auditing", label: "Website Auditing", availability: { free: false, premium: true, enterprise: true } },
    { id: "ecommerce", label: "Ecommerce Integration", availability: { free: false, premium: false, enterprise: true } },
    { id: "payment", label: "Payment Gateway", availability: { free: false, premium: false, enterprise: true } },
    { id: "branding", label: "CustomBranding", availability: { free: false, premium: false, enterprise: true } },
    { id: "CDN", label: "CDN Setup", availability: { free: false, premium: false, enterprise: true } },
    { id: "support", label: "Free Support", availability: { free: false, premium: false, enterprise: true } },
  ];

  // Load billing mode from localStorage on mount
  useEffect(() => {
    const savedBillingMode = localStorage.getItem('billingMode') as 'monthly' | 'yearly' | null;
    const urlParams = new URLSearchParams(window.location.search);
    const urlBillingMode = urlParams.get('billing') as 'monthly' | 'yearly' | null;
    
    if (urlBillingMode) {
      setBillingMode(urlBillingMode);
      localStorage.setItem('billingMode', urlBillingMode);
    } else if (savedBillingMode) {
      setBillingMode(savedBillingMode);
    }
  }, []);

  // Update URL and localStorage when billing mode changes
  const handleBillingModeChange = (mode: 'monthly' | 'yearly') => {
    setBillingMode(mode);
    localStorage.setItem('billingMode', mode);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('billing', mode);
    window.history.replaceState({}, '', url.toString());
    
    // Announce change for screen readers
    const announcement = document.getElementById('billing-announcement');
    if (announcement) {
      announcement.textContent = `Prices updated to ${mode} billing. ${mode === 'yearly' ? 'Save 20%.' : ''}`;
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return '$0';
    return `$${price}`;
  };

  const getMonthlyPrice = (plan: typeof plans[0]) => {
    return billingMode === 'yearly' ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;
  };

  const getYearlyPrice = (plan: typeof plans[0]) => {
    return plan.priceYearly;
  };

  const handlePlanSelect = (planName: string) => {
    // Emit custom event with selected plan
    const event = new CustomEvent("planSelected", {
      detail: { plan: planName, billingMode },
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

  const renderAvailabilityIcon = (availability: boolean | string) => {
    if (availability === true) {
      return <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />;
    } else {
      return <div className="w-4 h-4" aria-hidden="true" />;
    }
  };
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  return (
    <section 
      id="pricing" 
      className="relative pt-36 min-h-screen overflow-hidden mx-2.5 mt-2.5 border border-gray-200 rounded-t-lg" 
      style={{
        background: 'linear-gradient(to top, rgba(124, 58, 237, 0.85) 0%, rgba(99, 102, 241, 0.7) 30%, transparent 50%)'
      }}
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10 px-2 lg:px-10">
        {/* Hero Section */}
        <ScrollAnimation duration={500}>
          <header className="text-center mb-16 ">
            <div className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-600 rounded-xl text-xs font-semibold uppercase tracking-wider mb-6">
              AI Ready Solutions
            </div>
            <h1 id="pricing-heading" className="text-4xl text-black md:text-5xl lg:text-6xl font-bold  leading-tight mb-6">
              Our plans scale<br />
              <span className="text-gray-900/90 font-normal">with your business</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base leading-relaxed text-gray-600">
              Choose the perfect plan that grows with your needs and budget.
            </p>
          </header>
        </ScrollAnimation>

        {/* Pricing Panel */}
        <div className="bg-white rounded-t-3xl px-2 lg:px-5 shadow-2xl relative z-10">
          {/* Billing Toggle and Plan Cards Row */}
          <div className="flex flex-col lg:flex-row mb-12">
            {/* Billing Toggle Section - Left Side */}
            <div className="w-52 flex-shrink-0 flex items-end mb-5">
              <div className="max-w-52">
                <label className="block text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
                  Pick Your Plan
                </label>
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200" role="radiogroup" aria-label="Billing frequency">
                  <button
                    className={`relative px-4 py-2 border-none bg-transparent rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 min-h-10 flex items-center gap-2 ${
                      billingMode === 'monthly' 
                        ? 'bg-gray-900 text-black ' 
                        : 'text-black/30'
                    }`}
                    onClick={() => handleBillingModeChange('monthly')}
                    role="radio"
                    aria-checked={billingMode === 'monthly'}
                    aria-label="Monthly billing"
                  >
                    Monthly Billing
                  </button>
                  <button
                    className={`relative px-4 py-2 border-none bg-transparent rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 min-h-10 flex items-center gap-2 ${
                      billingMode === 'yearly' 
                        ? 'bg-gray-900 text-black ' 
                        : 'text-black/30'
                    }`}
                    onClick={() => handleBillingModeChange('yearly')}
                    role="radio"
                    aria-checked={billingMode === 'yearly'}
                    aria-label="Yearly billing with 20% savings"
                  >
                    Yearly Billing
                    <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Cards - Desktop/Tablet grid (hidden on mobile) */}
            <div className="hidden md:grid flex-1 grid-cols-3 p-0">
            {plans.map((plan) => (
              <ScrollAnimation
                key={plan.id}
                duration={plan.isFeatured ? 300 : 500}
                delay={plan.isFeatured ? 0 : 0.1}
              >
                <article 
                  className={`relative rounded-2xl py-6 text-center transition-all duration-200 flex flex-col ${
                    plan.isFeatured 
                      ? 'text-white min-h-[300px] -mt-8 z-20 ' 
                      : 'bg-white min-h-[300px]'
                  }`}
                  style={plan.isFeatured ? { backgroundColor: 'rgba(99, 102, 241, 0.7)' } : {}}
                  aria-describedby={`${plan.id}-description`}
                >
                  <h2 className={`text-sm xs:text-md md:text-xl font-semibold uppercase tracking-wider mb-6 ${
                    plan.isFeatured ? 'text-white' : 'text-gray-600'
                  }`}>
                    {plan.name} Plan
                  </h2>
                  
                  <div className={`mb-8 ${plan.isFeatured ? 'min-h-[80px] md:min-h-[110px]' : 'min-h-[80px]'} `}>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-5xl poppins-medium ${
                        plan.isFeatured ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${getMonthlyPrice(plan)}
                        {billingMode === 'yearly' && <span className="text-lg">/mo</span>}
                      </span>
                    </div>
                    <div className={`text-sm ${
                      plan.isFeatured ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {billingMode === 'yearly' ? 'billed yearly' : 'Per Month'}
                    </div>
                    {billingMode === 'yearly' && plan.priceYearly > 0 && (
                      <div className={`text-xs font-medium mt-1 ${
                        plan.isFeatured ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        ${getYearlyPrice(plan)}/year
                      </div>
                    )}
                  </div>
                  
                  <button
                    className={`min-w-[200px] md:min-w-[200px] lg:min-w-[150px] py-3 px-6 rounded-full font-semibold cursor-pointer transition-all duration-200 mx-auto  ${
                      plan.isFeatured
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white'
                    }`}
                    onClick={() => handlePlanSelect(plan.name)}
                    aria-label={`Get started with ${plan.name} plan`}
                  >
                    Get Started
                  </button>
                </article>
              </ScrollAnimation>
            ))}
            </div>

            {/* Mobile: Single-card carousel */}
            <PricingMobileCarousel
              plans={plans}
              billingMode={billingMode}
              activeIndex={activeMobileIndex}
              setActiveIndex={setActiveMobileIndex}
              getMonthlyPrice={getMonthlyPrice as any}
              getYearlyPrice={getYearlyPrice as any}
              onSelectPlan={handlePlanSelect}
            />
          </div>

          {/* Feature Comparison Table: desktop shows all; mobile shows only active plan */}
          <div className="overflow-x-auto rounded-t-xl ">
            <div className="bg-white">
              {features.map((feature, index) => (
                <div key={feature.id} className={`flex items-center transition-colors rounded-xl ${
                  index % 2 === 0 ? 'bg-white' : 'bg-black/5 '
                }`}>
                  {/* Feature Name Column */}
                  <div className="w-52 flex-shrink-0 p-4  ">
                    <span className="text-sm font-medium text-gray-900">
                      {feature.label}
                    </span>
                  </div>
                  
                  {/* Desktop: all plans */}
                  <div className="hidden md:flex flex-1">
                    {plans.map((plan) => (
                      <div 
                        key={`${feature.id}-${plan.id}`}
                        className="flex-1 flex justify-center items-center p-0 "
                        aria-label={`${feature.label} ${feature.availability[plan.id as keyof typeof feature.availability] === true ? 'available' : feature.availability[plan.id as keyof typeof feature.availability] === false ? 'not available' : 'partially available'} in ${plan.name} plan`}
                      >
                        <div className="w-6 h-6 flex justify-center items-center">
                          {renderAvailabilityIcon(feature.availability[plan.id as keyof typeof feature.availability])}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile: only active plan */}
                  <div className="md:hidden flex-1 flex justify-center items-center p-4">
                    <div className="w-6 h-6 flex justify-center items-center">
                      {renderAvailabilityIcon(
                        feature.availability[plans[activeMobileIndex].id as keyof typeof feature.availability]
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute w-40 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg animate-float opacity-30" style={{top: '13%', right: '10%'}}></div>
          <div className="absolute w-40 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg animate-float opacity-30" style={{top: '4%', left: '8%', animationDelay: '3s'}}></div>
        </div>

        {/* Screen reader announcements */}
        <div id="billing-announcement" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      </div>
    </section>
  );
};

export default PricingSection;
