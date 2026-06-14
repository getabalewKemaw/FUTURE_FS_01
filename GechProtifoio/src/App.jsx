import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import AnimatedDivider from "./components/AnimatedDivider";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LazySection from "./components/LazySection";
import DottedBackground from "./components/DottedBackground";
import HireCTA from "./components/HireCTA";

// Route-level code splitting
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const GithubStats = lazy(() => import("./components/GithubStats"));
const FocusPhilosophy = lazy(() => import("./components/FocusPhilosophy"));
const Projects = lazy(() => import("./components/Projects"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const Experience = lazy(() => import("./components/Experience"));
const Certification = lazy(() => import("./components/Certification"));
const Blog = lazy(() => import("./components/Blog"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const Contact = lazy(() => import("./components/Contact"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const AdminBlog = lazy(() => import("./components/AdminBlog"));

function App() {
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const smallScreen = window.matchMedia?.("(max-width: 900px)")?.matches;

    // Defer background work until idle to keep first paint snappy
    if (reduceMotion || smallScreen) {
      setBgReady(true);
      return;
    }

    const idleCb = window.requestIdleCallback || ((cb) => setTimeout(cb, 800));
    const idleCancel = window.cancelIdleCallback || clearTimeout;
    const id = idleCb(() => setBgReady(true));
    return () => idleCancel(id);
  }, []);

  return (
    <div className="font-ibm-plex relative min-h-screen text-ink">
      <ScrollToTop />
      {bgReady ? <DottedBackground /> : null}

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><About /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Skills /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><GithubStats /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><FocusPhilosophy /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Projects /></Suspense>
              </LazySection>
              <HireCTA />
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Experience /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Certification /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Blog featuredOnly={true} /></Suspense>
              </LazySection>
              <AnimatedDivider />
              <LazySection>
                <Suspense fallback={null}><Testimonial /></Suspense>
              </LazySection>
              <HireCTA />
              <LazySection>
                <Suspense fallback={null}><Contact /></Suspense>
              </LazySection>
            </main>
          }
        />
        <Route
          path="/blog"
          element={
            <div className="pt-24 min-h-screen">
              <Suspense fallback={null}><Blog featuredOnly={false} /></Suspense>
            </div>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={null}><ProjectDetail /></Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={null}><BlogPost /></Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={null}><AdminBlog /></Suspense>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
