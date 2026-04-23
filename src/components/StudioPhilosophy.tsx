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
    <section ref={sectionRef} id="studio" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <h2 className="text-sm uppercase tracking-widest text-concrete mb-4">Philosophy</h2>
          <div className="h-px w-12 bg-charcoal mb-8"></div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          <div ref={textRef} className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-charcoal">
            <p className="philosophy-text mb-8">
              We believe architecture is the physical manifestation of context, material, and human experience. Our work seeks a balance between monumental presence and intimate scale.
            </p>
            <p className="philosophy-text text-concrete">
              Avoiding transient trends, we focus on spatial rhythm, enduring materials, and intelligent structural solutions to create spaces that mature gracefully over time.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-concrete/30">
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">24</span>
              <span className="text-xs uppercase tracking-widest text-concrete">Years of Practice</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">150+</span>
              <span className="text-xs uppercase tracking-widest text-concrete">Realized Projects</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">12</span>
              <span className="text-xs uppercase tracking-widest text-concrete">Global Locations</span>
            </div>
            <div className="stat-item">
              <span className="block text-3xl font-light mb-2">48</span>
              <span className="text-xs uppercase tracking-widest text-concrete">Design Awards</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
