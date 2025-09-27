import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollAnimation from "./ui/ScrollAnimation";
import "./PricingSection.css";
import PricingMobileCarousel from "./PricingMobileCarousel";

const PricingSection = () => {
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly' | 'onetime'>('onetime');

  const plans = [
    {
      id: "starter",
      name: "Starter",
      // 15 maintenance
      priceMonthly: 35 as number | string,
      priceYearly: 336 as number | string,
      priceOnetime: 199 as number | string,
      isFeatured: false,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
    },
    {
      id: "premium",
      name: "Premium",
      // 50 maintenance
      priceMonthly: 99 as number | string,
      priceYearly: 999 as number | string, // 16% off
      priceOnetime: 1499 as number | string, // One-time payment
      isFeatured: true,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
      badge: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceMonthly: "Contact" as number | string,
      priceYearly: "Contact" as number | string, // 16% off
      priceOnetime: "$3500+" as number | string, // One-time payment
      isFeatured: false,
      ctaLabel: "Get Started",
      ctaHref: "#contact",
      notes: "Includes priority support",
    },
  ];

  const features = [
    { id: "pages", label: "Website Pages", availability: { starter: true, premium: true, enterprise: true } },
    { id: "basic-seo", label: "Basic SEO", availability: { starter: true, premium: true, enterprise: true } },
    { id: "domain", label: "Domain + Hosting", availability: { starter: true, premium: true, enterprise: true } },
    { id: "advanced-seo", label: "Advanced SEO", availability: { starter: false, premium: true, enterprise: true } },
    { id: "contact", label: "Contact Form", availability: { starter: false, premium: true, enterprise: true } },
    { id: "booking", label: "Booking Integration", availability: { starter: false, premium: true, enterprise: true } },
    { id: "auth", label: "Authentication", availability: { starter: false, premium: true, enterprise: true } },
    { id: "chatbot", label: "Live Chatbot", availability: { starter: false, premium: true, enterprise: true } },
    { id: "auditing", label: "Website Auditing", availability: { starter: false, premium: true, enterprise: true } },
    { id: "ecommerce", label: "Ecommerce Integration", availability: { starter: false, premium: false, enterprise: true } },
    { id: "payment", label: "Payment Gateway", availability: { starter: false, premium: false, enterprise: true } },
    { id: "branding", label: "Custom Branding", availability: { starter: false, premium: false, enterprise: true } },
    { id: "CDN", label: "CDN Setup", availability: { starter: false, premium: false, enterprise: true } },
    { id: "support", label: "Free Support", availability: { starter: false, premium: false, enterprise: true } },
  ];

  // Load billing mode from localStorage on mount
  useEffect(() => {
    const savedBillingMode = localStorage.getItem('billingMode') as 'monthly' | 'yearly' | 'onetime' | null;
    const urlParams = new URLSearchParams(window.location.search);
    const urlBillingMode = urlParams.get('billing') as 'monthly' | 'yearly' | 'onetime' | null;
    
    if (urlBillingMode) {
      setBillingMode(urlBillingMode);
      localStorage.setItem('billingMode', urlBillingMode);
    } else if (savedBillingMode) {
      setBillingMode(savedBillingMode);
    }
  }, []);

  // Update URL and localStorage when billing mode changes
  const handleBillingModeChange = (mode: 'monthly' | 'yearly' | 'onetime') => {
    setBillingMode(mode);
    localStorage.setItem('billingMode', mode);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('billing', mode);
    window.history.replaceState({}, '', url.toString());
    
    // Announce change for screen readers
    const announcement = document.getElementById('billing-announcement');
    if (announcement) {
      announcement.textContent = `Prices updated to ${mode} billing. ${mode === 'yearly' ? 'Save 16%.' : ''}`;
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return '$0';
    return `$${price}`;
  };

  const getMonthlyPrice = (plan: typeof plans[0]) => {
    if (billingMode === 'onetime') return plan.priceOnetime;
    if (billingMode === 'yearly') {
      return typeof plan.priceYearly === 'string' ? plan.priceYearly : plan.priceYearly;
    }
    return plan.priceMonthly;
  };

  const getMonthlyEquivalent = (plan: typeof plans[0]) => {
    if (billingMode === 'yearly') {
      return typeof plan.priceYearly === 'string' ? plan.priceYearly : Math.round(plan.priceYearly / 12);
    }
    return plan.priceMonthly;
  };

  const getYearlyPrice = (plan: typeof plans[0]) => {
    return plan.priceYearly;
  };

  const getOnetimePrice = (plan: typeof plans[0]) => {
    return plan.priceOnetime;
  };

  // Maintenance costs for each plan
  const getMaintenanceCost = (planId: string) => {
    const maintenanceCosts = {
      starter: 15,
      premium: 50,
      enterprise: 150
    };
    return maintenanceCosts[planId as keyof typeof maintenanceCosts] || 0;
  };

  // Calculate savings for yearly vs one-time payment
  const getYearlySavings = (plan: typeof plans[0]) => {
    if (typeof plan.priceYearly === 'string' || typeof plan.priceOnetime === 'string') {
      return null; // Can't calculate savings for custom pricing
    }
    
    const maintenanceCost = getMaintenanceCost(plan.id);
    const oneTimeWithMaintenance = plan.priceOnetime + (maintenanceCost * 12);
    const savings = oneTimeWithMaintenance - plan.priceYearly; // Fixed: one-time cost - yearly cost = savings
    
    return savings > 0 ? savings : 0;
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

  const renderAvailabilityIcon = (availability: boolean | string, featureId: string, planId: string) => {
    // Special handling for Website Pages
    if (featureId === "pages") {
      const pageCounts = {
        starter: "3",
        premium: "8", 
        enterprise: "Unlimited"
      };
      return (
        <span className=" poppins-medium text-sm  text-gray-900" aria-hidden="true">
          {pageCounts[planId as keyof typeof pageCounts] || "5"}
        </span>
      );
    }
    
    // Special handling for Free Support
    if (featureId === "support") {
      const supportLevels = {
        starter: "1 month",
        premium: "3 months",
        enterprise: "Ongoing Support"
      };
      return (
        <span className="poppins-medium text-xs  text-gray-900 text-center" aria-hidden="true">
          {supportLevels[planId as keyof typeof supportLevels]}
        </span>
      );
    }
    
    // Default check mark behavior for other features
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
      <div className="max-w-7xl mx-auto relative z-10 px-2 lg:px-10 w-full overflow-hidden">
        {/* Hero Section */}
        <ScrollAnimation duration={500}>
          <header className="text-center mb-16 poppins-regular">
            <div className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-600 rounded-xl text-xs font-semibold uppercase tracking-wider mb-6">
              AI Ready Solutions
            </div>
            <h1 id="pricing-heading" className="text-4xl text-black md:text-5xl lg:text-6xl poppins-bold  leading-tight mb-6">
              Our plans scale<br />
              <span className="text-gray-900/90 font-normal">with your business</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base hero-text">
              Choose the perfect plan that grows with your needs and budget.
            </p>
          </header>
        </ScrollAnimation>

        {/* Pricing Panel */}
        <div className="bg-white rounded-t-3xl px-2 lg:px-5 shadow-xl relative z-10">
          {/* Billing Toggle and Plan Cards Row */}
          <div className="flex flex-col lg:flex-row mb-12">
            {/* Billing Toggle Section - Left Side */}
            <div className="w-full md:w-48 lg:w-56 flex-shrink-0 flex items-end mb-5 md:mb-5">
              <div className="w-full md:max-w-48 lg:max-w-52 mx-auto md:mx-0">
                <label className="text-center block text-sm poppins-medium uppercase  p-2 md:p-0 text-gray-700 mb-3">
                  Pick Your Plan
                </label>
                <div className="space-y-2" role="radiogroup" aria-label="Billing frequency">
                  
                  {/* Monthly and Yearly - side by side */}
                  <div className="flex flex-col bg-white rounded-xl p-1  mb-2 space-y-2">
                  {/* One-time payment - full width */}
                  <button
                    className={`poppins-medium w-full px-4 py-3 bg-transparent rounded-lg text-sm cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                      billingMode === 'onetime' 
                        ? 'bg-gray-200 text-black' 
                        : ' text-black/30 shadow-md'
                    }`}
                    onClick={() => handleBillingModeChange('onetime')}
                    role="radio"
                    aria-checked={billingMode === 'onetime'}
                    aria-label="One-time payment"
                  >
                    One-Time Payment
                  </button>

                  <div className="flex flex-row mb-2 space-x-2">
                    <button
                      className={`poppins-medium px-4 py-2  bg-transparent rounded-lg text-xs cursor-pointer transition-all duration-200 min-h-10 flex items-center gap-2 ${
                        billingMode === 'monthly' 
                        ? 'bg-gray-200 text-black' 
                        : ' text-black/30 shadow-md'
                      }`}
                      onClick={() => handleBillingModeChange('monthly')}
                      role="radio"
                      aria-checked={billingMode === 'monthly'}
                      aria-label="Monthly billing"
                    >
                      Monthly Billing
                    </button>
                    <button
                      className={`poppins-medium relative px-4 py-2  bg-transparent rounded-lg text-xs cursor-pointer transition-all duration-200 min-h-10 flex items-center gap-2 ${
                        billingMode === 'yearly' 
                        ? 'bg-gray-200 text-black' 
                        : ' text-black/30 shadow-md'
                      }`}
                      onClick={() => handleBillingModeChange('yearly')}
                      role="radio"
                      aria-checked={billingMode === 'yearly'}
                      aria-label="Yearly billing with 20% savings"
                    >
                      Yearly Billing
                      <span className="popping-medium bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-xs font-semibold uppercase">
                        Save 16%
                      </span>
                    </button>
                    </div>

                  </div>
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
                  className={`poppins-regular relative rounded-2xl py-6 text-center transition-all duration-200 flex flex-col ${
                    plan.isFeatured 
                      ? 'text-white min-h-[300px] -mt-8 z-20 bg-gradient-to-br from-purple-600/90 via-blue-500/80 to-cyan-400/70 pt-14' 
                      : 'bg-white min-h-[300px]'
                  }`}
                  aria-describedby={`${plan.id}-description`}
                >
                  <h2 className={`text-sm xs:text-md md:text-xl font-medium uppercase mb-6 ${
                    plan.isFeatured ? 'text-white' : 'text-gray-600'
                  }`}>
                    {plan.name} Plan
                  </h2>
                  
                  <div className={`mb-8 min-h-[90px] px-4`}>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-5xl poppins-medium ${
                        plan.isFeatured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {typeof getMonthlyPrice(plan) === 'string' ? getMonthlyPrice(plan) : `$${getMonthlyPrice(plan)}`}
                        {billingMode === 'yearly' && typeof getMonthlyPrice(plan) === 'number' && <span className="text-lg">/year</span>}
                      </span>
                    </div>
                      <div className={`text-xs ${
                        plan.isFeatured ? 'text-white' : 'text-gray-600'
                      }`}>
                        {billingMode === 'yearly' ? 
                          (plan.id === 'enterprise' ? 'Contact our team to determine project scope' : `${typeof getMonthlyEquivalent(plan) === 'string' ? getMonthlyEquivalent(plan) : `$${getMonthlyEquivalent(plan)}`}/month`) : 
                          billingMode === 'onetime' ? 'One-time payment' : 
                          (plan.id === 'enterprise' ? 'Contact our team to determine project scope' : 'Per Month')}
                      </div>
                      {billingMode === 'onetime' && (
                        <div className={`text-xs mt-1 ${
                          plan.isFeatured ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {plan.id === 'starter' ? 'maintenance $15/month' : 
                           plan.id === 'premium' ? 'maintenance $50/month' : 
                           ''}
                        </div>
                      )}
                      {billingMode === 'monthly' && plan.id !== 'enterprise' && (
                        <div className={`text-xs mt-1 ${
                          plan.isFeatured ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          <span className={`text-green-500 ${plan.id === 'premium' ? 'text-yellow-200' : 'text-green-500'}`}>Flexibility</span>, cancel anytime after 1 year
                        </div>
                      )}
                      {billingMode === 'yearly' && getYearlySavings(plan) && getYearlySavings(plan)! > 0 && (
                        <div className={`text-xs mt-1 ${
                          plan.isFeatured ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          Save ${getYearlySavings(plan)} vs one-time payment
                        </div>
                      )}
                  </div>
                  
                  <button
                    className={`poppins-medium min-w-[200px] md:min-w-[200px] lg:min-w-[150px] py-3 px-6 rounded-full font-semibold cursor-pointer transition-all duration-200 mx-auto  ${
                      plan.isFeatured
                        ? ' bg-white text-black hover:bg-black hover:text-white'
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
              getOnetimePrice={getOnetimePrice as any}
              getMonthlyEquivalent={getMonthlyEquivalent as any}
              getYearlySavings={getYearlySavings as any}
              onSelectPlan={handlePlanSelect}
            />
          </div>

          {/* Feature Comparison Table: desktop shows all; mobile shows only active plan */}
          <div className="rounded-t-xl overflow-hidden">
            <div className="bg-white">
              {features.map((feature, index) => (
                <div key={feature.id} className={`flex items-center transition-colors rounded-xl ${
                  index % 2 === 0 ? 'bg-white' : 'bg-black/5 '
                }`}>
                  {/* Feature Name Column */}
                  <div className="w-40 md:w-56 flex-shrink-0 p-4 poppins-medium ">
                    <span className="text-sm text-gray-900">
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
                          {renderAvailabilityIcon(feature.availability[plan.id as keyof typeof feature.availability], feature.id, plan.id)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile: only active plan */}
                  <div className="md:hidden flex-1 flex justify-center items-center p-4">
                    <div className="w-6 h-6 flex justify-center items-center">
                      {renderAvailabilityIcon(
                        feature.availability[plans[activeMobileIndex].id as keyof typeof feature.availability],
                        feature.id,
                        plans[activeMobileIndex].id
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
