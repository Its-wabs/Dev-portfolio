"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BackToLanding from "./backtolanding";
import VisualRecords from "./visualarchive";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Carousel items:
const carouselItems = [
  { title: "Crochet",       label: "Every sc matters, iykyk",                      img: "/img/crochet1.webp"    },
  { title: "Bookbinding",   label: "You can't skip steps",                          img: "/img/bookbinding.webp" },
  { title: "Baking",        label: "Always brings the best ideas.",                 img: "/img/cake.webp"        },
  { title: "Posters",       label: "Always experimenting different mediums",        img: "/img/dream.webp"       },
  { title: "Crochet",       label: "More cute crochet",                             img: "/img/crochet2.webp"    },
  { title: "Pottery",       label: "Feeds creativity and patience",                 img: "/img/pottery.webp"     },
  { title: "Poster design", label: "Always experimenting different mediums",        img: "/img/knights.webp"     },
];

// Right-now items
const rightNowItems = [
  {
    label: "Wabs Lab",
    sub: "Open-source GSAP animation library - Awwwards submission roadmap",
    status: "Active",
  },
  {
    label: "EDG Studio",
    sub: "Wrapping up a premium dev agency site - conversion-aware motion, no bloat",
    status: "Finishing",
  },
  {
    label: "Teaching",
    sub: "Computer security measures and project study lectures - learning more with each lesson",
    status: "Ongoing",
  },
  {
    label: "99 Names of Allah",
    sub: "A scrollytelling project - the one I keep saving for when I'm ready",
    status: "Planned",
  },
  {
    label: "A short story",
    sub: "Procrastinating on it since January. I'll go back it eventually.",
    status: "WIP",
  },
];

