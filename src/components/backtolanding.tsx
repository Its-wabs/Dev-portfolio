"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BackToLandingProps {
  onClose: () => void;
}

const BackToLanding = ({ onClose }: BackToLandingProps) => {
  const pulseRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (pulseRef.current) {
      
      gsap.to(pulseRef.current, {
        scale: 2.5,
        opacity: 0,
        duration: 0.8,
        repeat: 2, 
        ease: "power2.out",
        onComplete: () => {
          
          gsap.set(pulseRef.current, { display: "none" });
        }
      });
    }
  }, []);

  return (
    <button
      onClick={onClose}
      className="fixed top-6 left-4 md:top-10 md:left-10 z-[110] 
                 flex items-center justify-start 
                 bg-[#63938C] text-white 
                 w-14 h-14 hover:w-64 
                 hover:bg-black hover:text-white
                 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                 group overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center min-w-[56px] h-full">
       
        <span 
          ref={pulseRef}
          className="absolute w-8 h-8 bg-white rounded-full pointer-events-none" 
        />
        
        <i className="ri-arrow-left-line text-2xl relative z-10 transition-transform duration-300 group-hover:-translate-x-1"></i>
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col opacity-0 group-hover:opacity-100 
                      translate-x-[-20px] group-hover:translate-x-0
                      transition-all duration-500 delay-100 ease-out
                      whitespace-nowrap pr-8">
        
        <span className="font-mono text-sm uppercase tracking-widest font-bold">
          Return to Base
        </span>
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </button>
  );
};

export default BackToLanding;