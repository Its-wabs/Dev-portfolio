"use client";
import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Stack = forwardRef<HTMLDivElement>((_props, ref) => {
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

    tl.fromTo(".stack-title", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".stack-item", 
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.4"
    );

    tl.to(".experience-indicator", { opacity: 1, duration: 0.5 }, "-=0.2")
      .to(".experience-indicator__node", { opacity: 1, duration: 0.2 }, "<")
      .to(".experience-indicator__curve", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "<")
      .to(".experience-indicator__node", { left: "100%", duration: 1.5, ease: "power2.inOut" }, "<");

    tl.to(".experience-indicator", { opacity: 0.5, duration: 1, ease: "power2.out" });

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
    <section ref={ref} className="absolute inset-0 h-full w-full flex flex-col justify-center">
      {/* Main Container adjustments:
          - Added 'pt-40' (top padding) on mobile to clear the "Enable Physics" button (top-24).
          - 'pb-10' to ensure the indicator isn't cut off at the bottom.
      */}
      <div ref={containerRef} className="max-w-5xl w-full mx-auto px-6 pt-40 md:pt-12 pb-10">
        
        {/* Header */}
        <div className="mb-6 md:mb-8 text-left">
          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <span className="text-[#63938C] font-mono text-xs md:text-sm tracking-tighter">01 //</span>
            <p className="stack-title text-[#000] text-2xl md:text-5xl uppercase font-black tracking-tight leading-none">
              Technical Stack
            </p>
          </div>
        </div>

        {/* Grid 
            - Changed to 'grid-cols-2' on mobile for an editorial, compact feel.
            - Adjusted gap for tighter mobile look.
        */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {mainStack.map((item, index) => (
            <div 
              key={index} 
              className="stack-item group relative p-4 md:p-6 border border-black/5 bg-white/40 backdrop-blur-sm hover:bg-black transition-colors duration-300 min-h-[100px] md:min-h-[140px] flex flex-col justify-end"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/20 group-hover:border-white/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/20 group-hover:border-white/40" />
              
              <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-[#63938C] mb-1">
                {item.category}
              </p>
              <p className="text-sm md:text-xl font-bold text-black group-hover:text-white transition-colors duration-300 leading-tight">
                {item.name}
              </p>
              
              <span className="absolute top-3 right-3 md:top-4 md:right-4 text-[7px] md:text-[9px] font-mono text-black/20 group-hover:text-white/20">
                INIT_SYS_0{index + 1}
              </span>
            </div>
          ))}

          {/* Hidden on smallest phones to prevent layout overflow, shown on tablets up */}
          <div className="stack-item hidden sm:flex border border-dashed border-black/10 items-center justify-center p-4">
            <span className="text-[8px] md:text-[10px] font-mono text-black/30 uppercase tracking-[0.3em]">Scanning...</span>
          </div>
        </div>

        {/* Indicator 
            - Added 'mt-8' to push it away from the grid.
        */}
        <div className="experience-indicator mt-8 md:mt-12">
          <span className="experience-indicator__label text-[8px] md:text-[10px]">System_Experience_Active</span>
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