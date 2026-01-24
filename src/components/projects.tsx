"use client";
import React, { useState } from "react";
import { Github, ArrowUpRight } from "lucide-react"; // Install lucide-react or use SVGs

const projectData = [
  {
    id: "01",
    title: "Project Alpha",
    description: "A high-performance system architecture focused on scalability and real-time data processing.",
    tech: ["Next.js", "Go", "PostgreSQL"],
    link: "https://github.com/yourusername/alpha",
  },
  {
    id: "02",
    title: "Project Beta",
    description: "An experimental interaction model using physics-based UI and spatial navigation.",
    tech: ["React", "Three.js", "GSAP"],
    link: "https://github.com/yourusername/beta",
  },
  {
    id: "03",
    title: "Project Gamma",
    description: "Designing a clean, minimal interface for complex financial data visualization.",
    tech: ["TypeScript", "D3.js", "Tailwind"],
    link: "https://github.com/yourusername/gamma",
  },
];

const Projects = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
          <div className="relative w-[95%] md:w-[90%] h-[90vh] bg-white border-t border-x border-black/10 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row ">
            
            {/* LEFT SIDE: CONTENT (50%) */}
            <div className="w-full md:w-[55%] h-full p-8 md:p-16 flex flex-col justify-between border-r border-black/5">
              {/* Top: Archive ID */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 block mb-1">
                  Archive_Log
                </span>
                <span className="text-4xl font-black text-black">.{project.id}</span>
              </div>

              {/* Middle: Text Content */}
              <div className="max-w-md">
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-black leading-[0.85]">
                  {project.title}
                </h3>
                <p className="text-lg text-black/60 mb-8 leading-relaxed italic font-medium">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 border border-black/10 text-[9px] font-mono uppercase text-black/50 bg-black/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub Button */}
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 w-fit px-6 py-3 bg-black text-white rounded-full transition-all hover:bg-neutral-800 active:scale-95"
                >
                  <Github size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Open Github</span>
                  <ArrowUpRight size={16} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Bottom: Footer Meta */}
              <div className="text-[9px] font-mono text-black/40 uppercase">
                System_Status: Stable // Source_Available: True
              </div>
            </div>

            {/* RIGHT SIDE: SHOWCASE (50%) */}
            <div 
              className="w-full md:w-[45%] h-full bg-neutral-50 relative overflow-hidden cursor-none group/frame"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Custom Cursor Overlay */}
              {hoveredIndex === index && (
                <div 
                  className="fixed pointer-events-none z-[200] flex items-center justify-center mix-blend-difference"
                  style={{
                    left: cursorPos.x + (window.innerWidth - (window.innerWidth * 0.9)) / 2 + (window.innerWidth * 0.45), // Centering logic for the split
                    top: cursorPos.y + (window.innerHeight * 0.1), 
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Open</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              )}

              {/* Visual Frame */}
              <div className="absolute inset-12 border border-black/5 flex items-center justify-center group-hover/frame:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-black/[0.02] -z-10" />
                
                {/* ID Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center text-[20vw] font-black opacity-[0.02] select-none">
                  {project.id}
                </div>

                {/* Placeholder Content */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-[1px] bg-black/20" />
                  <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.5em]">
                    Render_Sequence
                  </span>
                  <div className="w-12 h-[1px] bg-black/20" />
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;