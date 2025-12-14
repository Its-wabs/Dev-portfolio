import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
    });
      gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
    return ( 
           <div className="relative h-dvh w-screen overflow-x-hidden">
     

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-goldenbronz-900"
      >
        

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
  <img
    src="../public/img/hero.png"
    alt="Illustrated system panel"
    className="max-w-[100%] max-h-[100%] object-contain"
  />
</div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font text-6xl hero-heading text-blue-100">
              Hi<b>,</b>I am Normy
            </h1>

            <p className="mb-5 max-w-100 font-robert-regular uppercase text-2xl text-blue-100">
              Creative Sotware engineer <br /> Building apps that feels alive
            </p>

           
          </div>
          
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white">
        building a better world
      </h1>
       
      </div>

      
    </div>
     );
}
 
export default Hero;