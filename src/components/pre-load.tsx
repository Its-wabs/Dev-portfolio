"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from "gsap"; 

const PreLoad = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const revealerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    
    // Using a ref to track the actual animated value for GSAP
    const animatedProgress = useRef({ val: 0 });
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const imageSources = [
        "/img/hero-bg.webp",
        "/img/projects-bg.webp",
        "/img/about-bg.webp",
        "/img/bgmodal.webp",
        "/img/bimo-hero.png",
        "/img/edg.webp",
    ];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden"; 
        
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        let loadedCount = 0;
        const totalImages = imageSources.length;

        const updateProgress = () => {
            loadedCount++;
            const targetPercentage = Math.round((loadedCount / totalImages) * 100);
            
            // Tween the ref object instead of creating a new one from state
            gsap.to(animatedProgress.current, {
                val: targetPercentage,
                duration: 0.6,
                ease: "power1.out",
                onUpdate: () => {
                    
                    setProgress(Math.floor(animatedProgress.current.val));
                },
                onComplete: () => {
                    if (loadedCount === totalImages) {
                        setTimeout(() => setImagesLoaded(true), 400);
                    }
                }
            });
        };

        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; 
        });
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        const tl = gsap.timeline();

        tl.to(revealerRef.current, { 
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
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.2") 
            .to(revealerRef.current, { 
                scale: 0.4, 
                duration: 0.6, 
                ease: "power3.out" 
            }, "+=0.2") 
            .to(revealerRef.current, { 
                scale: 1.5, 
                duration: 1.2, 
                ease: "power4.inOut" 
            })
            .to(preloaderRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1.1,
                ease: "power4.inOut",
                onComplete : () => {
                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";
                }
            }, "-=0.2");

        return () => { tl.kill(); };
    }, [imagesLoaded]);

    return (
        <div 
            ref={preloaderRef} 
            className="preloader fixed inset-0 bg-[#0a0a0a] z-[999] overflow-hidden flex flex-col items-center justify-center"
        >
            <div 
                ref={revealerRef}
                className="preloader-revealer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] bg-[#63938C] scale-0 z-10 origin-center opacity-0 mix-blend-exclusion"
            />

            {!imagesLoaded && (
                <div className="z-20 flex flex-col items-center">
                    <span className="font-mono text-[12vw] md:text-[8vw] font-black text-[#63938C] leading-none tabular-nums">
                        {progress}%
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 mt-4 animate-pulse">
                        Downloading_Assets
                    </p>
                </div>
            )}
            
            <div 
                ref={textContainerRef}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-center justify-center text-center ${!imagesLoaded ? 'invisible' : 'visible'}`}
            >
                <h1 className="font-montserrat font-black text-[10vw] md:text-[6vw] leading-none text-[#d0e5eb] uppercase tracking-tighter">
                    hello !
                </h1>
            </div>
        </div>
    );
};

export default PreLoad;