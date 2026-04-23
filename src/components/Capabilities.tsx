"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Architecture",
  "Interior Architecture",
  "Urban Masterplanning",
  "Adaptive Reuse",
  "Exhibition Design",
  "Spatial Strategy"
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#E5D223] text-[#0A3B24]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-sm uppercase tracking-widest text-[#0A3B24]/70 mb-4">Capabilities</h2>
          <div className="h-px w-12 bg-[#0A3B24]/30 mb-8"></div>
          <p className="font-light max-w-sm text-[#0A3B24]/90">
            Operating at the intersection of scale and intimacy, our methodology is unified by a rigorous commitment to material integrity and structural intelligence.
          </p>
        </div>
        
        <div className="md:col-span-8 md:col-start-6">
          <ul ref={listRef} className="flex flex-col gap-6">
            {capabilities.map((cap, index) => (
              <li 
                key={index} 
                className="capability-item group border-b border-[#0A3B24]/20 pb-6 flex items-center justify-between cursor-default"
              >
                <span className="text-2xl md:text-3xl font-light transition-colors duration-500 group-hover:text-white">
                  {cap}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  0{index + 1}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
