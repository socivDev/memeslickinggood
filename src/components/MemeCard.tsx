
import { Meme } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MemeCardProps {
  meme: Meme;
  className?: string;
}

const MemeCard = ({ meme, className }: MemeCardProps) => {
  return (
    <Card className={cn("overflow-hidden shadow-lg animate-scale-in", className)}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img 
            src={meme.imageUrl} 
            alt={meme.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-white">
        <h3 className="text-lg font-medium">{meme.title}</h3>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
