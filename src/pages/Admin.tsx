
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import MemeForm from "@/components/admin/MemeForm";
import MemeList from "@/components/admin/MemeList";
import SubscriberList from "@/components/admin/SubscriberList";
import { Meme, Subscriber } from "@/types";
import { sampleMemes } from "@/data/memes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem("admin-authenticated");
    if (auth) {
      setIsAuthenticated(true);
    }
    
    // Load memes
    setMemes(sampleMemes);
    
    // Load sample subscribers
    setSubscribers([
      {
        id: "1",
        email: "user1@example.com",
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        email: "user2@example.com",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]);
  }, []);

  const handleAddMeme = (meme: Meme) => {
    setMemes((prevMemes) => [meme, ...prevMemes]);
  };

  const handleDeleteMeme = (id: string) => {
    setMemes((prevMemes) => prevMemes.filter((meme) => meme.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
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
