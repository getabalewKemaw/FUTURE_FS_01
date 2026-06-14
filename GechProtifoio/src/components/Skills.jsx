import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef([]);

  useEffect(() => {
    const triggers = skillsRef.current.map((el, idx) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)",
          delay: idx * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
    return () => triggers.forEach((t) => t?.scrollTrigger?.kill());
  }, []);

  return (
    <section id="skills" className="section text-ink">
      <h2 className="section-title text-center mb-12 sm:mb-16">Technical Toolkit</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {portfolioData.skills.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (skillsRef.current[index] = el)}
            className="glass group p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center
                       transition-transform duration-300 ease-out will-change-transform
                       hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-400/30"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="text-4xl sm:text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">
              {skill.icon}
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-1 font-fira">{skill.name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-ibm-plex">{skill.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
