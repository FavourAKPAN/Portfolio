import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Perspectives from "@/components/Perspectives";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Process />
      <Perspectives />
      <Contact />
    </>
  );
}
