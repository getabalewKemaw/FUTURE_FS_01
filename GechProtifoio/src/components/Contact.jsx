import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ID  = "service_4j068xy";
const TEMPLATE_ID = "template_79cytt8";
const PUBLIC_KEY  = "MA39jJ5B6yPXvrcwX";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'ok' | 'err' | null

  useEffect(() => {
    const triggers = [];
    if (sectionRef.current) {
      triggers.push(
        gsap.fromTo(
          ".contact-title",
          { opacity: 0, y: -40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
          }
        )
      );
      triggers.push(
        gsap.fromTo(
          ".contact-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.7)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
          }
        )
      );
    }
    return () => triggers.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      if (result.status !== 200) throw new Error("send_failed");
      setStatus("ok");
      formRef.current.reset();
    } catch {
      setStatus("err");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section text-ink overflow-hidden">
      <h2 className="contact-title section-title text-center mb-12 sm:mb-16">
        Get In Touch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="contact-card glass p-6 rounded-2xl flex flex-col justify-center gap-5">
          <div className="flex items-center gap-4 font-ibm-plex">
            <FaEnvelope className="text-cyan-400 text-xl shrink-0" />
            <a href="mailto:gech12kemaw@gmail.com" className="hover:text-cyan-300 break-all">
              gech12kemaw@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4 font-ibm-plex">
            <FaPhone className="text-cyan-400 text-xl shrink-0" />
            <a href="tel:+251944463198" className="hover:text-cyan-300">+251 944 46 31 98</a>
          </div>
          <div className="flex items-center gap-4 font-ibm-plex">
            <FaMapMarkerAlt className="text-cyan-400 text-xl shrink-0" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-card glass p-6 rounded-2xl flex flex-col gap-4"
          noValidate
        >
          <Field icon={<FaUser />} name="from_name" type="text" placeholder="Your Name" required />
          <Field icon={<FaEnvelope />} name="from_email" type="email" placeholder="Your Email" required />
          <Textarea icon={<FaPaperPlane />} name="message" placeholder="Your Message" required />

          {status === "ok" && (
            <p className="flex items-center gap-2 text-emerald-400 text-sm font-fira">
              <FaCheckCircle /> Message sent — thanks!
            </p>
          )}
          {status === "err" && (
            <p className="flex items-center gap-2 text-rose-400 text-sm font-fira">
              <FaExclamationCircle /> Failed to send. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

const Field = ({ icon, name, type, placeholder, required }) => (
  <div className="relative">
    <span className="absolute top-1/2 -translate-y-1/2 left-3 text-cyan-400">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full py-3 pl-10 pr-3 rounded-lg bg-surface border border-surface text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-fira"
    />
  </div>
);

const Textarea = ({ icon, name, placeholder, required }) => (
  <div className="relative">
    <span className="absolute top-3 left-3 text-cyan-400">{icon}</span>
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={5}
      className="w-full py-3 pl-10 pr-3 rounded-lg bg-surface border border-surface text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-fira resize-none focus:border-dotted"
    />
  </div>
);

export default Contact;
