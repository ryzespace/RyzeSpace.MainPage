import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Features } from '@/components/sections/features';
import { Calculator } from '@/components/sections/calculator';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <About />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
