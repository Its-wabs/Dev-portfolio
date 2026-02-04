"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null); 

  // Infinite breathing animation (Kept exactly the same)
  useGSAP(() => {
    gsap.to(textRef.current, {
      opacity: 0.7,           
      y: -2,                  
      duration: 2.5,          
      repeat: -1,             
      yoyo: true,             
      ease: "sine.inOut",     
    });
  }, { scope: sectionRef });

  const handleDive = () => {
    const tl = gsap.timeline({
      onComplete: onOpenModal 
    });

    tl.to(sectionRef.current, {
      scale: 5,
      opacity: 0,
      duration: 1.2,
      ease: "power4.in",  
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="absolute inset-0 h-full w-full about flex items-center justify-center overflow-hidden bg-[#ebe5d0]"
    >
      {/* Changes:
        - Added 'w-full' to ensure it takes width on mobile.
        - Changed 'px-6' to 'px-4 md:px-6' for better mobile edge spacing.
      */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
        
        {/* Changes: 
          - Reduced padding on mobile: 'p-4 md:p-8'. 
        */}
        <div className="p-4 md:p-8">
          <p className="
            text-[#000] 
            uppercase 
            font-semibold
            leading-snug md:leading-relaxed 
            mb-6 
            /* Responsive Text Sizing */
            text-xl         /* Mobile: Readable but not huge */
            sm:text-2xl     /* Small Tablets */
            md:text-3xl     /* Desktop (Original size) */
            lg:text-4xl     /* Large Screens (Optional polish) */
          ">
            Hi, i’m wabs a creative full stack engineer , who love to turn messy systems into visually pleasing human experiences
          </p>
        </div>

        {/* Changes:
           - Reduced top margin on mobile: 'mt-8 md:mt-12' to pull button closer.
        */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <button 
            className="group relative flex flex-col items-center justify-center p-6 md:p-8"
            onClick={handleDive}
          >
            
            <span 
              ref={textRef}
              className="
                relative z-10 font-mono 
                tracking-[0.3em] md:tracking-[0.5em] /* Slightly tighter tracking on mobile */
                uppercase 
                text-black/40 
                group-hover:text-black 
                group-hover:scale-110 
                transition-all duration-500 ease-out
                /* Responsive Font Size */
                text-[10px] md:text-xs
              "
            >
              [ Read Full Story ]
            </span>

            {/* Ripple Effects (Preserved) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 border border-black/20 scale-100 invisible group-hover:visible group-hover:scale-[10] group-hover:opacity-0 transition-all duration-700 ease-in-out" />
              <div className="absolute w-4 h-4 border border-black/10 scale-100 invisible group-hover:visible group-hover:scale-[15] group-hover:opacity-0 transition-all duration-1000 delay-75 ease-in-out" />
              <div className="absolute w-4 h-4 border border-black/5 scale-100 invisible group-hover:visible group-hover:scale-[20] group-hover:opacity-0 transition-all duration-[1200ms] delay-150 ease-in-out" />
              <div className="absolute w-1 h-1 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-0 transition-all duration-300" />
            </div>

            {/* Corners 
               Update: On mobile (touch), hover doesn't exist. 
               We make the corners faintly visible by default on mobile (border-black/10), 
               then fully invisible on desktop until hover.
            */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/20 md:border-black/0 group-hover:border-black/40 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/20 md:border-black/0 group-hover:border-black/40 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/20 md:border-black/0 group-hover:border-black/40 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/20 md:border-black/0 group-hover:border-black/40 transition-all duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;