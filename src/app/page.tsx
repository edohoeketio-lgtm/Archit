import Hero from "@/components/Hero";
import ImageChoreography from "@/components/ImageChoreography";
import SelectedProjects from "@/components/SelectedProjects";
import Capabilities from "@/components/Capabilities";
import ProjectMetrics from "@/components/ProjectMetrics";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Hero />
      <ImageChoreography />
      <SelectedProjects />
      <Capabilities />
      <ProjectMetrics />
      <Process />
      <Contact />
    </main>
  );
}
