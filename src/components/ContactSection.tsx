import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Calendar, Phone, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SubmitError {
  error?: string;
}

const ContactSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Listen for plan selection from pricing section
  useEffect(() => {
    const handlePlanSelection = (event: CustomEvent) => {
      setSelectedPlan(event.detail.plan);
    };

    window.addEventListener(
      "planSelected",
      handlePlanSelection as EventListener
    );
    return () => {
      window.removeEventListener(
        "planSelected",
        handlePlanSelection as EventListener
      );
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const now = Date.now();
    if (now - lastSubmitted < 5000) {
      setSubmitMessage({
        type: "error",
        text: "Please wait a few seconds before submitting again",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);
    setLastSubmitted(now);

    try {
      const formData = new FormData(e.currentTarget);

      // Get form values with proper field names
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const company = formData.get("company") as string;
      const budgetRange = formData.get("budgetRange") as string;
      const projectType = formData.get("projectType") as string;
      const projectDetails = formData.get("projectDetails") as string;

      // Validate required fields
      if (!firstName || !lastName || !email || !projectDetails) {
        setSubmitMessage({
          type: "error",
          text: "Please fill in all required fields (Name, Email, Project Details)",
        });
        return;
      }

      const consultationData = {
        date: new Date().toISOString(),
        name: `${firstName} ${lastName}`,
        email: email,
        company: company || "",
        selectedPlan: selectedPlan || "",
        projectType: projectType || "",
        budgetRange: budgetRange || "",
        projectDetails: projectDetails,
      };

      // Send to your Gmail API function
      const response = await fetch("http://localhost:8787/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultationData),
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Your consultation request has been submitted successfully! We'll contact you within 24 hours.",
        });

        // Reset form
        if (formRef.current) {
          formRef.current.reset();
          setSelectedPlan("");
        }
      } else {
        let errorMessage =
          "Failed to submit consultation request. Please try again.";
        try {
          const errorData = (await response.json()) as SubmitError;
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If parsing JSON fails, fall back to the generic error
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        setSubmitMessage({
          type: "error",
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to submit consultation request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to <span className="hero-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <span className="font-bold ">Free</span> consultations. Let's
            discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-2 card-glow">
            <CardHeader>
              <CardTitle className="text-2xl">
                Get Your Free Project Consultation
              </CardTitle>
              <p className="text-muted-foreground">
                Tell us about your <span className="hero-text">vision</span> and
                we&apos;ll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      First Name *
                    </label>
                    <Input
                      name="firstName"
                      placeholder="Your first name"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Last Name *
                    </label>
                    <Input
                      name="lastName"
                      placeholder="Your last name"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Company
                    </label>
                    <Input
                      name="company"
                      placeholder="Your company name"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Selected Plan
                  </label>
                  <Input
                    value={selectedPlan}
                    placeholder="Choose a plan from pricing section"
                    className="bg-secondary border-border"
                    readOnly
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Project Type
                    </label>
                    <Select name="projectType">
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="What do you need?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-website">New Website</SelectItem>
                        <SelectItem value="redesign">
                          Website Redesign
                        </SelectItem>
                        <SelectItem value="ecommerce">
                          E-commerce Store
                        </SelectItem>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="branding">
                          Branding & Website
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Details *
                  </label>
                  <Textarea
                    name="projectDetails"
                    placeholder="Tell us more about your project goals, timeline, or any specific requirements you weren't able to mention above..."
                    className="bg-secondary border-border min-h-[120px]"
                    required
                  />
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient w-full text-lg py-6"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="card-glow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ll respond within 2 business days.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:vbewebdesign@gmail.com"
                  className="text-accent font-medium"
                >
                  vbewebdesign@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* <Card className="card-glow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Schedule Call</h3>
                    <p className="text-muted-foreground text-sm">
                      Book a free consultation
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
