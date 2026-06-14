import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ReactTyped } from "react-typed";
import { FaDownload, FaFolderOpen } from "react-icons/fa";
import portfolioData from "../constants/portfolioData";

const Hero = () => {
  const heroRef = useRef(null);
  const { name, socialLinks } = portfolioData.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 })
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.9 }, "-=0.4")
        .from(".hero-typed", { opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.7 }, "-=0.3")
        .from(".hero-social", { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle gradient — sits on top of the global dotted bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_70%_55%_at_50%_30%,rgba(6,182,212,0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 -z-[5] bg-gradient-to-b from-transparent to-[#f6f7f9]"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-28 pb-16">

        {/* Left Side: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <p className="hero-eyebrow font-fira text-[10px] sm:text-xs uppercase tracking-[0.4em] text-cyan-600 mb-4 font-bold">
            Available for new opportunities
          </p>

          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] font-space mb-4 tracking-tight">
            <span className="text-gray-700 block">Hi, I'm</span>
            <span className="text-[#06b6d4] drop-shadow-[0_0_24px_rgba(6,182,212,0.4)] block mt-1">
              {name}.
            </span>
          </h1>

          <h2
            className="hero-typed text-lg sm:text-xl md:text-2xl font-bold font-fira mb-6 text-gray-500"
          >
            <ReactTyped
              strings={[
                "Fullstack Software Engineer."
              ]}
              typeSpeed={80}
              backSpeed={40}
              backDelay={1500}
              loop
            />
          </h2>

          <p className="hero-buttons max-w-2xl text-gray-500 font-ibm-plex text-sm sm:text-base leading-relaxed mb-10">
            I design, build, and deploy production-grade web and mobile applications that solve real business challenges. From intuitive frontends to scalable backend architectures.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center gap-4 mb-10">
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-white px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 font-semibold text-base shadow-lg flex items-center justify-center gap-2"
            >
              <FaFolderOpen /> View Projects
            </button>

            <a
              href="https://drive.google.com/file/d/1jhpCOXmWqSG17GFa9oWkqv_gVNuYX3xs/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 bg-white px-8 py-4 rounded-xl border border-gray-200 hover:border-[#06b6d4] hover:text-[#06b6d4] hover:shadow-[0_0_24px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all duration-300 font-semibold text-base shadow-sm flex items-center justify-center gap-2"
            >
              <FaDownload /> View Resume
            </a>
          </div>

          <nav className="flex gap-6 justify-center lg:justify-start" aria-label="Social media">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social text-2xl text-gray-400 hover:text-[#06b6d4] focus:text-[#06b6d4] transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4] rounded"
                aria-label={social.name || `Social link ${index + 1}`}
              >
                {social.icon}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side: Visual Element — white textured card, stretches to match left height */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-end lg:pl-10 xl:pl-0 self-stretch">
          <div
            className="w-full h-full rounded-3xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/40 transition-all duration-500 flex flex-col"
            style={{
              background: '#f6f7f9',
              backgroundImage:
                'radial-gradient(circle, rgba(6,182,212,0.12) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          >
            {/* Window Controls Bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-white/70 border-b border-gray-200 backdrop-blur-sm shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-gray-400 text-xs font-fira tracking-wider">developer.js</span>
            </div>
            {/* Code Content */}
            <div className="flex-1 p-6 font-fira text-[13px] leading-7 overflow-hidden">
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">1</span>
                <span className="text-gray-400"><span className="text-violet-500">const</span> <span className="text-cyan-600">engineer</span> <span className="text-gray-500">=</span> <span className="text-gray-600">{'{'}{'}'}</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">2</span>
                <span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">3</span>
                <span className="ml-5"><span className="text-gray-500">name</span><span className="text-gray-400">:</span> <span className="text-emerald-600">"Getabalew Kemaw"</span><span className="text-gray-400">,</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">4</span>
                <span className="ml-5"><span className="text-gray-500">role</span><span className="text-gray-400">:</span> <span className="text-emerald-600">"Fullstack Software Engineer"</span><span className="text-gray-400">,</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">5</span>
                <span className="ml-5"><span className="text-gray-500">skills</span><span className="text-gray-400">:</span> <span className="text-gray-400">[</span><span className="text-emerald-600">"Web"</span><span className="text-gray-400">,</span> <span className="text-emerald-600">"Mobile"</span><span className="text-gray-400">,</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0"></span>
                <span className="ml-10"><span className="text-emerald-600">"AI Integration"</span><span className="text-gray-400">,</span> <span className="text-emerald-600">"ML Apps"</span><span className="text-gray-400">],</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">6</span>
                <span className="ml-5"><span className="text-gray-500">mobile</span><span className="text-gray-400">:</span> <span className="text-emerald-600">"React Native"</span><span className="text-gray-400">,</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">7</span>
                <span className="ml-5"><span className="text-gray-500">passion</span><span className="text-gray-400">:</span> <span className="text-emerald-600">"Scalable products"</span><span className="text-gray-400">,</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">8</span>
                <span className="ml-5"><span className="text-gray-500">status</span><span className="text-gray-400">:</span> <span className="text-cyan-600 font-semibold">"Available ✓"</span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">9</span>
                <span className="text-gray-600">{'}'}<span className="text-gray-400">;</span></span>
              </div>
              <div className="flex mt-3">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">10</span>
                <span></span>
              </div>
              <div className="flex">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">11</span>
                <span><span className="text-cyan-600">engineer</span><span className="text-gray-400">.</span><span className="text-violet-500">buildFuture</span><span className="text-gray-600">()</span><span className="text-gray-400">;</span></span>
              </div>
              {/* Blinking cursor */}
              <div className="flex mt-3">
                <span className="text-gray-300 mr-4 select-none w-4 text-right shrink-0">12</span>
                <span className="inline-block w-2 h-4 bg-cyan-500 animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
