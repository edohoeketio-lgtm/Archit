"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    title: "Contextual Analysis",
    description: "Every intervention begins with a rigorous reading of the landscape. We decode topography, climate, and historical precedent to anchor our forms.",
  },
  {
    title: "Volumetric Studies",
    description: "We develop architectural massing through iterative physical models and spatial calculations, seeking absolute clarity in form.",
  },
  {
    title: "Material Science",
    description: "Materials are selected for their tectonic honesty and kinetic aging. We build with elements that forge an enduring dialogue with their environment.",
  },
  {
    title: "Tectonic Execution",
    description: "The conceptual purity of the building is secured through obsessive detailing. We control the narrative from the first sketch to the final concrete pour.",
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and animate steps vertically if desired, 
      // or simply fade them in sequentially as the user scrolls.
      // For a calm, editorial feel, fade + translate is best.
      gsap.fromTo(
        ".process-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-stone text-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-12 items-start">
        
        <div className="md:col-span-5 relative md:sticky md:top-32">
          <h2 className="text-sm uppercase tracking-widest text-charcoal/60 mb-4">Methodology</h2>
          <div className="h-px w-12 bg-charcoal/30 mb-8"></div>
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-charcoal/10">
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1500&auto=format&fit=crop"
              alt="Architectural sketch and models"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <div ref={trackRef} className="flex flex-col gap-16 md:pt-16">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step border-l border-charcoal/20 pl-8 relative">
                <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-charcoal rounded-full"></span>
                <span className="block text-xs uppercase tracking-widest text-charcoal/50 mb-4">Phase 0{index + 1}</span>
                <h3 className="text-2xl font-light mb-4 text-charcoal">{step.title}</h3>
                <p className="font-light text-charcoal/80 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
