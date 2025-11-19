import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Trash2, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AdminGallery() {
  const [showForm, setShowForm] = useState(false);
  const [uploadMode, setUploadMode] = useState<"url" | "file">("file");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    imageKey: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: galleryImages, isLoading, refetch } = trpc.gallery.list.useQuery();
  const addImageMutation = trpc.gallery.add.useMutation({
    onSuccess: () => {
      toast.success("Image added successfully!");
      setFormData({ title: "", description: "", imageUrl: "", imageKey: "" });
      setSelectedFile(null);
      setPreviewUrl("");
      setShowForm(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add image");
    },
  });

  const deleteImageMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // Use the preview URL as the image URL
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
          imageKey: `gallery/${file.name.split(".")[0]}-${Date.now()}`,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please enter a design title");
      return;
    }

    if (uploadMode === "file" && !selectedFile) {
      toast.error("Please select an image file");
      return;
    }

    if (uploadMode === "url" && !formData.imageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    if (!formData.imageKey) {
      toast.error("Image key is required");
      return;
    }

    addImageMutation.mutate(formData);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", imageUrl: "", imageKey: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">Gallery Management</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Design
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-border">
          <h3 className="text-lg font-serif font-bold mb-4">Add New Design</h3>

          {/* Upload Mode Toggle */}
          <div className="mb-6 flex gap-2 border-b border-border pb-4">
            <Button
              type="button"
              variant={uploadMode === "file" ? "default" : "outline"}
              onClick={() => setUploadMode("file")}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </Button>
            <Button
              type="button"
              variant={uploadMode === "url" ? "default" : "outline"}
              onClick={() => setUploadMode("url")}
              className="gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Image URL
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Design Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Design Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Elegant Blue Shalwar Kameez"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the design, fabric, and details..."
                rows={3}
              />
            </div>

            {/* Image Upload Section */}
            {uploadMode === "file" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Select Image from Phone *</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {previewUrl ? (
                    <div className="space-y-2">
                      <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                      <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">Click to select image from phone</p>
                      <p className="text-xs text-muted-foreground">or drag and drop</p>
                      <p className="text-xs text-muted-foreground">Max 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Image URL *</label>
                <Input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            )}

            {/* Image Key */}
            <div>
              <label className="block text-sm font-medium mb-2">Image Key (for reference) *</label>
              <Input
                type="text"
                name="imageKey"
                value={formData.imageKey}
                onChange={handleChange}
                placeholder="gallery/design-001"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button type="submit" disabled={addImageMutation.isPending}>
                {addImageMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Design"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Display */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : galleryImages && galleryImages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold mb-2">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteImageMutation.mutate({ id: image.id })}
                    disabled={deleteImageMutation.isPending}
                    className="flex-1 gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-border">
          <p className="text-muted-foreground mb-4">No designs in gallery yet.</p>
          <Button onClick={() => setShowForm(true)}>Add First Design</Button>
        </div>
      )}
    </div>
  );
}
