"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-stone">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Massive Statement Heading */}
        <div ref={contentRef} className="w-full border-b border-stone/10 pb-12 md:pb-24">
          <h2 className="text-[12vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.9] tracking-tighter font-medium text-stone">
            Start a Conversation.
          </h2>
        </div>

        {/* 12-Column Grid for Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Column 1: Availability */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-6">Availability</h3>
            <p className="font-light text-stone/70 max-w-xs leading-relaxed">
              We are currently accepting commissions for cultural, institutional, and residential projects commencing late 2026.
            </p>
          </div>

          {/* Column 2: Locations */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-6">Berlin</h3>
              <address className="not-italic font-light text-sm text-stone/80 leading-relaxed">
                Auguststraße 43<br />
                10119 Berlin<br />
                Germany
              </address>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-6">Milan</h3>
              <address className="not-italic font-light text-sm text-stone/80 leading-relaxed">
                Via Tortona 21<br />
                20144 Milan MI<br />
                Italy
              </address>
            </div>
          </div>

          {/* Column 3: Inquiries & Socials */}
          <div className="md:col-span-3 flex flex-col gap-12">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-6">Inquiries</h3>
              <a 
                href="mailto:inquiries@theyard.studio" 
                className="inline-block border-b border-stone/30 pb-1 hover:border-stone transition-colors text-sm font-light text-stone"
              >
                inquiries@theyard.studio
              </a>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-6">Network</h3>
              <div className="flex flex-col gap-3 text-sm font-light text-stone/80">
                <a href="#" className="hover:text-stone transition-colors w-fit">Instagram</a>
                <a href="#" className="hover:text-stone transition-colors w-fit">LinkedIn</a>
                <a href="#" className="hover:text-stone transition-colors w-fit">Journal</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone/40">
          <span>© {new Date().getFullYear()} The Yard Studio</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
