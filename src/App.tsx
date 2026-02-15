"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/hero";
import About from "./components/about";
import NavBar from "./components/navbar";
import PreLoad from "./components/pre-load";
import Projects from "./components/projects";
import Contact from "./components/contact";
import FloatingStack from "./components/floatingStack";
import Stack from "./components/stack";
import BackToTop from "./components/backToTop";
import AboutModal from "./components/aboutmodal";
import ProjectModal from "./components/projectmodal";
import { useGSAP } from "@gsap/react";
import SecondaryStack from "./components/secondary-stack";

gsap.registerPlugin(ScrollTrigger);

// Centralized color themes
const NAV_THEMES = {
  dark: {
    logo: "#EBE5D0",
    icon: "#ffffff",
    iconBg: "transparent",
    accentBg: "#63938C",
    accentText: "#000",
  },
  light: {
    logo: "#151414",
    icon: "#151414",
    iconBg: "rgba(0,0,0,0.05)",
    accentBg: "#151414",
    accentText: "#ffffff",
  },
};

export default function App() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLElement>(null);
  const resumeButtonRef = useRef<HTMLAnchorElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const techSceneRef = useRef<HTMLDivElement>(null);
  const contactSceneRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [isPlayMode, setIsPlayMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const warpOverlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const physicsBtnRef = useRef<HTMLButtonElement>(null);

 
  useGSAP(() => {
    gsap.to(physicsBtnRef.current, {
      y: -6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, { scope: physicsBtnRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = physicsBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      rotationX: -y * 0.1,
      rotationY: x * 0.1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(physicsBtnRef.current, {
      x: 0, y: 0, rotationX: 0, rotationY: 0,
      duration: 0.7, ease: "elastic.out(1, 0.5)",
    });
  };

  const toggleMode = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlayMode(!isPlayMode);
        gsap.fromTo(contentWrapperRef.current,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1, rotation: 0, opacity: 1, duration: 0.7,
            ease: "back.out(1.2)",
            onComplete: () => {
              setIsTransitioning(false);
              ScrollTrigger.refresh();
            }
          }
        );
        gsap.to(warpOverlayRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
      }
    });
    tl.to(contentWrapperRef.current, { scale: 0, rotation: 180, opacity: 0, duration: 0.6, ease: "power2.in" });
    tl.fromTo(warpOverlayRef.current, { scale: 0, opacity: 0 }, { scale: 2, opacity: 1, duration: 0.5, backgroundColor: "#000", ease: "power2.out" }, "-=0.3");
  };

  const scrollToProjects = () => {
    const trigger = ScrollTrigger.getById("project-section");
    if (trigger) {
      const targetPosition = trigger.start + window.innerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  // Helper function to apply nav theme
  const applyNavTheme = (theme: keyof typeof NAV_THEMES) => {
    const colors = NAV_THEMES[theme];
    return {
      "--nav-logo-color": colors.logo,
      "--nav-icon-color": colors.icon,
      "--nav-accent-bg": colors.accentBg,
      "--nav-accent-text": colors.accentText,
    };
  };

  useEffect(() => {
    if (!sceneRef.current || !aboutRef.current) return;

    const mm = gsap.matchMedia();

    const showBackToTop = () => {
      ScrollTrigger.create({
        start: "top -80%",
        onEnter: () => gsap.to(backToTopRef.current, { opacity: 1, visibility: "visible" }),
        onLeaveBack: () => gsap.to(backToTopRef.current, { opacity: 0, visibility: "hidden" }),
      });
    };

    showBackToTop();
    window.addEventListener("scroll", showBackToTop);

    // Set initial nav theme (dark)
    gsap.set(".nav-icon", { 
      color: NAV_THEMES.dark.icon, 
      backgroundColor: NAV_THEMES.dark.iconBg 
    });
    gsap.set(".resume-button", { 
      backgroundColor: NAV_THEMES.dark.accentBg, 
      color: NAV_THEMES.dark.accentText 
    });
    gsap.set(document.documentElement, applyNavTheme("dark"));

    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      // 1. Hero to About Timeline (Dark → Light)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".hero", { opacity: 1, ease: "power3.out" }, 0);
      tl.fromTo(
        aboutRef.current,
        { 
          yPercent: 100, 
          scale: isMobile ? 1 : 0.85,  
          opacity: 1, 
          filter: isMobile ? "none" : "blur(6px)" 
        },
        { yPercent: 0, scale: 1, opacity: 1, filter: "none", ease: "power3.out" }
      );

      // Animate to light theme
      tl.to(".nav-icon", { 
        color: NAV_THEMES.light.icon, 
        backgroundColor: NAV_THEMES.light.iconBg, 
        ease: "power3.out" 
      }, 0.5);
      tl.to(".resume-button", { 
        backgroundColor: NAV_THEMES.light.accentBg, 
        color: NAV_THEMES.light.accentText, 
        ease: "power3.out" 
      }, 0.5);
      tl.to(document.documentElement, {
        ...applyNavTheme("light"),
        ease: "power3.out",
      }, 0.5);

      // 2. Tech Stack Timeline (stays light)
      const scene2 = gsap.timeline({
        scrollTrigger: {
          trigger: techSceneRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      scene2.fromTo(
        techSceneRef.current,
        { opacity: 1, scale: isMobile ? 1 : 0.8 }, 
        { opacity: 1, scale: 1, ease: "power3.out" }
      );

      // 3. Projects + Contact Timeline (Light → Dark)
      if (contactSceneRef.current && contactRef.current) {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            id: "project-section",
            trigger: contactSceneRef.current,
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        masterTl.to(".project-card:nth-child(1)", { yPercent: -75, ease: "none" });
        masterTl.to(".project-card:nth-child(2)", { yPercent: -95, ease: "none" }, "+=0.2");
        masterTl.to(".project-card:nth-child(3)", { yPercent: -95, ease: "none" }, "+=0.2");

        masterTl.fromTo(
          contactRef.current,
          { 
            yPercent: 100, 
            scale: isMobile ? 1 : 0.85, 
            opacity: 1, 
            filter: isMobile ? "none" : "blur(6px)" 
          },
          { yPercent: 0, scale: 1, opacity: 1, filter: "none", ease: "power2.out" }, 
          "+=0.2"
        );

        // Animate back to dark theme
        masterTl.to(".nav-icon", { 
          color: NAV_THEMES.dark.icon, 
          backgroundColor: NAV_THEMES.dark.iconBg, 
          ease: "power3.out" 
        }, "<0.2");
        masterTl.to(".resume-button", { 
          backgroundColor: NAV_THEMES.dark.accentBg, 
          color: NAV_THEMES.dark.accentText, 
          ease: "power3.out" 
        }, "<");
        masterTl.to(document.documentElement, {
          ...applyNavTheme("dark"),
          ease: "power3.out",
        }, "<");
      }
    });

    return () => {
      window.removeEventListener("scroll", showBackToTop);
      mm.revert(); 
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      <PreLoad />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <ProjectModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} />

      <div className={showAboutModal || showProjectModal ? "opacity-0 pointer-events-none" : "opacity-100"}
        style={{ transition: "opacity 0.5s ease" }}>

        <NavBar
          navRef={navContainerRef}
          menuIconRef={menuIconRef}
          resumeButtonRef={resumeButtonRef}
          onAboutClick={() => setShowAboutModal(true)}
          onProjectClick={scrollToProjects}
        />

        <BackToTop ref={backToTopRef} />

        <div ref={sceneRef} className="relative h-screen overflow-hidden">
          <Hero onProjectClick={scrollToProjects} />
          <div ref={aboutRef} className="absolute inset-0 z-10">
            {!showAboutModal && <About onOpenModal={() => setShowAboutModal(true)} />}
          </div>
        </div>

        <div className="relative">
          <div className="fixed inset-0 -z-10 bg-shared-stack" />
          <div ref={techSceneRef} className="relative h-screen overflow-hidden">
            <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 w-full">
              <button
                ref={physicsBtnRef}
                onClick={toggleMode}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                disabled={isTransitioning}
                style={{ transformStyle: "preserve-3d" }}
                className="px-6 py-3 md:px-8 md:py-3 bg-black text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl disabled:opacity-50 transition-colors duration-300 hover:bg-[#63938C] hover:text-black will-change-transform scale-95 md:scale-100"
              >
                <span style={{ transform: "translateZ(20px)", display: "block" }}>
                  {isPlayMode ? "Back to Info" : "Enable Physics"}
                </span>
              </button>
              <span className="text-[10px] uppercase font-bold text-black/40">
                {isPlayMode ? "Physics: ON" : "Physics: OFF"}
              </span>
            </div>
            <div ref={warpOverlayRef} className="..." />
            <div ref={contentWrapperRef} className={`relative w-full h-full ${isTransitioning ? 'pointer-events-none' : ''}`}>
              {isPlayMode ? (
                <>
                  <div className="absolute inset-0 z-10"><SecondaryStack  /></div>
                  <div className="absolute inset-0 z-20 pointer-events-none"><FloatingStack /></div>
                </>
              ) : (
                <Stack />
              )}
            </div>
          </div>
        </div>

        <div ref={contactSceneRef} className="relative h-screen overflow-hidden ">
          <Projects />
          <div ref={contactRef} className="absolute inset-0 z-[100]">
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}