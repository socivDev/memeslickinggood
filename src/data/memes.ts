
import { Meme } from "@/types";

export const sampleMemes: Meme[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    title: "When you finally solve the bug after 4 hours",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    title: "Me waiting for my code to compile",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80",
    title: "When someone says your code is messy",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=800&q=80",
    title: "Looking at your code from last week",
    createdAt: new Date().toISOString(),
  }
];
