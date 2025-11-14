import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_LOGO, SHOP_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Search, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Track() {
  const [cardNumber, setCardNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);

  const getOrderQuery = trpc.orders.getByCardNumber.useQuery(
    { cardNumber },
    { enabled: false }
  );

  const getCustomerQuery = trpc.customers.getByCardNumber.useQuery(
    { cardNumber },
    { enabled: false }
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber.trim()) {
      toast.error("Please enter your visit card number.");
      return;
    }

    try {
      const [order, customer] = await Promise.all([
        getOrderQuery.refetch(),
        getCustomerQuery.refetch(),
      ]);

      if (order.data) {
        setOrderData(order.data);
        setCustomerData(customer.data);
        setSearched(true);
      } else {
        toast.error("Card number not found. Please check and try again.");
        setOrderData(null);
        setCustomerData(null);
        setSearched(false);
      }
    } catch (error) {
      toast.error("Error retrieving order information.");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready":
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case "In Progress":
        return <Clock className="w-8 h-8 text-blue-600" />;
      case "Pending":
        return <AlertCircle className="w-8 h-8 text-yellow-600" />;
      default:
        return <AlertCircle className="w-8 h-8 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-50 border-green-200";
      case "In Progress":
        return "bg-blue-50 border-blue-200";
      case "Pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
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
            <Link href="/track" className="text-sm font-medium text-primary">Track Order</Link>
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
          <h1 className="text-4xl font-serif font-bold mb-4">Track Your Order</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Enter your visit card number to check the status of your shalwar kameez order.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visit Card Number</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="e.g., TAJ-XXXXXXX-XXXXXX"
                    className="flex-1"
                  />
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  You received this number when you booked your visit.
                </p>
              </div>
            </div>
          </form>

          {/* Order Status Display */}
          {searched && orderData && customerData && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Customer Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="text-lg font-semibold">{customerData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg font-semibold">{customerData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-lg font-semibold">{customerData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Visit Card Number</p>
                    <p className="text-lg font-semibold text-primary">{customerData.cardNumber}</p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className={`rounded-xl shadow-lg p-8 border-2 ${getStatusColor(orderData.status)}`}>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {getStatusIcon(orderData.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold mb-2">Order Status</h3>
                    <p className="text-4xl font-serif font-bold text-primary mb-4">{orderData.status}</p>
                    
                    {orderData.description && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Order Details</p>
                        <p className="text-base">{orderData.description}</p>
                      </div>
                    )}

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Order Created:</span>
                        <span className="ml-2 font-medium">
                          {new Date(orderData.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {orderData.estimatedDeliveryDate && (
                        <div>
                          <span className="text-muted-foreground">Estimated Completion:</span>
                          <span className="ml-2 font-medium">
                            {new Date(orderData.estimatedDeliveryDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Messages */}
                    <div className="mt-6 pt-6 border-t border-current border-opacity-20">
                      {orderData.status === "Pending" && (
                        <p className="text-sm">
                          Your order is pending. We'll start working on it soon. You'll be notified when we begin.
                        </p>
                      )}
                      {orderData.status === "In Progress" && (
                        <p className="text-sm">
                          Your shalwar kameez is being crafted with care. We'll notify you when it's ready for pickup.
                        </p>
                      )}
                      {orderData.status === "Ready" && (
                        <p className="text-sm font-semibold">
                          🎉 Your order is ready for pickup! Please visit our shop to collect your beautiful shalwar kameez.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-serif font-bold mb-4">What's Next?</h3>
                {orderData.status === "Ready" ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">Your order is ready! Here's what to do:</p>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>Visit our shop at your earliest convenience</li>
                      <li>Bring this card number for verification</li>
                      <li>Collect your beautiful shalwar kameez</li>
                      <li>Enjoy your custom-tailored outfit!</li>
                    </ol>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">We're working on your order. Here's what happens next:</p>
                    <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                      <li>We'll keep you updated on the progress</li>
                      <li>You'll receive a notification when it's ready</li>
                      <li>Come pick it up at your convenience</li>
                      <li>Enjoy your custom-tailored shalwar kameez!</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="bg-primary/10 rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-xl font-serif font-bold mb-4">Have Questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Contact us directly for more information about your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+923001234567" className="text-primary font-semibold hover:underline">
                    📞 +92-300-1234567
                  </a>
                  <a href="mailto:info@tajtailor.com" className="text-primary font-semibold hover:underline">
                    ✉️ info@tajtailor.com
                  </a>
                </div>
              </div>

              {/* New Search */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCardNumber("");
                    setSearched(false);
                    setOrderData(null);
                    setCustomerData(null);
                  }}
                >
                  Search Another Card
                </Button>
              </div>
            </div>
          )}

          {/* No Results */}
          {searched && !orderData && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">Card Not Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with that card number. Please check and try again, or contact us for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCardNumber("");
                    setSearched(false);
                  }}
                >
                  Try Again
                </Button>
                <Link href="/contact">
                  <Button>Contact Us</Button>
                </Link>
              </div>
            </div>
          )}
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
