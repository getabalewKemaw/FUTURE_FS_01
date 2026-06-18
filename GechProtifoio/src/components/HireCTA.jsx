import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaDownload, FaCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const HireCTA = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hire-content",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-10">
      <div
        className="hire-content relative overflow-hidden rounded-[2.5rem] border border-cyan-200/60 shadow-xl shadow-cyan-500/10 p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{
          background: "linear-gradient(135deg, #f0fdff 0%, #e0f7fa 40%, #f6f7f9 100%)",
          backgroundImage:
            "linear-gradient(135deg, #f0fdff 0%, #ecfeff 50%, #f6f7f9 100%), radial-gradient(circle, rgba(6,182,212,0.10) 1px, transparent 1px)",
          backgroundSize: "cover, 22px 22px",
        }}
      >
        {/* Glow blob */}
        <div
          aria-hidden
          className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)" }}
        />

        {/* Left — text */}
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Available badge */}
          <span className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 text-xs font-bold font-fira px-4 py-1.5 rounded-full shadow-sm mb-5 uppercase tracking-wider">
            <FaCircle className="text-green-400 animate-pulse" size={8} />
            Open to Work
          </span>

          <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-gray-800 leading-tight mb-3">
            Let's Build Something <br />
            <span className="text-cyan-500">Great Together</span>
          </h2>

          <p className="text-gray-500 font-ibm-plex text-sm sm:text-base max-w-md leading-relaxed">
            I'm currently available for full-time roles, freelance contracts, and exciting collaborations.
            If you have a product to ship, let's talk.
          </p>
        </div>

        {/* Right — actions */}
        <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-4 shrink-0">
          <a
            href="mailto:getabalewkemaw@gmail.com"
            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 text-sm font-ibm-plex whitespace-nowrap"
          >
            <FaEnvelope /> Hire Me
          </a>
     <a
  href="https://drive.google.com/file/d/1PxyLQlpbbmK0rnVL7Tz46qsdtZqKOtUR/view?usp=drive_link"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2.5 bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl shadow-sm hover:border-cyan-400 hover:text-cyan-600 hover:-translate-y-1 transition-all duration-300 text-sm font-ibm-plex whitespace-nowrap"
>
  <FaDownload />
  View Resume
</a>
        </div>
      </div>
    </section>
  );
};

export default HireCTA;
