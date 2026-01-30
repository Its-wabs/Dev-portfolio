"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/hero";
import About from "./components/about";
import NavBar from "./components/navbar";
import PreLoad from "./components/pre-load";
import TechStack from "./components/techstack";
import Projects from "./components/projects";
import Contact from "./components/contact";
import FloatingStack from "./components/floatingStack";
import Stack from "./components/stack";
import BackToTop from "./components/backToTop";
import AboutModal from "./components/aboutmodal";
import ProjectModal from "./components/projectmodal";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Refs for sections
  const sceneRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLElement>(null);
  const resumeButtonRef = useRef<HTMLAnchorElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const techSceneRef = useRef<HTMLDivElement>(null);
  const contactSceneRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Refs and State for the Warp Effect 
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const warpOverlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const backToTopRef = useRef<HTMLButtonElement>(null);

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const physicsBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
  // Constant "Zero-G" floating animation
  gsap.to(physicsBtnRef.current, {
    y: -6,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}, { scope: physicsBtnRef });

// 3. Physics hover handler
const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  const btn = physicsBtnRef.current;
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Moves button slightly towards mouse (Magnetic) and tilts it
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
  // Reset position with a slight "bounce" to feel like weight
  gsap.to(physicsBtnRef.current, {
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
    duration: 0.7,
    ease: "elastic.out(1, 0.5)",
  });
};

  // Warp Animation Toggle
  const toggleMode = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlayMode(!isPlayMode);

        gsap.fromTo(contentWrapperRef.current,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.2)",
            onComplete: () => {
              setIsTransitioning(false);
              // Refresh ScrollTrigger after the layout change
              ScrollTrigger.refresh();
            }
          }
        );

        gsap.to(warpOverlayRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    });

    tl.to(contentWrapperRef.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    });

    tl.fromTo(warpOverlayRef.current,
      { scale: 0, opacity: 0 },
      { scale: 2, opacity: 1, duration: 0.5, backgroundColor: "#000", ease: "power2.out" },
      "-=0.3"
    );
  };

  useEffect(() => {
    if (!sceneRef.current || !aboutRef.current) return;

    // BACK TO TOP LOGIC 
    const showBackToTop = () => {
      if (backToTopRef.current) {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;


        if (scrolled > viewportHeight * 0.8) {
          gsap.to(backToTopRef.current, {
            opacity: 1,
            visibility: "visible",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(backToTopRef.current, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    // Initial check
    showBackToTop();

    // Listen to scroll
    window.addEventListener("scroll", showBackToTop);


    // 1. SET INITIAL STATE IMMEDIATELY
    gsap.set(".nav-icon", { color: "#ffffff", backgroundColor: "transparent" });
    gsap.set(".resume-button", { backgroundColor: "#63938C", color: "#000" });
    gsap.set(document.documentElement, {
      "--nav-accent-bg": "#63938C",
      "--nav-accent-text": "#000",
      "--nav-icon-color": "#ffffff",
    });

    // 2. MAIN TIMELINE (Hero to About)
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
      { yPercent: 100, scale: 0.85, opacity: 1, filter: "blur(6px)" },
      { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)", ease: "power3.out" }
    );

    // 3. NAVBAR COLOR CHANGE
    tl.to(".nav-icon", { color: "#151414", backgroundColor: "rgba(0,0,0,0.05)", ease: "power3.out" }, 0.5);
    tl.to(".resume-button", { backgroundColor: "#151414", color: "#fff", ease: "power3.out" }, 0.5);
    tl.to(document.documentElement, {
      "--nav-accent-bg": "#151414",
      "--nav-accent-text": "#ffffff",
      "--nav-icon-color": "#151414",
      ease: "power3.out",
    }, 0.5);

    // SCENE 2: TECH STACK 
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
      { opacity: 1, scale: 0.8 },
      { opacity: 1, scale: 1, ease: "power3.out" }
    );

    // SCENE 3: THE MASTER PROJECTS + CONTACT SEQUENCE 
    if (contactSceneRef.current && contactRef.current) {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: contactSceneRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // First Project slides 
      masterTl.to(".project-card:nth-child(1)", {
        yPercent: -75,
        ease: "none"
      });

      // Second Project slides up on top
      masterTl.to(".project-card:nth-child(2)", {
        yPercent: -95,
        ease: "none",

      }, "+=0.2");

      //  Third Project slides up on top
      masterTl.to(".project-card:nth-child(3)", {
        yPercent: -95,
        ease: "none"
      }, "+=0.2");


      // Contact Section mirroring About entry
      masterTl.fromTo(
        contactRef.current,
        { yPercent: 100, scale: 0.85, opacity: 1, filter: "blur(6px)" },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out"
        }, "+=0.2"
      );

      // Navbar color restoration
      masterTl.to(".nav-icon", { color: "#ffffff", backgroundColor: "transparent", ease: "power3.out" }, "<0.2");
      masterTl.to(".resume-button", { backgroundColor: "#63938C", color: "#000", ease: "power3.out" }, "<");
      masterTl.to(document.documentElement, {
        "--nav-accent-bg": "#63938C",
        "--nav-accent-text": "#000",
        "--nav-icon-color": "#ffffff",
        ease: "power3.out",
      }, "<");
    }

    return () => {
      window.removeEventListener("scroll", showBackToTop); 
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, []);

  return (
    <main className="relative w-sfull overflow-x-hidden">
      <PreLoad />

      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />

      {/* Note: Kept ProjectModal here i will change it to case studies in the future */}
      <ProjectModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} />

      <div className={showAboutModal || showProjectModal ? "opacity-0 pointer-events-none" : "opacity-100"}
        style={{ transition: "opacity 0.5s ease" }}>


        <NavBar
  navRef={navContainerRef}
  menuIconRef={menuIconRef}
  resumeButtonRef={resumeButtonRef}
  onAboutClick={() => setShowAboutModal(true)}
  onProjectClick={() => {
    if (contactSceneRef.current) {
      
      const sectionTop = contactSceneRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight * 1; 
      
      window.scrollTo({
        top: sectionTop + offset, 
        behavior: "smooth"
      });
    }
  }}
/>


        <BackToTop ref={backToTopRef} />

        {/* SCENE 1: HERO → ABOUT */}
        <div ref={sceneRef} className="relative h-screen overflow-hidden">
          <Hero />
          <div ref={aboutRef} className="absolute inset-0 z-10">
            {!showAboutModal && <About onOpenModal={() => setShowAboutModal(true)} />}

          </div>
        </div>

        {/* SCENE 2: TECH STACK */}
        <div className="relative">
          <div className="fixed inset-0 -z-10 bg-shared-stack" />
          <div ref={techSceneRef} className="relative h-screen overflow-hidden">

            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2">
             <button
  ref={physicsBtnRef}
  onClick={toggleMode}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  disabled={isTransitioning}
  style={{ transformStyle: "preserve-3d" }} // Required for 3D tilt
  className="px-8 py-3 bg-black text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xl disabled:opacity-50 transition-colors duration-300 hover:bg-[#63938C] hover:text-black will-change-transform"
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

            {/* pointer-events-none during transition to prevent scroll hijacking */}
            <div
              ref={contentWrapperRef}
              className={`relative w-full h-full ${isTransitioning ? 'pointer-events-none' : ''}`}
            >
              {isPlayMode ? (
                <>
                  <div className="absolute inset-0 z-10"><TechStack /></div>
                  <div className="absolute inset-0 z-20 pointer-events-none"><FloatingStack /></div>
                </>
              ) : (
                <Stack />
              )}
            </div>
          </div>
        </div>

        {/* SCENE 4: PROJECTS AND CONTACT */}
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