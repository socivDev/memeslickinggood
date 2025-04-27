
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Meme } from "@/types";

interface MemeFormProps {
  onMemeAdded: (meme: Meme) => void;
}

const MemeForm = ({ onMemeAdded }: MemeFormProps) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !imageUrl) {
      toast.error("Please fill all the fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app with Supabase, you would add code here to save the meme
      // For now, we'll just create a new meme object
      const newMeme: Meme = {
        id: Date.now().toString(),
        title,
        imageUrl,
        createdAt: new Date().toISOString()
      };
      
      onMemeAdded(newMeme);
      toast.success("Meme added successfully!");
      
      // Reset the form
      setTitle("");
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to add meme. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Add New Meme</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Meme Title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Meme"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MemeForm;
