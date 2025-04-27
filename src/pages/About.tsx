
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "A digital culture enthusiast with over 10 years of experience in social media and content curation. Sarah founded MemeWave with the vision of creating a platform that celebrates creativity and humor.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Mike Chen",
      role: "Creative Director",
      bio: "Former social media manager turned meme curator. Mike has an uncanny ability to spot viral trends before they happen. He leads our content strategy and community engagement initiatives.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Alex Rodriguez",
      role: "Community Manager",
      bio: "A community building expert who ensures MemeWave remains a positive and engaging space for all users. Alex manages our moderation team and user support.",
      image: "https://i.pravatar.cc/150?img=3"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl py-12">
        <div className="space-y-12">
          <section className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About MemeWave
            </h1>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg text-muted-foreground">
                MemeWave is more than just a meme platform - it's a community where creativity meets humor,
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

          <section className="space-y-6 bg-muted/50 rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-center">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-xl">Creativity</h3>
                <p className="text-muted-foreground">
                  We celebrate original content and encourage creative expression through memes.
                </p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-xl">Community</h3>
                <p className="text-muted-foreground">
                  We foster a welcoming environment where everyone can share and enjoy content.
                </p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-xl">Quality</h3>
                <p className="text-muted-foreground">
                  We curate high-quality memes that bring genuine entertainment value.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
