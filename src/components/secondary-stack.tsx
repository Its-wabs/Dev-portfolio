"use client";

import { useRef } from "react";
import Matter from "matter-js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SecondaryStack = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([]);

  const secondaryStack = ["HTML", "CSS", "JavaScript", "Node.js", "SQL", "Zod", "REST APIs", "Git", "Vercel", "GSAP"];

  useGSAP(() => {
    if (!sceneRef.current) return;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const { Engine, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Body, Vector } = Matter;
    const engine = Engine.create();
    const world = engine.world;
    
    engine.gravity.y = 1; 

    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 4, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 4, wallOptions);
    
    Composite.add(world, [ground, leftWall, rightWall]);

    const allItems = gsap.utils.toArray<HTMLDivElement>(".secondary-item");
    
    // Clear refs to prevent duplicates on re-render
    itemsRef.current = [];

    allItems.forEach((el) => {
      const rectWidth = el.offsetWidth || 100;
      const rectHeight = el.offsetHeight || 30;
      const startX = Math.random() * (width - 100) + 50;
      const startY = -Math.random() * 500 - 100; 

      const body = Bodies.rectangle(startX, startY, rectWidth, rectHeight, {
        chamfer: { radius: 10 },
        restitution: 0.5, 
        friction: 0.5, 
        density: 0.05, 
      });

      itemsRef.current.push({ body, element: el });
      Composite.add(world, body);
    });

    const mouse = Mouse.create(sceneRef.current);
    
    // Directly updating mouse position properties
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (rect) {
        mouse.position.x = e.clientX - rect.left;
        mouse.position.y = e.clientY - rect.top;
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(world, mouseConstraint);

    Events.on(engine, "beforeUpdate", () => {
      const mousePos = mouse.position;
      itemsRef.current.forEach(({ body }) => {
        if (mouseConstraint.body !== body) {
          const dist = Vector.magnitude(Vector.sub(body.position, mousePos));
          const repelRadius = 200; 
          if (dist < repelRadius) {
            const forceMag = (1 - dist / repelRadius) * 0.005 * body.mass;
            const dir = Vector.normalise(Vector.sub(body.position, mousePos));
            Body.applyForce(body, body.position, { x: dir.x * forceMag, y: dir.y * forceMag });
          }
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Cleanup for requestAnimationFrame
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
      cancelAnimationFrame(requestId); 
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, { scope: sceneRef });

  return (
    <div ref={sceneRef} className="absolute inset-0 w-full h-full pointer-events-none">
      {secondaryStack.map((name) => (
        <div
          key={name}
          className="secondary-item absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none 
          px-8 py-4 md:px-12 md:py-6 
          rounded-full 
          bg-[#94A3B8] text-[#151414] 
          border-[2px] border-[#151414] 
          text-xl md:text-3xl font-black uppercase tracking-tighter
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          hover:bg-[#64748B] hover:text-white hover:scale-105 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          
          z-20 pointer-events-auto will-change-transform"
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default SecondaryStack;