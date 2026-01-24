"use client";

import  { useRef } from "react";
import Matter from "matter-js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FloatingStack = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([]);

  const mainStack = ["Next.Js", "React", "Prisma", "Supabase", "TypeScript", "GSAP", "Tailwind"];

  useGSAP(() => {
    const width = sceneRef.current?.clientWidth || window.innerWidth;
    const height = sceneRef.current?.clientHeight || window.innerHeight;

    const { Engine, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Body, Vector } = Matter;
    const engine = Engine.create();
    const world = engine.world;
    
    engine.gravity.y = 0; 
    engine.gravity.x = 0;

    const verticalPadding = 120;
    const horizontalPadding = 100;
    const wallOptions = { isStatic: true, render: { visible: false }, friction: 0, restitution: 1 };

    const walls = [
      Bodies.rectangle(width / 2, verticalPadding - 50, width, 100, wallOptions),
      Bodies.rectangle(width / 2, height - verticalPadding + 50, width, 100, wallOptions),
      Bodies.rectangle(horizontalPadding - 50, height / 2, 100, height, wallOptions),
      Bodies.rectangle(width - horizontalPadding + 50, height / 2, 100, height, wallOptions)
    ];

    const centerBox = Bodies.rectangle(width / 2, height / 2, 400, 150, { isStatic: true, render: { visible: false } });
    Composite.add(world, [...walls, centerBox]);

    const allItems = gsap.utils.toArray<HTMLDivElement>(".main-item");
    allItems.forEach((el) => {
      const rectWidth = el.offsetWidth || 120;
      const rectHeight = el.offsetHeight || 40;
      const startX = Math.random() * (width - horizontalPadding * 2) + horizontalPadding;
      const startY = Math.random() * (height - verticalPadding * 2) + verticalPadding;

      const body = Bodies.rectangle(startX, startY, rectWidth, rectHeight, {
        chamfer: { radius: 20 },
        restitution: 0.8,
        friction: 0,
        frictionAir: 0.03,
        density: 0.01,
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 });
      itemsRef.current.push({ body, element: el });
      Composite.add(world, body);
    });

    const mouse = Mouse.create(sceneRef.current!);

    // FIX: Bridge global mouse movement to Matter.js
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (rect) {
        Mouse.setPosition(mouse, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);

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
          const repelRadius = 250; 

          if (dist < repelRadius) {
            const forceMag = (1 - dist / repelRadius) * 0.001 * body.mass;
            const dir = Vector.normalise(Vector.sub(body.position, mousePos));
            Body.applyForce(body, body.position, { x: dir.x * forceMag, y: dir.y * forceMag });
          }

          const forceX = Math.sin(time + index * 10) * 0.00005 * body.mass;
          const forceY = Math.cos(time + index * 15) * 0.00005 * body.mass;
          Body.applyForce(body, body.position, { x: forceX, y: forceY });
          Body.setAngularVelocity(body, body.angularVelocity * 0.98);
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      itemsRef.current.forEach(({ body, element }) => {
        gsap.set(element, {
          x: body.position.x - element.offsetWidth / 2,
          y: body.position.y - element.offsetHeight / 2,
          rotation: body.angle * (180 / Math.PI),
        });
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
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
          className="main-item absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none px-6 py-2 rounded-full border shadow-2xl whitespace-nowrap bg-black text-white border-white/20 font-bold z-20 pointer-events-auto"
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default FloatingStack;