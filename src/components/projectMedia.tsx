"use client";
import React from "react";

interface Project {
  preview: string;
  active: string;
  isComingSoon?: boolean;
  title?: string;
}

interface ProjectMediaProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}

const ProjectMedia = ({ project, index, hoveredIndex, videoRefs }: ProjectMediaProps) => {
  const isHovered = hoveredIndex === index;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-4 md:p-8">
      
      {/* 1. THE BLOOM: Background glow sampled from the screenshot */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <img
          src={isHovered ? project.active : project.preview}
          alt=""
          className="w-full h-full object-cover blur-[100px] scale-125 transition-all duration-1000"
        />
      </div>

      {/* 2. THE WINDOW: Forced to 1366x768 Aspect Ratio */}
      <div 
        className={`relative w-full max-w-[1400px] aspect-[1366/740] flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out 
        ${isHovered ? 'scale-[1.01]' : 'scale-100'}`}
      >
        
        {/* MAC CHROME (Header) */}
        <div className="flex w-full items-center gap-2 rounded-t-xl bg-[#1a1a1a] px-4 py-3 border-x border-t border-white/10 shrink-0">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {/* Subtle URL Bar */}
          <div className="ml-4 h-5 w-full max-w-[300px] rounded-md bg-white/5 border border-white/5 flex items-center px-3">
             <div className="h-1.5 w-full bg-white/10 rounded-full" />
          </div>
        </div>

        {/* MEDIA VIEWPORT */}
        <div className="relative w-full flex-grow overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#111]">
          {/* Preview Image */}
          <img
            src={project.preview}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out 
              ${isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"}
              ${project.isComingSoon ? "grayscale opacity-50" : ""}
            `}
          />

          {/* Active Media */}
          {project.active.endsWith(".webm") ? (
            <video
              ref={(el) => {
                if (videoRefs.current) videoRefs.current[index] = el;
              }}
              src={project.active}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out 
                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}
              `}
            />
          ) : (
            <img
              src={project.active}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out 
                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}
              `}
            />
          )}

          {/* Coming Soon Overlay */}
          {project.isComingSoon && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
               <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectMedia;