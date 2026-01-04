import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, SHOP_NAME, SHOP_PHONE, SHOP_EMAIL, SHOP_ADDRESS } from "@/const";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    setSubmitted(true);
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={APP_LOGO} alt={SHOP_NAME} className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-lg font-serif font-bold text-primary">{SHOP_NAME}</h1>
              <p className="text-xs text-muted-foreground">Tailoring Excellence</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors">Gallery</Link>
            <Link href="/booking" className="text-sm font-medium hover:text-primary transition-colors">Book Visit</Link>
            <Link href="/track" className="text-sm font-medium hover:text-primary transition-colors">Track Order</Link>
            <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="container">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Have questions? We'd love to hear from you. Get in touch with us today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92-300-XXXXXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Direct Contact */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold mb-1">Phone</h3>
                      <a href={`tel:${SHOP_PHONE}`} className="text-primary hover:underline font-semibold">
                        {SHOP_PHONE}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Call us Monday - Saturday, 10 AM - 6 PM
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold mb-1">Email</h3>
                      <a href={`mailto:${SHOP_EMAIL}`} className="text-primary hover:underline font-semibold">
                        {SHOP_EMAIL}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold mb-1">Location</h3>
                      <p className="font-semibold text-foreground">{SHOP_ADDRESS}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Visit us in the heart of Karachi
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold mb-1">Business Hours</h3>
                      <div className="text-sm space-y-1">
                        <p className="font-semibold">Monday - Saturday: 10:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-80">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-serif font-bold mb-2">Visit Our Shop</h3>
                    <p className="text-sm text-muted-foreground">
                      Karachi, Pakistan
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <details className="group border border-border rounded-lg p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg">
                How long does it take to complete a shalwar kameez?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                The turnaround time typically ranges from 5-10 days depending on the complexity of the design and current workload. We'll provide a specific timeline during your consultation.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg">
                What fabrics do you work with?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                We work with a wide range of premium fabrics including cotton, silk, lawn, chiffon, and more. You can bring your own fabric or choose from our curated collection.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg">
                Do you offer alterations?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Yes! We provide professional alteration services to ensure your garments fit perfectly. Visit us with your garment and we'll discuss the alterations needed.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg">
                What is the pricing?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Pricing varies based on fabric choice, design complexity, and embroidery details. We offer competitive rates and will provide a quote during your consultation.
              </p>
            </details>

            <details className="group border border-border rounded-lg p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg">
                Can I bring my own design?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Absolutely! We love working with custom designs. Bring pictures, sketches, or descriptions of what you envision, and our expert tailors will bring your vision to life.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your visit today or reach out with any questions. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                Book Your Visit
              </Button>
            </Link>
            <a href={`tel:${SHOP_PHONE}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif font-bold mb-4">{SHOP_NAME}</h4>
              <p className="text-sm text-muted-foreground">
                Karachi's premier destination for custom shalwar kameez tailoring.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary">Gallery</Link></li>
                <li><Link href="/booking" className="text-muted-foreground hover:text-primary">Book Visit</Link></li>
                <li><Link href="/track" className="text-muted-foreground hover:text-primary">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-muted-foreground">Custom Stitching</span></li>
                <li><span className="text-muted-foreground">Alterations</span></li>
                <li><span className="text-muted-foreground">Design Consultation</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href={`tel:${SHOP_PHONE}`} className="text-muted-foreground hover:text-primary">{SHOP_PHONE}</a></li>
                <li><a href={`mailto:${SHOP_EMAIL}`} className="text-muted-foreground hover:text-primary">{SHOP_EMAIL}</a></li>
                <li><span className="text-muted-foreground">{SHOP_ADDRESS}</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
