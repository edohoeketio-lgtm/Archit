"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StudioPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text paragraphs sequentially
      gsap.fromTo(
        ".philosophy-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Reveal stats sequentially
      gsap.fromTo(
        ".stat-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="studio" className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#E5D223]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <h2 className="text-sm uppercase tracking-widest text-[#0A3B24]/70 mb-4">Manifesto of the yard</h2>
          <div className="h-px w-12 bg-[#0A3B24] mb-8"></div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          <div ref={textRef} className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-[#0A3B24]">
            <p className="philosophy-text mb-8">
              We engineer spatial narratives. Our work is the physical manifestation of context, material, and human intent—a relentless pursuit of balance between brutalist monumentality and intimate, crafted scale.
            </p>
            <p className="philosophy-text text-[#0A3B24]/80">
              Rejecting the transient, we anchor our discipline in enduring materiality, precise structural intelligence, and rhythmic light. We don't just build structures; we forge environments that mature gracefully alongside those who inhabit them.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#0A3B24]/30 text-[#0A3B24]">
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">24</span>
              <span className="text-xs uppercase tracking-widest text-[#0A3B24]/70">Years of Practice</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">150+</span>
              <span className="text-xs uppercase tracking-widest text-[#0A3B24]/70">Realized Projects</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">12</span>
              <span className="text-xs uppercase tracking-widest text-[#0A3B24]/70">Global Locations</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">48</span>
              <span className="text-xs uppercase tracking-widest text-[#0A3B24]/70">Design Awards</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
