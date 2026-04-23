"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "Oculus Pavilion",
    location: "Oslo, Norway",
    typology: "Cultural",
    year: "2025",
    description: "A subterranean exhibition space defined by a single, monolithic concrete oculus.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 2,
    name: "Valley Residence",
    location: "Kyoto, Japan",
    typology: "Residential",
    year: "2024",
    description: "Timber and glass intersecting the natural topography, blurring interior and exterior boundaries.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 3,
    name: "The New Archive",
    location: "Berlin, Germany",
    typology: "Institutional",
    year: "2023",
    description: "Adaptive reuse of an industrial warehouse into a naturally lit municipal archive.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    aspectRatio: "aspect-[16/9]",
  }
];

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectElements = gsap.utils.toArray(".project-card");

      projectElements.forEach((el: any) => {
        const image = el.querySelector(".project-image");
        const metadata = el.querySelector(".project-metadata");

        // Masked image reveal
        gsap.fromTo(
          image,
          { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          }
        );

        // Metadata fade in
        gsap.fromTo(
          metadata,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-background">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <h2 className="text-sm uppercase tracking-widest text-concrete mb-4">Selected Works</h2>
        <div className="h-px w-12 bg-charcoal"></div>
      </div>

      <div ref={projectsRef} className="flex flex-col gap-32 md:gap-48 px-6 md:px-12 lg:px-24">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`project-card group grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Container */}
            <div className={`md:col-span-8 overflow-hidden ${index % 2 === 1 ? "md:order-last" : ""}`}>
              <div className={`relative w-full ${project.aspectRatio} bg-stone overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="project-image object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Metadata Container */}
            <div className="project-metadata md:col-span-4 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-concrete mb-4">
                {project.year} — {project.typology}
              </span>
              <h3 className="text-3xl md:text-4xl font-light mb-2">{project.name}</h3>
              <p className="text-charcoal/70 mb-6">{project.location}</p>
              <p className="font-light text-charcoal/80 mb-8 max-w-sm">
                {project.description}
              </p>
              <button className="self-start text-xs uppercase tracking-widest border-b border-charcoal pb-1 hover:text-concrete hover:border-concrete transition-colors">
                Explore Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
