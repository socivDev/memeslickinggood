
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">MemeWave</h3>
            <p className="text-sm text-muted-foreground">
              Your daily source of internet humor and entertainment.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/submit" className="hover:text-foreground transition-colors">Submit Meme</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MemeWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
