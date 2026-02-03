"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VisualRecords = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showExperiments, setShowExperiments] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mainRecords = [
    { title: "Shy Vampire", purpose: "Personal_Study", img: "/img/shy-vamp.jpg", ratio: "aspect-video" },
    { title: "Molly The Scarecrow", purpose: "Personal DnD campaign", img: "/img/scarecrow.jpg", ratio: "aspect-[3/4]" },
    { title: "Chad Patrick", purpose: "Oil_Study", img: "/img/partick.jpg", ratio: "aspect-[3/4]" },
    { title: "Mascot", purpose: "Contest winning", img: "/img/ccontest.jpg", ratio: "aspect-[3/4]" },
    { title: "Deserte", purpose: "Oil study", img: "/img/apple.jpg", ratio: "aspect-[5/3]" },
  ];

  const experiments = [
    { title: "Exp_01", type: "Crit or hit", img: "/img/crit.jpg" },
    { title: "Exp_02", type: "Knight's journey", img: "/img/knights.jpg"  },
    { title: "Exp_03", type: "Dream big", img: "/img/dream.jpg"  },
    { title: "Exp_04", type: "Save the bees", img: "/img/bees.jpg"  },
  ];

  // DRAG TO SCROLL LOGIC 
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Entry Animation
  useGSAP(() => {
    gsap.fromTo(stripRef.current, 
      { x: 100, skewX: -2, opacity: 0 },
      { x: 0, skewX: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="mb-32 overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-4 flex-grow">
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold text-black/60 whitespace-nowrap">
            The Soul // Visual_Records
          </h2>
          <div className="h-[1px] w-full bg-black/10" />
        </div>
        
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] uppercase tracking-widest text-black/20">Manual_Override</span>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => scroll('right')} className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL RECORD STRIP */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`overflow-x-auto select-none pb-12 transition-all no-scrollbar
          ${isDragging ? "cursor-grabbing scale-[0.995]" : "cursor-grab"}`}
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        <div ref={stripRef} className="flex gap-8 w-max px-2 pointer-events-none items-start">
          {mainRecords.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={i}
                //  the blur logic
                className={`flex-shrink-0 transition-all duration-700 ease-out pointer-events-auto
                  ${isOtherHovered ? "blur-[2px] opacity-30 scale-[0.98]" : "blur-0 opacity-100 scale-100"}
                `}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* IMAGE CONTAINER */}
                <div className={`relative h-[450px] ${item.ratio} bg-black/5 border border-black/5 overflow-hidden transition-all duration-500
                  ${isHovered ? "border-black/20 shadow-2xl" : ""}`}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    // Image scaling
                    className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out pointer-events-none
                      ${isHovered ? "scale-110" : "scale-100"}`}
                  />
                </div>

                {/* CAPTION CONTAINER */}
                <div className={`mt-6 text-center transition-all duration-500 delay-100
                  ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <h3 className="font-mono text-[12px] text-black uppercase tracking-[0.3em] font-bold mb-2">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[9px] text-[#63938C] uppercase tracking-widest">
                    // {item.purpose}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPLORATION LOGS */}
      <div className="mt-12">
        <button 
          onClick={() => setShowExperiments(!showExperiments)}
          className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/30 hover:text-black transition-colors mb-8"
        >
          <span className="text-[#63938C] border border-black/5 px-2 py-1 group-hover:border-[#63938C] transition-colors">
            {showExperiments ? "HIDE_LOGS" : "SHOW_LOGS"}
          </span>
          Experimental_Logs // {experiments.length} entries
        </button>

        <div 
          className={`overflow-hidden transition-all duration-1000 ease-in-out
            ${showExperiments ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
            {experiments.map((exp, i) => (
              <div 
                key={i}
                className="group/exp bg-[#ebe5d0] p-6 hover:bg-white transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-[9px] text-[#63938C]">LOG_REF: 00{i+1}</span>
                    <span className="font-mono text-[8px] text-black/20 uppercase">Internal_Use_Only</span>
                  </div>

                  
                  <div className="relative aspect-[4/5] bg-black/[0.03] mb-6 overflow-hidden border border-black/5 grayscale group-hover/exp:grayscale-0 transition-all duration-700">
                    <img 
                      src={exp.img || "/api/placeholder/400/500"} 
                      alt={exp.title}
                      className="w-full h-full object-cover opacity-60 group-hover/exp:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ebe5d0]/80 to-transparent group-hover/exp:from-transparent transition-all duration-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/80">
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-4 bg-[#63938C]" />
                    <span className="font-mono text-[9px] uppercase tracking-tighter text-black/40 group-hover/exp:text-black transition-colors">
                      {exp.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualRecords;