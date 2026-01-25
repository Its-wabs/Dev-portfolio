"use client";
import { useRef, ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  children: string; // The text to animate
  tag?: ElementType; // Use ElementType instead of keyof JSX.IntrinsicElements
  className?: string; // Tailwind classes
  delay?: number; // Delay in seconds (useful for Hero/Preloader sync)
}

const RevealText = ({ children, tag: Tag = "div", className = "", delay = 0 }: RevealTextProps) => {
  // Use HTMLElement as the ref type since it works for all HTML elements
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll(".word");
    if (!words) return;

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 }, // Start hidden below
      {
        y: "0%",
        opacity: 1,
        duration: 1.4,
        ease: "power4.out", // "Editorial" ease
        stagger: 0.05, // Stagger per word
        delay: delay, // Wait for preloader if needed
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Start when just barely visible
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  // Split text into words safely
  const words = children.split(" ");

  return (
    <Tag 
      ref={containerRef as React.Ref<HTMLElement>} 
      className={`flex flex-wrap gap-[0.3em] ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="relative overflow-hidden inline-flex">
          <span className="word translate-y-full opacity-0 block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;