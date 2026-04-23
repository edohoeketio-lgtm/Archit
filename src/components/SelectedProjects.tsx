"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "La Roche-en-Ardenne",
    description: "A brutalist intervention within a bucolic valley. The structure anchors itself into the bedrock, using monolithic local stone and raw concrete to create a dialogue between medieval history and unapologetic modernism. Light is weaponized to carve spatial hierarchies across the riverfront.",
    img1: "/media/roshe/behance_ref_01.jpg",
    img2: "/media/roshe/behance_ref_13.jpg",
  },
  {
    id: 2,
    name: "Bertogne",
    description: "Suspended between rolling topography and dense canopy, this residential sequence explores the threshold of enclosure. Extensive glazing dissolves the boundary between interior sanctuaries and the wild Ardennes, framed by oxidized steel structural fins that will age alongside the forest.",
    img1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Oculus Pavilion",
    description: "A subterranean exhibition space defined by a single, monumental concrete oculus. It fractures the earth to frame the sky, grounding visitors in deep, earth-cast brutalism while preserving the natural topography perfectly untouched above.",
    img1: "/media/oculus/img1.png",
    img2: "/media/oculus/img2.png",
  }
];

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

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
          end: `+=${projects.length * 150}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      const masterLeft = section.querySelector(".master-card-left");
      const masterRight = section.querySelector(".master-card-right");
      const leftWrappers = gsap.utils.toArray(".left-image-wrapper");
      const rightWrappers = gsap.utils.toArray(".right-image-wrapper");
      const texts = gsap.utils.toArray(".text-project");

      // Set initial states
      gsap.set(masterLeft, { width: "65%" });
      gsap.set(masterRight, { width: "35%" });

      leftWrappers.forEach((wrapper: any, i: number) => {
        gsap.set(wrapper, {
          zIndex: i,
          yPercent: i === 0 ? 0 : 100 // only first image is visible initially
        });
      });

      rightWrappers.forEach((wrapper: any, i: number) => {
        gsap.set(wrapper, {
          zIndex: i,
          yPercent: i === 0 ? 0 : 100
        });
      });

      texts.forEach((text: any, i: number) => {
        const title = text.querySelector(".text-title");
        const details = text.querySelector(".text-details");
        
        gsap.set(text, { opacity: 1, pointerEvents: i === 0 ? 'auto' : 'none' });
        
        gsap.set(title, { 
          yPercent: i === 0 ? 0 : 100, 
          autoAlpha: i === 0 ? 1 : 0 
        });
        
        gsap.set(details, { 
          autoAlpha: i === 0 ? 1 : 0 
        });
      });

      // Sequence the transitions
      for (let i = 0; i < projects.length - 1; i++) {
        const isEven = i % 2 === 0;
        const targetLeftWidth = isEven ? "35%" : "65%";
        const targetRightWidth = isEven ? "65%" : "35%";
        
        const startTime = i * 2; // Sequence blocks of 2 timeline units
        
        // 1. Flex master cards
        tl.to(masterLeft, { width: targetLeftWidth, duration: 1, ease: "power2.inOut" }, startTime)
          .to(masterRight, { width: targetRightWidth, duration: 1, ease: "power2.inOut" }, startTime);

        // Optional: Animate scaling of images to match the container flex feel
        const leftImgs = section.querySelectorAll(`.left-image-wrapper img`);
        const rightImgs = section.querySelectorAll(`.right-image-wrapper img`);
        
        tl.to(leftImgs, { scale: isEven ? 1.15 : 1.0, duration: 1, ease: "power2.inOut" }, startTime)
          .to(rightImgs, { scale: isEven ? 1.0 : 1.15, duration: 1, ease: "power2.inOut" }, startTime);
          
        // 2. Slide Up the Next Project
        const slideTime = startTime + 1.2;
        
        const currentText = texts[i] as Element;
        const nextText = texts[i + 1] as Element;
        const currentTitle = currentText.querySelector(".text-title");
        const nextTitle = nextText.querySelector(".text-title");
        const currentDetails = currentText.querySelector(".text-details");
        const nextDetails = nextText.querySelector(".text-details");

        // Text Animation: Title slides up, Details crossfade
        // Using -50 instead of -100 to prevent sharp top clipping
        tl.to(currentTitle, { yPercent: -50, autoAlpha: 0, duration: 1, ease: "power2.inOut" }, slideTime)
          .to(nextTitle, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" }, slideTime);
          
        tl.to(currentDetails, { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, slideTime)
          .to(nextDetails, { autoAlpha: 1, duration: 1, ease: "power2.inOut" }, slideTime);
          
        // Switch pointer events manually so the hidden text can't be clicked
        tl.set(currentText, { pointerEvents: "none" }, slideTime)
          .set(nextText, { pointerEvents: "auto" }, slideTime);
          
        // Image Reveal Animation
        const currentLeftWrapper = leftWrappers[i];
        const currentRightWrapper = rightWrappers[i];
        const nextLeftWrapper = leftWrappers[i + 1];
        const nextRightWrapper = rightWrappers[i + 1];

        // The next image slides UP from 100 to 0 inside the master card
        tl.to([nextLeftWrapper, nextRightWrapper],
            { yPercent: 0, duration: 1, ease: "power2.inOut" },
            slideTime
        );
        
        // Parallax push up on the current images being covered
        tl.to([currentLeftWrapper, currentRightWrapper],
            { yPercent: -20, duration: 1, ease: "power2.inOut" },
            slideTime
        );
      }

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="bg-[#F5F2EB] text-[#141414] w-full">
      
      {/* The Breathing Buffer - A stark palette cleanser after Kunsthaus */}
      <div id="selected-works-buffer" className="h-[40vh] md:h-[50vh] flex items-center justify-center border-b border-[#141414]/10">
        <h2 className="text-sm uppercase tracking-widest text-[#141414]/70">Selected Works</h2>
      </div>

      {/* The Pinned Interactive Section (Desktop Only) */}
      <section ref={sectionRef} id="projects" className="h-screen w-full hidden md:flex flex-col relative overflow-hidden bg-[#F5F2EB]">
        
        {/* Top Half: Editorial Typography */}
        <div className="flex-1 relative w-full pt-16 md:pt-24 h-1/2 overflow-hidden">
          {projects.map((project, index) => (
            <div 
              key={`text-${project.id}`} 
              className="text-project absolute inset-0 px-6 md:px-12 lg:px-24 pt-16 md:pt-24 grid grid-cols-1 md:grid-cols-12 gap-8" 
            >
              <div className="text-title md:col-span-7">
                <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] text-[#141414]">{project.name}</h3>
              </div>
              <div className="text-details md:col-span-5 md:pl-12 flex flex-col justify-start">
                <p className="text-lg md:text-xl font-light text-[#141414]/70 leading-relaxed mb-8 max-w-lg">
                  {project.description}
                </p>
                <button className="group flex items-center gap-3 text-sm uppercase tracking-widest font-semibold text-[#141414] hover:text-[#0A3B24] transition-colors self-start pb-2 border-b-2 border-[#141414] hover:border-[#0A3B24]">
                  See available projects 
                  <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Half: Flex Cards */}
        <div className="flex-1 w-full pb-12 h-1/2 relative overflow-hidden">
          <div className="absolute inset-x-6 md:inset-x-12 lg:inset-x-24 bottom-12 top-0 flex gap-4">
            
            {/* Master Left Image Card */}
            <div className="master-card-left relative h-full rounded-lg overflow-hidden will-change-[width] border border-[#141414]/5" style={{ transform: "translateZ(0)" }}>
              {projects.map((project, index) => (
                <div key={`left-img-${project.id}`} className="left-image-wrapper absolute inset-0 overflow-hidden will-change-transform">
                  <Image 
                    src={project.img1} 
                    alt={`${project.name} Image 1`} 
                    fill 
                    className="object-cover will-change-transform" 
                    style={{ transformOrigin: "center" }}
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
              ))}
            </div>

            {/* Master Right Image Card */}
            <div className="master-card-right relative h-full rounded-lg overflow-hidden will-change-[width] border border-[#141414]/5" style={{ transform: "translateZ(0)" }}>
              {projects.map((project, index) => (
                <div key={`right-img-${project.id}`} className="right-image-wrapper absolute inset-0 overflow-hidden will-change-transform">
                  <Image 
                    src={project.img2} 
                    alt={`${project.name} Image 2`} 
                    fill 
                    className="object-cover will-change-transform" 
                    style={{ transformOrigin: "center" }}
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
        
      </section>

      {/* Mobile Native Layout (Vertical Stack) */}
      <section className="flex flex-col md:hidden w-full bg-[#F5F2EB] px-6 py-12 gap-16">
        {projects.map((project, index) => (
          <div key={`mobile-${project.id}`} className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-[#141414]/5">
              {/* Swipe Hint */}
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-1 pointer-events-none z-10">
                <span>Swipe</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Swipeable Image Container */}
              <div 
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth relative z-0 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="w-full h-full flex-none snap-center relative">
                  <Image 
                    src={project.img1} 
                    alt={`${project.name} Image 1`} 
                    fill 
                    className="object-cover" 
                    sizes="100vw"
                  />
                </div>
                {project.img2 && (
                  <div className="w-full h-full flex-none snap-center relative">
                    <Image 
                      src={project.img2} 
                      alt={`${project.name} Image 2`} 
                      fill 
                      className="object-cover" 
                      sizes="100vw"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <h3 className="text-5xl font-medium tracking-tighter leading-[0.9] text-[#141414]">{project.name}</h3>
              <p className="text-lg font-light text-[#141414]/70 leading-relaxed mb-2">
                {project.description}
              </p>
              <button className="group flex items-center gap-3 text-sm uppercase tracking-widest font-semibold text-[#141414] hover:text-[#0A3B24] transition-colors self-start pb-2 border-b-2 border-[#141414] hover:border-[#0A3B24]">
                See available projects 
                <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
