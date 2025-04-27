
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Meme enthusiast and digital culture expert",
    },
    {
      name: "Mike Chen",
      role: "Creative Director",
      bio: "Professional meme curator with 5 years of experience",
    },
    {
      name: "Alex Rodriguez",
      role: "Community Manager",
      bio: "Bringing the best memes to our community",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl py-12">
        <div className="space-y-12">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">About MemeWave</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              MemeWave is your daily source of humor and entertainment. We curate and deliver the 
              freshest, most relevant memes to brighten your day and keep you connected with 
              internet culture.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Our Team</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in the power of memes to connect people, share experiences, and bring 
              joy to everyday life. Our platform is built on community engagement and creative 
              expression.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
