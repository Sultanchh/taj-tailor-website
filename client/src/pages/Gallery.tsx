import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, SHOP_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Gallery() {
  const { data: galleryImages, isLoading } = trpc.gallery.list.useQuery();

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
            <Link href="/gallery" className="text-sm font-medium text-primary">Gallery</Link>
            <Link href="/booking" className="text-sm font-medium hover:text-primary transition-colors">Book Visit</Link>
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
          <h1 className="text-4xl font-serif font-bold mb-4">Our Design Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our collection of exquisite shalwar kameez designs. Each piece showcases our commitment to quality craftsmanship and elegant styling.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : galleryImages && galleryImages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image) => (
                <div key={image.id} className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden bg-muted h-64">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-serif font-bold mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-muted-foreground mb-4">{image.description}</p>
                    )}
                    <Link href="/booking">
                      <Button variant="outline" size="sm" className="w-full">
                        Request This Design
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-6">No designs available yet. Check back soon!</p>
              <Link href="/booking">
                <Button>Book a Consultation</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Don't See What You're Looking For?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our expert tailors can create custom designs based on your preferences. Visit us for a personalized consultation.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
              Book Your Consultation
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
