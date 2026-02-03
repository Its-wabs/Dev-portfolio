"use client";
import { useRef, ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  children: string; 
  tag?: ElementType; 
  className?: string; 
  delay?: number; 
}

const RevealText = ({ children, tag: Tag = "div", className = "", delay = 0 }: RevealTextProps) => {
  
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll(".word");
    if (!words) return;

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 }, 
      {
        y: "0%",
        opacity: 1,
        duration: 1.4,
        ease: "power4.out", 
        stagger: 0.05, 
        delay: delay, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", 
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  
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