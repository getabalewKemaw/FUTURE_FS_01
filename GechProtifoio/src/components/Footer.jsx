import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaArrowUp } from "react-icons/fa";
import portfolioData from "../constants/portfolioData";

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content > *", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: "power3.out",
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="text-ink pt-16 pb-10 px-6 md:px-16">
      <hr className="border-gray-200 mb-12 max-w-6xl mx-auto" />
      <div className="max-w-6xl mx-auto text-center footer-content space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 font-space tracking-tight">
          {portfolioData.hero.name}
        </h2>

        <div className="flex justify-center gap-5 text-xl sm:text-2xl">
          {portfolioData.hero.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded outline-none"
              aria-label={`Open ${link.name || "social link"}`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-gray-400 text-sm font-ibm-plex">
          <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-cyan-300">
            {portfolioData.contact.email}
          </a>
          <span className="hidden sm:inline text-gray-700">·</span>
          <span>{portfolioData.contact.phone}</span>
          <span className="hidden sm:inline text-gray-700">·</span>
          <span>{portfolioData.contact.address}</span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-full transition-transform hover:scale-110 inline-flex items-center justify-center"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp />
        </button>

        <p className="text-gray-500 text-xs mt-4 font-fira uppercase tracking-widest">
          &copy; {year} {portfolioData.hero.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
