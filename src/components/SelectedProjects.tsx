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
    img1: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
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
    img1: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1506812584065-22d713c825a0?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    let mm = gsap.matchMedia();

    // Logo Exit Animation
    const logoWrapper = document.querySelector("#global-logo-wrapper");
    let logoExitAnim: gsap.core.Tween | undefined;
    if (logoWrapper) {
      logoExitAnim = gsap.to(logoWrapper, {
        scrollTrigger: {
          trigger: "#selected-works-buffer",
          start: "top center",
          toggleActions: "play none none reverse",
        },
        xPercent: -150,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }

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

      const groups = gsap.utils.toArray(".img-group");
      const texts = gsap.utils.toArray(".text-project");

      // Setup Initial States
      groups.forEach((group: any, i: number) => {
        const leftCard = group.querySelector(".img-card-left");
        const rightCard = group.querySelector(".img-card-right");
        const leftImg = group.querySelector(".inner-img-left");
        const rightImg = group.querySelector(".inner-img-right");

        const title = texts[i].querySelector(".text-title");
        const details = texts[i].querySelector(".text-details");

        const isEven = i % 2 === 0;
        
        // Hide all except the first one. Let them overlap using zIndex.
        // Remove clipPath. Images will be hidden by yPercent: 100 pushing them out of their overflow-hidden cards.
        gsap.set(group, { 
          zIndex: i,
          opacity: 1 
        });
        
        // Ensure text wrapper is visible, we animate the children
        gsap.set(texts[i] as Element, { opacity: 1, pointerEvents: i === 0 ? 'auto' : 'none' });
        
        gsap.set(title, { 
          yPercent: i === 0 ? 0 : 100, 
          autoAlpha: i === 0 ? 1 : 0 
        });
        
        gsap.set(details, { 
          autoAlpha: i === 0 ? 1 : 0 
        });
        
        // Even indices start with Left big, Right small
        // Odd indices start with Left small, Right big
        gsap.set(leftCard, { width: isEven ? "65%" : "35%" });
        gsap.set(rightCard, { width: isEven ? "35%" : "65%" });
        
        // Big cards have scale 1.0, small cards have scale 1.15
        gsap.set(leftImg, { scale: isEven ? 1.0 : 1.15, yPercent: i === 0 ? 0 : 100 });
        gsap.set(rightImg, { scale: isEven ? 1.15 : 1.0, yPercent: i === 0 ? 0 : 100 });
      });

      // Sequence the transitions
      for (let i = 0; i < projects.length - 1; i++) {
        const currentGroup = groups[i] as Element;
        const nextGroup = groups[i + 1] as Element;
        const currentText = texts[i] as Element;
        const nextText = texts[i + 1] as Element;

        const leftCard = currentGroup.querySelector(".img-card-left");
        const rightCard = currentGroup.querySelector(".img-card-right");
        const leftImg = currentGroup.querySelector(".inner-img-left");
        const rightImg = currentGroup.querySelector(".inner-img-right");
        
        const nextLeftImg = nextGroup.querySelector(".inner-img-left");
        const nextRightImg = nextGroup.querySelector(".inner-img-right");
        
        const currentTitle = currentText.querySelector(".text-title");
        const nextTitle = nextText.querySelector(".text-title");
        const currentDetails = currentText.querySelector(".text-details");
        const nextDetails = nextText.querySelector(".text-details");

        const isEven = i % 2 === 0;
        const targetLeftWidth = isEven ? "35%" : "65%";
        const targetRightWidth = isEven ? "65%" : "35%";
        const targetLeftScale = isEven ? 1.15 : 1.0;
        const targetRightScale = isEven ? 1.0 : 1.15;

        const startTime = i * 2; // Sequence blocks of 2 timeline units
        
        // 1. Animate Widths & Inner Scales (The Flexing Effect)
        tl.to(leftCard, { width: targetLeftWidth, duration: 1, ease: "power2.inOut" }, startTime)
          .to(rightCard, { width: targetRightWidth, duration: 1, ease: "power2.inOut" }, startTime)
          .to(leftImg, { scale: targetLeftScale, duration: 1, ease: "power2.inOut" }, startTime)
          .to(rightImg, { scale: targetRightScale, duration: 1, ease: "power2.inOut" }, startTime);
          
        // 2. Slide Up the Next Project (Both Text and Images)
        const slideTime = startTime + 1.2;
        
        // Text Animation: Title slides up, Details crossfade
        tl.to(currentTitle, { yPercent: -100, autoAlpha: 0, duration: 1, ease: "power2.inOut" }, slideTime)
          .to(nextTitle, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" }, slideTime);
          
        tl.to(currentDetails, { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, slideTime)
          .to(nextDetails, { autoAlpha: 1, duration: 1, ease: "power2.inOut" }, slideTime);
          
        // Switch pointer events manually so the hidden text can't be clicked
        tl.set(currentText, { pointerEvents: "none" }, slideTime)
          .set(nextText, { pointerEvents: "auto" }, slideTime);
          
        // Image Reveal Animation (yPercent slide from 100 to 0)
        tl.to([nextLeftImg, nextRightImg],
            { yPercent: 0, duration: 1, ease: "power2.inOut" },
            slideTime
        );
        
        // Subtle push up on the current images being covered
        tl.to([leftImg, rightImg],
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
      if (logoExitAnim) {
        logoExitAnim.kill();
      }
    };
  }, []);

  return (
    <div className="bg-[#F5F2EB] text-[#141414] w-full">
      
      {/* The Breathing Buffer - A stark palette cleanser after Kunsthaus */}
      <div id="selected-works-buffer" className="h-[40vh] md:h-[50vh] flex items-center justify-center border-b border-[#141414]/10">
        <h2 className="text-sm uppercase tracking-widest text-[#141414]/70">Selected Works</h2>
      </div>

      {/* The Pinned Interactive Section */}
      <section ref={sectionRef} id="projects" className="h-screen w-full flex flex-col relative overflow-hidden bg-[#F5F2EB]">
        
        {/* Top Half: Editorial Typography */}
        <div className="flex-1 relative w-full pt-16 md:pt-24 h-1/2 overflow-hidden">
          {projects.map((project, index) => (
            <div 
              key={`text-${project.id}`} 
              className="text-project absolute inset-0 px-6 md:px-12 lg:px-24 pt-16 md:pt-24 grid grid-cols-1 md:grid-cols-12 gap-8" 
              // Inline styles removed. GSAP handles visibility and transforms now.
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
        <div className="flex-1 w-full pb-12 h-1/2 relative">
          {projects.map((project, index) => (
            <div 
              key={`imgGroup-${project.id}`} 
              className="img-group absolute inset-x-6 md:inset-x-12 lg:inset-x-24 bottom-12 top-0 flex gap-4" 
              style={{ opacity: index === 0 ? 1 : 0, pointerEvents: index === 0 ? 'auto' : 'none' }}
            >
              {/* Left Image Card */}
              <div 
                className="img-card-left relative h-full rounded-lg overflow-hidden will-change-[width] border border-[#141414]/5" 
                style={{ width: "50%", transform: "translateZ(0)" }}
              >
                <Image 
                  src={project.img1} 
                  alt={`${project.name} Image 1`} 
                  fill 
                  className="inner-img-left object-cover will-change-transform" 
                  style={{ transformOrigin: "center" }}
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>

              {/* Right Image Card */}
              <div 
                className="img-card-right relative h-full rounded-lg overflow-hidden will-change-[width] border border-[#141414]/5" 
                style={{ width: "50%", transform: "translateZ(0)" }}
              >
                <Image 
                  src={project.img2} 
                  alt={`${project.name} Image 2`} 
                  fill 
                  className="inner-img-right object-cover will-change-transform" 
                  style={{ transformOrigin: "center" }}
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            </div>
          ))}
        </div>
        
      </section>
    </div>
  );
}
