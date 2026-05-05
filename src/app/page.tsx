import Navbar         from "@/components/nav/Navbar";
import ScrollProgress  from "@/components/ui/ScrollProgress";
import Hero            from "@/components/sections/Hero";
import About           from "@/components/sections/About";
import Experience      from "@/components/sections/Experience";
import Projects        from "@/components/sections/Projects";
import Skills          from "@/components/sections/Skills";
import PersonalSpace   from "@/components/sections/PersonalSpace";
import Contact         from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <PersonalSpace />
      <Contact />
    </main>
  );
}
