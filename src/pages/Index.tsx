import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-mystical">
      <LanguageSwitcher />
      <Hero />
      <CategoryGrid />
      <Footer />
    </div>
  );
};

export default Index;
