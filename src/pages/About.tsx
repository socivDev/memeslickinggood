
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const team = [
    {
      name: "Clement Law Hao Yet",
      role: "Founder & Admin",
      bio: "I might be Chinese, but I'm not from China.",
      image: "data:image/jpeg;base64,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"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl py-12">
        <div className="space-y-12">
          <section className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About Memes Licking Good
            </h1>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg text-muted-foreground">
                Memes Licking Good is more than just a meme platform - it's a community where creativity meets humor,
                and where internet culture comes alive. Founded in 2024, we've grown into a vibrant hub
                for sharing and discovering the best memes on the internet.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to bring joy and laughter to millions while fostering a supportive
                community of creators and enthusiasts.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-center">Our Team</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-square w-32 mx-auto mb-4 overflow-hidden rounded-full">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-xl">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
