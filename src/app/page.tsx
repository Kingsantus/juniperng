import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Quality } from "@/components/Quality";
import { IDCardRequestForm } from "@/components/IDCardRequestForm";
import { Services } from "@/components/Services";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Quality />
        <CallToAction />
        <IDCardRequestForm />
      </main>
      <Footer />
    </div>
  );
}
