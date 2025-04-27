
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemeCard from "@/components/MemeCard";
import NewsletterModal from "@/components/NewsletterModal";
import { Meme } from "@/types";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);
  const [memes, setMemes] = useState<Meme[]>([]);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .eq("approved", true);

      if (error) {
        console.error("Error fetching memes:", error);
        throw error;
      }

      console.log("Fetched memes:", data);
      
      if (data && data.length > 0) {
        const formattedMemes = data.map(meme => ({
          id: meme.id,
          imageUrl: meme.image_url,
          title: meme.title,
          createdAt: meme.created_at,
        }));
        
        setMemes(formattedMemes);
        getRandomMeme(formattedMemes);
      } else {
        // If no memes in database, use sample memes
        const { data: sampleMemes } = await import("@/data/memes");
        setMemes(sampleMemes);
        getRandomMeme(sampleMemes);
      }
    } catch (error) {
      console.error("Error in fetchMemes:", error);
      toast.error("Failed to load memes");
      
      // Fallback to sample memes
      const { data: sampleMemes } = await import("@/data/memes");
      setMemes(sampleMemes);
      getRandomMeme(sampleMemes);
    } finally {
      setLoading(false);
    }
  };

  const getRandomMeme = (memesArray: Meme[] = memes) => {
    if (memesArray && memesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * memesArray.length);
      setCurrentMeme(memesArray[randomIndex]);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Header />
      
      <main className="flex-1 container max-w-screen-md py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">MemeWave</h1>
            <p className="text-muted-foreground mb-8">Your daily dose of internet humor</p>
          </div>
          
          {loading ? (
            <div className="w-full max-w-md aspect-[4/3] bg-white rounded-lg flex items-center justify-center">
              <div className="text-xl text-muted-foreground">Loading...</div>
            </div>
          ) : currentMeme ? (
            <MemeCard meme={currentMeme} className="w-full max-w-2xl" />
          ) : (
            <div className="text-center">
              <p>No memes available right now.</p>
            </div>
          )}
          
          <Button 
            size="lg" 
            onClick={() => getRandomMeme()}
            disabled={loading}
            className="px-8"
          >
            {loading ? "Loading..." : "Next Meme"}
          </Button>
        </div>
      </main>
      
      <Footer />
      <NewsletterModal />
    </div>
  );
};

export default Index;
