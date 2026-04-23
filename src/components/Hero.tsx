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
  const greenLogoRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Typography Refs
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const philosophyLayerRef = useRef<HTMLDivElement>(null);
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

      // Hide the green logo initially outside the visible area
      gsap.set(greenLogoRef.current, { xPercent: -100 });
    };

    // Set initial geometry immediately so tl.to() records the correct starting values
    updateGeometry();

    // 3. ScrollTrigger Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // Extended for the multi-phase one-viewport sequence
        pin: true,
        scrub: 1, // Slight smoothing on the scrub
        invalidateOnRefresh: true, // Recalculate on resize
        onRefreshInit: updateGeometry, // Remeasure BEFORE ScrollTrigger records start values
      }
    });

    // Ensure layout is perfectly measured after custom fonts finish loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

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

    // Fade out scroll indicator
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      ease: "power2.inOut",
    }, 0);

    // Masked Typography Reveal with fade in
    tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: "0%",
      opacity: 1,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.2); // Start slightly after the expansion begins

    // Original logo gracefully disappears immediately as yellow starts expanding
    tl.to(logoBoxRef.current, {
      opacity: 0,
      ease: "power2.out"
    }, 0);

    // Green logo slides in from the left simultaneously
    tl.fromTo(greenLogoRef.current, 
      { xPercent: -100 },
      {
        xPercent: 0,
        ease: "power3.inOut"
      }, 
      0.3
    );

    // Phase 4: Scroll the old text up, bring the philosophy text up
    tl.to(heroLayerRef.current, {
      y: "-100vh",
      ease: "power2.inOut",
      duration: 1,
    }, 1.5); // Start at 1.5 to provide a scrolling "pause" to read the text

    tl.to(philosophyLayerRef.current, {
      y: "0vh",
      ease: "power2.inOut",
      duration: 1,
    }, 1.5);

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
            src="/images/andrea-maiolo-QYPBn8jzFsg-unsplash.jpg"
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
        <div ref={heroLayerRef} className="absolute inset-0 z-20 flex flex-col justify-center items-start pointer-events-none px-6 md:px-12 lg:px-24">
          <h2 className="text-[#0A3B24] text-left font-gilroy font-medium tracking-tighter w-full max-w-5xl mt-32 md:mt-48">
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line1Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full opacity-0 will-change-transform">
                Ultimate Production
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line2Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full opacity-0 will-change-transform">
                Playground in the
              </span>
            </span>
            <span className="block overflow-hidden pb-1 md:pb-3">
              <span ref={line3Ref} className="block text-5xl md:text-7xl lg:text-[8vw] leading-[0.85] translate-y-full opacity-0 will-change-transform">
                Heart of Europe
              </span>
            </span>
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute left-6 md:left-12 lg:left-24 bottom-12 z-20 flex flex-col items-center gap-6"
        >
          <div className="border border-[#E5D223] px-2 py-8 flex flex-col items-center gap-6 text-[#E5D223]">
            <span className="text-xs uppercase tracking-[0.3em] font-medium rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Scroll Down
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Layer 5: Philosophy Text */}
        <div 
          ref={philosophyLayerRef} 
          className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-32 md:pb-48 pointer-events-none"
          style={{ transform: "translateY(100vh)" }}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pointer-events-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-4">
              <h2 className="text-sm uppercase tracking-widest text-[#0A3B24]/70 mb-4">Introduction to the yard</h2>
              <div className="h-px w-12 bg-[#0A3B24] mb-8"></div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              <div className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-[#0A3B24]">
                <p className="mb-8">
                  We believe architecture is the physical manifestation of context, material, and human experience. Our work seeks a balance between monumental presence and intimate scale.
                </p>
                <p className="text-[#0A3B24]/80">
                  Avoiding transient trends, we focus on spatial rhythm, enduring materials, and intelligent structural solutions to create spaces that mature gracefully over time.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#0A3B24]/30 text-[#0A3B24]">
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
        </div>

        {/* Layer 4: Fixed Navigation & Logo */}
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex flex-col justify-between p-6 md:p-12 lg:p-24 pointer-events-none">
          <nav className="flex justify-between items-start text-sm uppercase tracking-widest pointer-events-auto">
            {/* "the yard" logo block wrapped for sliding */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden">
              <div 
                ref={logoBoxRef}
                // The native background is removed by JS instantly, replaced by the expanding layer underneath
                className="absolute inset-0 bg-[#E5D223] text-[#141414] p-4 flex flex-col justify-end font-bold text-xl leading-none tracking-tight"
              >
                <span>the</span>
                <span>yard</span>
              </div>
              <div 
                ref={greenLogoRef}
                className="absolute inset-0 bg-[#0A3B24] text-[#E5D223] p-4 flex flex-col justify-end font-bold text-xl leading-none tracking-tight"
              >
                <span>the</span>
                <span>yard</span>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
