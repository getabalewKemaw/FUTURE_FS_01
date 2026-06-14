import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import portfolioData from "../constants/portfolioData";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavClick = (id) => {
    if (!isHomePage) navigate("/", { state: { scrollTo: id } });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isHomePage && location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [isHomePage, location]);

  const linkClass = `cursor-pointer relative group transition-colors duration-300 px-2 py-1 rounded-xl hover:bg-white/5 ${scrolled ? "text-white" : "text-white"
    }`;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-300 ${scrolled ? "bg-[#030712]/80 border-white/10" : "bg-black/30 border-white/10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-4 flex justify-between items-center">
        <RouterLink
          to="/"
          className="flex items-center gap-2.5 group"
        >
          {/* Circular profile avatar with cyan ring */}
          <span className="relative shrink-0">
            <img
              src="/images/hero-visual.jpg"
              alt="Getabalew Kemaw"
              className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400 shadow-md shadow-cyan-500/20 group-hover:border-cyan-300 transition-all duration-300"
            />
            {/* Online indicator dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </span>
          {/* GK. text */}
          <span className="text-xl font-bold tracking-widest hover:text-cyan-400 transition-colors duration-300 font-space">
            GK<span className="text-cyan-400">.</span>
          </span>
        </RouterLink>

        <ul className="hidden md:flex items-center gap-3 lg:gap-6 text-white text-[11px] lg:text-sm font-semibold font-fira tracking-wider uppercase">
          {portfolioData.navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              {isHomePage ? (
                <ScrollLink to={link.id} smooth duration={600} offset={-80} className={linkClass}>
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </ScrollLink>
              ) : (
                <button onClick={() => handleNavClick(link.id)} className={linkClass}>
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </button>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX color="black" /> : <HiMenuAlt3 color="black" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-2xl px-6 py-6 space-y-4 text-center text-white font-medium border-t border-white/10">
          {portfolioData.navLinks.map((link) => (
            <div key={link.id} className="nav-item">
              {isHomePage ? (
                <ScrollLink
                  to={link.id} smooth duration={600} offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="block text-base cursor-pointer relative group px-3 py-2 rounded-xl hover:bg-white/5"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </ScrollLink>
              ) : (
                <button
                  onClick={() => { handleNavClick(link.id); setIsOpen(false); }}
                  className="block w-full text-base cursor-pointer relative group px-3 py-2 rounded-xl hover:bg-white/5 uppercase"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
