import { useEffect, useState } from "react";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number | string;
  priceYearly: number | string;
  priceOnetime: number | string;
  isFeatured?: boolean;
};

type Props = {
  plans: Plan[];
  billingMode: "monthly" | "yearly" | "onetime";
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  getMonthlyPrice: (plan: Plan) => number | string;
  getYearlyPrice: (plan: Plan) => number | string;
  getOnetimePrice: (plan: Plan) => number | string;
  getMonthlyEquivalent: (plan: Plan) => number | string;
  getYearlySavings: (plan: Plan) => number | null;
  onSelectPlan: (planName: string) => void;
};

const PricingMobileCarousel = ({
  plans,
  billingMode,
  activeIndex,
  setActiveIndex,
  getMonthlyPrice,
  getYearlyPrice,
  getOnetimePrice,
  getMonthlyEquivalent,
  getYearlySavings,
  onSelectPlan,
}: Props) => {
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) setActiveIndex((activeIndex + 1) % plans.length);
    if (distance < -minSwipeDistance) setActiveIndex((activeIndex - 1 + plans.length) % plans.length);
  };

  const plan = plans[activeIndex];
  const prevPlan = plans[(activeIndex - 1 + plans.length) % plans.length];
  const nextPlan = plans[(activeIndex + 1) % plans.length];

  return (
    <div className="md:hidden w-full">
      <div className="relative overflow-hidden px-4">
        <div
          className={`flex items-stretch justify-center ${prefersReducedMotion ? '' : 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left Peek Card */}
          <div
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[28%] opacity-90 scale-[0.96] z-0"
            aria-hidden="true"
          >
            <div
              className={`rounded-2xl mx-auto h-[250px] ${
                prevPlan.isFeatured ? '' : 'bg-white border border-gray-200'
              }`}
              style={prevPlan.isFeatured ? { backgroundColor: 'rgba(99, 102, 241, 0.7)' } : {}}
            />
          </div>

          <article
            className={`relative z-10 rounded-2xl py-6 text-center flex flex-col w-[85%] focus:outline-none focus:ring-0 ${
              plan.isFeatured ? 'text-white border border-transparent' : 'bg-white border border-gray-200'
            } ${prefersReducedMotion ? '' : 'transition-all duration-300'} opacity-100 scale-100`}
            style={plan.isFeatured ? { backgroundColor: 'rgba(99, 102, 241, 0.7)', willChange: 'background-color' } : {}}
            aria-describedby={`${plan.id}-description`}
          >
            <h2 className={`text-sm xs:text-md md:text-xl font-semibold uppercase tracking-wider mb-6 ${
              plan.isFeatured ? 'text-white' : 'text-gray-600'
            }`}>
              {plan.name} Plan
            </h2>
            <div className="mb-8 min-h-[80px] ">
              <div className="flex items-baseline justify-center">
                <span className={`text-5xl poppins-medium ${
                  plan.isFeatured ? 'text-white' : 'text-gray-900'
                }`}>
                  {typeof getMonthlyPrice(plan) === 'string' ? getMonthlyPrice(plan) : `$${getMonthlyPrice(plan)}`}
                  {billingMode === 'yearly' && typeof getMonthlyPrice(plan) === 'number' && <span className="text-lg">/year</span>}
                </span>
              </div>
              <div className={`text-sm ${
                plan.isFeatured ? 'text-white/80' : 'text-gray-600'
              }`}>
                {billingMode === 'yearly' ? 
                  (plan.id === 'enterprise' ? 'Consultation required to determine scope' : `${typeof getMonthlyEquivalent(plan) === 'string' ? getMonthlyEquivalent(plan) : `$${getMonthlyEquivalent(plan)}`}/month`) : 
                  billingMode === 'onetime' ? 'One-time payment' : 
                  (plan.id === 'enterprise' ? 'Consultation required to determine scope' : 'Per Month')}
              </div>
              {billingMode === 'onetime' && (
                <div className={`text-xs mt-1 ${
                  plan.isFeatured ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {plan.id === 'starter' ? 'maintenance $15/month' : 
                   plan.id === 'premium' ? 'maintenance $50/month' : 
                   'maintenance not included'}
                </div>
              )}
              {billingMode === 'monthly' && plan.id !== 'enterprise' && (
                <div className={`text-xs mt-1 ${
                  plan.isFeatured ? 'text-white/80' : 'text-gray-500'
                }`}>
                  flexibility, cancel anytime after 1 year
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
              className={`min-w-[200px] py-3 px-6 rounded-full font-semibold cursor-pointer mx-auto ${
                plan.isFeatured
                  ? 'bg-white text-gray-900'
                  : 'border-2 border-gray-900 bg-transparent text-gray-900'
              }`}
              onClick={() => onSelectPlan(plan.name)}
              aria-label={`Get started with ${plan.name} plan`}
            >
              Get Started
            </button>
          </article>

          {/* Right Peek Card */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[28%] opacity-90 scale-[0.96] z-0"
            aria-hidden="true"
          >
            <div
              className={`rounded-2xl mx-auto h-[250px] ${
                nextPlan.isFeatured ? '' : 'bg-white border border-gray-200'
              }`}
              style={nextPlan.isFeatured ? { backgroundColor: 'rgba(99, 102, 241, 0.7)' } : {}}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={() => setActiveIndex((activeIndex - 1 + plans.length) % plans.length)}
          className="p-2 rounded-full text-indigo-600"
          aria-label="Previous plan"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm text-gray-600">{activeIndex + 1} of {plans.length}</span>
        <button
          onClick={() => setActiveIndex((activeIndex + 1) % plans.length)}
          className="p-2 rounded-full text-indigo-600"
          aria-label="Next plan"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-indigo-600 w-8' : 'bg-gray-400/40'}`}
            aria-label={`Go to plan ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingMobileCarousel;


