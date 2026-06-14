import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import portfolioData from "../constants/portfolioData";
import ScrollToTop from "./ScrollToTop";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    const foundProject = portfolioData.projects.find((p) => p.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-ink bg-[#f6f7f9]">
        <h1 className="text-3xl font-bold font-space mb-4">Project Not Found</h1>
        <Link
          to="/"
          className="text-cyan-600 hover:text-cyan-700 font-fira flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-ink pb-20">
      <ScrollToTop />
      {/* Banner — clean image, no text overlay */}
      <div className="pt-24 pb-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-[2.5rem] bg-gray-100 border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Heading below banner */}
        <div className="mt-8 mb-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-600 mb-5 text-sm font-fira transition-colors"
          >
            <FaArrowLeft /> Back to Projects
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-cyan-50 text-cyan-600 border border-cyan-200 text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold font-fira">
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 font-space leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mt-4 md:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Details */}
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold font-space mb-4 text-gray-800">The Problem</h2>
              <p className="text-gray-600 leading-relaxed font-ibm-plex">
                {project.problemStatement}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-space mb-4 text-gray-800">The Solution</h2>
              <p className="text-gray-600 leading-relaxed font-ibm-plex">
                {project.solution}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold font-space mb-4 text-gray-800 border-b border-gray-100 pb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md font-ibm-plex border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-bold font-space text-gray-800 border-b border-gray-100 pb-2">
                Links
              </h3>
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold shadow-sm"
                >
                  <FaGithub /> View Source Code
                </a>
              )}
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-cyan-500 text-white px-4 py-3 rounded-xl hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-semibold shadow-md"
                >
                  <FaExternalLinkAlt /> Visit Live Site
                </a>
              )}
              {(!project.github || project.github === "#") && (!project.live || project.live === "#") && (
                <p className="text-gray-500 text-sm italic">Links are currently unavailable.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
