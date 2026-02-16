"use client";
import { useRef, useState, useCallback, forwardRef, useEffect } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  onProjectClick?: () => void;
}

const Hero = forwardRef<HTMLDivElement, HeroProps>(({ onProjectClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const [displayText, setDisplayText] = useState("DESIGN");
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const intervalRef = useRef<number | null>(null);
  const revertTimeoutRef = useRef<number | null>(null);
  const isCreativeRef = useRef(false);

  const scramble = useCallback((targetWord: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        targetWord.split("").map((_, index) => {
            if (index < iteration) return targetWord[index];
            return chars[Math.floor(Math.random() * 26)];
          }).join("")
      );

      if (iteration >= targetWord.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isCreativeRef.current = targetWord === "CREATIVE";
        if (isCreativeRef.current) {
          revertTimeoutRef.current = setTimeout(() => scramble("DESIGN"), 2000); 
        }
      }
      iteration += 1 / 3;
    }, 30);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 4.5 });
    tl.to(".hero-line", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      onComplete: () => { setTimeout(() => scramble("CREATIVE"), 800); }
    });
    tl.to(".hero-meta", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");
  }, { scope: containerRef });

  // Main parallax for the titles
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 2;
    const y = (clientY / height - 0.5) * 2;

    gsap.to(".hero-title-left", { x: x * -15, y: y * -10, duration: 1, ease: "power2.out" });
    gsap.to(".hero-title-right", { x: x * 15, y: y * 10, duration: 1, ease: "power2.out" });
  };

  

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen bg-[#151414] text-[#EBE5D0] flex flex-col justify-between overflow-hidden hero select-none px-6 md:px-14"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none z-0" />

      {/*  MAIN TITLE */}
      <div ref={titleRef} className="relative z-10 flex-grow flex flex-col justify-center pointer-events-none">
        
        <div className="flex flex-col w-full mix-blend-difference">

            <h1 
                onMouseEnter={() => !isCreativeRef.current && scramble("CREATIVE")}
                className="hero-title-left self-start text-[14vw] sm:text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-[#EBE5D0] opacity-0 hero-line translate-y-10 min-h-[0.85em] cursor-default pointer-events-auto"
            >
                {displayText}
            </h1>

            <div className="w-full flex flex-col items-end mix-blend-difference pb-10 md:pb-0">
                <h1 className="hero-title-right text-[14vw] sm:text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-[#EBE5D0] opacity-0 hero-line translate-y-10 origin-right">
                    Engineer
                </h1>

                <div className="mt-4 max-w-md text-right hero-line opacity-0 translate-y-10">
                    <p className="text-sm sm:text-base md:text-lg text-[#EBE5D0]/80 leading-relaxed tracking-wide font-medium">
                       I design and build visual experiences that balance <span className="text-[#63938C] font-bold">Clarity</span> with <span className="text-[#63938C] font-bold">raw emotion</span>.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* SELECTED WORKS BUTTON */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 hero-meta opacity-0">
          <button 
              ref={btnRef}
              onClick={onProjectClick}
              
              className="group relative flex items-center gap-3 text-[#EBE5D0] cursor-pointer transition-all duration-300 active:scale-95 pointer-events-auto p-4"
          >
              <span className="text-[#63938C] text-2xl font-light transition-transform duration-300 group-hover:translate-x-[-4px]">[</span>
              
              <div className="flex flex-col items-center">
                  <span className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white">Selected Works</span>
                  <span className="h-[1px] w-0 bg-[#63938C] transition-all duration-500 ease-out group-hover:w-full" />
              </div>
              
              <span className="text-[#63938C] text-2xl font-light transition-transform duration-300 group-hover:translate-x-[4px]">]</span>
          </button>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 w-full pb-6 md:pb-10 flex items-end justify-between hero-meta opacity-0">
        <div className="hidden md:flex flex-col gap-2">
            <div className="w-[1px] h-12 bg-[#63938C]/50 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 -ml-1">Scroll</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-10 flex gap-8 text-[#EBE5D0]/60">
            <a href="https://x.com/its_wabs" target="_blank" rel="noreferrer" className="hover:text-[#63938C] transition-all hover:scale-125 duration-300"><FaXTwitter size={18} /></a>
            <a href="https://www.linkedin.com/in/itswabs" target="_blank" rel="noreferrer" className="hover:text-[#63938C] transition-all hover:scale-125 duration-300"><FaLinkedinIn size={18} /></a>
            <a href="https://github.com/Its-wabs/" target="_blank" rel="noreferrer" className="hover:text-[#63938C] transition-all hover:scale-125 duration-300"><FaGithub size={18} /></a>
        </div>

        <div className="flex flex-col items-end gap-1 mb-1">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63938C]"></span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#63938C]">Available</span>
                 <span className="font-mono text-[10px] text-white/40 uppercase tracking-tighter text-right">
                ALGERIA / {time}
            </span>
            </div>
           
        </div>
      </div>
    </section>
  );
});


export default Hero;