import Navbar        from "@/components/nav/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero           from "@/components/sections/Hero";
import About          from "@/components/sections/About";
import Experience     from "@/components/sections/Experience";
import Projects       from "@/components/sections/Projects";
import StartupStory   from "@/components/sections/StartupStory";
import Library        from "@/components/sections/Library";
import Contact        from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <StartupStory />
      <Library />
      <Contact />
    </main>
  );
}
