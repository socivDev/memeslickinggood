
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 max-w-screen-xl">
        <Link to="/" className="font-semibold text-xl text-primary">MemeWave</Link>
        <nav className="flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <Button variant="ghost" size="sm">Admin</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
