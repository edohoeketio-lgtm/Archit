"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const outerWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const yellowOverlayRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  
  // Typography Refs
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Initial Load Animation
    gsap.set(sectionRef.current, { visibility: "visible" });
    
    // Animate the image tag itself for the load-in, to avoid conflicting with the scrub timeline
    const imgEl = imageLayerRef.current?.querySelector("img");
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );
    }

    // 2. Setup initial position for the yellow overlay
    const updateGeometry = () => {
      if (!logoBoxRef.current || !yellowOverlayRef.current || !sectionRef.current) return;
      
      const logoRect = logoBoxRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      
      // Calculate position relative to the pinned section to avoid scroll offset bugs
      const relativeTop = logoRect.top - sectionRect.top;
      const relativeLeft = logoRect.left - sectionRect.left;
      
      // The yellow overlay perfectly covers the logo box initially
      gsap.set(yellowOverlayRef.current, {
        top: relativeTop,
        left: relativeLeft,
        width: logoRect.width,
        height: logoRect.height,
        opacity: 1, // Ensure it's visible
      });
      
      // Remove native background from logo so the overlay entirely provides the color
      gsap.set(logoBoxRef.current, { 
        backgroundColor: "transparent", 
        boxShadow: "none" 
      });
    };

    // Use a tiny timeout to ensure layout has settled before measuring
    setTimeout(updateGeometry, 50);

    // 3. ScrollTrigger Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Longer pinned duration for majestic feel
        pin: true,
        scrub: 1, // Slight smoothing on the scrub
        invalidateOnRefresh: true, // Recalculate on resize
        onRefresh: updateGeometry, // Remeasure logo on resize
      }
    });

    // Expand yellow overlay to full screen
    tl.to(yellowOverlayRef.current, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      ease: "power2.inOut",
    }, 0);

    // Slide hero image away (targets the outer wrapper)
    // Image remains opaque as requested
    tl.to(imageLayerRef.current, {
      y: "-30vh",
      ease: "power2.inOut",
    }, 0);

    // Masked Typography Reveal
    tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: "0%",
      stagger: 0.1,
      ease: "power3.out",
    }, 0.2); // Start slightly after the expansion begins

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={outerWrapperRef} className="relative w-full">
      <section 
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden visibility-hidden bg-[#F2F0E9]"
      >
        {/* Layer 1: Hero Image Background */}
        <div ref={imageLayerRef} className="absolute inset-0 z-0 origin-center">
          <Image
            src="/images/the_yard.png"
            alt="The Yard"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        </div>

        {/* Layer 2: The Expanding Yellow Overlay */}
        <div 
          ref={yellowOverlayRef}
          className="absolute bg-[#E5D223] z-10 pointer-events-none will-change-transform"
          style={{ width: 0, height: 0 }}
        />

        {/* Layer 3: The Intro Typography */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6">
          <h2 className="text-[#141414] text-center uppercase font-medium tracking-tighter">
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line1Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full will-change-transform">
                Ultimate Production
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line2Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full will-change-transform">
                Playground in the
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line3Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full will-change-transform">
                Heart of Europe
              </span>
            </span>
          </h2>
        </div>

        {/* Layer 4: Fixed Navigation & Logo */}
        <div className="relative z-30 flex flex-col justify-between h-full p-6 md:p-12 lg:p-24 pointer-events-none">
          <nav className="flex justify-between items-start text-sm uppercase tracking-widest pointer-events-auto">
            {/* "the yard" logo block */}
            <div 
              ref={logoBoxRef}
              // The native background is removed by JS instantly, replaced by the expanding layer underneath
              className="bg-[#E5D223] text-[#141414] w-24 h-24 md:w-28 md:h-28 p-4 flex flex-col justify-end font-bold text-xl leading-none tracking-tight shadow-xl"
            >
              <span>the</span>
              <span>yard</span>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
