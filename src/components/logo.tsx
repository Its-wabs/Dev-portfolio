"use client";
import clsx from "clsx";

interface LogoProps {
  id: string;
  title: string;
}

const Logo = ({ id, title }: LogoProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 flex items-center gap-1 cursor-pointer overflow-hidden py-1"
      )}
      style={{
        color: "var(--nav-logo-color, #EBE5D0)" 
      }}
    >
     
      <span className="relative flex overflow-hidden font-black text-lg md:text-xl tracking-tighter uppercase transition-colors duration-500">
        {/* Top Layer */}
        <div className="flex transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {title}
        </div>
        {/* Bottom Layer */}
        <div 
          className="absolute inset-0 flex translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
          style={{ color: "var(--nav-accent-bg)" }}
        >
          {title}
        </div>
      </span>
   
    </button>
  );
};

export default Logo;