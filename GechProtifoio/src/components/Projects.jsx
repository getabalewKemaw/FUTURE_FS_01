import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaCloud, FaJava
} from "react-icons/fa";
import {
  SiTailwindcss, SiThreedotjs, SiGreensock, SiJavascript, SiTypescript, SiDocker, SiAwsamplify,
  SiPython, SiCplusplus, SiHtml5, SiCss3, SiNextdotjs, SiOracle, SiPostgresql
} from "react-icons/si";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const techIcons = {
  "React": <FaReact className="text-blue-500" />,
  "Next.js": <SiNextdotjs className="text-black" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "GSAP": <SiGreensock className="text-green-500" />,
  "Three.js": <SiThreedotjs className="text-gray-800" />,
  "HTML": <SiHtml5 className="text-orange-600" />,
  "CSS": <SiCss3 className="text-blue-500" />,
  "JavaScript": <SiJavascript className="text-yellow-500" />,
  "JavaScript/ES6+": <SiJavascript className="text-yellow-500" />,
  "TypeScript": <SiTypescript className="text-blue-600" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Java": <FaJava className="text-red-600" />,
  "Python": <SiPython className="text-yellow-600" />,
  "C++": <SiCplusplus className="text-blue-700" />,
  "Database Management (SQL/NoSQL)": <FaDatabase className="text-red-500" />,
  "Oracle SQL": <SiOracle className="text-red-700" />,
  "PostgreSQL": <SiPostgresql className="text-blue-800" />,
  "Docker & Containerization": <SiDocker className="text-blue-400" />,
  "AWS Cloud Services": <SiAwsamplify className="text-orange-500" />,
  "DevOps & CI/CD": <FaCloud className="text-purple-500" />,
  "Express": <FaNodeJs className="text-green-600" />,
  "MongoDB": <FaDatabase className="text-green-700" />,
  "SQL": <FaDatabase className="text-blue-800" />,
  "AI Processing": <SiThreedotjs className="text-pink-400" />,
  "Gemini API": <SiThreedotjs className="text-blue-400" />,
  "Spring Boot": <FaJava className="text-red-600" />,
  "REST APIs": <FaCloud className="text-cyan-400" />,
  "Role-Based Access Control": <FaCloud className="text-violet-400" />,
  "Chapa Payment": <FaCloud className="text-emerald-400" />,
  "React Native (Expo)": <FaReact className="text-blue-500" />,
};

const Projects = () => {
  const cardsRef = useRef([]);
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  useEffect(() => {
    // Reset triggers on filter change
    const triggers = cardsRef.current.map((el, idx) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.96 },
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
  }, [filter]);

  return (
    <section id="projects" className="section text-ink">
      <h2 className="section-title text-center mb-6 sm:mb-8">Projects</h2>
      
      {/* Filters \u2014 premium segmented control */}
      <div className="flex flex-col items-center mb-14">
        <div className="inline-flex items-center bg-white border border-gray-200 shadow-sm rounded-2xl p-1.5 gap-1">
          {[
            { label: "All", icon: "⚡" },
            { label: "AI", icon: "🤖" },
            { label: "Fullstack", icon: "🌐" },
            { label: "Mobile", icon: "📱" },
          ].map(({ label, icon }) => {
            const count = label === "All"
              ? portfolioData.projects.length
              : portfolioData.projects.filter(p => p.category === label).length;
            const isActive = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-fira text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500 to-cyan-400 text-white shadow-md shadow-cyan-500/30 scale-[1.03]"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <article
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white group relative flex flex-col h-full rounded-2xl overflow-hidden
                       transition-all duration-300 ease-out will-change-transform
                       border border-gray-200 shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/50"
          >
            <div className="w-full h-44 sm:h-52 flex items-center justify-center bg-gray-50 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 font-space">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-4 font-ibm-plex">
                {project.description.trim()}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-surface border border-surface p-2 rounded-full flex items-center justify-center text-lg"
                      title={tech}
                    >
                      {techIcons[tech] || tech}
                    </span>
                  ))}
                </div>

                <hr className="border-gray-200 my-4" />

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-colors duration-200"
                      title="GitHub"
                    >
                      <FaGithub size={16} /> <span className="text-xs font-bold">Code</span>
                    </a>
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors duration-200"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt size={14} /> <span className="text-xs font-bold">Live</span>
                      </a>
                    )}
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full flex justify-center items-center text-center text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-2.5 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors duration-200 text-sm font-bold tracking-wide uppercase"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
