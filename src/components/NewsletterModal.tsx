
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("newsletter-subscribed")) {
        setIsOpen(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Thanks for subscribing!");
      setIsOpen(false);
      localStorage.setItem("newsletter-subscribed", "true");
    } catch (error: any) {
      if (error?.code === "23505") {
        toast.error("You're already subscribed!");
      } else {
        toast.error("Failed to subscribe. Please try again.");
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get fresh memes in your inbox!</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Subscribe to our newsletter to receive the dankest memes weekly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
            >
              Maybe later
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
