import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProofBar from '@/components/ProofBar';
import ScrollStory from '@/components/ScrollStory';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FooterCTA from '@/components/FooterCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07080F]">
      <Nav />
      <Hero />
      <ProofBar />
      <ScrollStory />
      <Features />
      <Stats />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  );
}
