"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BackToLanding from "./backtolanding";
import VisualRecords from "./visualarchive";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  
  //  Exit Animation
  const handleExit = () => {
    if (!contentRef.current) return;
    
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95, // Changed from 0.9 to 0.95 for subtler exit
      filter: "blur(10px)",
      duration: 0.6,
      ease: "power4.in",
      onComplete: onClose
    });
  };

  //  Entrance Animation
  useGSAP(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { 
          opacity: 0, 
          scale: 0.95, 
          filter: "blur(10px)" 
        }, 
        { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 1, 
          ease: "power4.out" 
        }
      );
    }
  }, [isOpen]);

  const principles = [
    { title: "Systemic Harmony", desc: "Code should be as elegant as the UI it powers." },
    { title: "Human-Centric Logic", desc: "User experience dictates the architecture, not the other way around." },
    { title: "Scalable Craft", desc: "Building for 100 users with the precision required for 10 million." },
    { title: "Iterative Polish", desc: "The last 10% of detail provides 90% of the emotional impact." },
  ];

  const domains = [
    {
      label: "Visual Grammar",
      title: "Illustration & Concept Art",
      influence: "Visual hierarchy, composition, restraint",
      output: "Clean UI structure, spacing discipline, animation timing"
    },
    {
      label: "Logic Mapping",
      title: "Narrative & Worldbuilding",
      influence: "Systems thinking, cause → effect loops",
      output: "Feature planning, state modeling, UX flows"
    },
    {
      label: "Temporal Design",
      title: "Motion & Interaction",
      influence: "Temporal logic, sequencing, feedback loops",
      output: "Scroll orchestration, performance-aware animation"
    },
    {
      label: "Product Strategy",
      title: "Micro-SaaS Exploration",
      influence: "Constraint-driven problem solving",
      output: "MVP scoping, tradeoff decisions, architecture pragmatism"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-modal text-[#0a0a0a] isolate">
        <BackToLanding onClose={handleExit} />
        
        {/* Scrollable Content Wrapper */}
        <div 
            ref={contentRef} 
            className="h-full w-full overflow-y-auto font-sans selection:bg-[#63938C] selection:text-white"
            style={{ overscrollBehavior: "contain" }}
        >
            {/* CHANGED: Added tighter padding on small screens, increased max-width */}
            <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-16 md:py-24 lg:py-32">
                
                {/* HEADER - COMPLETELY REWORKED FOR MOBILE */}
                <header className="flex flex-col lg:flex-row justify-between items-start border-b border-black pb-8 md:pb-12 mb-12 md:mb-20 gap-6 md:gap-0">
                    <div className="max-w-2xl lg:max-w-3xl">
                        <span className="font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] md:tracking-[0.5em] uppercase text-black/40 mb-2 md:mb-4 block">
                            File_002 // Deep_Dive
                        </span>
                        {/* CHANGED: Drastically reduced text size on mobile, better line handling */}
                        <h1 className="text-[2.5rem] xs:text-[3rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
                            Full Stack <br className="hidden sm:block" />
                            <span className="text-[#63938C]">Engineer</span> 
                            <br className="hidden xs:block" /> & Artist.
                        </h1>
                    </div>
                    {/* CHANGED: Better spacing and text sizing for the right column */}
                    <div className="mt-4 lg:mt-0 lg:text-right font-mono text-[0.7rem] sm:text-[0.8rem] md:text-[11px] uppercase tracking-widest leading-relaxed space-y-1">
                        <p>Based in Algeria</p>
                        <p>Status: Available for Craft</p>
                        <p className="mt-3 md:mt-4 text-[#63938C]">2026_edition</p>
                    </div>
                </header>

                {/* BIO SECTION - Improved grid for mobile */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-32">
                    <div className="md:col-span-5 lg:col-span-4 italic font-serif text-xl sm:text-2xl md:text-3xl border-l-2 border-[#63938C] pl-4 md:pl-6 leading-snug md:leading-tight">
                        "I found out that App systems and blank canvases share the same DNA: they both require a vision for order."
                    </div>
                    <div className="md:col-span-7 lg:col-span-8 text-base sm:text-lg md:text-xl leading-relaxed text-black/80 space-y-4 md:space-y-6">
                        <p>
                            My journey started with a pencil, not a keyboard. The world of illustration taught me how to see light and color interacts with surfaces, and how composition guides the eye. 
                        </p>
                        <p>
                            Transitioning into engineering wasn't a pivot, but an expansion. Now, I use TypeScript and React as my brushes to build high-performance systems that don't just work, but feel right. I treat every project like an art piece: clean, optimized, and built to last.
                        </p>
                    </div>
                </section>

          {/* PRINCIPLES */}
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold">Execution_Principles</h2>
              <div className="h-[1px] flex-grow bg-black/10" />
            </div>
            {/* Added auto-rows to ensure equal height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-black/10 border border-black/10">
              {principles.map((p, i) => (
                <div key={i} className="bg-[#ebe5d0] p-8 lg:p-10 hover:bg-white transition-colors duration-500 group flex flex-col h-full">
                  <span className="font-mono text-[10px] text-[#63938C] block mb-6">0{i+1} //</span>
                  <h3 className="text-xl font-bold uppercase mb-4">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-black/60 group-hover:text-black transition-colors mt-auto">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SYNTHESIZED DOMAINS */}
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold">Synthesized Domains</h2>
              <div className="h-[1px] flex-grow bg-black/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
              {domains.map((domain, i) => (
                <div key={i} className="bg-[#f4f1e6] p-10 lg:p-14 flex flex-col justify-between group hover:bg-white transition-colors duration-500">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#63938C] mb-6 block">
                      Domain_0{i+1} // {domain.label}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-8 leading-none">
                      {domain.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-start">
                      <span className="font-mono text-[9px] text-black/30 mt-1 min-w-[80px]">INFLUENCE</span>
                      <p className="text-sm text-black/70 leading-relaxed uppercase tracking-tight font-medium">
                        {domain.influence}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-start border-t border-black/5 pt-4">
                      <span className="font-mono text-[9px] text-[#63938C] mt-1 min-w-[80px]">ENG_VALUE</span>
                      <p className="text-sm text-black/90 leading-relaxed uppercase tracking-tight font-bold">
                        {domain.output}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ART */}
          <section className="mb-32">
            <VisualRecords/>
          </section>

          {/* FOOTER */}
          <footer className="border-t-2 border-black pt-12 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Let's have a chat</h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8">
                Available for Freelance & Partnerships
              </p>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
                <a href="https://x.com/its_wabs" target="empty" className="hover:text-[#63938C] transition-colors underline underline-offset-4">Email</a>
                <a href="https://www.linkedin.com/in/itswabs" target="empty" className="hover:text-[#63938C] transition-colors underline underline-offset-4">LinkedIn</a>
                <a href="https://x.com/its_wabs" target="empty" className="hover:text-[#63938C] transition-colors underline underline-offset-4">X / Twitter</a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl md:text-8xl font-black opacity-5 select-none leading-none">WABS</div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-black/20 mt-4">
                Built on Creativity & Pure Logic // 2026 ©
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default AboutModal;