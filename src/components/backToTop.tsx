"use client";

import  { forwardRef } from "react";

const BackToTop = forwardRef<HTMLButtonElement>((props, ref) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={ref}
      onClick={scrollToTop}
      className="fixed bottom-7 left-2 z-[40] opacity-0 invisible flex items-center gap-3 bg-black text-white px-5 py-3 hover:bg-white hover:text-black transition-colors duration-300 group"
    >
      <i className="ri-arrow-up-line text-lg group-hover:animate-[bounce-custom_0.6s_infinite]" />
    </button>
  );
});

BackToTop.displayName = "BackToTop";

export default BackToTop;