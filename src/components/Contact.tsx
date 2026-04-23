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
    <footer ref={sectionRef} id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-stone">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
        
        <div ref={contentRef} className="flex flex-col gap-16 max-w-lg">
          <div>
            <h2 className="text-3xl md:text-5xl font-light mb-8">Start a Conversation.</h2>
            <p className="font-light text-stone/70 mb-8 max-w-sm">
              We are currently accepting commissions for cultural, institutional, and residential projects commencing late 2026.
            </p>
            <a 
              href="mailto:inquiries@studioarchitectura.com" 
              className="inline-block border-b border-stone/30 pb-1 hover:border-stone transition-colors text-sm uppercase tracking-widest"
            >
              inquiries@studioarchitectura.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-4">Copenhagen</h3>
              <address className="not-italic font-light text-sm text-stone/80 leading-relaxed">
                Strandgade 27B<br />
                1401 Copenhagen K<br />
                Denmark
              </address>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone/50 mb-4">London</h3>
              <address className="not-italic font-light text-sm text-stone/80 leading-relaxed">
                45 Columbia Road<br />
                London E2 7RG<br />
                United Kingdom
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xs uppercase tracking-widest text-stone/50 md:text-right">
          <a href="#" className="hover:text-stone transition-colors">Instagram</a>
          <a href="#" className="hover:text-stone transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-stone transition-colors">Journal</a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-stone/10 flex flex-col md:flex-row justify-between items-center text-xs text-stone/40">
        <span>© {new Date().getFullYear()} Studio Architectura</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-stone transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
