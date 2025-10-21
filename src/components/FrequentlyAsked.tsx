import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What's the end to end process like?",
    answer:
      "We begin with an initial consultation to discuss your goals and requirements. Based on the project tier you select, we provide a detailed quote. From there, our team will move into the design phase, followed by development. Once finished, we handle deployment, at which point your website is ready to launch.",
  },
  {
    question: "Do you offer single-page websites?",
    answer:
      "Yes. We provide professional single-page websites (SPAs) tailored to your business or personal needs. Pricing for this service starts at $99.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Timelines depend on the project scope and complexity. Single-page websites are typically completed within 3–4 days, multi-page websites within 1–2 weeks, and more advanced projects may take up to one month.",
  },
  {
    question: "What happens after the website is finished?",
    answer:
      "Your website is now a powerful marketing and digital tool that helps grow your business! We continue to provide ongoing maintenance and support to keep it running smoothly. ",
  },
  {
    question: "Do I need to pay before the website is finished?",
    answer:
      "Yes. We require a 50% deposit at the start of the project, with the remaining 50% due upon completion. Monthly maintenance fees, if applicable, are billed on the 1st of each month.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Our preferred payment method is PayPal Invoice or written check. We also accept payments via Zelle, Venmo, and CashApp. Please note, we do not currently accept credit cards.",
  },
];

const FrequentlyAsked = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-10 pb-20 poppins-light text-black bg-white text-left">
      <div className="mb-12">
        <h2 className="hero-text text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-md text-black">
          Can't find the answer you're looking for? Fill out the form below and
          ask your questions!
        </p>
      </div>
      <div className="mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <button
              className="w-full flex justify-between items-center text-left text-lg"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="pt-2 text-muted-foreground text-sm md:text-md">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrequentlyAsked;
