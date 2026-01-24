"use client";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#151414] text-[#EBE5D0] flex items-center justify-center overflow-hidden hero">
      {/* Add a subtle gradient overlay to enhance the distance effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <p className="text-[#63938C] uppercase font-bold tracking-[0.7em] text-xs mb-6">
          Hi, I'm Wabs
        </p>

        <h1 className="font-montserrat font-extrabold text-4xl sm:text-3xl md:text-3xl lg:text-7xl leading-[1.05] tracking-[0.1em] uppercase space-x-1">
          Full-Stack Engineer
          <br />
          UI & UX Designer
        </h1>

        <p className="mt-6 text-[0.2rem] sm:text-base font-semibold md:text-lg text-[#63938C]/80 max-w-[38rem] mx-auto leading-none uppercase">
          I craft visual systems that balance clarity, accessibility, and thoughtful interaction.
        </p>

        {/* Scroll indicator */}
       <div className="mt-[7rem] flex justify-center">
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

    {/* Footer */}
<div className="absolute bottom-8 inset-x-0 z-9 sm:inset-x-9">
  <div className="px-4">
    <div className="grid grid-cols-3 items-center text-xs font-semibold uppercase tracking-widest text-[#63938C]">
      
      {/* Left */}
      <span className="justify-self-start cursor-default">Software Engineer</span>

      {/* Center */}
      <div className="flex justify-center gap-6 text-[#EBE5D0]/70">
        <a className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
          <FaXTwitter size={14} />
        </a>
        <a className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
          <FaLinkedinIn size={14} />
        </a>
        <a className="hover:text-[#63938C] transition hover:scale-105 cursor-pointer">
          <FaGithub size={14} />
        </a>
      </div>

      {/* Right */}
      <span className="justify-self-end cursor-default">Design Mindset</span>
    </div>
  </div>
</div>


    </section>
  );
};

export default Hero;