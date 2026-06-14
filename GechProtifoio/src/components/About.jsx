import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import portfolioData from "../constants/portfolioData";
import { FaDownload } from "react-icons/fa";
import Button from "./Button";

const About = () => {
  const aboutRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { title, description, resumeLink } = portfolioData.about;

  useEffect(() => {
    const node = aboutRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".about-title", { opacity: 0, y: 40, duration: 0.8 })
        .from(".about-text",   { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, "-=0.4")
        .from(".about-btn",    { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
        .from(".about-img",    { opacity: 0, x: -80, duration: 0.8, ease: "power3.out" }, "-=0.6");
    }, aboutRef);
    return () => ctx.revert();
  }, [inView]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="section min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 text-ink"
    >
      <div className="flex-1 flex justify-center mb-2 md:mb-0">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-cyan-500/15 blur-2xl" aria-hidden />
          <img
            src="/images/hero-visual.jpg"
            alt="Profile"
            className="about-img relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-full border-4 border-cyan-500 shadow-lg shadow-cyan-500/30"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-start space-y-5">
        <h2 className="about-title section-title text-center md:text-center w-full">
          {title}
        </h2>
        <div className="about-text text-gray-300 text-base sm:text-lg leading-relaxed text-center md:text-left max-w-xl font-ibm-plex whitespace-pre-line">
          {description}
        </div>
        <div className="pt-2">
          <Button
            text="Download Resume"
            icon={<FaDownload />}
            onClick={() => window.open(resumeLink, "_blank")}
            className="about-btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
