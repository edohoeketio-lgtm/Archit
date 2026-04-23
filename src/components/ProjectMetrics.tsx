"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specifications = [
  { value: "14,500", label: "Site Area (sqm)" },
  { value: "8,200", label: "Gross Floor Area (sqm)" },
  { value: "2026", label: "Target Completion" },
  { value: "DGNB", label: "Platinum Certification" },
];

export default function ProjectMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the grid container's opacity to reveal the lines
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate the metrics content up
      gsap.fromTo(
        ".metric-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );

      // Subtle diagonal sweep animation
      gsap.fromTo(
        sweepRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 0.15,
          duration: 3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 md:py-32 bg-charcoal text-stone overflow-hidden"
    >
      {/* Light sweep overlay */}
      <div 
        ref={sweepRef}
        className="pointer-events-none absolute inset-0 z-10 w-[200%] h-[200%] -top-[50%] -left-[50%] bg-gradient-to-tr from-transparent via-stone to-transparent rotate-12 opacity-0 mix-blend-overlay"
      />

      <div className="relative z-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-stone/50 mb-4">Project Parameters</h2>
          <div className="h-px w-12 bg-stone/30"></div>
        </div>

        {/* 1px Hairline Grid System */}
        {/* The gap creates the 1px lines, the container bg is the line color, and children cover it with charcoal bg */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-stone/15 opacity-0"
        >
          {specifications.map((spec, index) => (
            <div 
              key={index} 
              className="bg-charcoal aspect-square flex flex-col justify-center p-8 md:p-12"
            >
              <div className="metric-content flex flex-col justify-center h-full">
                <span className="text-5xl md:text-6xl lg:text-7xl font-light text-stone mb-4 tracking-tight">
                  {spec.value}
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-stone/50">
                  {spec.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
