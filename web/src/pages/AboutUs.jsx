import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { APP_DISPLAY_NAME, APP_TAGLINE, LOGO_PATH, MISSION_STATEMENT } from '../constants/brand';

gsap.registerPlugin(ScrollTrigger);

const aboutParagraphs = [
  'Welcome to Extracls, where little minds grow and learning becomes joyful!',
  'We offer engaging educational courses and high-quality study materials for preschool and primary school children. Designed by experienced educators and subject experts, our resources make learning simple, interesting, and effective. Beyond the school curriculum, we encourage curiosity, creativity, and a love for discovery. From building strong foundations to exploring new ideas, Extracls supports every child’s learning journey with care and quality.',
  'Our aim is to make learning enjoyable, meaningful, and accessible, helping young learners grow in knowledge, confidence, and imagination.',
];

const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.utils.toArray('.scroll-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#334155] overflow-hidden pt-24 pb-20">
      <section className="relative px-6 py-16 md:py-24 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E5F2FF] rounded-full blur-[120px] -z-10" />

        <div className="hero-animate mb-8">
          <img src={LOGO_PATH} alt={APP_DISPLAY_NAME} className="h-20 md:h-24 w-auto mx-auto object-contain" />
        </div>

        <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0F7FF] text-[#142B5C] text-xs font-bold uppercase tracking-wider mb-8 border border-[#E2EAF3]">
          <span className="w-2 h-2 rounded-full bg-[#55B8F5] animate-pulse" />
          About Us
        </div>

        <h1 className="hero-animate text-[clamp(2rem,5vw,3rem)] font-black text-[#142B5C] leading-[1.15] tracking-tight mb-10">
          {APP_DISPLAY_NAME}
        </h1>

        <div className="hero-animate space-y-6 text-left w-full">
          {aboutParagraphs.map((para, i) => (
            <p key={i} className="text-lg md:text-xl text-[#334155] leading-relaxed font-medium">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="scroll-section px-6 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#F0F7FF] p-10 md:p-14 rounded-[2rem] border border-[#E2EAF3]">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-white">
            <img
              src="/courses/workshop.png"
              alt="Children learning with EXTRACLS"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#142B5C] mb-4">Our Mission</h2>
            <p className="text-xl text-[#334155] leading-relaxed font-medium">
              Our mission is simple: {MISSION_STATEMENT}
            </p>
            <p className="mt-4 text-sm uppercase tracking-widest text-[#55B8F5] font-bold">{APP_TAGLINE}</p>
            <Link
              to="/courses"
              className="inline-flex mt-8 items-center gap-2 px-8 py-4 bg-[#55B8F5] hover:bg-[#3aa8ee] text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;