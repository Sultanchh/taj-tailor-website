import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminBusinessInfo() {
  const { data: businessInfo, isLoading, refetch } = trpc.businessInfo.get.useQuery();
  const updateMutation = trpc.businessInfo.update.useMutation({
    onSuccess: () => {
      toast.success("Business info updated successfully!");
      setTimeout(() => refetch(), 500);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update business info");
    },
  });

  const [formData, setFormData] = useState({
    shopName: "",
    shopPhone: "",
    shopEmail: "",
    shopAddress: "",
    shopCity: "",
    shopCountry: "",
    latitude: "",
    longitude: "",
    openingHours: "",
    socialLinks: "",
  });

  useEffect(() => {
    if (businessInfo) {
      setFormData({
        shopName: businessInfo.shopName || "",
        shopPhone: businessInfo.shopPhone || "",
        shopEmail: businessInfo.shopEmail || "",
        shopAddress: businessInfo.shopAddress || "",
        shopCity: businessInfo.shopCity || "",
        shopCountry: businessInfo.shopCountry || "",
        latitude: businessInfo.latitude || "",
        longitude: businessInfo.longitude || "",
        openingHours: businessInfo.openingHours || "",
        socialLinks: businessInfo.socialLinks || "",
      });
    }
  }, [businessInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold">Business Information</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border border-border space-y-6">
        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Shop Name</label>
          <Input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Taj Tailor"
          />
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input
              type="tel"
              name="shopPhone"
              value={formData.shopPhone}
              onChange={handleChange}
              placeholder="+92-300-XXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              name="shopEmail"
              value={formData.shopEmail}
              onChange={handleChange}
              placeholder="info@tajtailor.com"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Address</label>
          <Textarea
            name="shopAddress"
            value={formData.shopAddress}
            onChange={handleChange}
            placeholder="Street address, building number, etc."
            rows={3}
          />
        </div>

        {/* City and Country */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              type="text"
              name="shopCity"
              value={formData.shopCity}
              onChange={handleChange}
              placeholder="Karachi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <Input
              type="text"
              name="shopCountry"
              value={formData.shopCountry}
              onChange={handleChange}
              placeholder="Pakistan"
            />
          </div>
        </div>

        {/* Map Coordinates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Latitude</label>
            <Input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="24.8607"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Longitude</label>
            <Input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="67.0011"
            />
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <label className="block text-sm font-medium mb-2">Opening Hours (JSON format)</label>
          <Textarea
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            placeholder='{"monday": "10:00 AM - 6:00 PM", "tuesday": "10:00 AM - 6:00 PM"}'
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter as JSON object with day names as keys
          </p>
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium mb-2">Social Media Links (JSON format)</label>
          <Textarea
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            placeholder='{"facebook": "https://facebook.com/tajtailor", "instagram": "https://instagram.com/tajtailor"}'
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter as JSON object with social platform names as keys
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="gap-2"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Changes to business information will be displayed on the website and used in customer communications.
        </p>
      </div>
    </div>
  );
}
