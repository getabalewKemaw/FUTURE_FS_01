// src/portfolioData.js
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaReact, FaNodeJs, FaDatabase, FaCloud, FaJava } from "react-icons/fa";
//import { SiTailwindcss, SiThreedotjs, SiGreensock, SiJavascript, SiTypescript, SiDocker, SiAwsamplify  } from "react-icons/si";
import {
  SiTailwindcss,
  SiThreedotjs,
  SiGreensock,
  SiJavascript,
  SiTypescript,
  SiDocker,
  SiAwsamplify,
  SiPython,
  SiCplusplus,

  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiOracle,
  SiPostgresql
} from "react-icons/si";

//import { FaReact, FaNodeJs, FaDatabase, FaCloud } from "react-icons/fa";


const portfolioData = {
  // ---------------- NAVBAR ----------------
  navLinks: [
    // { id: "home", title: "Home" },
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "skills", title: "Skills" },
    { id: "github-stats", title: "Activity" },
    { id: "experience", title: "Experience" }, // Added for professionalism: Include work history
    { id: "certification", title: "Certifications" },
    { id: "blog", title: "Blog" },
    { id: "contact", title: "Contact" },
  ],

  // ---------------- HERO SECTION ----------------
  hero: {
    name: "Getabalew Kemaw",
    tagline: "Software Engineer specializing in immersive web applications.  and mobile appilications I craft high-performance, interactive  experiences using Javascript , Three.js, GSAP, and Tailwind CSS to deliver scalable, user-centric solutions.",
    cta: "Explore My Portfolio",
    socialLinks: [
      { icon: <FaGithub />, url: "https://github.com/getabalewKemaw" },
      { icon: <FaLinkedin />, url: "https://linkedin.com/in/getabalewKemaw" },
      { icon: <FaTwitter />, url: "https://twitter.com/getabalewKemawP" },
      { icon: <FaEnvelope />, url: "mailto:getabalewkemaw@gmail.com" },
    ],
  },

  about: {
    title: "About Me",
    description: `Full-Stack Software Engineer with experience designing, building, and deploying production-grade web and mobile applications that solve real business challenges and support customer growth. Skilled in delivering end-to-end solutions across frontend development, backend systems, databases, authentication, payment integration, and deployment. Experienced in developing digital platforms, e-commerce systems, and AI-powered applications that streamline operations, improve user experiences, and help organizations scale. Combines strong engineering practices, product thinking, and business-focused problem solving to deliver reliable, high-impact software.`,
    resumeLink: "https://drive.google.com/file/d/1jhpCOXmWqSG17GFa9oWkqv_gVNuYX3xs/view?usp=drive_link",
  },

  // ---------------- PROJECTS SECTION ----------------
  // ---------------- PROJECTS SECTION ----------------
  projects: [
    {
      id: "velo-crm",
      category: "AI",
      title: "VELO — Tactical Enterprise AI CRM",
      description: `
        VELO is a production-grade CRM that unifies Gmail and Telegram leads into one inbox, 
        prioritizes them with AI (Gemini 2.5 Flash), and gives business owners clear analytics, 
        deal tracking, and reminders. Built headless so businesses can plug it into any website 
        without migration. Engineered by Getabalew Kemaw.
      `,
      problemStatement: "Small businesses lose revenue because messages are scattered across Telegram, Instagram, WhatsApp, Email, and Website. Owners are forced to tab-switch, guess what to reply to first, and manually track follow-ups. The 'golden minute' after a lead arrives determines conversion, but most CRMs show data after the fact — not while decisions are being made.",
      solution: "VELO captures and normalizes signals from Gmail (OAuth + Pub/Sub) and Telegram (bot webhooks) into one unified inbox. Gemini 2.5 Flash auto-triages every inbound lead as low/medium/high priority, triggers real-time in-app alerts for high-priority leads, cleans noisy email content (signatures, footers, unsubscribe blocks), and computes full pipeline analytics — win rate, SLA metrics, source ROI — so owners act with context, not guesswork. Built with Next.js 16 (App Router) on the frontend and Express 5 + Prisma + PostgreSQL on the backend.",
      image: "/images/velocore.png",
      github: "https://github.com/getabalewKemaw/Velo-Core",
      live: "https://velocorecrm.vercel.app/",
      technologies: ["Next.js", "TypeScript", "Express.js", "PostgreSQL", "Prisma", "Gemini AI", "Gmail OAuth", "Telegram Bot"],
    },
    {
      id: "teleplay",
      category: "Fullstack",
      title: "I-Player — Telecom Media Processing & Streaming Platform",
      description: `
        I-Player is a custom media player that supports non-standard telecom codecs (G711, G726, G728) 
        and enables decoding to WAV/MP3, instant playback via live chunked streaming, stable file-based 
        playback with waveform, and server-generated waveform for live streams. Built for high-fidelity 
        engineering signal processing and archive management.
      `,
      problemStatement: "Standard media players fail to support specialized telecom audio codecs (G711, G726, G728), forcing engineers to rely on clunky desktop tools for conversion before any playback is possible. This creates severe bottlenecks for analysts who need immediate, high-fidelity access to live and archived telecom media streams.",
      solution: "I engineered a full-stack media processing suite with an Express + FFmpeg backend that decodes and transcodes telecom codecs on-the-fly. The React + TypeScript frontend delivers dual streaming modes: live chunked streaming via MSE for instant playback, and stable file-based streaming with HTTP Range support. A custom canvas waveform renders live stream peaks in real-time, while WaveSurfer.js handles file-based visualization — giving engineers a complete, browser-native signal processing dashboard.",
      image: "/images/teleplay.png",
      github: "https://github.com/getabalewKemaw/TelePlay",
      live: "https://teleplayer.vercel.app/",
      technologies: ["React", "TypeScript", "Express.js", "FFmpeg", "WaveSurfer.js", "PostgreSQL", "Prisma", "MSE Streaming"],
    },
    {
      id: "customer-intelligence",
      category: "AI",
      title: "Flipkart Customer Intelligence & Sentiment Analytics Platform",
      description: `
        An AI-Powered platform that transforms raw Flipkart customer reviews into actionable business 
        insights. Combines Machine Learning (Random Forest, ~91% accuracy), NLP text preprocessing, 
        and an interactive Gradio analytics dashboard. Deployed live on Hugging Face Spaces.
      `,
      problemStatement: "E-commerce businesses like Flipkart generate millions of customer reviews daily. Traditional sentiment tools classify reviews as Positive/Negative/Neutral but fail to explain the root causes of dissatisfaction — leaving businesses without the actionable intelligence needed to improve products, logistics, and customer service.",
      solution: "I built a full ML pipeline using Python and Scikit-learn. Reviews are preprocessed with NLTK (lowercasing, punctuation removal, stopword filtering), converted to features via TF-IDF, then classified by a Random Forest model achieving ~91% accuracy with stratified cross-validation. The system auto-tags complaint categories (Product Quality, Pricing, Delivery, Customer Service) and surfaces business intelligence reports. Deployed as an interactive Gradio app on Hugging Face Spaces for public access.",
      image: "/images/filpkartai.png",
      github: "https://github.com/getabalewKemaw/flipkart-customer-review-intelligence-dashboard",
      live: "https://huggingface.co/spaces/Gechdev/techskillup-flikpart_sentiment_analaysis",
      technologies: ["Python", "Scikit-learn", "Random Forest", "TF-IDF", "NLTK", "Pandas", "Gradio", "Hugging Face"],
    },
    {
      id: "meshebesha-design",
      category: "Fullstack",
      title: "Meshebesha Design – Enterprise E-Commerce Platform",
      description: `
        Designed and developed an enterprise-grade commerce platform that digitized business operations across product management, customer engagement, order processing, and payment workflows. Integrated secure authentication, role-based permissions, and Chapa payment services to enable seamless and secure online transactions. Engineered scalable APIs and backend services supporting inventory management, order tracking, customer reviews, and administrative operations. Delivered a production-ready solution that improved operational efficiency and provided a modern digital sales channel for business growth.
      `,
      problemStatement: "Traditional retail businesses face immense challenges scaling their operations without a unified digital platform. Managing inventory, processing orders manually, and handling disjointed payment systems leads to frequent errors, lost sales, and poor customer experiences.",
      solution: "I architected an enterprise e-commerce ecosystem from the ground up using Next.js and PostgreSQL. The platform automates the entire order lifecycle, features role-based dashboards for administrators to manage stock levels, and integrates Chapa payment gateways to provide a frictionless, secure checkout experience for end users.",
      image: "/images/meshebesha.png",
      github: "https://github.com/getabalewKemaw/MeshebeshaDesignFrontend",
      live: "https://meshebesha-design.vercel.app",
      technologies: ["Next.js", "TypeScript", "Express.js", "PostgreSQL", "Chapa Payment", "Tailwind CSS"],
    },
    {
      id: "promptmasterpro",
      category: "Mobile",
      title: "PromptMasterPro – Multilingual AI Prompt Assistant",
      description: `
        PromptMasterPro is a mobile application designed for Ethiopians to enhance AI prompts. Users can submit prompts via text or voice in Amharic, English, Afan Oromo, or Tigrigna. The app processes the input and returns optimized prompts in both English and the selected local language, making AI more accessible and effective.
      `,
      problemStatement: "The benefits of advanced AI models are heavily skewed towards English speakers. For Ethiopian users speaking Amharic, Afan Oromo, or Tigrigna, constructing effective AI prompts is incredibly difficult due to language barriers and a lack of localized AI tools.",
      solution: "I developed a mobile application using React Native that acts as a linguistic bridge to AI. Users can input queries in their native language via text or voice, and the backend engine optimizes and translates the prompt to maximize the AI's response quality, subsequently delivering the results back in the user's preferred language.",
      image: "/images/promptmasterpro.png",
      github: "https://github.com/getabalewKemaw/PromptMasterPro",
      live: "#",
      technologies: ["React Native (Expo)", "Express.js", "TypeScript", "PostgreSQL", "AI Processing"],
    },
    {
      id: "megezez-restaurant",
      category: "Fullstack",
      title: "MEGEZEZ Restaurant – Food & Table Booking Platform",
      description: `
        MEGEZEZ Restaurant is a modern and responsive restaurant website built for Debre Berhan University (DBU) students and teachers. Users can explore menus, book tables, and contact the restaurant easily, providing a smooth dining experience both online and offline.
      `,
      problemStatement: "Local campus restaurants often rely on walk-ins and phone calls for reservations, which leads to overcrowded waiting areas during peak hours and frustrated customers who cannot secure a table.",
      solution: "I built a dedicated digital storefront for the restaurant that allows students and faculty to browse the menu dynamically and reserve tables in advance. The intuitive interface dramatically reduced walk-in wait times and modernized the restaurant's daily booking operations.",
      image: "/images/megezez.png",
      github: "https://github.com/getabalewKemaw/Megezez-Resturant-Food-Delivery-System",
      live: "https://megezez-resturant.vercel.app/",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: "movie-app",
      category: "Fullstack",
      title: "Movie App",
      description: `
        A full-stack movie application where users can browse, search, and save their favorite movies. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Features include authentication, responsive design, API integration for fetching movie data, and a modern user interface.
      `,
      problemStatement: "Users looking to track movies they've watched or plan to watch lack a fast, centralized platform that provides rich media metadata alongside reliable user authentication and data persistence.",
      solution: "I integrated a public movie API with a robust MERN stack backend. Users can create accounts, search a massive database of films, and maintain persistent watchlists. The application is heavily optimized for speed and styled beautifully with Tailwind CSS for an engaging user experience.",
      image: "/images/movie.png",
      github: "https://github.com/getabalewKemaw/movie-app",
      live: "https://cinisphere.vercel.app/",
      technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
    {
      id: "portfolio-website",
      category: "Fullstack",
      title: "Portfolio Website",
      description: `
        A modern personal portfolio website built with React, Tailwind CSS, Framer Motion, and GSAP. Showcases personal projects, animations, and interactive UI elements. Highlights frontend skills, responsive design, and user experience best practices.
      `,
      problemStatement: "In a competitive job market, a static resume is insufficient to demonstrate frontend engineering capabilities, animation prowess, and UI/UX sensibilities to potential employers.",
      solution: "I engineered a high-performance portfolio application from scratch, leveraging Framer Motion and GSAP for complex, scroll-triggered animations. The site serves as a live, interactive proof of my ability to build visually stunning, performant, and accessible web experiences.",
      image: "/images/portifolio.png",
      github: "https://github.com/getabalewKemaw/Portfolio-website",
      live: "https://getabalewkemaw.vercel.app",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
    },
    {
      id: "skillshare-hub",
      category: "Fullstack",
      title: "SkillShare Hub",
      description: `
        A mini course-sharing platform built with Next.js, Prisma, and PostgreSQL. Includes separate dashboards for students and instructors, course management, and enrollment features. Demonstrates full-stack capabilities, database integration, and responsive design.
      `,
      problemStatement: "Creating an educational platform requires managing complex relationships between users, instructors, courses, and enrollments while ensuring secure, role-based data access.",
      solution: "I utilized Next.js and Prisma ORM to rapidly architect a secure backend that handles complex relational data. The platform provides distinct portal experiences for instructors to publish content and students to track their learning progress, all secured behind robust authentication layers.",
      image: "/images/skillsharehub.png",
      github: "https://github.com/getabalewKemaw/SkillshareHub-",
      live: "https://skillshare-hub.vercel.app/",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    },
    {
      id: "customer-ai-assistant",
      category: "AI",
      title: "Customer AI Assistant",
      description: `
        An AI-powered customer assistant built with MERN Stack and Gemini API. Provides instant intelligent answers to user queries, with authentication and responsive design. Demonstrates integration of AI APIs with full-stack applications.
      `,
      problemStatement: "Businesses lose customers due to delayed response times in customer support. Staffing a 24/7 support team is highly expensive and inefficient for handling repetitive, common queries.",
      solution: "I integrated the Gemini API into a full-stack MERN application to deploy an intelligent, conversational AI assistant. The bot accurately understands user intent, provides immediate contextual answers, and dramatically reduces the workload on human support agents while operating around the clock.",
      image: "/images/ai.png",
      github: "https://github.com/getabalewKemaw/Customer-Ai-Assistant",
      live: "https://supportlyai.vercel.app/",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Gemini API", "Tailwind CSS"],
    },
    {
      id: "shopifyx",
      category: "Fullstack",
      title: "ShopifyX",
      description: `
        A mini e-commerce platform built with Spring Boot, Next.js, PostgreSQL, and Tailwind CSS. Includes admin and user dashboards, product listings, authentication, and order management. Demonstrates backend logic, full-stack integration, and responsive frontend design.
      `,
      problemStatement: "Building a scalable e-commerce backend requires strict data integrity, transactional reliability, and highly structured business logic, which is often difficult to achieve with lightweight frameworks.",
      solution: "I employed Spring Boot to construct a highly structured, enterprise-grade backend capable of securely handling complex transactions and inventory management. Paired with a lightning-fast Next.js frontend, the platform delivers a premium shopping experience with reliable backend operations.",
      image: "/images/sopifyx.png",
      github: "https://github.com/getabalewKemaw/shopifyFrontEnd",
      live: "#",
      technologies: ["Spring Boot", "Next.js", "PostgreSQL", "Tailwind CSS"],
    },
    {
      id: "hirenest",
      category: "Fullstack",
      title: "HireNest – Skill-Based Job Matching Platform",
      description: `
        HireNest is a full-stack job platform designed to enable skill-based job discovery through smart recommendation and match-score logic. The system supports role-based access for job seekers and employers, structured professional profiles, and intelligent job listings ranked by compatibility.
      `,
      problemStatement: "The traditional job search process relies heavily on keyword matching, leading to qualified candidates being overlooked and employers being inundated with irrelevant resumes.",
      solution: "I engineered a smart-matching algorithm that evaluates candidate profiles against job requirements to generate a compatibility score. Built on a robust Spring Boot backend, the platform intelligently surfaces the most relevant opportunities to candidates, streamlining the hiring pipeline for employers.",
      image: "/images/hirenest.png",
      github: "https://github.com/getabalewKemaw/HireNest",
      live: "#",
      technologies: ["React", "Spring Boot", "PostgreSQL", "REST APIs", "Role-Based Access Control"],
    }
  ],


  // ---------------- SKILLS SECTION ----------------


  skills: [
    // Frontend
    { name: "React", icon: <FaReact className="text-blue-500" />, proficiency: "Expert" },
    { name: "Next.js", icon: <SiNextdotjs className="text-black" />, proficiency: "Advanced" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, proficiency: "Advanced" },
    { name: "HTML", icon: <SiHtml5 className="text-orange-600" />, proficiency: "Expert" },
    { name: "CSS", icon: <SiCss3 className="text-blue-500" />, proficiency: "Expert" },
    { name: "JavaScript/ES6+", icon: <SiJavascript className="text-yellow-500" />, proficiency: "Expert" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, proficiency: "Advanced" },

    // Backend
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, proficiency: "Intermediate" },
    { name: "Java", icon: < FaJava className="text-red-600" />, proficiency: "Intermediate" },
    { name: "Python", icon: <SiPython className="text-yellow-600" />, proficiency: "Advanced" },
    { name: "C++", icon: <SiCplusplus className="text-blue-700" />, proficiency: "Advanced" },

    // Database
    { name: "Database Management (SQL/NoSQL)", icon: <FaDatabase className="text-red-500" />, proficiency: "Intermediate" },
    { name: "Oracle SQL", icon: <SiOracle className="text-red-700" />, proficiency: "Intermediate" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-800" />, proficiency: "Intermediate" },

    // DevOps & Cloud
    { name: "Docker & Containerization", icon: <SiDocker className="text-blue-400" />, proficiency: "Intermediate" },
    { name: "AWS Cloud Services", icon: <SiAwsamplify className="text-orange-500" />, proficiency: "Beginner" },
    { name: "DevOps & CI/CD", icon: <FaCloud className="text-purple-500" />, proficiency: "Intermediate" },
  ],
  // ---------------- EXPERIENCE SECTION (Added for Professionalism) ----------------
  experience: [
    {
      year: "May 2026 - Present",
      role: "Full-Stack Developer Instructor — AllCan Technologies",
      description: `• Design and develop training programs covering full-stack software development, modern engineering practices, and industry-standard workflows.
• Create project-based learning experiences, technical content, and hands-on exercises that help learners build production-ready applications.
• Mentor aspiring developers through real-world software projects, code reviews, and practical problem-solving activities.
• Collaborate with engineering teams to design, develop, test, and deploy scalable software solutions.`
    },
    {
      year: "2025 - Present",
      role: "Freelance Full-Stack Developer",
      description: `• Designed and developed custom websites, landing pages, and business solutions for clients across multiple industries.
• Built high-converting landing pages focused on customer acquisition, lead generation, and user engagement.
• Collaborated directly with clients to gather requirements, define project scope, and deliver tailored digital solutions.
• Developed responsive, performance-optimized applications using modern web technologies and industry best practices.`
    },
    {
      year: "Nov 2025 - Dec 2025",
      role: "Full-Stack Developer Intern — Miracle Technologies, Mumbai",
      description: `• Contributed to the development and enhancement of production-grade full-stack applications using modern frontend and backend technologies.
• Designed and integrated RESTful APIs, authentication systems, and database-driven features to support business requirements.
• Collaborated within an Agile development team to deliver assigned features and improvements on schedule.
• Improved application performance, reliability, and maintainability through debugging, testing, and code optimization.`
    }
  ],




  // ---------------- CERTIFICATIONS SECTION ----------------
  certifications: [
    {
      title: "Software Engineering Certification",
      issuer: "Debre Berhan University",
      image: "/images/certefications/Getabalewkemaw.jpg",
      date: "2025"
    },
    {
      title: "Data Science Specialization",
      issuer: "DataCamp",
      image: "/images/certefications/datacamp.png",
      date: "2026"
    },
    {
      title: "Hackathon Winner - Innovation Award",
      issuer: "DBU Hackathon",
      image: "/images/certefications/dbuhackaton.png",
      date: "2025"
    }
  ],

  //he development of client-facing web applications using React and Three.js, resulting in a 30% improvement in user engagement. Collaborated with cross-functional teams to integrate GSAP animations and optimize performance, reducing load times by 40%. Managed deployment pipelines on Vercel and AWS.
  // ---------------- CONTACT SECTION ----------------
  contact: {
    email: "getabalewkemaw@gmail.com", // Replace with your professional email
    phone: "+251 944 46 31 98", // Replace with your actual phone
    address: "Addis Ababa, Ethiopia",
    formFields: { // Added for enhanced contact form professionalism
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
  },
};
export default portfolioData;
