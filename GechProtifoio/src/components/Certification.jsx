import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Certification = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const triggers = cardsRef.current.map((el, idx) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.6)",
          delay: idx * 0.08,
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
    <section id="certification" className="section text-ink overflow-hidden">
      <h2 className="section-title text-center mb-12 sm:mb-16">Certifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {portfolioData.certifications.map((cert, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="glass group relative flex flex-col h-full rounded-3xl overflow-hidden
                       transition-transform duration-300 ease-out will-change-transform
                       hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] p-4"
          >
            <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-black/30 rounded-2xl">
              <img
                src={cert.image}
                alt={cert.title || "Certification"}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
            {cert.title && (
              <div className="px-1 pt-4 pb-1">
                <p className="text-sm font-fira text-cyan-300/90 uppercase tracking-widest">
                  {cert.issuer} · {cert.date}
                </p>
                <h3 className="text-base font-bold mt-1">{cert.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certification;
