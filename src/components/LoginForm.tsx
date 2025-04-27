
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast.error("Too many attempts. Please try again later.");
      return;
    }

    setIsLoading(true);
    
    try {
      // More secure password with minimum requirements
      const securePassword = "Admin@123!"; // In real apps, this would be hashed and stored securely
      
      if (password === securePassword) {
        toast.success("Login successful");
        localStorage.setItem("admin-authenticated", "true");
        onLogin();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setTimeout(() => {
            setIsLocked(false);
            setAttempts(0);
          }, 300000); // 5 minutes lockout
          toast.error("Account locked for 5 minutes due to too many attempts");
        } else {
          toast.error(`Invalid password. ${3 - newAttempts} attempts remaining`);
        }
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-muted to-background">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Lock className="w-6 h-6 text-primary" />
            Admin Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                disabled={isLocked}
              />
              <p className="text-sm text-muted-foreground">
                {isLocked ? (
                  <span className="text-destructive">Account temporarily locked. Please wait.</span>
                ) : (
                  "Default password: Admin@123!"
                )}
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || isLocked}
            >
              {isLoading ? "Verifying..." : isLocked ? "Locked" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
