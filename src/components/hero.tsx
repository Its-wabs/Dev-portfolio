"use client";
import { useRef } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RevealText from "./revealtext";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Separate animation for non-text elements 
  useGSAP(() => {
    gsap.fromTo(".hero-fade-in", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 6.5, stagger: 0.2, ease: "power2.out" }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#151414] text-[#EBE5D0] flex items-center justify-center overflow-hidden hero">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        
        
        <RevealText 
          tag="p" 
          className="text-[#63938C] uppercase font-bold tracking-[0.7em] text-xs mb-6 justify-center"
          delay={4.5}
        >
          Hi, I'm Wabs
        </RevealText>

        
        <div className="font-montserrat font-extrabold text-4xl sm:text-3xl md:text-3xl lg:text-7xl leading-[1.05] tracking-[0.1em] uppercase flex flex-col items-center">
          <RevealText tag="h1" className="justify-center" delay={4.8}>
            Full-Stack Engineer
          </RevealText>
          <RevealText tag="h1" className="justify-center text-[#EBE5D0]" delay={5.0}>
            UI & UX Designer
          </RevealText>
        </div>

       
        <div className="mt-6 max-w-[38rem] mx-auto">
            <RevealText 
                tag="p" 
                className="text-[0.6rem] sm:text-base font-semibold md:text-lg text-[#63938C]/80 leading-normal uppercase justify-center"
                delay={5.2}
            >
                I craft visual systems that balance clarity, accessibility, and thoughtful interaction.
            </RevealText>
        </div>

        {/* Scroll indicator  */}
        <div className="mt-[7rem] flex justify-center hero-fade-in opacity-0">
          <svg
            className="w-6 h-6 animate-bounce text-[#63938C]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </div>

      {/* Footer  */}
      <div className="absolute bottom-8 inset-x-0 z-9 sm:inset-x-9 hero-fade-in opacity-0">
        <div className="px-4">
          <div className="grid grid-cols-3 items-center text-xs font-semibold uppercase tracking-widest text-[#63938C]">
            
            <span className="justify-self-start cursor-default hidden sm:block">Software Engineer</span>
            <span className="justify-self-start cursor-default sm:hidden">Dev</span>

            <div className="flex justify-center gap-6 text-[#EBE5D0]/70">
              <a href="#" className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
                <FaXTwitter size={14} />
              </a>
              <a href="#" className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
                <FaGithub size={14} />
              </a>
            </div>

            <span className="justify-self-end cursor-default hidden sm:block">Design Mindset</span>
            <span className="justify-self-end cursor-default sm:hidden">Design</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;