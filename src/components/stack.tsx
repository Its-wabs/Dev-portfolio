"use client";
import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Stack = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mainStack = [
    { name: "Next.Js", category: "Framework" },
    { name: "React", category: "Library" },
    { name: "TypeScript", category: "Language" },
    { name: "Prisma", category: "ORM" },
    { name: "Supabase", category: "Backend/DB" },
    { name: "GSAP", category: "Animation" },
    { name: "Tailwind", category: "Styling" },
  ];

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial Reveal 
    tl.fromTo(".stack-title", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".stack-item", 
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.4"
    );

    //  Experience Indicator 
    tl.to(".experience-indicator", { opacity: 1, duration: 0.5 }, "-=0.2")
      .to(".experience-indicator__node", { opacity: 1, duration: 0.2 }, "<")
      .to(".experience-indicator__curve", { 
        strokeDashoffset: 0, 
        duration: 1.5, 
        ease: "power2.inOut" 
      }, "<")
      .to(".experience-indicator__node", { 
        left: "100%", 
        duration: 1.5, 
        ease: "power2.inOut" 
      }, "<");

    //   Reduce contrast and "Standby" state
    tl.to(".experience-indicator", {
      opacity: 0.5, 
      duration: 1,
      ease: "power2.out"
    });

    //THE IDLE PULSE - Infinite but very subtle
    gsap.to(".experience-indicator__node", {
      scale: 1.3,
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section ref={ref} className="absolute inset-0 h-full w-full flex items-center justify-center">
      <div ref={containerRef} className="max-w-5xl w-full mx-auto px-6">
        
        {/* Header */}
        <div className="mt-12 mb-8 text-left">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[#63938C] font-mono text-sm tracking-tighter">01 //</span>
            <p className="stack-title text-[#000] text-4xl md:text-5xl uppercase font-black tracking-tight">
              Technical Stack
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainStack.map((item, index) => (
            <div key={index} className="stack-item group relative p-6 border border-black/5 bg-white/40 backdrop-blur-sm hover:bg-black transition-colors duration-300">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/20 group-hover:border-white/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/20 group-hover:border-white/40" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#63938C] mb-1">{item.category}</p>
              <p className="text-xl font-bold text-black group-hover:text-white transition-colors duration-300">{item.name}</p>
              <span className="absolute top-4 right-4 text-[9px] font-mono text-black/20 group-hover:text-white/20">INIT_SYS_0{index + 1}</span>
            </div>
          ))}
          <div className="stack-item hidden lg:flex border border-dashed border-black/10 items-center justify-center p-6">
            <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.3em]">Scanning...</span>
          </div>
        </div>

        {/* Indicator */}
        <div className="experience-indicator">
          <span className="experience-indicator__label">System_Experience_Active</span>
          <div className="experience-indicator__icon">
            <svg viewBox="0 0 50 20" fill="none" className="experience-indicator__svg">
              <path d="M0 10 L50 10" className="experience-indicator__bg-line" strokeDasharray="2 2" />
              <path d="M0 10 C 15 10, 35 10, 50 10" className="experience-indicator__curve" />
            </svg>
            <div className="experience-indicator__node" />
          </div>
        </div>
      </div>
    </section>
  );
});

Stack.displayName = "Stack";
export default Stack;