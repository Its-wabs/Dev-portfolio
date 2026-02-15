"use client";

import { useRef } from "react";
import Matter from "matter-js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FloatingStack = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([]);

  const mainStack = ["Next.Js", "React", "Prisma", "Supabase", "TypeScript", "GSAP", "Tailwind"];

  useGSAP(() => {
    if (!sceneRef.current) return;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;
    const isMobile = width < 768;

    const { Engine, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Body, Vector } = Matter;
    const engine = Engine.create();
    const world = engine.world;
    
    // Initial State
    engine.gravity.y = 0; 
    engine.gravity.x = 0;

    const verticalPadding = isMobile ? 60 : 120; 
    const horizontalPadding = isMobile ? 20 : 100;
    const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.2, restitution: 0.5 };

    // Walls

    const walls = [
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions), 
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), 
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions), 
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions) 
    ];

    // Only add center obstacle on Desktop to keep mobile clean
    if (!isMobile) {
      const centerBox = Bodies.rectangle(width / 2, height / 2, 400, 150, { isStatic: true, render: { visible: false } });
      Composite.add(world, [centerBox]);
    }
    
    Composite.add(world, walls);

    const allItems = gsap.utils.toArray<HTMLDivElement>(".main-item");
    itemsRef.current = []; 

    allItems.forEach((el) => {
      const rectWidth = el.offsetWidth;
      const rectHeight = el.offsetHeight;
      
      
      const startX = Math.random() * (width - horizontalPadding * 2) + horizontalPadding;
      const startY = isMobile 
        ? Math.random() * (height * 0.3) + 100 
        : Math.random() * (height - verticalPadding * 2) + verticalPadding;

      const body = Bodies.rectangle(startX, startY, rectWidth, rectHeight, {
        chamfer: { radius: rectHeight / 2 },
        restitution: 0.6,
        friction: 0.1,
        frictionAir: isMobile ? 0.04 : 0.03, 
        density: 0.01,
      });

      
      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * (isMobile ? 2 : 4), 
        y: (Math.random() - 0.5) * (isMobile ? 2 : 4) 
      });
      
      itemsRef.current.push({ body, element: el });
      Composite.add(world, body);
    });

    // MOBILE PERFORMANCE 
    if (isMobile) {
      // Trigger fall after 3 seconds
      gsap.delayedCall(3, () => {
        engine.gravity.y = 1.5; 
        
        
        itemsRef.current.forEach(({ body }) => {
          Body.applyForce(body, body.position, { 
            x: (Math.random() - 0.5) * 0.005, 
            y: 0 
          });
        });
      });
    }

    const mouse = Mouse.create(sceneRef.current!);
    
    // Improved mouse handling for touch/mobile
    const handleGlobalMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (rect) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        mouse.position.x = clientX - rect.left;
        mouse.position.y = clientY - rect.top;
      }
    };
    
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("touchmove", handleGlobalMouseMove, { passive: false });

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(world, mouseConstraint);

    Events.on(engine, "beforeUpdate", () => {
      const time = Date.now() * 0.001;
      const mousePos = mouse.position;

      itemsRef.current.forEach(({ body }, index) => {
        if (mouseConstraint.body !== body) {
          const dist = Vector.magnitude(Vector.sub(body.position, mousePos));
          const repelRadius = isMobile ? 150 : 250; 

          if (dist < repelRadius) {
            const forceMag = (1 - dist / repelRadius) * 0.001 * body.mass;
            const dir = Vector.normalise(Vector.sub(body.position, mousePos));
            Body.applyForce(body, body.position, { x: dir.x * forceMag, y: dir.y * forceMag });
          }

          // Gentle ambient sway (only strongly active when gravity is 0)
          const ambientForce = engine.gravity.y === 0 ? 0.00005 : 0.00001;
          const forceX = Math.sin(time + index * 10) * ambientForce * body.mass;
          const forceY = Math.cos(time + index * 15) * ambientForce * body.mass;
          
          Body.applyForce(body, body.position, { x: forceX, y: forceY });
          Body.setAngularVelocity(body, body.angularVelocity * 0.98);
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    let requestId: number;
    const update = () => {
      itemsRef.current.forEach(({ body, element }) => {
        gsap.set(element, {
          x: body.position.x - element.offsetWidth / 2,
          y: body.position.y - element.offsetHeight / 2,
          rotation: body.angle * (180 / Math.PI),
        });
      });
      requestId = requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchmove", handleGlobalMouseMove);
      cancelAnimationFrame(requestId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, { scope: sceneRef });

  return (
    <div ref={sceneRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="text-8xl md:text-[12rem] font-black text-black/[0.03] select-none">STACK</h1>
      </div>

      {mainStack.map((name) => (
        <div
          key={name}
          className="main-item absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none 
          px-6 py-3 md:px-12 md:py-6 
          rounded-full 
          bg-[#EBE5D0] text-[#151414] 
          border-[2px] md:border-[3px] border-[#151414] 
          text-2xl md:text-7xl font-black uppercase tracking-tighter
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          hover:bg-[#63938C] hover:text-white hover:scale-105 
          transition-colors duration-300
          z-20 pointer-events-auto will-change-transform"
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default FloatingStack;