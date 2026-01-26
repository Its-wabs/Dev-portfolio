"use client";

import { useRef } from "react";
import Matter from "matter-js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TechStack = () => {
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
    
    engine.gravity.y = 1; // Gravity enabled for the "piling" effect

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
    
    // FIXED: Directly updating mouse position properties
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

    // FIXED: Cleanup for requestAnimationFrame
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
      cancelAnimationFrame(requestId); // Stop the loop
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, { scope: sceneRef });

  return (
    <div ref={sceneRef} className="absolute inset-0 w-full h-full pointer-events-none">
      {secondaryStack.map((name) => (
        <div
          key={name}
          className="secondary-item absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none px-6 py-2 rounded-full border shadow-sm whitespace-nowrap bg-white/90 backdrop-blur-md text-gray-500 border-gray-200 text-sm font-medium z-10 pointer-events-auto"
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default TechStack;