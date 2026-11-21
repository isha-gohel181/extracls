import React from 'react'
import { APP_SHORT_NAME } from '../constants/brand'
import './AuthShowcase.css'

const AuthShowcase = () => {
  return (
    <div className="auth-showcase">
      {/* Background Dot-Grid Mesh & Ambient Glows */}
      <div className="auth-showcase__grid-pattern" aria-hidden />
      <div className="auth-showcase__glow auth-showcase__glow--a" aria-hidden />
      <div className="auth-showcase__glow auth-showcase__glow--b" aria-hidden />

      {/* Header Section */}
      <header className="auth-showcase__header">
        <div className="auth-showcase__badge">
          <span className="auth-showcase__beacon" />
          <span>{APP_SHORT_NAME} PLATFORM</span>
        </div>

        <h2 className="auth-showcase__title">
          The modern standard for interactive education.
        </h2>
        <p className="auth-showcase__lead">
          Structured curriculum tracks, live educator sessions, and measurable academic progress designed with clarity.
        </p>
      </header>

      {/* SaaS Product Workspace Window Mockup */}
      <div className="auth-showcase__window">
        {/* macOS Window Title Bar */}
        <div className="auth-showcase__window-bar">
          <div className="auth-showcase__window-dots" aria-hidden>
            <span className="auth-showcase__window-dot" />
            <span className="auth-showcase__window-dot" />
            <span className="auth-showcase__window-dot" />
          </div>

          <div className="auth-showcase__window-url">
            <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>extracls.com/learn</span>
          </div>

          <div className="auth-showcase__window-tag">
            <span className="auth-showcase__live-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Class</span>
            </span>
          </div>
        </div>

        {/* Window Interior Content */}
        <div className="auth-showcase__window-body">
          {/* Active Course Track Card */}
          <div className="auth-showcase__track-header">
            <div>
              <span className="auth-showcase__track-label">Active Curriculum Track</span>
              <h4 className="auth-showcase__track-name">Foundations & Creative Problem Solving</h4>
            </div>
            <div className="auth-showcase__track-stat">
              <span className="auth-showcase__track-percent">85%</span>
              <span className="auth-showcase__track-sub">Completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="auth-showcase__progress-track" aria-hidden>
            <div className="auth-showcase__progress-fill" style={{ width: '85%' }} />
          </div>

          {/* Curriculum Milestones (Linear / Stripe style) */}
          <div className="auth-showcase__milestones">
            {/* Milestone 1: Done */}
            <div className="auth-showcase__milestone auth-showcase__milestone--done">
              <div className="auth-showcase__milestone-indicator">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="auth-showcase__milestone-content">
                <p className="auth-showcase__milestone-title">Core Analytical Thinking & Concepts</p>
                <p className="auth-showcase__milestone-sub">Module 01 · 12 Lessons Completed</p>
              </div>
              <span className="auth-showcase__milestone-pill auth-showcase__milestone-pill--done">Done</span>
            </div>

            {/* Milestone 2: Active / Live */}
            <div className="auth-showcase__milestone auth-showcase__milestone--active">
              <div className="auth-showcase__milestone-indicator auth-showcase__milestone-indicator--active">
                <span className="w-2 h-2 rounded-full bg-[#55B8F5] animate-ping" />
              </div>
              <div className="auth-showcase__milestone-content">
                <p className="auth-showcase__milestone-title">Interactive Live Session & Practice</p>
                <p className="auth-showcase__milestone-sub">Module 02 · Educator Guided Workshop</p>
              </div>
              <span className="auth-showcase__milestone-pill auth-showcase__milestone-pill--active">In Session</span>
            </div>

            {/* Milestone 3: Upcoming */}
            <div className="auth-showcase__milestone auth-showcase__milestone--upcoming">
              <div className="auth-showcase__milestone-indicator auth-showcase__milestone-indicator--upcoming">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
              <div className="auth-showcase__milestone-content">
                <p className="auth-showcase__milestone-title">Synthesis & Mastery Assessment</p>
                <p className="auth-showcase__milestone-sub">Module 03 · Final Certification</p>
              </div>
              <span className="auth-showcase__milestone-pill auth-showcase__milestone-pill--upcoming">Next</span>
            </div>
          </div>
        </div>
      </div>

      {/* Understated Verified Testimonial Strip */}
      <blockquote className="auth-showcase__quote-strip">
        <p className="auth-showcase__quote-text">
          &ldquo;The structure and educator guidance make Extracls stand out. It provides real clarity and transforms the learning experience.&rdquo;
        </p>
        <footer className="auth-showcase__quote-author">
          <span className="auth-showcase__author-name">Priya Sharma</span>
          <span className="auth-showcase__author-sep">·</span>
          <span className="auth-showcase__author-role">Parent of Primary Student</span>
        </footer>
      </blockquote>

      {/* Minimalist Monospace Metrics Footer */}
      <div className="auth-showcase__metrics">
        <span>10,000+ ENROLLED</span>
        <span className="auth-showcase__metric-dot">•</span>
        <span>98% RETENTION</span>
        <span className="auth-showcase__metric-dot">•</span>
        <span>4.9 / 5 RATING</span>
      </div>
    </div>
  )
}

export default AuthShowcase
