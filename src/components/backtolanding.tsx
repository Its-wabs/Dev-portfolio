"use client";


interface BackToLandingProps {
  onClose: () => void;
}

const BackToLanding = ({ onClose }: BackToLandingProps) => {
  return (
    <button
      onClick={onClose}
      className="fixed top-10 left-4 z-[110] flex items-center gap-3 bg-[#63938C] text-white px-5 py-3 hover:bg-black hover:text-white transition-colors duration-300 group"
    >
      <i className="ri-arrow-left-line text-lg group-hover:-translate-x-1 transition-transform duration-300"></i>
      <span className="font-mono text-xs uppercase tracking-widest font-bold">
        Return to Base
      </span>
    </button>
  );
};

export default BackToLanding;