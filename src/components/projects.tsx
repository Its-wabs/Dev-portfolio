"use client";
import React, { useEffect, useRef, useState } from "react";
import { Github, ArrowUpRight, Lock } from "lucide-react"; 
import ProjectMedia from "./projectMedia";

const projectData = [
  {
    id: "01",
    title: "Bimo Website",
    description: "A high-fidelity brand experience reimagining the iconic biscuit's digital presence. Exploring kinetic typography and complex scroll-driven physics.",
    tech: ["Next.js", "GSAP", "Matter.js", "Tailwind"],
    link: "#",
    demo: "#",
    preview: "/img/bimo-hero.webp", 
    active: "/img/bimo-hero.webp",
    isComingSoon: true    
  },
  {
    id: "02",
    title: "AuthPlay",
    description: "An authentication playground to understand manual auth flows, sessions, and OAuth trade-offs through experimentation.",
    tech: ["Next.js", "Prisma", "NextAuth", "Supabase", "PostgreSQL"],
    link: "https://github.com/Its-wabs/auth-playground",
    demo: "https://authplay-v1.vercel.app/",
    preview: "/img/authplay.webp", 
    active: "/img/projects/fikra-demo.gif" 
  },
  {
    id: "03",
    title: "Developer Portfolio",
    description: "A system-driven portfolio blending engineering, interaction design, and visual storytelling.",
    tech: ["Vite.js", "GSAP", "Tailwind"],
    link: "https://github.com/Its-wabs/Dev-portfolio",
    demo: "https://itswabs.vercel.app/",
    preview: "/img/dev.webp", 
    active: "/img/projects/fikra-demo.gif" 
  },
];

const Projects = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (hoveredIndex === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
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
          <div className="relative w-[95%] md:w-[92%] h-[90vh] bg-white border-t border-x border-black/10 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row">
            
            {/* CONTENT */}
            <div className="w-full md:w-[28%] h-1/2 md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 block mb-1">
                  Archive_Log
                </span>
                <span className="text-3xl md:text-4xl font-black text-black">.{project.id}</span>
              </div>

              <div className="max-w-md">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-3 md:mb-4 text-black leading-[0.85]">
                  {project.title}
                </h3>
                
                <p className="hidden md:block text-base lg:text-lg text-black/60 mb-6 lg:mb-8 leading-relaxed italic font-medium">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 md:px-2.5 md:py-1 border border-black/10 text-[15px] md:text-[10px] lg:text-[13px] font-mono uppercase text-black/50 bg-black/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub Button - Disabled if Coming Soon */}
                <div className="mb-6 md:mb-0">
                  <a 
                    href={project.isComingSoon ? undefined : project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2.5 w-fit px-4 py-2.5 md:px-5 md:py-2.5 rounded-full transition-all 
                      ${project.isComingSoon 
                        ? 'bg-neutral-200 text-black/30 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-neutral-800 active:scale-95'}`}
                  >
                    {project.isComingSoon ? <Lock size={14} /> : <Github size={14} />}
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
                      {project.isComingSoon ? "Private Repo" : "Open Github"}
                    </span>
                    {!project.isComingSoon && <ArrowUpRight size={12} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                  </a>
                </div>
              </div>

              <div className="text-[8px] md:text-[9px] font-mono text-black/40 uppercase pb-2 md:pb-0">
                System_Status: {project.isComingSoon ? 'In_Development' : 'Stable'} // Source_Available: {!project.isComingSoon}
              </div>
            </div>

            {/* SHOWCASE */}
            <div 
              className={`w-full md:w-[72%] h-1/2 md:h-full relative overflow-hidden group/frame ${project.isComingSoon ? 'cursor-none' : 'cursor-none'}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* If NOT coming soon, wrap inner in link*/}
              {project.isComingSoon ? (
                <ProjectMedia project={project} index={index} hoveredIndex={hoveredIndex} videoRefs={videoRefs} />
              ) : (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                   <ProjectMedia project={project} index={index} hoveredIndex={hoveredIndex} videoRefs={videoRefs} />
                </a>
              )}

              {/* Cursor Overlay */}
              {hoveredIndex === index && (
                <div className="hidden md:block fixed pointer-events-none z-[9999]"
                  style={{ left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md border transition-all duration-300 
                    ${project.isComingSoon ? 'bg-black/90 text-white border-white/10' : 'bg-white/90 text-black border-black/10'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      {project.isComingSoon ? "Coming Soon" : "Open Demo"}
                    </span>
                    {project.isComingSoon ? <Lock size={14} /> : <ArrowUpRight size={14} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default Projects;