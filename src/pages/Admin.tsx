
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import MemeForm from "@/components/admin/MemeForm";
import MemeList from "@/components/admin/MemeList";
import SubscriberList from "@/components/admin/SubscriberList";
import { Meme, Subscriber } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem("admin-authenticated");
    if (auth) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch memes
      const { data: memesData, error: memesError } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false });

      if (memesError) throw memesError;

      // Fetch subscribers
      const { data: subscribersData, error: subscribersError } = await supabase
        .from("subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (subscribersError) throw subscribersError;

      // Format memes data
      const formattedMemes = memesData?.map(meme => ({
        id: meme.id,
        imageUrl: meme.image_url,
        title: meme.title,
        createdAt: meme.created_at
      })) || [];

      // Format subscribers data
      const formattedSubscribers = subscribersData?.map(subscriber => ({
        id: subscriber.id,
        email: subscriber.email,
        createdAt: subscriber.created_at
      })) || [];

      setMemes(formattedMemes);
      setSubscribers(formattedSubscribers);
      console.log("Fetched memes:", formattedMemes);
      console.log("Fetched subscribers:", formattedSubscribers);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMeme = async (meme: Meme) => {
    try {
      // Insert into Supabase
      const { data, error } = await supabase
        .from("memes")
        .insert([{
          title: meme.title,
          image_url: meme.imageUrl,
          approved: true
        }])
        .select();

      if (error) throw error;

      // If successful, update local state
      if (data && data[0]) {
        const newMeme = {
          id: data[0].id,
          title: data[0].title,
          imageUrl: data[0].image_url,
          createdAt: data[0].created_at
        };
        setMemes(prev => [newMeme, ...prev]);
        toast.success("Meme added successfully");
      }
    } catch (error) {
      console.error("Error adding meme:", error);
      toast.error("Failed to add meme");
    }
  };

  const handleDeleteMeme = async (id: string) => {
    try {
      const { error } = await supabase
        .from("memes")
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMemes(prevMemes => prevMemes.filter(meme => meme.id !== id));
      toast.success("Meme deleted successfully");
    } catch (error) {
      console.error("Error deleting meme:", error);
      toast.error("Failed to delete meme");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <LoginForm onLogin={() => {
          setIsAuthenticated(true);
          fetchData();
        }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <p className="text-lg text-muted-foreground">Loading data...</p>
          </div>
        ) : (
          <Tabs defaultValue="memes" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="memes">Memes</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="memes" className="space-y-6">
              <MemeForm onMemeAdded={handleAddMeme} />
              <MemeList memes={memes} onDeleteMeme={handleDeleteMeme} />
            </TabsContent>
            
            <TabsContent value="subscribers">
              <SubscriberList subscribers={subscribers} />
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <footer className="border-t py-6 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MemeWave Admin. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Admin;
