"use client";

import  { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ADD THIS IMPORT

// REGISTER THE PLUGIN
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);


  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/your-profile",
    },
    {
      name: "Twitter",
      url: "https://x.com/your-handle",
    },
    {
      name: "Github",
      url: "https://github.com/Its-wabs",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".contact-bg-text", 
      { opacity: 0, scale: 1.1, filter: "blur(20px)" },
      { opacity: 0.05, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }
    );

    tl.fromTo(".contact-title",
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", y: 50 },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", y: 0, duration: 1.5, ease: "power3.inOut" },
      "-=1.5"
    );

    tl.fromTo(".principle-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
      "-=0.5"
    );

    // Description Animation
    tl.fromTo(".contact-description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=1"
    );

    tl.fromTo(".email-link",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.4)" },
      "-=0.8"
    );

    tl.fromTo(".social-link",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    tl.fromTo(".contact-footer-item",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-full flex flex-col justify-between overflow-hidden hero bg-[#151414]"
    >
      <h2 className="contact-bg-text absolute inset-0 flex items-center justify-center text-[24vw] font-black text-white select-none pointer-events-none uppercase leading-none z-0">
        Connect
      </h2>

      <div className="flex-grow flex flex-col items-center justify-center z-10 w-full px-6 text-center">
        
        {/* Updated Title */}
        <h1 className="contact-title text-5xl md:text-[7rem] font-black text-[#EBE5D0] uppercase leading-[0.90] tracking-tight italic mb-8">
          Let's <br /> 
          <span className="not-italic">work together</span>
        </h1>

        <div className="principle-line w-full max-w-lg h-[1px] bg-[#63938C]/30 mb-8 origin-center" />

        {/* NEW: Professional Description */}
        <p className="contact-description max-w-md text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50 leading-relaxed mb-10">
          Currently available for project collaborations or a simple chat. 
          Reach out via email or LinkedIn—I’d love to hear your ideas.
        </p>

        <a 
          href="mailto:cherfi.m.abdelwahab@gmail.com" 
          className="email-link relative group text-3xl md:text-5xl font-mono text-[#63938C] hover:text-white transition-colors duration-500 mb-10"
        >
          send an email
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        <div className="flex flex-wrap justify-center gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              className="social-link text-xs font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="p-10 flex justify-between items-end z-10 w-full">
        {/* Status */}
        <div className="contact-footer-item space-y-1 ml-[3.2rem]"> 
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em]">Status</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[10px] font-bold uppercase text-white/80 tracking-wider">Available</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="contact-footer-item hidden md:block">
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
            © 2026 WABS — All Rights Reserved
          </p>
        </div>
        
        {/* Time */}
        <div className="contact-footer-item text-right space-y-1 mr-[2.6rem]">
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em]">Local Time</p>
          <p className="text-[10px] font-bold uppercase text-white/80 tracking-wider">GMT +1</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;