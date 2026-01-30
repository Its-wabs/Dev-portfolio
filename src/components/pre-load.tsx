"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from "gsap"; 

const PreLoad = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const revealerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // List all your background images from index.css here
    const imageSources = [
        "/img/hero-bg.png",
        "/img/about-bg.png",
        "/img/projects-bg.png",
        "/img/bgmodal.png"
    ];

    useEffect(() => {
        // 1. IMAGE PRELOADING LOGIC
        const loadImage = (src: string) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // Resolve anyway to avoid getting stuck
            });
        };

        const loadAllImages = async () => {
            await Promise.all(imageSources.map(src => loadImage(src)));
            setImagesLoaded(true);
        };

        loadAllImages();
    }, []);

    useEffect(() => {
        
        if (!imagesLoaded) return;

        const tl = gsap.timeline();

        tl
            .to(revealerRef.current, { 
                scale: 0.1, 
                duration: 0.6, 
                opacity: 1,
                ease: "power2.out" 
            }, 0.5)
            .to(revealerRef.current, { 
                scale: 0.25, 
                duration: 0.8, 
                ease: "expo.out" 
            })
            .to(textContainerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.6")
            .to(revealerRef.current, { 
                scale: 0.4, 
                duration: 0.6, 
                ease: "power3.out" 
            })
            // Final Scale to cover everything
            .to(revealerRef.current, { 
                scale: 1.5, 
                duration: 1.2, 
                ease: "power4.inOut" 
            })
            // FINAL EXIT
            .to(preloaderRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1.1,
                ease: "power4.inOut",
                onComplete: () => {
                }
            }, "-=0.2");

        return () => {
            tl.kill();
        };
    }, [imagesLoaded]);

    return (
        <div 
            ref={preloaderRef} 
            className="preloader fixed inset-0 bg-[#0a0a0a] z-[999] overflow-hidden"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
            <div 
                ref={revealerRef}
                className="preloader-revealer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] bg-[#63938C] scale-0 z-10 origin-center opacity-0 mix-blend-exclusion"
            />
            
            <div 
                ref={textContainerRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 pointer-events-none select-none flex flex-col items-center justify-center text-center"
            >
                <h1 className="font-montserrat font-black text-[10vw] md:text-[6vw] leading-none text-[#d0e5eb] uppercase tracking-tighter">
                    {imagesLoaded ? "hello !" : "loading..."}
                </h1>
                <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.8em] text-[#EBE5D0]/40 mt-4 whitespace-nowrap">
                    {imagesLoaded ? "Visual_Engine_Live" : "Initializing_Assets"}
                </p>
            </div>
        </div>
    );
};

export default PreLoad;