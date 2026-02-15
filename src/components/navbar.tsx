import gsap from "gsap";
import { useEffect, useRef, useState, forwardRef } from "react";
import Logo from "./logo";

interface NavBarProps {
  navRef?: React.RefObject<HTMLDivElement>;
  menuIconRef?: React.RefObject<HTMLElement>;
  resumeButtonRef?: React.RefObject<HTMLAnchorElement>;
  onAboutClick?: () => void;
  onProjectClick?: () => void;
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(({
  navRef: externalNavRef,
  menuIconRef: externalMenuIconRef,
  resumeButtonRef: externalResumeButtonRef,
  onAboutClick,
  onProjectClick,
}) => {
  const internalNavRef = useRef<HTMLDivElement>(null);
  const internalMenuIconRef = useRef<HTMLElement>(null);
  const internalResumeButtonRef = useRef<HTMLAnchorElement>(null);
  
  
  const navContainerRef = externalNavRef || internalNavRef;
  const menuIconRef = externalMenuIconRef || internalMenuIconRef;
  const resumeButtonRef = externalResumeButtonRef || internalResumeButtonRef;
  
  
const aboutButtonRef = useRef<HTMLAnchorElement | null>(null);
const projectsButtonRef = useRef<HTMLAnchorElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

   const openResume = () => {

    const pdfUrl = '/resume.pdf';
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    
   
  };



  // Toggle menu animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animate menu items 
  useEffect(() => {
    if (!menuIconRef.current || !resumeButtonRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    if (isMenuOpen) {
      // OPEN MENU
      tl.to(menuIconRef.current, {
        rotation: 180,
        scale: 1.1,
        duration: 0.3,
        onComplete: () => {
          if (menuIconRef.current) {
            menuIconRef.current.classList.remove("ri-menu-line");
            menuIconRef.current.classList.add("ri-close-large-line");
          }
        }
      })
      .to(menuIconRef.current, {
        scale: 1,
        duration: 0.2,
      }, "-=0.1");

      // Create and animate About button 
      if (!aboutButtonRef.current) {
        const aboutButton = document.createElement("a");
        aboutButton.href = "#about";
        aboutButton.innerHTML = "About";
        aboutButton.className = "nav-menu-item opacity-0 translate-x-10 bg-[var(--nav-accent-bg)] text-[var(--nav-accent-text)] font-semibold uppercase px-4 py-2 text-[0.8rem] tracking-wider cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-[1.02] active:scale-95";
        
        aboutButton.addEventListener("click", (e) => {
          e.preventDefault();
          setIsMenuOpen(false);
          if (onAboutClick) onAboutClick();
        });

        // hover effect
        aboutButton.addEventListener("mouseenter", () => {
          gsap.to(aboutButton, {
            y: -5,
            scale: 1.02,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        aboutButton.addEventListener("mouseleave", () => {
          gsap.to(aboutButton, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)" 
          });
        });
        
        if (menuIconRef.current.parentNode) {
          menuIconRef.current.parentNode.insertBefore(aboutButton, menuIconRef.current);
        }
        aboutButtonRef.current = aboutButton;
      }

      // Create and animate Projects button
      if (!projectsButtonRef.current) {
        const projectsButton = document.createElement("a");
        projectsButton.href = "#projects";
        projectsButton.innerHTML = "Projects";
        projectsButton.className = "nav-menu-item opacity-0 translate-x-10 bg-[var(--nav-accent-bg)] text-[var(--nav-accent-text)] font-semibold uppercase px-4 py-2 text-[0.8rem] tracking-wider cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-[1.02] active:scale-95";
        
        projectsButton.addEventListener("click", (e) => {
          e.preventDefault();
          setIsMenuOpen(false);
          if (onProjectClick) onProjectClick();
        });

        // hover effect
        projectsButton.addEventListener("mouseenter", () => {
          gsap.to(projectsButton, {
            y: -5,
            scale: 1.02,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        projectsButton.addEventListener("mouseleave", () => {
          gsap.to(projectsButton, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)" 
          });
        });
        
        if (menuIconRef.current.parentNode) {
          menuIconRef.current.parentNode.insertBefore(projectsButton, menuIconRef.current);
        }
        projectsButtonRef.current = projectsButton;
      }

      // Animate menu items 
      if (aboutButtonRef.current && projectsButtonRef.current) {
        tl.to([aboutButtonRef.current, projectsButtonRef.current], {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
        }, "-=0.2");
      }

    } else {
      // CLOSE MENU
      if (aboutButtonRef.current && projectsButtonRef.current) {
        tl.to([projectsButtonRef.current, aboutButtonRef.current], {
          x: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          onComplete: () => {
            aboutButtonRef.current?.remove();
            projectsButtonRef.current?.remove();
            aboutButtonRef.current = null;
            projectsButtonRef.current = null;
          }
        });
      }

      if (resumeButtonRef.current) {
        tl.to(resumeButtonRef.current, {
          x: 0,
          duration: 0.3,
        }, "-=0.2");
      }

      tl.to(menuIconRef.current, {
        rotation: 0,
        scale: 1.1,
        duration: 0.3,
        onComplete: () => {
          if (menuIconRef.current) {
            menuIconRef.current.classList.remove("ri-close-large-line");
            menuIconRef.current.classList.add("ri-menu-line");
          }
        }
      })
      .to(menuIconRef.current, {
        scale: 1,
        duration: 0.2,
      }, "-=0.1");
    }
  }, [isMenuOpen, menuIconRef, resumeButtonRef, onAboutClick, onProjectClick]);



  return (
    <div
      ref={navContainerRef}
      className="navbar fixed top-4 z-40 h-16 border-none border-transparent rounded-lg transition-all duration-700 sm:inset-x-9"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between px-4">
          {/* Logo */}
          <Logo id="logo" title="wabs" />

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Resume Button */}
            <a
              ref={resumeButtonRef}
              href="https://drive.google.com/your-pdf-link"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button group relative flex items-center justify-center gap-0 overflow-hidden px-5 py-2 text-[0.8rem] font-semibold uppercase transition-all duration-300 hover:gap-2"
              style={{
                backgroundColor: "var(--nav-accent-bg)",
                color: "var(--nav-accent-text)",
              }}
              onClick={openResume}
            >
              {/* The North Star Icon */}
              <i className="ri-shining-2-fill text-[0px] opacity-0 transition-all duration-300 ease-out group-hover:text-[1rem] group-hover:opacity-100 group-hover:rotate-[135deg] group-hover:animate-[star-pulse_2s_infinite_ease-in-out]"></i>
              
              <span className="relative">Resume</span>
            </a>

            {/* Menu Icon */}
            <i
              ref={menuIconRef}
              className="nav-icon ri-menu-line flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-colors"
              style={{
                color: "var(--nav-icon-color)",
              }}
              onClick={toggleMenu}
            ></i>
          </div>
        </nav>
      </header>
    </div>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;