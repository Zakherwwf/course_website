"use client";
import React, { useState, useEffect, useRef } from "react";

const TextRevealByWord = ({ text, className = "" }) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let wordIndex = 0;
          const interval = setInterval(() => {
            setVisibleWords(prev => {
              wordIndex++;
              if (wordIndex >= words.length) {
                clearInterval(interval);
                return words.length;
              }
              return wordIndex;
            });
          }, 150);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [words.length, hasStarted]);

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            index < visibleWords 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
            marginRight: '0.3em'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

const ImpactCard = ({ icon, number, label, delay = 0 }) => {
  // This component is no longer used but keeping for potential future use
  return null;
};

export default function InteractiveMission() {
  return (
    <section className="interactive-mission-section">
      <div className="mission-container">

        {/* Mission Header */}
        <div className="mission-header">
          <h2 className="mission-title">Our Mission</h2>
          <div className="mission-underline"></div>
        </div>

        {/* Main Mission Statement */}
        <div className="mission-statement">
          <TextRevealByWord
            text="WWF North Africa works to build a future where people and nature thrive together across the diverse ecosystems of the Mediterranean and Saharan regions."
            className="mission-text"
          />
        </div>

        {/* Supporting Text */}
        <div className="mission-supporting">
          <TextRevealByWord
            text="Through science-based conservation, community engagement, and policy advocacy, we address the urgent environmental challenges facing North Africa."
            className="supporting-text"
          />
        </div>

      </div>

      <style jsx>{`
        .interactive-mission-section {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, 
            var(--color-bg) 0%, 
            var(--color-bg-alt) 50%,
            var(--color-bg) 100%
          );
          position: relative;
          overflow: hidden;
        }

        .interactive-mission-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(0, 76, 118, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(243, 156, 18, 0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .mission-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .mission-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .mission-title {
          font-family: var(--font-serif);
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .mission-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          margin: 0 auto;
          border-radius: 2px;
        }

        .mission-statement {
          text-align: center;
          margin: 4rem 0;
          padding: 0 2rem;
        }

        .mission-text {
          font-family: var(--font-sans);
          font-size: 2rem;
          line-height: 1.4;
          color: var(--color-text);
          font-weight: 400;
          max-width: 900px;
          margin: 0 auto;
        }

        .mission-supporting {
          text-align: center;
          margin: 3rem 0;
          padding: 0 2rem;
        }

        .supporting-text {
          font-family: var(--font-sans);
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          max-width: 700px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .interactive-mission-section {
            padding: 3rem 1rem;
          }

          .mission-title {
            font-size: 2.5rem;
          }
          
          .mission-text {
            font-size: 1.5rem;
          }

          .supporting-text {
            font-size: 1.1rem;
          }

          .impact-title {
            font-size: 2rem;
          }
          
          .impact-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .impact-card {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .mission-text {
            font-size: 1.3rem;
          }

          .mission-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}