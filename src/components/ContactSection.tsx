import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Calendar, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to <span className="hero-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. Free consultation, no strings attached.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-2 card-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Get Your Free Project Consultation</CardTitle>
              <p className="text-muted-foreground">
                Tell us about your project and we'll get back to you within 24 hours with a custom proposal.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input placeholder="Your full name" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" placeholder="your@email.com" className="bg-secondary border-border" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input placeholder="Your company name" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Budget Range</label>
                  <Select>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-plus">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Type</label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="What do you need?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-website">New Website</SelectItem>
                    <SelectItem value="redesign">Website Redesign</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                    <SelectItem value="web-app">Web Application</SelectItem>
                    <SelectItem value="branding">Branding & Website</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Details *</label>
                <Textarea 
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  className="bg-secondary border-border min-h-[120px]"
                />
              </div>

              <Button className="btn-gradient w-full md:w-auto text-lg px-8 py-3">
                Send Project Brief
                <Mail className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-muted-foreground">
                * Required fields. We respect your privacy and never share your information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info & Calendar */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">hello@yourwebagency.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Booking */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Book a Call</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Prefer to talk? Schedule a free 30-minute strategy call.
                </p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Schedule Free Call
                  <Calendar className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Available Mon-Fri, 9 AM - 6 PM EST
                </p>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Our Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                    <div>
                      <p className="font-medium text-sm">Free Consultation</p>
                      <p className="text-xs text-muted-foreground">Discuss your goals & requirements</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                    <div>
                      <p className="font-medium text-sm">Custom Proposal</p>
                      <p className="text-xs text-muted-foreground">Tailored strategy & timeline</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                    <div>
                      <p className="font-medium text-sm">Design & Build</p>
                      <p className="text-xs text-muted-foreground">Bring your vision to life</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">4</div>
                    <div>
                      <p className="font-medium text-sm">Launch & Support</p>
                      <p className="text-xs text-muted-foreground">Go live with ongoing maintenance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;