/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Building2, Users, Target, BookOpen, Briefcase, Scale, Globe,
  CheckCircle2, ArrowRight, Brain, Clock, BarChart3, GraduationCap,
  Shield, Flame, TrendingUp, MessageSquare, ChevronRight, Plus, Minus,
  MapPin, Phone, Mail, Instagram, Linkedin, Youtube, Facebook, Star, Quote
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

const SectionDivider = ({ fromColor, toColor, height = "h-24" }: { fromColor: string, toColor: string, height?: string }) => (
  <div className={fromColor.replace('from-', 'bg-')}>
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1 }}
      className={`w-full ${height} bg-gradient-to-b ${fromColor} ${toColor}`} 
    />
  </div>
);

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => (
  <motion.nav
    className={`w-full transition-all duration-500 border-b ${isScrolled
      ? 'bg-white/95 border-slate-200/50 shadow-sm py-2 backdrop-blur-xl'
      : 'bg-transparent border-white/5 py-3 backdrop-blur-sm'
      }`}
  >
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-18">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="La Excellence Logo" className="h-18 w-auto object-contain" />
        </div>

        {/* Links */}
        <div className={`hidden lg:flex flex-1 justify-center gap-12 font-sans tracking-[0.15em] text-xs uppercase font-bold transition-colors duration-500 ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
          <a href="#why-us" className={`hover:${isScrolled ? 'text-laex-orange' : 'text-white'} transition-colors`}>About</a>
          <a href="#programs" className={`hover:${isScrolled ? 'text-laex-orange' : 'text-white'} transition-colors`}>Programs</a>
          <a href="#results" className={`hover:${isScrolled ? 'text-laex-orange' : 'text-white'} transition-colors`}>Results</a>
          <a href="#apply" className={`hover:${isScrolled ? 'text-laex-orange' : 'text-white'} transition-colors`}>Contact</a>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-6">
          <svg className={`w-[22px] h-[22px] ${isScrolled ? 'text-slate-800' : 'text-white'} cursor-pointer hover:opacity-70 transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <svg className={`w-[22px] h-[22px] ${isScrolled ? 'text-slate-800' : 'text-white'} cursor-pointer hover:opacity-70 transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  </motion.nav>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left font-bold text-laex-blue hover:text-laex-orange transition-colors"
      >
        <span className="pr-8">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 shrink-0" /> : <Plus className="w-5 h-5 shrink-0" />}
      </button>
      <div
        className={`px-6 text-slate-600 leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'pb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImageY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroImageScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = [
    "/herobanner/160A3395.JPG",
    "/herobanner/IMG-20250922-WA0063.jpg",
    "/herobanner/IMG_20250831_131431.jpg",
    "/herobanner/WhatsApp Image 2025-12-02 at 18.28.04 (1).jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const galleryRef = useRef<HTMLElement>(null);
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"]
  });
  const xTransform = useTransform(galleryProgress, [0, 1], ["0%", "-66.6666%"]);

  // Gallery slide text animations — each slide is 0-0.33, 0.33-0.66, 0.66-1.0
  const slide2TextOpacity = useTransform(galleryProgress, [0.33, 0.36, 0.61, 0.66], [0, 1, 1, 0]);
  const slide2TextY = useTransform(galleryProgress, [0.33, 0.36, 0.61, 0.66], [40, 0, 0, -30]);

  return (
    <div className="min-h-screen bg-laex-light selection:bg-laex-orange selection:text-white font-sans text-slate-800">

      {/* Header Container */}
      <motion.header
        className="fixed top-0 w-full z-[60]"
      >
        <Navbar isScrolled={isScrolled} />
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pb-12 pt-24 lg:pt-32">
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 origin-top"
        >
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === heroImgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={img} alt="Campus view" className="object-cover w-full h-full object-center" />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-20"></div>
        </motion.div>

        <div className="max-w-full pl-6 pr-6 sm:pl-10 lg:pl-16 relative w-full z-30 flex flex-col h-[75vh] justify-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: heroOpacity, y: heroContentY }}
            className="flex flex-col lg:flex-row justify-between lg:items-end gap-12"
          >
            {/* Left Content */}
            <div className="max-w-3xl flex-grow">
              <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-sans text-white font-medium leading-[1.05] tracking-tight mb-6 uppercase">
                Your Child's Journey to <br />
                NLUs & IIMs Starts Here
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl font-light leading-relaxed mb-10">
                A future-ready integrated learning model where Intermediate academics and CLAT/IPMAT entrance preparation work together through expert faculty, structured schedules, mock tests, and personalized mentoring.
              </p>

              <div className="flex flex-wrap items-center gap-8 mb-16">
                <a href="#apply" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 font-bold transition-all text-sm uppercase tracking-wider">
                  Get Started
                </a>
                <a href="#programs" className="text-white hover:text-white/80 font-bold transition-all text-sm uppercase tracking-wider border-b-[3px] border-white pb-1">
                  Explore Programs
                </a>
              </div>

              {/* Progress Slider Indicator */}
              <div className="flex items-center gap-6 w-full max-w-md mt-12">
                <span className="text-white font-bold text-sm tracking-widest">0{heroImgIndex + 1}</span>
                <div className="h-[2px] bg-white/30 flex-grow relative">
                  <div className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out" style={{ width: `${((heroImgIndex + 1) / heroImages.length) * 100}%` }}></div>
                </div>
                <span className="text-white font-bold text-sm tracking-widest">0{heroImages.length}</span>
              </div>
            </div>

            {/* Right Cards */}
            <div className="hidden lg:flex flex-col items-end justify-end h-full space-y-auto pt-12 pb-4">
              {/* Location/Program Card Bottom Right */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] w-80 shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all cursor-pointer shrink-0 mt-32">
                <div className="absolute top-8 right-8 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center text-white/80 group-hover:bg-black/60 transition-all pointer-events-none">
                  <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="mb-6 opacity-80">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Madhapur Campus</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  We design integrated CLAT & IPMAT programs as a part of our new residential campus in the city.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-laex-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-laex-orange font-bold tracking-widest uppercase text-sm mb-4">Our Integrated Programs</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-laex-blue mb-6 leading-tight">
                Two Paths. One Decisive <span className="text-laex-orange">Advantage.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether your child's ambition is law or management, our integrated model ensures they never compromise between academics and competitive preparation.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* CLAT Card */}
            <FadeIn delay={0.1}>
              <div className="course-card bg-white rounded-[2rem] border-2 border-slate-200 p-8 md:p-12 h-full flex flex-col group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:bg-laex-blue group-hover:text-white transition-colors duration-300">
                  <Scale className="w-8 h-8 text-laex-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-laex-blue mb-4">INTER + CLAT</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Complete Intermediate (MPC/BiPC/MEC) while receiving full CLAT coaching — without sacrificing either. The smartest way to enter India's premier National Law Universities.
                </p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "Complete Board Exam + CLAT coaching in a single structured program",
                    "Daily Legal Reasoning, GK, English & Logical Reasoning practice",
                    "Regular CLAT mock tests with detailed performance analytics",
                    "AI based performance metrics and improvement tools",
                    "Personalized mentorship with CLAT-qualified faculty"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-100 mb-8">
                  {['CLAT', 'AILET', 'SLAT', 'LSAT India'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-500">{tag}</span>
                  ))}
                </div>
                <a href="#apply" className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-50 text-laex-blue font-bold border border-slate-200 hover:bg-laex-blue hover:text-white hover:border-laex-blue transition-all group-hover:bg-laex-orange group-hover:text-white group-hover:border-laex-orange">
                  Apply for INTER + CLAT <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>

            {/* IPMAT Card */}
            <FadeIn delay={0.2}>
              <div className="course-card bg-white rounded-[2rem] border-2 border-slate-200 p-8 md:p-12 h-full flex flex-col group cursor-pointer">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 border border-orange-100 group-hover:bg-laex-orange group-hover:text-white transition-colors duration-300">
                  <TrendingUp className="w-8 h-8 text-laex-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-laex-blue mb-4">INTER + IPMAT</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Build a management career from the foundation. Simultaneously complete Intermediate while preparing rigorously for IPMAT, JIPMAT, and related exams for IIM entry.
                </p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "Integrated Board + IPMAT coaching in a single focused environment",
                    "Advanced Quantitative Aptitude, Logical Reasoning & VARC training",
                    "IIM-pattern mock tests, sectional tests & time management drills",
                    "AI based performance metrics and improvement tools",
                    "Expert faculty with IIM alumni & top aptitude trainers"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-100 mb-8">
                  {['IPMAT', 'JIPMAT', 'CUET', 'SET'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-500">{tag}</span>
                  ))}
                </div>
                <a href="#apply" className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-50 text-laex-blue font-bold border border-slate-200 hover:bg-laex-blue hover:text-white hover:border-laex-blue transition-all group-hover:bg-laex-orange group-hover:text-white group-hover:border-laex-orange">
                  Apply for INTER + IPMAT <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-light to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-laex-light" toColor="to-laex-blue" height="h-32" />
      </section>

      {/* CTA / Apply Now (Moved to 3rd Section) */}
      <section id="apply" className="bg-laex-blue relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-laex-orange rounded-l-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

            {/* Left Content */}
            <div className="lg:w-5/12 bg-laex-dark text-white p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')", backgroundSize: 'cover' }}></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Your Child's Future Begins <span className="text-laex-orange">With One Conversation.</span></h2>
                <p className="text-white/80 mb-10 leading-relaxed">Our expert counselors will help you understand which program is the right fit, what the journey looks like, and how to give your child the maximum advantage in cracking CLAT or IPMAT.</p>

                <ul className="space-y-6">
                  <li className="flex items-center gap-4"><Flame className="w-6 h-6 text-laex-orange" /> <span className="font-medium text-white/90">Limited Seats Available (2025-26 Batch)</span></li>
                  <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-green-400" /> <span className="font-medium text-white/90">Free Counseling Session (No Obligation)</span></li>
                  <li className="flex items-center gap-4"><Phone className="w-6 h-6 text-blue-400" /> <span className="font-medium text-white/90">Response Within 2 Hours Guaranteed</span></li>
                  <li className="flex items-center gap-4"><Building2 className="w-6 h-6 text-purple-400" /> <span className="font-medium text-white/90">Hostel Seats Filling Fast</span></li>
                </ul>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-7/12 p-12 lg:p-16 bg-white">
              <h3 className="text-2xl font-bold text-laex-blue mb-8">Book Your Free Counseling</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Student's Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 focus:border-laex-orange transition-all" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Parent's / Guardian Phone</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 focus:border-laex-orange transition-all" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 focus:border-laex-orange transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Class</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 text-slate-700">
                      <option value="">Select Class</option>
                      <option value="10">Class 10th (Moving to 11th)</option>
                      <option value="11">Class 11th</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Program of Interest</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 text-slate-700">
                      <option value="">Select Program</option>
                      <option value="clat">INTER + CLAT</option>
                      <option value="ipmat">INTER + IPMAT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Campus</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-laex-orange/50 text-slate-700">
                      <option value="">Select Campus</option>
                      <option value="kompally">Kompally (Residential)</option>
                      <option value="himayatnagar">Himayat Nagar (Day Scholar)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-laex-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-laex-orange/20 hover:scale-[1.02] active:scale-[0.98] mt-4 flex justify-center items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Get Free Counseling Now
                </button>
                <p className="text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-2"><Shield className="w-3 h-3" /> Your information is 100% safe. We respect your privacy.</p>
              </form>
            </div>

          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-blue to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* Program Deep Dives */}
      <section className="bg-laex-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577415124269-fc1140a89a87?auto=format&fit=crop&q=80&w=2000')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">

          {/* CLAT Deep Dive */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <FadeIn>
              <div className="inline-flex px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">INTER + CLAT</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Become a Lawyer. <br /><span className="text-laex-orange">Begin Today.</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg mb-8">
                CLAT tests English, Legal Reasoning, Logical Reasoning, Quantitative Techniques, and Current Affairs. These skills take time to build — not weeks, but months. Starting in Intermediate gives students 2 years to develop these skills systematically, without last-minute pressure.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: BookOpen, title: "Reading Comprehension", desc: "Daily passage practice to build speed." },
                  { icon: Scale, title: "Legal Reasoning", desc: "Principle-fact analysis training." },
                  { icon: Globe, title: "Current Affairs", desc: "Weekly GK sessions & tests." },
                  { icon: BarChart3, title: "Quantitative", desc: "Class 10 math made exam-ready." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                      <item.icon className="w-5 h-5 text-laex-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#apply" className="inline-flex items-center gap-2 text-laex-orange font-bold hover:text-white transition-colors border-b-2 border-laex-orange pb-1 w-max">
                Get CLAT Counseling — Free <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="animate-float bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="text-4xl font-serif text-white opacity-20 mb-2 absolute right-4 top-4 font-bold">01</div>
                    <h4 className="text-xl font-bold mb-2">NLSIU Bangalore</h4>
                    <p className="text-white/60 text-sm">India's #1 Law School for visionary minds.</p>
                  </div>
                  <div className="animate-float-delay-1 bg-laex-orange p-6 rounded-2xl relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <Briefcase className="w-10 h-10 mb-4 opacity-50" />
                    <h4 className="text-xl font-bold mb-2">Corporate Lawyer</h4>
                    <p className="text-white/90 font-medium">Packages up to ₹50 LPA</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="animate-float-delay-2 aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10">
                    <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Law" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold mb-1">NALSAR Hyderabad</h4>
                      <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">Top 3 NLU</p>
                    </div>
                  </div>
                  <div className="animate-float-delay-3 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <h4 className="text-xl font-bold mb-2">Judiciary & IAS</h4>
                    <p className="text-white/60 text-sm">A strong foundation for UPSC & Judiciary.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* IPMAT Deep Dive */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="animate-float-delay-2 aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Management" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold mb-1">IIM Indore</h4>
                      <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">5-Year IPM Program</p>
                    </div>
                  </div>
                  <div className="animate-float-delay-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <h4 className="text-xl font-bold mb-2">Finance Elite</h4>
                    <p className="text-white/60 text-sm">Investment Banking & PE paths.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="animate-float-delay-5 bg-laex-orange p-6 rounded-2xl relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <TrendingUp className="w-10 h-10 mb-4 opacity-50" />
                    <h4 className="text-xl font-bold mb-2">Global Consulting</h4>
                    <p className="text-white/90 font-medium">McKinsey, BCG, Bain & More.</p>
                  </div>
                  <div className="animate-float-delay-6 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="text-4xl font-serif text-white opacity-20 mb-2 absolute right-4 top-4 font-bold">02</div>
                    <h4 className="text-xl font-bold mb-2">IIM Rohtak</h4>
                    <p className="text-white/60 text-sm">Direct entry right after 12th.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="inline-flex px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">INTER + IPMAT</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Enter IIM at 17. <br /><span className="text-laex-orange">The Fast Track.</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg mb-8">
                IPMAT is the gateway to the 5-Year Integrated Management Program at IIM Indore. Clearing IPMAT at Intermediate level puts you 3 years ahead of traditional MBA aspirants. The exam rewards those who build a strong concept base early — no trade-offs, no last-minute cramming.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: BarChart3, title: "Quantitative Aptitude", desc: "Algebra, Arithmetic, Data mastery." },
                  { icon: MessageSquare, title: "Verbal & RC", desc: "Grammar, vocabulary for VARC." },
                  { icon: Brain, title: "Logical Reasoning", desc: "Puzzles, critical reasoning." },
                  { icon: Users, title: "GD & PI Prep", desc: "Interviews & personality dev." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                      <item.icon className="w-5 h-5 text-laex-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#apply" className="inline-flex items-center gap-2 text-laex-orange font-bold hover:text-white transition-colors border-b-2 border-laex-orange pb-1 w-max">
                Get IPMAT Counseling — Free <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-blue to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-laex-blue" toColor="to-laex-dark" height="h-32" />
      </section>

      {/* Scroll-linked Gallery */}
      <section ref={galleryRef} className="h-[300vh] relative bg-laex-dark">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div style={{ x: xTransform }} className="flex w-[300vw] h-full">

            {/* Slide 1 */}
            <div className="w-[100vw] h-full shrink-0 relative flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-40">
              <img src="/images/image.JPG" className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity" alt="Campus Life" />
              <div className="absolute inset-0 bg-gradient-to-t from-laex-dark via-laex-dark/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-laex-dark/90 via-transparent to-transparent w-1/2"></div>
              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex px-3 py-1 bg-laex-orange text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-md">Campus Life</div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Where Focus <br />Meets Ambition</h2>
                <p className="text-xl text-white/80 max-w-2xl">Immersive study environments designed purely for deep work and competitive excellence.</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-[100vw] h-full shrink-0 relative flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-40 border-l border-white/5">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Mentorship" />
              <div className="absolute inset-0 bg-gradient-to-t from-laex-dark via-laex-dark/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-laex-dark/90 via-transparent to-transparent w-1/2 ml-auto"></div>
              <motion.div style={{ opacity: slide2TextOpacity, y: slide2TextY }} className="relative z-10 max-w-4xl ml-auto text-right flex flex-col items-end">
                <div className="inline-flex px-3 py-1 bg-laex-blue border border-white/20 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-md backdrop-blur-md">1-on-1 Mentorship</div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Guided by <br />the Best</h2>
                <p className="text-xl text-white/80 max-w-2xl text-right">Daily interactions with IIM alumni and NLU graduates who have walked the path to success.</p>
              </motion.div>
            </div>

            {/* Slide 3 - Transitions to Light Theme */}
            <div className="w-[100vw] h-full shrink-0 relative flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-40">
              <div className="absolute inset-0 bg-white"></div>
              <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply grayscale" alt="Library" />

              {/* Fade out the dark from the left over the light background */}
              <div className="absolute inset-0 bg-gradient-to-r from-laex-dark via-laex-dark/80 to-transparent w-[50vw] z-10"></div>

              {/* Fade to solid white at the bottom to blend with next section */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10 h-full"></div>

              <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex px-3 py-1 bg-laex-blue text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-md">24/7 Library</div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-laex-blue mb-6">Endless <br />Resources</h2>
                <p className="text-xl text-slate-600 max-w-2xl font-medium">Unrestricted access to the largest repository of preparation materials and premium mock tests.</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Why La Excellence */}
      <section id="why-us" className="bg-white relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-laex-blue mb-6">
                Not Just Coaching. <br /><span className="text-laex-orange">A Complete Transformation.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We don't just prepare students for exams. We build the discipline, character, and competence that premier institutions look for.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Result-Oriented Curriculum", desc: "Every hour is designed with exam outcomes in mind. 2,000+ hours of structured content and daily practice." },
              { icon: Users, title: "Expert Mentors & Faculty", desc: "Learn from IIM alumni, legal experts, and experienced educators who bring real-world insight to the classroom." },
              { icon: BarChart3, title: "Personalized Tracking", desc: "One-on-one performance reviews, customized study plans, and regular counseling to address weaknesses." },
              { icon: Building2, title: "World-Class Infrastructure", desc: "24/7 study halls, digital libraries, smart classrooms, and secure hostel facilities for residential learning." },
              { icon: Brain, title: "AI-Enabled Learning", desc: "Personalized AI-driven academic assistance helps students track progress, identify weak areas, and study smarter." },
              { icon: Star, title: "Holistic Personality", desc: "Group discussions, leadership workshops, and communication training build confident, articulate future leaders." }
            ].map((feature, i) => (
              <FadeIn delay={i * 0.1} key={i}>
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-laex-blue group-hover:bg-laex-orange group-hover:text-white transition-colors duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-serif font-bold text-slate-200">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-laex-blue mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-white" toColor="to-laex-light" height="h-32" />
      </section>

      {/* Founders Section */}
      <section className="bg-laex-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-laex-orange/10 text-laex-orange font-bold text-sm tracking-wide mb-6">
                <Users className="w-4 h-4" /> LEADING THE VISION
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-laex-blue mb-6 leading-tight">Meet the <span className="text-laex-orange">Founders</span></h2>
              <p className="text-lg text-slate-600">The visionaries behind La Excellence, shaping the future of education in India.</p>
            </div>
          </FadeIn>
          <div className="space-y-12">
            {/* Chairman Card - Featured */}
            <FadeIn>
              <div className="group rounded-[3rem] overflow-hidden bg-white shadow-xl border border-slate-100 flex flex-col lg:flex-row min-h-[500px]">
                <div className="lg:w-1/3 aspect-square lg:aspect-auto overflow-hidden bg-slate-100">
                  <img src="/founders/image.png" alt="Dr. Ram Babu P" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="lg:w-2/3 p-10 lg:p-16 flex flex-col justify-center relative">
                  <Quote className="absolute top-12 right-12 w-24 h-24 text-slate-50 -z-0 opacity-50" />
                  <div className="relative z-10">
                    <div className="inline-flex px-3 py-1 bg-laex-orange/10 text-laex-orange rounded-full text-xs font-bold tracking-widest uppercase mb-6 w-max">Chairman's Message</div>
                    <h3 className="text-3xl md:text-4xl font-bold text-laex-blue mb-2">Dr. Ram Babu P</h3>
                    <p className="text-laex-orange font-bold mb-8 text-lg uppercase tracking-wider">Chairman, La Excellence IAS Academy</p>
                    
                    <div className="space-y-6 text-slate-600 leading-relaxed italic text-lg">
                      <p>"Dear Students, I consider myself the First Employee of La Excellence, marking the beginning of a journey that has been both meaningful and transformative. From the very start, this institution has stood for more than just coaching—it reflects a shared mission to nurture aspirants into confident, capable, and compassionate civil servants."</p>
                      <p>"Over the years, I’ve had the privilege of witnessing countless aspirants secure ranks in the Civil Services Examination, turning their dedication and discipline into success stories that continue to inspire many."</p>
                      <p>"At the La Excellence IAS Academy, I will work closely with young minds—helping them discover their strengths, think with clarity, and pursue their goals with purpose and conviction. Watching students evolve into determined individuals ready to serve the nation fills me with immense pride."</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Other Directors */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  name: "Anush Reddy", 
                  role: "Dean, IAS Integrated Programme", 
                  desc: "As the Dean, I have spent the past ten years mentoring aspirants through a comprehensive approach that blends academic excellence with discipline, consistency, and personal growth. I believe that success in the Civil Services is shaped by perseverance, focus, and a deep sense of purpose. My constant endeavour is to help students grow into well-rounded individuals who balance learning with reflection, ambition with humility, and preparation with perseverance.", 
                  img: "/founders/image2.jpeg" 
                },
                { 
                  name: "Ch Srinivasa Reddy", 
                  role: "Director", 
                  desc: "With nearly three decades in education, including over eight years in Integrated IAS training, I have dedicated my life to nurturing young minds and building institutions grounded in excellence and integrity. My vision has always been to create learning spaces that inspire curiosity, discipline, and purpose. I have a deep desire to empower students—to help them believe in themselves, think boldly, and grow with confidence and compassion.", 
                  img: "/founders/image3.png" 
                }
              ].map((founder, i) => (
                <FadeIn delay={i * 0.1} key={founder.name}>
                  <div className="group rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={founder.img} alt={founder.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-laex-blue mb-1">{founder.name}</h3>
                      <p className="text-laex-orange font-bold mb-6 text-xs uppercase tracking-widest">{founder.role}</p>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium italic">"{founder.desc}"</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-light to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-laex-light" toColor="to-white" height="h-32" />
      </section>

      {/* Faculty Section */}
      <section className="bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-laex-blue/5 text-laex-blue font-bold text-sm tracking-wide mb-6">
                <BookOpen className="w-4 h-4" /> MASTERFUL PEDAGOGY
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-laex-blue">Learn from the <span className="text-laex-orange">Best</span></h2>
              <p className="text-lg text-slate-600 mt-6 max-w-2xl">Our faculty team comprises top NLU and IIM alumni who bring years of competitive exam expertise.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="shrink-0">
              <a href="#apply" className="font-bold text-laex-orange border-b-2 border-laex-orange hover:text-orange-600 transition-colors inline-block pb-1">View All Faculty →</a>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { subject: "Legal Reasoning", alum: "NALSAR Alumnus", exp: "8+ Years Exp" },
              { subject: "Quantitative Techniques", alum: "IIM B Alumnus", exp: "12+ Years Exp" },
              { subject: "Logical Reasoning", alum: "NLSIU Alumnus", exp: "6+ Years Exp" },
              { subject: "Verbal Ability", alum: "Delhi Univ. Alumnus", exp: "10+ Years Exp" }
            ].map((fac, i) => (
              <FadeIn delay={i * 0.1} key={i}>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-laex-orange hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 text-laex-orange font-serif font-bold text-xl border border-slate-100">
                    {fac.subject.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{fac.subject}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-laex-blue">{fac.alum}</span>
                    <span className="text-xs text-slate-500 font-medium">{fac.exp}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-white" toColor="to-slate-50" height="h-32" />
      </section>

      {/* Facilities Section */}
      <section className="bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-laex-blue mb-6">World-Class <span className="text-laex-orange">Infrastructure</span></h2>
              <p className="text-lg text-slate-600">A residential campus designed meticulously to foster deep learning, focus, and overall development.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center cursor-default">
            <FadeIn>
                <div className="space-y-4">
                  <div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Library" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-laex-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h4 className="text-white font-bold">24/7 Library</h4>
                      <p className="text-white/70 text-xs">Deep focus environment.</p>
                    </div>
                  </div>
                  <div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800" alt="Sports" className="rounded-3xl w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-laex-orange/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h4 className="text-white font-bold">Sports Arena</h4>
                      <p className="text-white/70 text-xs">Physical well-being.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800" alt="Classroom" className="rounded-3xl w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-laex-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h4 className="text-white font-bold">Smart Classrooms</h4>
                      <p className="text-white/70 text-xs">AI-enabled learning.</p>
                    </div>
                  </div>
                  <div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800" alt="Hostel" className="rounded-3xl w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-laex-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h4 className="text-white font-bold">Safe Hostels</h4>
                      <p className="text-white/70 text-xs">Your second home.</p>
                    </div>
                  </div>
                </div>
            </FadeIn>

            <div className="space-y-6">
              {[
                { title: "Smart AC Classrooms", desc: "Digitally enabled, climate-controlled classrooms for comfortable learning.", icon: Target },
                { title: "Premium Residential Hostels", desc: "Safe, separate AC hostels for boys and girls with strict security protocols.", icon: Building2 },
                { title: "24/7 Digital Library", desc: "Access to thousands of law and management preparation resources anytime.", icon: BookOpen },
                { title: "Nutritious Cafeteria", desc: "In-house hygienic dining serving balanced meals curated by nutritionists.", icon: Users },
                { title: "Sports & Recreation", desc: "Dedicated arenas for physical fitness and mental relaxation.", icon: Globe }
              ].map((fac, i) => (
                <FadeIn delay={i * 0.1} key={i}>
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 hover:shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-laex-orange flex items-center justify-center shrink-0 border border-orange-100">
                      <fac.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{fac.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{fac.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-slate-50" toColor="to-laex-dark" height="h-32" />
      </section>

      {/* Philosophy (Pillars) */}
      <section className="bg-laex-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white"><polygon points="0,100 100,0 100,100" /></svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The Four Pillars of <span className="text-laex-orange">La Excellence</span></h2>
            <p className="text-white/70 text-lg max-w-2xl mb-16">At La Excellence, we believe a student's journey to excellence is not just academic — it is a transformation of character, discipline, and purpose.</p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-6 hover:gap-8 transition-all duration-500">
            {[
              { san: "गुरु", title: "Guru", desc: "Every student deserves a true mentor — not just a teacher. Wisdom, patience, and personal investment." },
              { san: "गुरुकुलम्", title: "Gurukulam", desc: "Our residential campus recreates the ancient Gurukul — a focused, immersive learning environment." },
              { san: "साधना", title: "Sadhana", desc: "Excellence is a daily practice. Structured routines, daily assessments, and consistent study cycles." },
              { san: "सम्पूर्णता", title: "Sampurnata", desc: "Completeness. Building students ready for entrance exams, and professional leadership roles." }
            ].map((p, i) => (
              <FadeIn delay={i * 0.1} key={i}>
                <div className="border border-white/10 rounded-3xl p-8 bg-white/5 hover:bg-laex-orange group transition-all h-full cursor-default">
                  <div className="text-4xl font-serif text-laex-orange group-hover:text-white/20 font-bold mb-4 transition-colors">{p.san}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-white">{p.title}</h3>
                  <p className="text-sm text-white/70 group-hover:text-white/90 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <SectionDivider fromColor="from-laex-dark" toColor="to-laex-light" height="h-32" />
      </section>

      {/* Testimonials */}
      <section className="bg-laex-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-laex-blue mb-4">Real Students. <span className="text-laex-orange">Real Results.</span></h2>
              <p className="text-slate-600">Hear from the families who trusted La Excellence IAS with their most important decision.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "I joined the INTER + CLAT program after my 10th boards. Within 8 months, my legal reasoning scores improved dramatically. The faculty here don't just teach — they mentor. I secured admission to NALSAR Hyderabad in my very first attempt.", author: "Ananya Reddy", sub: "NALSAR Hyderabad | CLAT AIR 89", letter: "A" },
              { q: "As a parent, I was worried my son would struggle balancing boards and IPMAT prep. La Excellence's structured system made it seamless. The personal tracking system kept us informed every step of the way. He cracked IIM Indore's IPM program.", author: "Ravi Kumar (Parent)", sub: "Son: IIM Indore IPM | IPMAT 2024", letter: "R" },
              { q: "The philosophy here is different. It's not just about marks — it's about becoming someone ready for leadership. The Sadhana approach — daily practice, assessments — built a discipline in me that I carry even now at NLU Delhi.", author: "Priya Sharma", sub: "NLU Delhi | AILET 2023", letter: "P" }
            ].map((t, i) => (
              <FadeIn delay={i * 0.1} key={i}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative h-full flex flex-col">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 rotate-180" />
                  <div className="flex gap-1 text-laex-orange mb-6">
                    <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-slate-700 leading-relaxed italic mb-8 flex-grow">"{t.q}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xl text-laex-blue">{t.letter}</div>
                    <div>
                      <div className="font-bold text-laex-blue">{t.author}</div>
                      <div className="text-xs text-slate-500 font-semibold mt-0.5">{t.sub}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-light to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-laex-light" toColor="to-laex-light" height="h-16" />
      </section>



      {/* FAQ Section */}
      <section id="faq" className="bg-laex-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-laex-blue mb-4">Questions asked <span className="text-laex-orange">by Parents</span></h2>
            <p className="text-slate-600">We believe in complete transparency. Here are the most common questions from families.</p>
          </div>
          <div>
            <FAQItem
              question="Won't preparing for CLAT/IPMAT affect my child's Board Exam scores?"
              answer="Absolutely not. Our integrated program is specifically designed to eliminate this conflict. The curriculum is structured so that Intermediate academics and competitive exam coaching reinforce each other. Board exam preparation builds a strong foundation for aptitude, and vice versa. Thousands of our alumni have proven this balance is our strength."
            />
            <FAQItem
              question="Why start preparation in Intermediate instead of dropping a year after 12th?"
              answer="Competitive exams like CLAT and IPMAT test skills like comprehensive reasoning, legal logic, and high-level aptitude. These cannot be 'crammed' in 6 months. A 2-year runway allows a student to develop these cognitive skills deeply, attempt hundreds of mock variations, and face the exam without panic. Skipping a drop-year saves a crucial year of their career."
            />
            <FAQItem
              question="Do you provide hostel facilities for both boys and girls?"
              answer="Yes, La Excellence provides completely separate, highly secure, and academically vibrant hostel facilities for both boys and girls. The hostels include supervised study hours, 24/7 warden support, healthy meals, and a strict no-distraction policy."
            />
            <FAQItem
              question="What happens if a student misses classes or falls behind?"
              answer="Our 'Personalized Tracking' pillar handles this. We run daily and weekly assessments. If a student's performance dips, they are immediately scheduled for backup sessions, 1-on-1 mentor guidance, and doubt-clearing blocks until they catch up with the cohort."
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-laex-light to-transparent pointer-events-none z-10"></div>
        </div>
        <SectionDivider fromColor="from-laex-light" toColor="to-laex-light" height="h-32" />
      </section>

      {/* Location Section */}
      <section id="location" className="bg-laex-light relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col lg:flex-row min-h-[600px]">
            {/* Map Area */}
            <div className="lg:w-7/12 h-[400px] lg:h-auto relative bg-slate-100">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.111874984534!2d78.4839!3d17.5255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910000000001%3A0x0!2sKompally%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full grayscale opacity-80 contrast-125 brightness-100 hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
            
            {/* Info Area */}
            <div className="lg:w-5/12 p-12 lg:p-16 flex flex-col justify-center bg-laex-blue text-white relative">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white"><polygon points="100,100 0,100 100,0" /></svg>
              </div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm tracking-wide mb-8 border border-white/20">
                  <MapPin className="w-4 h-4 text-laex-orange" /> VISIT OUR CAMPUS
                </div>
                <h2 className="text-4xl font-serif font-bold mb-6">Come Say <span className="text-laex-orange">Hello.</span></h2>
                <p className="text-white/80 mb-10 leading-relaxed">
                  Located in the serene and academic-friendly environment of Kompally, our residential campus provides the perfect atmosphere for deep focus and competitive preparation.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                       <MapPin className="w-6 h-6 text-laex-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Main Residential Campus</h4>
                      <p className="text-white/60 text-sm">Jayabheri Park Rd, Kompally, Hyderabad, Telangana 500100</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                       <Clock className="w-6 h-6 text-laex-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Visiting Hours</h4>
                      <p className="text-white/60 text-sm">Mon - Sat: 9:00 AM - 7:00 PM<br/>Sun: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                       <Phone className="w-6 h-6 text-laex-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Call for Admissions</h4>
                      <div className="flex flex-col gap-1 mt-1">
                        <a href="tel:+919000296424" className="text-white hover:text-laex-orange transition-colors font-medium">+91 90002 96424</a>
                        <a href="tel:+919247903001" className="text-white hover:text-laex-orange transition-colors font-medium">+91 92479 03001</a>
                        <a href="tel:+919247903002" className="text-white hover:text-laex-orange transition-colors font-medium">+91 92479 03002</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <a 
                  href="https://www.google.com/maps/search/La+Excellence+IAS+Academy+Kompally+Hyderabad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex items-center gap-3 bg-laex-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-laex-orange/20 group w-max"
                >
                  Get Directions <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="from-laex-light" toColor="to-laex-dark" height="h-32" />

      {/* Footer */}
      <footer className="bg-laex-dark text-white pt-20 pb-8 border-t-[8px] border-laex-orange relative overflow-hidden">
        <div className="absolute -left-40 top-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-2xl w-max border border-white/10">
                <img src="/logo.png" alt="La Excellence Logo" className="h-15 w-auto object-contain" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6 font-medium">Hyderabad's premier integrated coaching academy, shaping India's future lawyers and managers since 2009. Trusted by 10,000+ families across Telangana & AP.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-laex-orange transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-laex-orange transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-laex-orange transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-laex-dark transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Quick Links 1 */}
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-4 inline-block">Programs</h4>
              <ul className="space-y-4 text-sm text-white/70 font-medium">
                <li><a href="#" className="hover:text-laex-orange transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> INTER + CLAT</a></li>
                <li><a href="#" className="hover:text-laex-orange transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> INTER + IPMAT</a></li>
                <li><a href="#" className="hover:text-laex-orange transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> INTER + IAS</a></li>
                <li><a href="#" className="hover:text-laex-orange transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Degree + IAS</a></li>
                <li><a href="#" className="hover:text-laex-orange transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Prelims Cum Mains</a></li>
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-4 inline-block">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/70 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">About La Excellence</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Faculty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Photo Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Achievements</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blogs & Resources</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-4 inline-block">Contact Us</h4>
              <ul className="space-y-6 text-sm text-white/80 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-laex-orange shrink-0 mt-0.5" />
                  <span>Kompally, Hyderabad — Telangana 500100 (Main Campus)</span>
                </li>
                <li className="flex flex-col gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-laex-orange/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-laex-orange shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white/40">Contact Numbers</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="tel:+919000296424" className="text-lg font-bold text-white tracking-wide hover:text-laex-orange transition-colors flex items-center justify-between group/num">
                      +91 90002 96424
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/num:opacity-100 -translate-x-2 group-hover/num:translate-x-0 transition-all" />
                    </a>
                    <a href="tel:+919247903001" className="text-lg font-bold text-white tracking-wide hover:text-laex-orange transition-colors flex items-center justify-between group/num">
                      +91 92479 03001
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/num:opacity-100 -translate-x-2 group-hover/num:translate-x-0 transition-all" />
                    </a>
                    <a href="tel:+919247903002" className="text-lg font-bold text-white tracking-wide hover:text-laex-orange transition-colors flex items-center justify-between group/num">
                      +91 92479 03002
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/num:opacity-100 -translate-x-2 group-hover/num:translate-x-0 transition-all" />
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-laex-orange shrink-0" />
                  <a href="mailto:admissions@laexias.com" className="hover:text-white transition-colors">admissions@laexias.com</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-white/40 tracking-wider uppercase">
            <p>© {new Date().getFullYear()} La Excellence IAS Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
