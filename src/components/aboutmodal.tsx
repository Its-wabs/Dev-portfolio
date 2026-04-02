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
  const containerRef = useRef<HTMLDivElement>(null); 

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
  
  const handleExit = () => {
    if (!contentRef.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20, 
        duration: 0.3, 
        ease: "power2.in",
        onComplete: onClose
      });
    } else {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95, 
        filter: "blur(10px)",
        duration: 0.6,
        ease: "power4.in",
        onComplete: onClose
      });
    }
  };

  useGSAP(() => {
    if (isOpen && contentRef.current) {
      const isMobile = window.innerWidth < 768;
      gsap.set(contentRef.current, { scrollTop: 0 });
      gsap.fromTo(contentRef.current, 
        { 
          opacity: 0, 
          y: isMobile ? 50 : 0, 
          scale: isMobile ? 1 : 0.95, 
          filter: isMobile ? "none" : "blur(10px)" 
        }, 
        { 
          opacity: 1, 
          y: 0,
          scale: 1, 
          filter: "blur(0px)",
          duration: isMobile ? 0.5 : 1, 
          ease: "power4.out" 
        }
      );
    }
  }, [isOpen]);

  // CALCULATED CHAOS
  const principles = [
    { title: "The Artist's Constraint", desc: "I still sketch layouts on paper before touching Figma. My art background is always there guiding me through out the decisions I make." },
    { title: "Plan Everything, Then Improvise", desc: "I spend days on Figma, then change 40% while coding. Structure enables chaos, not prevents it." },
    { title: "The Humility Device", desc: "Smooth on MacBook ≠ smooth for users. I keep an old Android around to kill my ego. Empathy through testing, not assumption." },
    { title: "Steal Like an Artist, Build Like an Engineer", desc: "I study habito studio for weeks, then build my own version with different tech. Inspiration ≠ imitation." },
  ];

  // STRUCTURED EXPRESSION
  const domains = [
    {
      label: "The Obsession",
      title: "Architecture Paranoia",
      influence: "I spend 2 days on folder architecture before writing features. My brain won't let me build on bad foundations.",
      output: "Projects that scale without turning into spaghetti. Clean imports, reusable scenes, no props drilling through 4 components."
    },
    {
      label: "The Artist Phase",
      title: "Composition Over Components",
      influence: "I see layouts as drawings. Applying illustration principles so color, typography and balance are properly distributed across UI components.",
      output: "Interfaces that feel intuitive, human, and visually appealing."
    },
    {
      label: "The Restraint",
      title: "Animation Graveyard",
      influence: "GSAP makes everything possible. That's dangerous. I start with 15 animations. I cut it down to 3. I delete more than I keep. Constraint keeps me from over-animating every hover state.",
      output: "Interfaces that move with purpose. Every animation earns its place. A good balance between choreography and clarity."
    },
    {
      label: "The System",
      title: "Pattern Over Repetition",
      influence: "useImperativeHandle > props drilling. Forward refs > className chaos. Every component is built to be reused. Button system, not 12 different buttons.",
      output: "Add features without breaking design. New pages use existing patterns, so consistency becomes effortless, not enforced."
    }
  ];

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-modal bg-[#dac26d] text-[#0a0a0a] isolate">
        <BackToLanding onClose={handleExit} />
        
        <div 
            ref={contentRef} 
            className="h-full w-full overflow-y-auto font-sans selection:bg-[#63938C] selection:text-white will-change-transform"
            style={{ overscrollBehavior: "contain" }}
        >
            <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-16 md:py-24 lg:py-32">
                
                <header className="flex flex-col lg:flex-row justify-between items-start border-b border-black pb-8 md:pb-12 mb-12 md:mb-20 gap-6 md:gap-0">
                    <div className="max-w-2xl lg:max-w-3xl">
                        <span className="font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] md:tracking-[0.5em] uppercase text-black/40 mb-2 md:mb-4 block">
                            File_002 // Deep_Dive
                        </span>
                        
                        <h1 className="text-[2.5rem] xs:text-[3rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
                            Design <br className="hidden sm:block" />
                            <span className="text-[#63938C]">Engineer</span> 
                            <br className="hidden xs:block" /> & Artist.
                        </h1>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:text-right font-mono text-[0.7rem] sm:text-[0.8rem] md:text-[11px] uppercase tracking-widest leading-relaxed space-y-1">
                        <p>Based in Algeria</p>
                        <p>Status: Available for Work</p>
                        <p className="mt-3 md:mt-4 text-[#63938C]">2026_edition</p>
                    </div>
                </header>

                <section className="flex mb-20 md:mb-32">
                    <div className="md:col-span-7 lg:col-span-8 text-extrabold sm:text-lg md:text-xl leading-relaxed text-black/80 space-y-4 md:space-y-6">
                        <p>
                            I don’t separate aesthetics from engineering. To me, they’ve always been the same discipline. My journey started with a pencil, illustration taught me how light and color guide the eye.
                        </p>
                        <p>
                            Now, I apply that same artistic precision to code. I build high-performance systems that don’t just function but also feel right.
                        </p>
                    </div>
                </section>

                {/* PRINCIPLES SECTION */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold">Calculated_Chaos</h2>
                    <div className="h-[1px] flex-grow bg-black/10" />
                    </div>
                    
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
                    <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold">Structured_Expression</h2>
                    <div className="h-[1px] flex-grow bg-black/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
                    {domains.map((domain, i) => (
                        <div key={i} className="bg-[#f4f1e6] p-10 lg:p-14 flex flex-col justify-between group hover:bg-white transition-colors duration-500">
                        <div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#63938C] mb-6 block">
                            Process_0{i+1} // {domain.label}
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-8 leading-none">
                            {domain.title}
                            </h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-start">
                            <span className="font-mono text-[9px] text-black/30 mt-1 min-w-[80px]">STRATEGY</span>
                            <p className="text-sm text-black/70 leading-relaxed uppercase tracking-tight font-medium">
                                {domain.influence}
                            </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-start border-t border-black/5 pt-4">
                            <span className="font-mono text-[9px] text-[#63938C] mt-1 min-w-[80px]">OUTCOME</span>
                            <p className="text-sm text-black/90 leading-relaxed uppercase tracking-tight font-bold">
                                {domain.output}
                            </p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </section>

                <section className="mb-32">
                    <VisualRecords/>
                </section>

                <footer className="border-t-2 border-black pt-12 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Let's have a chat</h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8">
                        Available for Freelance & Partnerships
                    </p>
                    <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
                        <a href="mailto:your.email@example.com?subject=Portfolio Inquiry" className="hover:text-[#63938C] transition-colors underline underline-offset-4">Email</a>
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