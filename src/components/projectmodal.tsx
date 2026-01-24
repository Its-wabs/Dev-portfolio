"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github, Plus, Minus, Globe } from "lucide-react";
import BackToLanding from "./backtolanding";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectData = [
  {
    id: "01",
    title: "Project Alpha",
    intent: "High-performance system architecture for real-time scalability.",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
    ],
    problem: "Existing solutions couldn't handle 10k+ concurrent socket connections without significant latency spikes.",
    decision: "Implemented a distributed message broker with Go to decouple data processing from the client-facing API.",
    outcome: "Reduced interaction latency by 60% and stabilized uptime during peak traffic bursts.",
    tech: ["Go", "Next.js", "Redis", "PostgreSQL"],
    deepTech: [
      { category: "Engine", tools: ["Go", "gRPC", "Protobuf"] },
      { category: "Data", tools: ["PostgreSQL", "Redis", "Kafka"] },
      { category: "Edge", tools: ["Next.js", "Vercel", "Tailwind"] }
    ],
    github: "https://github.com/yourusername/alpha",
    live: "https://alpha-demo.com",
    previewImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop",
    videoShowcase: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
  },
  {
    id: "02",
    title: "Project Beta",
    intent: "Physics-based UI experiment exploring spatial navigation.",
    screens: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800"
    ],
    problem: "Standard web interfaces felt static and disconnected from human tactile expectations.",
    decision: "Integrated a custom physics engine with Three.js to give every DOM element mass, friction, and inertia.",
    outcome: "Created a 'tactile web' model that increased user session duration by 40% through organic exploration.",
    tech: ["Three.js", "React", "GSAP", "Cannon.js"],
    deepTech: [
      { category: "Graphics", tools: ["Three.js", "WebGL", "GLSL"] },
      { category: "Physics", tools: ["Cannon.js", "Custom Math"] },
      { category: "UI", tools: ["React", "GSAP", "Framer Motion"] }
    ],
    github: "https://github.com/yourusername/beta",
    live: "https://beta-demo.com",
    previewImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1664&auto=format&fit=crop",
    videoShowcase: "https://assets.mixkit.co/videos/preview/mixkit-tech-animation-of-futuristic-interface-9074-large.mp4"
  }
];

