
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Meme } from "@/types";

interface MemeListProps {
  memes: Meme[];
  onDeleteMeme: (id: string) => void;
}

const MemeList = ({ memes, onDeleteMeme }: MemeListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      // In a real app with Supabase, you would add code here to delete the meme
      onDeleteMeme(id);
      toast.success("Meme deleted successfully");
    } catch (error) {
      toast.error("Failed to delete meme");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Manage Memes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {memes.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No memes available</p>
          ) : (
            memes.map((meme) => (
              <div key={meme.id} className="flex items-center gap-4 p-4 border rounded-md">
                <img 
                  src={meme.imageUrl} 
                  alt={meme.title}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{meme.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(meme.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(meme.id)}
                  disabled={deletingId === meme.id}
                >
                  {deletingId === meme.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeList;
