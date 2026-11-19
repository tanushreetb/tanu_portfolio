'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, GmailIcon } from '@/components/shared/SocialIcons';

export const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#D6B598]/25 dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        07 · CONTACT
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Heading, Info, Socials */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            07 · GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4 leading-tight">
            Let's Build<br />Something Meaningful.
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-6" />
          
          <p className="text-base text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-8">
            Have an idea, opportunity or project in mind? Whether you're hiring for AI/ML, backend, or full-stack engineering roles, exploring automation workflows with LLMs, or discussing collaboration, I'd love to hear from you.
          </p>

          {/* Direct Email Card */}
          <div className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-6 rounded-2xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay mb-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] flex items-center justify-center text-[#4C3526] dark:text-[#FBEAD5] shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase block">
                DIRECT EMAIL
              </span>
              <a
                href="mailto:tanushree251105@gmail.com"
                className="text-sm sm:text-base font-mono font-bold text-[#4C3526] dark:text-[#FBEAD5] hover:underline"
              >
                tanushree251105@gmail.com
              </a>
            </div>
          </div>

          {/* Location & Phone Badge */}
          <div className="flex flex-wrap gap-2 text-xs font-mono text-[#70533C] dark:text-[#D6B598] mb-8">
            <span className="px-3 py-1.5 rounded-xl bg-[#F0D6BD]/60 dark:bg-[#2B1E16]/60 border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)]">
              📍 Dharmapuri, Tamil Nadu, India
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#F0D6BD]/60 dark:bg-[#2B1E16]/60 border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)]">
              📞 +91 7603973955
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/tanushree-t-b-74b730317"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] bg-[#FBEAD5] dark:bg-[#2B1E16] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] hover:border-[#4C3526] shadow-sm flex items-center gap-2 hover:scale-105 transition-all"
              data-cursor="open"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/tanushree-tb"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] bg-[#FBEAD5] dark:bg-[#2B1E16] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] hover:border-[#4C3526] shadow-sm flex items-center gap-2 hover:scale-105 transition-all"
              data-cursor="open"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:tanushree251105@gmail.com"
              className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] bg-[#FBEAD5] dark:bg-[#2B1E16] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] hover:border-[#4C3526] shadow-sm flex items-center gap-2 hover:scale-105 transition-all"
              data-cursor="open"
            >
              <GmailIcon className="w-3.5 h-3.5" />
              <span>Gmail</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-studio flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-bold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="w-full px-4 py-3 rounded-xl bg-[#FBEAD5] dark:bg-[#1C120C] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] text-sm text-[#4C3526] dark:text-[#FBEAD5] placeholder-[#8F6E54]/60 focus:outline-none focus:border-[#4C3526] dark:focus:border-[#FBEAD5] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono font-bold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ada@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FBEAD5] dark:bg-[#1C120C] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] text-sm text-[#4C3526] dark:text-[#FBEAD5] placeholder-[#8F6E54]/60 focus:outline-none focus:border-[#4C3526] dark:focus:border-[#FBEAD5] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono font-bold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Collaboration Opportunity / Project Inquiry"
                className="w-full px-4 py-3 rounded-xl bg-[#FBEAD5] dark:bg-[#1C120C] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] text-sm text-[#4C3526] dark:text-[#FBEAD5] placeholder-[#8F6E54]/60 focus:outline-none focus:border-[#4C3526] dark:focus:border-[#FBEAD5] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-bold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-3 rounded-xl bg-[#FBEAD5] dark:bg-[#1C120C] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] text-sm text-[#4C3526] dark:text-[#FBEAD5] placeholder-[#8F6E54]/60 focus:outline-none focus:border-[#4C3526] dark:focus:border-[#FBEAD5] transition-colors resize-none"
              />
            </div>

            {/* Submit Button with Dynamic States (Master Prompt 23) */}
            <button
              type="submit"
              disabled={formState === 'sending'}
              className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full text-xs font-mono font-bold tracking-widest text-[#FBEAD5] bg-[#4C3526] dark:bg-[#FBEAD5] dark:text-[#1C120C] shadow-lg hover:scale-[1.01] transition-all disabled:opacity-60"
            >
              {formState === 'sending' ? (
                <span>Sending...</span>
              ) : formState === 'sent' ? (
                <>
                  <span>Message Sent</span>
                  <Check className="w-4 h-4 text-emerald-300 dark:text-emerald-700" />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  );
};