const ProjectModal = ({ isOpen, onClose }: ProjectModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // Ref array to store each project container
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleExit = () => {
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 20, filter: "blur(10px)", duration: 0.5, ease: "power2.in", onComplete: onClose
    });
  };

  useGSAP(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
      );
    }
  }, [isOpen]);

  // Handle clicking a project header
  const handleProjectClick = (index: number) => {
    // If clicking the currently open one, just close it
    if (expandedIndex === index) {
      setExpandedIndex(null);
      return;
    }

    // Set new index
    setExpandedIndex(index);

    // scroll the clicked item to the top of the view
    setTimeout(() => {
      itemsRef.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-modal text-[#0a0a0a] isolate cursor-default">
      <BackToLanding onClose={handleExit} />

      <div ref={contentRef} className="h-full w-full overflow-y-auto font-sans selection:bg-[#63938C] selection:text-white" style={{ overscrollBehavior: "contain" }}>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <header className="flex flex-col md:flex-row justify-between items-end border-b border-black pb-12 mb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-black/40 mb-4 block">File_003 // Projects</span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">Selected <br /> <span className="text-[#63938C]">Archive</span></h1>
            </div>
            <div className="mt-8 md:mt-0 md:text-right font-mono text-[11px] uppercase tracking-widest opacity-40">
              <p>Total_Entries: {projectData.length}</p>
            </div>
          </header>

          <div className="border-t border-black">
            {projectData.map((project, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div 
                  key={project.id} 
                  // Assign ref to tracking array
                  ref={(el) => { itemsRef.current[index] = el; }}
                  className={`border-b border-black transition-colors duration-500 ${isExpanded ? 'bg-white' : 'hover:bg-black/5'}`}
                >

                  <button
                    // project handler
                    onClick={() => handleProjectClick(index)}
                    className="w-full flex items-center justify-between p-8 md:p-12 text-left group"
                  >
                    <div className="flex items-center gap-8 md:gap-16 relative z-10">
                      <span className="font-mono text-sm text-[#63938C]">0{index + 1}</span>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                    </div>
                    {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
                  </button>

                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 md:px-12 pb-20 space-y-16">

                      {/* INTENT & STACK & BUTTONS */}
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-black/5 pb-12">
                        <div className="max-w-xl">
                          <p className="font-mono text-[10px] uppercase text-[#63938C] tracking-[0.3em] mb-4">Intent_Statement</p>
                          <p className="text-2xl font-medium leading-tight text-black/90 italic">"{project.intent}"</p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-6">
                          <div className="flex flex-wrap md:justify-end gap-2">
                            {project.tech.map(t => (
                              <span key={t} className="px-2 py-1 bg-black/5 text-[9px] font-mono uppercase tracking-tighter">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <a href={project.live} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#63938C] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors">
                              <Globe size={12} /> Live_Demo
                            </a>
                            <a href={project.github} target="_blank" className="flex items-center gap-2 px-4 py-2 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                              <Github size={12} /> Source
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* SCREENSHOTS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.screens.map((src, i) => (
                          <div key={i} className="aspect-[16/10] bg-black/5 border border-black/10 overflow-hidden">
                            <img src={src} alt="UI Context" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>

                      {/*  PROBLEM → DECISION → OUTCOME */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm border-y border-black/10 py-12">
                        <div className="space-y-4">
                          <span className="font-mono text-[9px] uppercase text-black/30 tracking-[0.5em]">01 // Problem</span>
                          <p className="leading-relaxed text-black/70">{project.problem}</p>
                        </div>
                        <div className="space-y-4">
                          <span className="font-mono text-[9px] uppercase text-black/30 tracking-[0.5em]">02 // Decision</span>
                          <p className="leading-relaxed text-black/70">{project.decision}</p>
                        </div>
                        <div className="space-y-4">
                          <span className="font-mono text-[9px] uppercase text-black/30 tracking-[0.5em]">03 // Outcome</span>
                          <p className="leading-relaxed text-black/70">{project.outcome}</p>
                        </div>
                      </div>

                      {/* IN-DEPTH TECH STACK */}
                      <div className="space-y-8 py-4">
                        <h5 className="font-mono text-[10px] uppercase text-black/40 tracking-[0.5em] text-center">Technical_Architecture</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {project.deepTech.map((item, i) => (
                            <div key={i} className="p-6 border border-black/5 bg-black/[0.01]">
                              <p className="font-mono text-[10px] uppercase mb-4 opacity-40">{item.category}</p>
                              <div className="flex flex-wrap gap-2">
                                {item.tools.map(tool => (
                                  <span key={tool} className="text-sm font-bold tracking-tighter">{tool}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* VIDEO SHOWCASE */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h5 className="font-mono text-[10px] uppercase text-black/40 tracking-[0.5em]">Video_Showcase // {project.id}</h5>
                          <span className="text-[10px] font-mono opacity-20">[ Static_Preview ]</span>
                        </div>
                        <div className="aspect-video bg-black relative overflow-hidden shadow-2xl">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                            <source src={project.videoShowcase} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="border-t-2 border-black pt-12 flex flex-col md:flex-row justify-between items-end gap-12 mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Let's have a chat</h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8">
                Available for Freelance & Partnerships
              </p>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
                <a href="#" className="hover:text-[#63938C] transition-colors underline underline-offset-4">Email</a>
                <a href="#" className="hover:text-[#63938C] transition-colors underline underline-offset-4">LinkedIn</a>
                <a href="#" className="hover:text-[#63938C] transition-colors underline underline-offset-4">X / Twitter</a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-8xl font-black opacity-5 select-none leading-none">WABS</div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-black/20 mt-4">
                Built on Creativity & Pure Logic // 2026 ©
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;