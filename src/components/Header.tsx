
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const showAdminLink = location.pathname === "/admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            MemeWave
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              About
            </Button>
          </Link>
          <Link to="/submit">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              Submit Meme
            </Button>
          </Link>
          {showAdminLink && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                Admin
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 space-y-2">
              <Link to="/" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Home
                </Button>
              </Link>
              <Link to="/about" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  About
                </Button>
              </Link>
              <Link to="/submit" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Submit Meme
                </Button>
              </Link>
              {showAdminLink && (
                <Link to="/admin" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Admin
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