const statusColor: Record<string, string> = {
  Active:    "bg-[#63938C] text-white",
  Finishing: "bg-[#0a0a0a] text-[#f5dd87]",
  Ongoing:   "bg-[#f5dd87] border border-black/20 text-black",
  Planned:   "bg-black/8 text-black/50",
  WIP:       "bg-black/8 text-black/50",
};

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  const contentRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const tweenRef     = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleExit = () => {
    if (!contentRef.current) return;
    const isMobile = window.innerWidth < 768;
    gsap.to(contentRef.current, {
      opacity: 0,
      y:       isMobile ? 20  : 0,
      scale:   isMobile ? 1   : 0.95,
      filter:  isMobile ? "none" : "blur(10px)",
      duration: 0.4,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  useGSAP(() => {
    if (!isOpen || !contentRef.current) return;
    const isMobile = window.innerWidth < 768;

    gsap.set(contentRef.current, { scrollTop: 0 });

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: isMobile ? 50 : 0, scale: isMobile ? 1 : 0.95, filter: isMobile ? "none" : "blur(10px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: isMobile ? 0.5 : 1, ease: "power4.out" }
    );

    if (trackRef.current) {
      tweenRef.current?.kill();
      gsap.set(trackRef.current, { x: 0 });
      tweenRef.current = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth / 2),
        repeat: -1,
        duration: 28,
        ease: "none",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const loopItems = [...carouselItems, ...carouselItems];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-modal bg-[#f5dd87] text-[#0a0a0a] isolate"
    >
      <BackToLanding onClose={handleExit} />

      <div
        ref={contentRef}
        className="h-full w-full overflow-y-auto font-sans selection:bg-[#63938C] selection:text-white will-change-transform"
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-16 md:py-24 lg:py-32">

          {/* HEADER */}
          <header className="mb-28 text-center relative">
            <div className="flex justify-center items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full bg-[#63938C] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40">
                Available for work
              </span>
            </div>

            <div className="flex items-center gap-4 max-w-xs mx-auto mb-10">
              <div className="h-[1px] flex-1 bg-black/15" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-black/30 uppercase">Est. 2020</span>
              <div className="h-[1px] flex-1 bg-black/15" />
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-zen font-black tracking-tighter leading-none uppercase">
              How I got here
            </h1>

            <p className="mt-6 font-mono text-[11px] tracking-[0.3em] uppercase text-black/30">
              Wabs — Algeria
            </p>
          </header>

          {/* SECTION 01: ORIGIN */}
          <section className="mb-32">
            <SectionLabel number="01" title="It started with CS" />
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-black/70 text-justify hyphens-auto">
                I never seen myself as an engineer. It really started back when I enrolled
                into computer science because I wanted to{" "}
                <em className="not-italic font-semibold text-black">build something nice.</em>{" "}
                I didn't think much of it then, but that's basically how painting became my thing.
              </p>
            </div>
          </section>

          {/* SECTION 02: THEN ART HAPPENED */}
          <section className="mb-32">
            <SectionLabel number="02" title="Then_Art_Happened" />
            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-lg md:text-xl leading-relaxed text-black/70 text-justify hyphens-auto">
                So I picked up painting while I am studying CS. Shared my work online,
                and slowly found my way into 2D illustration and freelance.
                It reminded me how much I love making things from scratch.
              </p>
            </div>
            <VisualRecords />
          </section>

          {/* SECTION 03: THE CROSSROADS */}
          <section className="mb-32">
            <SectionLabel number="03" title="The Crossroads" />
            <div className="max-w-2xl mx-auto space-y-6 mb-16">
              <p className="text-lg md:text-xl leading-relaxed text-black/70 text-justify hyphens-auto">
                By 2023 after I graduated I was tired of doing both at the same time so
                I let go of engineering and gave the 2D illustration career all my energy.
                Although I started getting traction and success in that, I started losing
                my passion for it all, it felt more like a chore than a passion.
                I wasn't making things from scratch anymore, I was{" "}
                <em className="not-italic font-semibold text-black">filling white space.</em>
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-black/70 text-justify hyphens-auto">
                I didn't want to switch careers again. I wanted to stop choosing.
                So I walked away from the illustration freelance, sat back down with
                code, and started my design engineer journey.
              </p>
            </div>

            {/* HOBBY CAROUSEL */}
            <div className="overflow-hidden -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-20 xl:-mx-32">
              <div
                ref={trackRef}
                className="flex gap-4 w-max py-2"
                style={{ willChange: "transform" }}
              >
                {loopItems.map((item, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 w-52 h-64 md:w-64 md:h-80 overflow-hidden border border-black/10 bg-black/5 group"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/20">
                        {item.title}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="font-zen font-black text-white text-sm uppercase tracking-tight leading-none">
                        {item.title}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.15em] text-white/60 mt-1 uppercase">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 04: RIGHT NOW */}
          <section className="mb-32">
            <SectionLabel number="04" title="Right_Now" />
            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-lg md:text-xl leading-relaxed text-black/70 text-justify hyphens-auto">
                Now I'm deep into design engineering, doing what I love the most : exploring
                how systems, accessibility, and creativity fit together. Still the same person
                who loves figuring things out and making things look and feel better, just with
                a clearer purpose and slightly better tools.
              </p>
            </div>

            {/* right-now list */}
            <ul className="max-w-3xl mx-auto divide-y divide-black/10 border-t border-black/10">
              {rightNowItems.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 py-5"
                >
                  <div className="flex-1">
                    <p className="font-bold text-base md:text-lg tracking-tight">
                      {item.label}
                    </p>
                    <p className="font-mono text-xs text-black/50 mt-0.5 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                  <span
                    className={`self-start sm:self-center flex-shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full ${statusColor[item.status]}`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* FOOTER */}
          <footer className="border-t-2 border-black pt-12 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Let's work together
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8">
                Available for Freelance &amp; Partnerships
              </p>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
                <a href="mailto:hello@wabs.design" className="hover:text-[#63938C] transition-colors underline underline-offset-4">
                  Email
                </a>
                <a href="https://www.linkedin.com/in/itswabs" target="_blank" rel="noreferrer" className="hover:text-[#63938C] transition-colors underline underline-offset-4">
                  LinkedIn
                </a>
                <a href="https://x.com/its_wabs" target="_blank" rel="noreferrer" className="hover:text-[#63938C] transition-colors underline underline-offset-4">
                  X / Twitter
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl md:text-8xl font-black opacity-5 select-none leading-none">
                WABS
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-black/20 mt-4">
                Built on Creativity &amp; Pure Logic // 2026 ©
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

// Section label sub-component
const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-10 md:mb-14">
    <h2 className="text-sm font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">
      {title}
    </h2>
    <div className="h-[1px] flex-grow bg-black/10" />
    <span className="font-zen font-black text-5xl md:text-7xl leading-none text-black/5 select-none tabular-nums">
      {number}
    </span>
  </div>
);

export default AboutModal;