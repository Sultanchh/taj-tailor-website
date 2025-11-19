import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Image, Users, Package, Settings, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminBusinessInfo from "@/pages/admin/AdminBusinessInfo";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("gallery");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in - show login button
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <Lock className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Please log in to access the admin panel and manage your Taj Tailor business.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => window.location.href = getLoginUrl()} 
              className="w-full gap-2"
              size="lg"
            >
              Sign In with Manus
            </Button>
            <Button onClick={() => setLocation("/")} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Logged in but not admin - show access denied
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <Lock className="w-16 h-16 text-destructive" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            You do not have admin privileges. Only administrators can access this page.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => {
                logout();
                setLocation("/");
              }} 
              className="w-full"
            >
              Sign Out
            </Button>
            <Button onClick={() => setLocation("/")} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Admin user - show dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">Taj Tailor Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              setLocation("/");
            }}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="customers">
            <AdminCustomers />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>

          <TabsContent value="business">
            <AdminBusinessInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
