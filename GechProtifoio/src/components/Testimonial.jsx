import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonialData = [
  {
    name: "Altaseb Cherent",
    role: "Full Stack Developer",
    image: "https://avatars.githubusercontent.com/u/185071027?v=4",
    text: "Getabalew is a highly skilled developer! His React and collaboration skills made our project come alive. Truly professional and punctual.",
  },
  {
    name: "Leta Kasahun",
    role: "Full Stack Developer",
    image: "https://avatars.githubusercontent.com/u/193022391?v=4",
    text: "Working with Getabalew was seamless. His backend skills elevated our app, making it both intuitive and visually stunning.",
  },
  {
    name: "Getahun Mengste",
    role: "Front End Developer",
    image: "/images/gech.png",
    text: "Getabalew's attention to detail and coding skills are exceptional. He turned our concepts into interactive experiences effortlessly.",
  },
];

const Testimonial = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const triggers = cardsRef.current.map((el, idx) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.6)",
          delay: idx * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
    return () => triggers.forEach((t) => t?.scrollTrigger?.kill());
  }, []);

  return (
    <section id="testimonial" className="section text-white overflow-hidden">
      <h2 className="section-title text-center mb-12 sm:mb-16">Kind Words</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonialData.map((item, index) => (
          <figure
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="glass group p-6 sm:p-7 rounded-2xl flex flex-col items-center text-center w-full h-full
                       transition-transform duration-300 ease-out will-change-transform
                       hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-400/30"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-4 border-cyan-400/60 shadow-lg shadow-cyan-400/30"
              loading="lazy"
              decoding="async"
            />
            <h3 className="text-lg sm:text-xl font-bold mb-1 font-fira">{item.name}</h3>
            <p className="text-cyan-400 text-xs sm:text-sm mb-3 font-fira uppercase tracking-widest">
              {item.role}
            </p>
            <blockquote className="text-gray-300 text-sm sm:text-base font-ibm-plex leading-relaxed italic">
              "{item.text}"
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
