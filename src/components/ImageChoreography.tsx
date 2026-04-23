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
          end: "+=5000", // Extra long duration to allow smooth nested scrubbing
          scrub: 1, // Slight smoothing
          pin: true,
          anticipatePin: 1,
        },
      });

      // --- INITIAL STATES ---
      // All images start as full-screen layers
      gsap.set([img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current], { 
        clipPath: "inset(0% 0% 0% 0%)", 
        autoAlpha: 1 
      });
      
      // The very last image starts slightly zoomed in so it can zoom out before leaving the section
      gsap.set(innerImg4Ref.current, { scale: 1.2 });

      // --- CHOREOGRAPHY ---
      // Target clip path for the small center box (slightly larger to match screenshot)
      const centerBox = "inset(15% 20% 15% 20%)";

      // PHASE 1: Img 1 shrinks to center box.
      tl.to(img1Ref.current, { clipPath: centerBox, duration: 1, ease: "none" }, 0);
        
      // PHASE 2: Img 1 shrinks into the distance, then fades out.
      // Use ease: "none" to prevent the "hang" between phases.
      tl.to(img1Ref.current, { scale: 0.05, duration: 1, ease: "none" }, 1)
        .to(img1Ref.current, { autoAlpha: 0, duration: 0.3, ease: "none" }, 1.7);

      // PHASE 3: Img 2 shrinks to center box.
      tl.to(img2Ref.current, { clipPath: centerBox, duration: 1, ease: "none" }, 2);
        
      // PHASE 4: Img 2 shrinks into the distance, then fades out.
      tl.to(img2Ref.current, { scale: 0.05, duration: 1, ease: "none" }, 3)
        .to(img2Ref.current, { autoAlpha: 0, duration: 0.3, ease: "none" }, 3.7);

      // PHASE 5: Img 3 shrinks to center box.
      tl.to(img3Ref.current, { clipPath: centerBox, duration: 1, ease: "none" }, 4);

      // PHASE 6: Img 3 shrinks into the distance, then fades out.
      tl.to(img3Ref.current, { scale: 0.05, duration: 1, ease: "none" }, 5)
        .to(img3Ref.current, { autoAlpha: 0, duration: 0.3, ease: "none" }, 5.7);

      // PHASE 7: The very last image zooms out smoothly before unpinning and scrolling to next section.
      tl.to(innerImg4Ref.current, { scale: 1, duration: 1, ease: "none" }, 6);

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
          
          {/* Layer 4: Bottom-most Background */}
          <div ref={img4Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden z-10">
            <Image
              ref={innerImg4Ref}
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
              alt="Alternate Angle"
              fill
              className="object-cover"
            />
          </div>

          {/* Layer 3 */}
          <div ref={img3Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden z-20">
            <Image
              ref={innerImg3Ref}
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80"
              alt="Material Crop"
              fill
              className="object-cover"
            />
          </div>

          {/* Layer 2 */}
          <div ref={img2Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden z-30">
            <Image
              ref={innerImg2Ref}
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
              alt="Interior Frame"
              fill
              className="object-cover"
            />
          </div>

          {/* Layer 1: Top-most Background */}
          <div ref={img1Ref} className="absolute inset-0 w-full h-full origin-center overflow-hidden z-40">
            <Image
              ref={innerImg1Ref}
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
              alt="Base Exterior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* --- METADATA ANNOTATION LAYER --- */}
          {/* Note: The globally fixed Logo from Hero.tsx naturally sits on top of this section since its z-index is 50 */}
          <div className="absolute inset-0 w-full h-full pointer-events-none p-6 md:p-12 lg:p-24 z-50 flex flex-col justify-end">
            
            {/* Architect Name and Location at Bottom Right */}
            <div className="text-white mix-blend-difference text-right pb-4">
              <h2 className="text-xl md:text-2xl font-light tracking-tight">KUNSTHAUS EXPANSION</h2>
              <p className="text-xs opacity-70 uppercase tracking-widest mt-1">Zurich, CH</p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
