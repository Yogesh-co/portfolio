import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';
import socialLinks from '../data/socialLinks';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const socialsRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 85%',
      },
    });

    if (socialsRef.current) {
      gsap.from(Array.from(socialsRef.current.children), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: socialsRef.current,
          start: 'top 90%',
        },
      });
    }
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      aria-label="Contact section"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading>Let's Talk</SectionHeading>

        <p className="font-body text-lg md:text-xl text-pure-white/40 mt-8 max-w-xl leading-relaxed">
          Have a project in mind? I'd love to hear about it. Let's create
          something extraordinary together.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-16 space-y-10"
          id="contact-form"
        >
          <div>
            <label htmlFor="contact-name" className="sr-only">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="font-body text-lg"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="font-body text-lg"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea
              id="contact-message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="font-body text-lg"
            />
          </div>

          <div className="h-14 relative flex items-center">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.p
                  key="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-body text-pure-white/60"
                >
                  Thank you! I'll get back to you soon. ✨
                </motion.p>
              ) : (
                <motion.div
                  key="submit-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MagneticButton type="submit" id="contact-submit">
                    Send Message
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-24">
          <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-8">
            Find Me Online
          </h3>
          <div ref={socialsRef} className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-3 px-5 py-3 rounded-full glass hover:bg-pure-white/10 transition-all duration-300"
                id={`social-${link.name.toLowerCase()}`}
                aria-label={link.name}
              >
                <svg
                  className="w-5 h-5 text-pure-white/40 group-hover:text-pure-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={link.icon} />
                </svg>
                <span className="font-body text-sm text-pure-white/50 group-hover:text-pure-white transition-colors">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
