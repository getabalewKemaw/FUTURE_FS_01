import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCircle } from "react-icons/fa";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const timelineRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const triggers = timelineRef.current.map((el, i) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.6)",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    // Draw the timeline line on scroll
    const line = lineRef.current;
    let lineTween = null;
    if (line) {
      lineTween = gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      triggers.forEach((t) => t?.scrollTrigger?.kill());
      lineTween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section id="experience" className="section text-ink overflow-hidden">
      <h2 className="section-title text-center mb-12 sm:mb-16">Journey So Far</h2>

      <div className="relative flex flex-col items-center">
        <div
          ref={lineRef}
          className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500/70 to-blue-700/60 z-0"
        />

        <div className="w-full flex flex-col gap-12 sm:gap-16 z-10">
          {portfolioData.experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => (timelineRef.current[idx] = el)}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {isLeft && (
                  <div className="md:w-1/2 w-full pr-0 md:pr-8 flex flex-col items-end">
                    <div className="bg-white p-6 rounded-2xl text-left w-full max-w-md border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/50">
                      <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 font-fira">
                        {exp.role}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line font-ibm-plex leading-relaxed">
                        {exp.description.trim()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center mx-4 my-2 md:my-0">
                  <span className="flex items-center justify-center w-8 h-8 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30 border-4 border-white z-10">
                    <FaCircle className="text-white text-[10px]" />
                  </span>
                  <span className="text-cyan-400 font-bold text-xs sm:text-sm mt-2 md:mt-3 whitespace-nowrap font-fira">
                    {exp.year}
                  </span>
                </div>

                {!isLeft && (
                  <div className="md:w-1/2 w-full pl-0 md:pl-8 flex flex-col items-start">
                    <div className="bg-white p-6 rounded-2xl text-left w-full max-w-md border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/50">
                      <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 font-fira">
                        {exp.role}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line font-ibm-plex leading-relaxed">
                        {exp.description.trim()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
