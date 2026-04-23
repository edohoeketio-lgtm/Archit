"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ImageChoreography() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Image Layer Refs
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);

  // Inner Image Refs for the slight parallax scale
  const innerImg1Ref = useRef<HTMLImageElement>(null);
  const innerImg2Ref = useRef<HTMLImageElement>(null);
  const innerImg3Ref = useRef<HTMLImageElement>(null);
  const innerImg4Ref = useRef<HTMLImageElement>(null);

  // Metadata Refs
  const meta1Ref = useRef<HTMLDivElement>(null);
  const meta2Ref = useRef<HTMLDivElement>(null);
  const meta3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // --- INITIAL STATES ---
      // Img 1 is the full background.
      // Img 2 is the central frame.
      gsap.set(img2Ref.current, { clipPath: "inset(25% 30% 25% 30%)", autoAlpha: 1 });
      // Img 3 and 4 are hidden initially
      gsap.set(img3Ref.current, { clipPath: "inset(25% 30% 25% 30%)", autoAlpha: 0 });
      gsap.set(img4Ref.current, { clipPath: "inset(25% 30% 25% 30%)", autoAlpha: 0 });
      
      // Initial scale for inner images to allow parallax zoom
      gsap.set([innerImg1Ref.current, innerImg2Ref.current, innerImg3Ref.current, innerImg4Ref.current], { scale: 1 });
      
      // Metadata initial
      gsap.set([meta2Ref.current, meta3Ref.current], { autoAlpha: 0 });

      // --- CHOREOGRAPHY ---
      
      // PHASE 1: Img 1 zooms out of bounds. Img 2 expands to fill screen. Img 3 appears in center.
      tl.to(img1Ref.current, { scale: 1.2, duration: 1, ease: "none" }, 0)
        .to(meta1Ref.current, { autoAlpha: 0, duration: 0.3 }, 0)
        .to(img2Ref.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }, 0)
        .to(innerImg2Ref.current, { scale: 1.05, duration: 1, ease: "none" }, 0)
        .to(meta2Ref.current, { autoAlpha: 1, duration: 0.3 }, 0.7)
        .to(img3Ref.current, { autoAlpha: 1, duration: 0.3 }, 0.7);

      // PHASE 2: Img 2 zooms out of bounds. Img 3 expands to fill screen. Img 4 appears in center.
      tl.to(img2Ref.current, { scale: 1.2, duration: 1, ease: "none" }, 1)
        .to(meta2Ref.current, { autoAlpha: 0, duration: 0.3 }, 1)
        .to(img3Ref.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }, 1)
        .to(innerImg3Ref.current, { scale: 1.05, duration: 1, ease: "none" }, 1)
        .to(meta3Ref.current, { autoAlpha: 1, duration: 0.3 }, 1.7)
        .to(img4Ref.current, { autoAlpha: 1, duration: 0.3 }, 1.7);

      // PHASE 3: Img 3 zooms out of bounds. Img 4 expands to fill screen.
      tl.to(img3Ref.current, { scale: 1.2, duration: 1, ease: "none" }, 2)
        .to(meta3Ref.current, { autoAlpha: 0, duration: 0.3 }, 2)
        .to(img4Ref.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }, 2)
        .to(innerImg4Ref.current, { scale: 1.05, duration: 1, ease: "none" }, 2);

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="relative w-full">
      <section ref={sectionRef} className="relative h-screen w-full bg-arch-charcoal overflow-hidden flex items-center justify-center">
        
        {/* Stage Container */}
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
          
          {/* Layer 1: Base Exterior */}
          <div ref={img1Ref} className="absolute inset-0 w-full h-full origin-center">
            <Image
              ref={innerImg1Ref}
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
              alt="Base Exterior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Layer 2: Interior Frame */}
          <div ref={img2Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden">
            <Image
              ref={innerImg2Ref}
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
              alt="Interior Frame"
              fill
              className="object-cover"
            />
          </div>

          {/* Layer 3: Material/Detail Crop */}
          <div ref={img3Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden">
            <Image
              ref={innerImg3Ref}
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80"
              alt="Material Crop"
              fill
              className="object-cover"
            />
          </div>

          {/* Layer 4: Plan/Alternate Angle */}
          <div ref={img4Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden">
            <Image
              ref={innerImg4Ref}
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
              alt="Alternate Angle"
              fill
              className="object-cover"
            />
          </div>

          {/* --- METADATA ANNOTATION LAYER --- */}
          <div className="absolute inset-0 w-full h-full pointer-events-none p-8 md:p-12 z-10 flex flex-col justify-between">
            
            {/* Top Left Branding / Fixed Title */}
            <div className="text-white mix-blend-difference">
              <h2 className="text-xl font-light tracking-tight">KUNSTHAUS EXPANSION</h2>
              <p className="text-xs opacity-70 uppercase tracking-widest mt-1">Zurich, CH</p>
            </div>

            {/* Dynamic Annotations */}
            <div className="relative w-full h-32">
              <div ref={meta1Ref} className="absolute bottom-0 right-0 text-right text-white mix-blend-difference">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70 mb-1 block">01 / Exterior</span>
                <p className="text-sm font-light">URBAN CONTEXT</p>
              </div>
              
              <div ref={meta2Ref} className="absolute bottom-0 right-0 text-right text-white mix-blend-difference invisible">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70 mb-1 block">02 / Volume</span>
                <p className="text-sm font-light">SPATIAL CONTINUITY</p>
              </div>

              <div ref={meta3Ref} className="absolute bottom-0 right-0 text-right text-white mix-blend-difference invisible">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] opacity-70 mb-1 block">03 / Surface</span>
                <p className="text-sm font-light">MATERIAL TACTILITY</p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

