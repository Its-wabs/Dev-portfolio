"use client";
import React from "react";

// 1. Define the shape of your project data
interface Project {
  preview: string;
  active: string;
  isComingSoon?: boolean;
  title?: string;
}

// 2. Define the component Props interface
interface ProjectMediaProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}

const ProjectMedia = ({ project, index, hoveredIndex, videoRefs }: ProjectMediaProps) => {
  const isHovered = hoveredIndex === index;

  return (
    <div className="absolute inset-0 w-full h-full bg-neutral-200 overflow-hidden">
      {/* Preview Image: Added grayscale logic */}
      <img
        src={project.preview}
        alt=""
        className={`absolute inset-0 w-full h-full  object-contain object-center transition-all duration-700 ease-out group-hover/frame:scale-105 
          ${isHovered ? "opacity-0" : "opacity-100"}
          ${project.isComingSoon ? "grayscale group-hover/frame:grayscale-0" : ""}
        `}
      />

      {/* Active Media */}
      {project.active.endsWith(".mp4") ? (
        <video
          ref={(el) => {
            if (videoRefs.current) videoRefs.current[index] = el;
          }}
          src={project.active}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/frame:scale-105 
            ${isHovered ? "opacity-100" : "opacity-0"}
            ${project.isComingSoon ? "grayscale group-hover/frame:grayscale-0" : ""}
          `}
        />
      ) : (
        <img
          src={project.active}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/frame:scale-105 
            ${isHovered ? "opacity-100" : "opacity-0"}
            ${project.isComingSoon ? "grayscale group-hover/frame:grayscale-0" : ""}
          `}
        />
      )}

      {/* Frame Overlay */}
      <div
        className={`absolute inset-0 border-[8px] md:border-[12px] border-white pointer-events-none z-10 transition-opacity duration-500 
          ${project.isComingSoon && isHovered ? "opacity-40" : "opacity-100"}`}
      />

      {/* Coming Soon Overlay Text (Mobile) */}
      {project.isComingSoon && (
        <div className="absolute inset-0 flex items-center justify-center md:hidden bg-black/20 backdrop-blur-[2px]">
          <span className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectMedia;