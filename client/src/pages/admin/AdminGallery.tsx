import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminGallery() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    imageKey: "",
  });

  const { data: galleryImages, isLoading, refetch } = trpc.gallery.list.useQuery();
  const addImageMutation = trpc.gallery.add.useMutation({
    onSuccess: () => {
      toast.success("Image added successfully!");
      setFormData({ title: "", description: "", imageUrl: "", imageKey: "" });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl || !formData.imageKey) {
      toast.error("Please fill in all required fields");
      return;
    }
    addImageMutation.mutate(formData);
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

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
