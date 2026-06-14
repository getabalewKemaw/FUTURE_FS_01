import React from 'react';
import { motion } from 'framer-motion';

import { FaBrain, FaCogs, FaShip, FaTerminal, FaCode, FaServer } from 'react-icons/fa';

const focusItems = [
  {
    icon: <FaBrain className="text-purple-400" />,
    title: "AI-Powered Documentation",
    desc: "Building an agentic documentation system that understands and explains codebases autonomously.",
    tag: "Active"
  },
  {
    icon: <FaCogs className="text-blue-400" />,
    title: "Local LLM Ecosystems",
    desc: "Architecting local AI pipelines using Ollama and DeepSeek for high-privacy engineering workflows.",
    tag: "Experimenting"
  },
  {
    icon: <FaShip className="text-cyan-400" />,
    title: "Kubernetes Orchestration",
    desc: "Transitioning monolithic services into micro-segmented, auto-scaling k8s deployments.",
    tag: "Deep Dive"
  }
];

const FocusPhilosophy = () => {
  return (
    <section className="section text-ink overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "power3.out" }}
          className="space-y-6"
        >
          <div>
            <h2 className="section-title text-left">
              Focus <span className="text-ink/50">&amp;</span> Momentum
            </h2>
            <p className="text-gray-500 font-fira uppercase tracking-[0.3em] text-[10px] mt-3">
              What's on the workbench right now
            </p>
          </div>

          <div className="space-y-3">
            {focusItems.map((item, i) => (
              <div
                key={i}
                className="bg-white group p-5 sm:p-6 rounded-3xl flex gap-5 items-center border border-gray-200 shadow-sm
                           transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl shrink-0 border border-surface-weak transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-bold font-space text-xs sm:text-sm uppercase group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-ibm-plex leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "power3.out", delay: 0.1 }}
          className="bg-white h-full p-8 md:p-12 rounded-[2.5rem] border border-gray-200 shadow-sm flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors duration-700" />

          <div className="relative z-10">
            <FaTerminal className="text-3xl text-cyan-500/30 mb-6" />
            <h3 className="text-2xl md:text-4xl font-black font-space uppercase mb-6 leading-tight">
              Engineered <br />
              <span className="text-[#06b6d4]">Philosophy</span>
            </h3>

            <p className="text-base sm:text-lg font-ibm-plex text-gray-700 italic leading-relaxed mb-8">
              "I believe in building <span className="text-ink font-bold not-italic">scalable systems</span>, clean APIs, and <span className="text-ink font-bold not-italic">backend-first architecture</span> before the UI polish is even considered."
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-surface-weak">
                <FaCode className="text-cyan-400 mb-2" />
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Code Quality</h5>
                <p className="text-[10px] text-gray-600 mt-1">DRY, SOLID, self-documenting</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-weak">
                <FaServer className="text-blue-400 mb-2" />
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resilience</h5>
                <p className="text-[10px] text-gray-600 mt-1">Fault-tolerant by design</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FocusPhilosophy;
