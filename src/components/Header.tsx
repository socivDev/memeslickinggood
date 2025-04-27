
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const showAdminLink = location.pathname === "/admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 max-w-screen-xl">
        <Link to="/" className="font-semibold text-xl text-primary">MemeWave</Link>
        <nav className="flex items-center gap-4">
          <Link to="/about">
            <Button variant="ghost" size="sm">About</Button>
          </Link>
          <Link to="/submit">
            <Button variant="ghost" size="sm">Submit Meme</Button>
          </Link>
          {showAdminLink && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
