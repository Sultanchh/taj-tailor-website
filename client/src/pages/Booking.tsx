import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, SHOP_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredVisitDate: "",
    preferredVisitTime: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const createCustomerMutation = trpc.customers.create.useMutation({
    onSuccess: (data) => {
      setCardNumber(data.cardNumber);
      setSubmitted(true);
      toast.success("Booking confirmed! Your visit card number has been generated.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        preferredVisitDate: "",
        preferredVisitTime: "",
        notes: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    createCustomerMutation.mutate({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      preferredVisitDate: formData.preferredVisitDate ? new Date(formData.preferredVisitDate) : undefined,
      preferredVisitTime: formData.preferredVisitTime,
      notes: formData.notes,
    });
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
            <Link href="/booking" className="text-sm font-medium text-primary">Book Visit</Link>
            <Link href="/track" className="text-sm font-medium hover:text-primary transition-colors">Track Order</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
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
            <h1 className="text-4xl font-serif font-bold mb-4">Book Your Visit</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Schedule a visit to our shop and let our expert tailors help you create the perfect shalwar kameez.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for booking your visit. Your unique visit card number is:
                </p>
                <div className="bg-primary/10 rounded-lg p-6 mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Your Visit Card Number</p>
                  <p className="text-3xl font-serif font-bold text-primary">{cardNumber}</p>
                </div>
                <p className="text-muted-foreground mb-8">
                  Please save this number. You can use it to track your order status online. We'll contact you soon to confirm your visit time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button>Back to Home</Button>
                  </Link>
                  <Link href="/track">
                    <Button variant="outline">Track Your Order</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92-300-XXXXXXX"
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

                  {/* Preferred Visit Date */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Visit Date</label>
                    <Input
                      type="date"
                      name="preferredVisitDate"
                      value={formData.preferredVisitDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Preferred Visit Time */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Visit Time</label>
                    <Input
                      type="text"
                      name="preferredVisitTime"
                      value={formData.preferredVisitTime}
                      onChange={handleChange}
                      placeholder="e.g., 10:00 AM - 12:00 PM"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Design Ideas or Special Requests</label>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your design preferences, fabric choices, or any special requirements..."
                      rows={5}
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">What happens next?</p>
                      <p>We'll contact you to confirm your visit time and discuss your design preferences. You'll receive a unique visit card number for tracking your order.</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={createCustomerMutation.isPending}
                  >
                    {createCustomerMutation.isPending ? "Booking..." : "Confirm Booking"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
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
                <li><a href="tel:+923001234567" className="text-muted-foreground hover:text-primary">+92-300-1234567</a></li>
                <li><a href="mailto:info@tajtailor.com" className="text-muted-foreground hover:text-primary">info@tajtailor.com</a></li>
                <li><span className="text-muted-foreground">Karachi, Pakistan</span></li>
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
