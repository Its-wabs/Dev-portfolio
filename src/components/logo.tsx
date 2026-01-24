import clsx from "clsx";

interface LogoProps {
  id : string;
  title : string;

}

const Logo = ({ id, title} : LogoProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden font-general uppercase items-center justify-center font-black text-1xl sm:text-4xl md:text-3xl lg:text-[1rem] text-[#cda432]",
        
      )}
    >
     

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      
    </button>
  );
};

export default Logo;
