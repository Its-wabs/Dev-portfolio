"use client";
import React, { useEffect, useRef, useState } from "react";
import { Github, ArrowUpRight } from "lucide-react"; 

const projectData = [
  {
    id: "01",
    title: "FikraFlow",
    description: "A focused writing and thinking tool exploring frictionless input, structure, and clarity. Early foundation for Kahf Notes.",
    tech: ["Next.js", "TypeScript", "Tailwind","Convex", "clerk"],
    link: "https://github.com/Its-wabs/nextJs-noteapp",
    demo: "https://fikra-flow.vercel.app/",
    preview: "/img/fikra-static.png", 
    active: "/videos/typeflow.mp4"    
  },
  {
    id: "02",
    title: "AuthPlay",
    description: "An authentication playground to understand manual auth flows, sessions, and OAuth trade-offs through experimentation.",
    tech: ["Next.js", "Prisma", "NextAuth", "Supabase", "PostgreSQL"],
    link: "https://github.com/Its-wabs/auth-playground",
    demo: "https://authplay-v1.vercel.app/",
    preview: "/img/authplay.png", 
    active: "/img/projects/fikra-demo.gif" 
  },
  {
    id: "03",
    title: "Developer Portfolio",
    description: "A system-driven portfolio blending engineering, interaction design, and visual storytelling.",
    tech: ["Vite.js", "GSAP", "Tailwind"],
    link: "https://github.com/Its-wabs/Dev-portfolio",
    demo: "https://itswabs.vercel.app/",
    preview: "/img/dev.png", 
    active: "/img/projects/fikra-demo.gif" 
  },
];

const Projects = () => {
  
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };


  // Play/Pause logic based on hover
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (hoveredIndex === index) {
        video.play().catch(() => {}); // Catch prevents errors if user hasn't interacted yet
      } else {
        video.pause();
        video.currentTime = 0; // Optional: Reset video to start when leaving
      }
    });
  }, [hoveredIndex]);
  

  return (
  <div className="relative w-full h-full projects bg-neutral-100">
      {projectData.map((project, index) => (
        <div
          key={project.id}
          className="project-card absolute inset-0 w-full h-screen flex items-end justify-center"
          style={{
            zIndex: index + 10,
            transform: index === 0 ? "translateY(80%)" : "translateY(100%)",
          }}
        >
          {/* THE FOLDER CARD */}
          <div className="relative w-[95%] md:w-[90%] h-[90vh] bg-white border-t border-x border-black/10 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row">
            
            {/* LEFT SIDE: CONTENT 
                Changed: Added h-1/2 for mobile to force half-screen height 
            */}
            <div className="w-full md:w-[55%] h-1/2 md:h-full p-6 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
              
              {/* Top: Archive ID */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 block mb-1">
                  Archive_Log
                </span>
                <span className="text-3xl md:text-4xl font-black text-black">.{project.id}</span>
              </div>

              {/* Middle: Text Content */}
              <div className="max-w-md">
                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-black leading-[0.85]">
                  {project.title}
                </h3>
                
                {/* Mobile Fix: Hidden description on mobile to save space */}
                <p className="hidden md:block text-lg text-black/60 mb-8 leading-relaxed italic font-medium">
                  {project.description}
                </p>
                
                {/* Tech Stack: Reduced margin on mobile */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 md:px-3 md:py-1 border border-black/10 text-[8px] md:text-[9px] font-mono uppercase text-black/50 bg-black/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub Button 
                    Added: mb-6 to create space from the System_Status line
                */}
                <div className="mb-6 md:mb-0">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 w-fit px-5 py-3 md:px-6 md:py-3 bg-black text-white rounded-full transition-all hover:bg-neutral-800 active:scale-95"
                  >
                    <Github size={16} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Open Github</span>
                    <ArrowUpRight size={14} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Bottom Label: Added padding-bottom for mobile breathing room */}
              <div className="text-[8px] md:text-[9px] font-mono text-black/40 uppercase pb-2 md:pb-0">
                System_Status: Stable // Source_Available: True
              </div>
            </div>

            {/* RIGHT SIDE: SHOWCASE LINK 
                Changed: h-1/2 for mobile to occupy the bottom half of the card
            */}
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-[45%] h-1/2 md:h-full relative overflow-hidden group/frame cursor-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Custom Cursor Overlay (Hidden on Mobile) */}
              {hoveredIndex === index && (
                <div className="hidden md:block fixed pointer-events-none z-[9999]"
                  style={{ left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md bg-white/90 text-black border border-black/10 transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Open Demo</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              )}

              {/* MEDIA CONTAINER */}
              <div className="absolute inset-0 w-full h-full bg-neutral-200 overflow-hidden">
                <img 
                  src={project.preview} 
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/frame:scale-110 group-hover/frame:blur-sm ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                />

                {project.active.endsWith('.mp4') ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={project.active}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/frame:scale-110 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <img 
                    src={project.active} 
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/frame:scale-110 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                {/* Thinner border for mobile frame */}
                <div className="absolute inset-0 border-[10px] md:border-[20px] border-white pointer-events-none z-10" />
              </div>
            </a>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;