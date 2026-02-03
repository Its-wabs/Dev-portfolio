"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from "gsap"; 

const PreLoad = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const revealerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const imageSources = [
        "/img/hero-bg.png",
        "/img/about-bg.png",
        "/img/projects-bg.png",
        "/img/bgmodal.png"
    ];

    useEffect(() => {
        let loadedCount = 0;
        const totalImages = imageSources.length;

        const updateProgress = () => {
            loadedCount++;
            const percentage = Math.round((loadedCount / totalImages) * 100);
            
            
            gsap.to({ val: progress }, {
                val: percentage,
                duration: 0.5,
                onUpdate: function() {
                    setProgress(Math.floor(this.targets()[0].val));
                },
                onComplete: () => {
                    if (loadedCount === totalImages) {
                        // Give it a tiny delay at 100% for the user to read it
                        setTimeout(() => setImagesLoaded(true), 200);
                    }
                }
            });
        };

        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Don't hang on broken images
        });
    }, []);

   useEffect(() => {
        if (!imagesLoaded) return;

        const tl = gsap.timeline();

        tl
            // Initial burst (Small dot)
            .to(revealerRef.current, { 
                scale: 0.1, 
                duration: 0.6, 
                opacity: 1,
                ease: "power2.out" 
            }, 0.5)

            //  Expand to second phase
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

            // 4. Continue expansion
            .to(revealerRef.current, { 
                scale: 0.4, 
                duration: 0.6, 
                ease: "power3.out" 
            }, "+=0.2") // Added a tiny pause so user can actually read "Hello"

            // 5. Final Scale to cover everything
            .to(revealerRef.current, { 
                scale: 1.5, 
                duration: 1.2, 
                ease: "power4.inOut" 
            })
            
            // 6. FINAL EXIT
            .to(preloaderRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1.1,
                ease: "power4.inOut",
            }, "-=0.2");

        return () => { tl.kill(); };
    }, [imagesLoaded]);

    return (
        <div 
            ref={preloaderRef} 
            className="preloader fixed inset-0 bg-[#0a0a0a] z-[999] overflow-hidden flex flex-col items-center justify-center"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
            {/* The Reveal Square */}
            <div 
                ref={revealerRef}
                className="preloader-revealer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] bg-[#63938C] scale-0 z-10 origin-center opacity-0 mix-blend-exclusion"
            />

            {/* Counter (Visible while loading) */}
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
            
            {/* Hello Message (Visible after loading) */}
            <div 
                ref={textContainerRef}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-center justify-center text-center ${!imagesLoaded ? 'invisible' : 'visible'}`}
            >
                <h1 className="font-montserrat font-black text-[10vw] md:text-[6vw] leading-none text-[#d0e5eb] uppercase tracking-tighter">
                    hello !
                </h1>
                <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.8em] text-[#EBE5D0]/40 mt-4 whitespace-nowrap">
                    Visual_Engine_Live
                </p>
            </div>
        </div>
    );
};

export default PreLoad;