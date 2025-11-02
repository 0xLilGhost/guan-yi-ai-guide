import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import BaguaDiagram from "@/components/BaguaDiagram";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-mystical">
      <Hero />
      
      {/* Interactive Bagua Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-accent">
              八卦太极
            </h2>
            <p className="text-muted-foreground text-lg">
              Eight Trigrams · Supreme Ultimate
            </p>
          </div>
          <BaguaDiagram />
        </div>
      </section>

      <CategoryGrid />
      <Footer />
    </div>
  );
};

export default Index;
