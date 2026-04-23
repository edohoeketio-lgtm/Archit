"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const KUNSTHAUS_IMAGES = [
  "/images/kunsthaus/behance_ref_01.jpg",
  "/images/kunsthaus/behance_ref_03.jpg",
  "/images/kunsthaus/behance_ref_06.jpg",
  "/images/kunsthaus/behance_ref_08.jpg",
  "/images/kunsthaus/behance_ref_09.jpg",
];

export default function ImageChoreography() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Refs Arrays
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerImgRefs = useRef<(HTMLImageElement | null)[]>([]);

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
          // Calculate total scroll distance dynamically based on how many images we have
          end: `+=${KUNSTHAUS_IMAGES.length * 1000}`, 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // --- INITIAL STATES ---
      // Ensure arrays are filled
      const validImgRefs = imgRefs.current.filter(Boolean);
      const validInnerImgRefs = innerImgRefs.current.filter(Boolean);

      // All images start full screen
      gsap.set(validImgRefs, { 
        clipPath: "inset(0% 0% 0% 0%)", 
        autoAlpha: 1,
        scale: 1 // Reset scale just in case
      });
      
      // The very last image in the array starts slightly zoomed in
      if (validInnerImgRefs.length > 0) {
        gsap.set(validInnerImgRefs[validInnerImgRefs.length - 1], { scale: 1.2 });
      }

      // --- CHOREOGRAPHY ---
      const centerBox = "inset(15% 20% 15% 20%)";

      // Loop through all images EXCEPT the last one to build the pull-back sequence
      for (let i = 0; i < validImgRefs.length - 1; i++) {
        const startTime = i * 2; 

        // 1. Shrink full-screen image down to the center box
        tl.to(validImgRefs[i], { 
          clipPath: centerBox, 
          duration: 1, 
          ease: "none" 
        }, startTime);

        // 2. Shrink that box into the distance to reveal the next image, and fade it out
        tl.to(validImgRefs[i], { 
          scale: 0.05, 
          duration: 1, 
          ease: "none" 
        }, startTime + 1)
        .to(validImgRefs[i], { 
          autoAlpha: 0, 
          duration: 0.3, 
          ease: "none" 
        }, startTime + 1.7); // Start fading out near the end of the scale
      }

      // PHASE FINAL: The very last image zooms out smoothly before unpinning
      if (validInnerImgRefs.length > 0) {
        const finalStartTime = (validImgRefs.length - 1) * 2;
        tl.to(validInnerImgRefs[validInnerImgRefs.length - 1], { 
          scale: 1, 
          duration: 1, 
          ease: "none" 
        }, finalStartTime);
      }

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const skipTransition = (targetY: number) => {
    if (!containerRef.current) return;
    
    // Create a cinematic glass curtain dynamically
    const curtain = document.createElement("div");
    curtain.style.position = "fixed";
    curtain.style.inset = "0";
    curtain.style.backgroundColor = "rgba(20, 20, 20, 0.95)"; // Deep arch-charcoal
    curtain.style.zIndex = "9999";
    curtain.style.opacity = "0";
    curtain.style.pointerEvents = "none";
    curtain.style.backdropFilter = "blur(24px)";
    curtain.style.setProperty('-webkit-backdrop-filter', 'blur(24px)');
    document.body.appendChild(curtain);

    // 1. Cinematic 'detachment' - slightly zoom out the container
    gsap.to(containerRef.current, { 
      scale: 0.92, 
      opacity: 0.5,
      duration: 0.8, 
      ease: "power3.inOut" 
    });
    
    // 2. Drop the glass curtain
    gsap.to(curtain, { 
      opacity: 1, 
      duration: 0.6, 
      ease: "power2.inOut",
      delay: 0.2, 
      onComplete: () => {
        // 3. Smooth scroll to the next section while safely hidden behind the curtain
        window.scrollTo({ top: targetY, behavior: "smooth" });
        
        // Ensure any running tweens are killed and reset the container while it's completely hidden
        if (containerRef.current) {
          gsap.killTweensOf(containerRef.current);
          gsap.set(containerRef.current, { clearProps: "all" });
        }
        
        // 4. Slowly lift the curtain, revealing the new section
        setTimeout(() => {
          gsap.to(curtain, { 
            opacity: 0, 
            duration: 1.0, 
            ease: "power2.inOut",
            onComplete: () => curtain.remove() 
          });
        }, 1200); // 1.2s gives enough time for the native smooth scroll to finish landing
      }
    });
  };

  const handleSkipUp = () => {
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current);
    // target top: 0 directly goes to "Ultimate Production Playground"
    skipTransition(0);
  };

  const handleSkipDown = () => {
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current);
    if (st) {
      skipTransition(st.end + 50);
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Desktop GSAP Choreography */}
      <section ref={sectionRef} className="relative h-[100dvh] w-full bg-arch-charcoal overflow-hidden hidden md:flex items-center justify-center">
        
        {/* Stage Container */}
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
          
          {/* Dynamic Image Layers */}
          {KUNSTHAUS_IMAGES.map((src, index) => {
            // Z-index calculation: First image is on top, last image is at the bottom
            // We use a base of 100 and subtract to ensure they stack correctly
            const zIndex = 100 - index * 10; 
            
            return (
              <div 
                key={src}
                ref={(el) => { imgRefs.current[index] = el; }}
                className="absolute inset-0 w-full h-full origin-center overflow-hidden"
                style={{ zIndex }}
              >
                <Image
                  ref={(el) => { innerImgRefs.current[index] = el; }}
                  src={src}
                  alt={`Kunsthaus Reference ${index + 1}`}
                  fill
                  sizes="100vw"
                  quality={75} // Optimized heavily so 13MB images load instantly
                  className="object-cover"
                  priority={index === 0} // Only force preload the very first image
                />
                {/* Add a subtle dark overlay only to the very first top image for text readability */}
                {index === 0 && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}
              </div>
            );
          })}

          {/* --- METADATA ANNOTATION LAYER --- */}
          <div className="absolute inset-0 w-full h-full pointer-events-none p-6 md:p-12 lg:p-24 z-[150] flex flex-col justify-end">
            <div className="text-white mix-blend-difference text-right pb-4">
              <h2 className="text-xl md:text-2xl font-light tracking-tight">NEUE NATIONALGALERIE EXPANSION</h2>
              <p className="text-xs opacity-70 uppercase tracking-widest mt-1">Berlin, DE</p>
            </div>
          </div>

          {/* --- SKIP NAVIGATION ARROWS --- */}
          <div className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-6 pointer-events-auto">
            <button 
              onClick={handleSkipUp}
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
              aria-label="Skip Up to Previous Section"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
            <button 
              onClick={handleSkipDown}
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
              aria-label="Skip Down to Next Section"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* Mobile Native Carousel */}
      <section className="md:hidden w-full h-[100dvh] bg-arch-charcoal flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full p-6 z-20 flex flex-col pt-12 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-xl font-light tracking-tight text-white">NEUE NATIONALGALERIE EXPANSION</h2>
          <p className="text-xs opacity-70 uppercase tracking-widest mt-1 text-white">Berlin, DE</p>
        </div>

        <div 
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth relative z-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {KUNSTHAUS_IMAGES.map((src, index) => (
            <div key={`mobile-carousel-${index}`} className="w-full h-full flex-none snap-center relative">
              <Image
                src={src}
                alt={`Kunsthaus Reference ${index + 1}`}
                fill
                sizes="100vw"
                quality={75}
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="absolute bottom-12 w-full flex justify-center pointer-events-none z-20">
          <div className="bg-black/30 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
            <span>Swipe</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
