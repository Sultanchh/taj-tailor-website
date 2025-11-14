import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE, SHOP_TAGLINE, SHOP_NAME } from "@/const";
import { Scissors, Sparkles, MapPin } from "lucide-react";

export default function Home() {
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
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 text-center py-20">
          <div className="mb-8 flex justify-center">
            <div className="inline-block p-4 bg-white/10 backdrop-blur rounded-2xl">
              <Scissors className="w-12 h-12 text-secondary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Custom Shalwar Kameez
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {SHOP_TAGLINE}
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and craftsmanship. Visit Taj Tailor in Karachi for bespoke tailoring that celebrates your style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                Book Your Visit
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Designs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-3">Custom Stitching</h3>
                <p className="text-muted-foreground">
                  Bring your vision to life with our expert custom stitching services. We create beautiful, perfectly fitted shalwar kameez tailored to your preferences.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-accent/10">
                  <Scissors className="h-7 w-7 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-3">Professional Alterations</h3>
                <p className="text-muted-foreground">
                  Perfect fit guaranteed. Our skilled tailors provide professional alteration services to ensure your garments fit you beautifully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Why Choose Taj Tailor?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                With years of experience in traditional tailoring, Taj Tailor has become Karachi's trusted name for custom shalwar kameez. We combine traditional craftsmanship with modern design sensibilities.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Expert tailors with decades of experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Premium quality fabrics and materials</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Personalized design consultation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Quick turnaround times</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Competitive pricing</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-12 text-center">
              <div className="inline-block p-8 bg-white rounded-xl shadow-lg">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold mb-2">Visit Us</h3>
                <p className="text-muted-foreground mb-6">
                  Located in the heart of Karachi
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Get Directions</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Create Your Perfect Shalwar Kameez?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your visit today and let our expert tailors bring your vision to life.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
              Schedule Your Appointment
            </Button>
          </Link>
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
