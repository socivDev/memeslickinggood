
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import MemeCard from "@/components/MemeCard";
import NewsletterModal from "@/components/NewsletterModal";
import { sampleMemes } from "@/data/memes";
import { Meme } from "@/types";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);

  const getRandomMeme = () => {
    setLoading(true);
    // Simulate API loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleMemes.length);
      setCurrentMeme(sampleMemes[randomIndex]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getRandomMeme();
  }, []);

  const handleRefresh = () => {
    toast.info("Loading new meme...");
    getRandomMeme();
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Header />
      
      <main className="flex-1 container max-w-screen-md py-8">
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
            onClick={handleRefresh} 
            disabled={loading}
            className="px-8"
          >
            {loading ? "Loading..." : "Next Meme"}
          </Button>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MemeWave. All rights reserved.
        </div>
      </footer>
      
      <NewsletterModal />
    </div>
  );
};

export default Index;
