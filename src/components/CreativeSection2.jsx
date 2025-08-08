import { useState, useEffect, useRef } from 'preact/hooks';

export default function CreativeSection2({ content }) {
  const [activeCard, setActiveCard] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Intersection Observer for card animations
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, index]));
                setActiveCard(index);
              }, index * 300);
            }
          },
          { threshold: 0.4 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div ref={sectionRef} className="creative-section-2">
      {/* Floating navigation dots */}
      <div className="nav-dots">
        {content.map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${activeCard === index ? 'active' : ''}`}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>

      {/* Content cards */}
      <div className="cards-container">
        {content.map((item, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className={`content-card ${visibleCards.has(index) ? 'visible' : ''} ${
              activeCard === index ? 'active' : ''
            }`}
          >
            {/* Card number */}
            <div className="card-number">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Floating badge */}
            <div className="floating-badge">
              <div className="badge-content">
                {item.badge}
                <div className="badge-glow" />
              </div>
            </div>

            {/* Main content area */}
            <div className="card-main">
              {/* Text content */}
              <div className="text-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>

                {/* Action buttons */}
                <div className="card-actions">
                  <button className="primary-btn">
                    <span>Explore More</span>
                    <div className="btn-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                  <button className="secondary-btn">Learn More</button>
                </div>
              </div>

              {/* Image container with effects */}
              <div className="image-container">
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} className="card-image" />
                  <div className="image-overlay">
                    <div className="overlay-gradient" />
                    <div className="floating-particles">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="particle" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Background decoration */}
            <div className="card-bg-decoration">
              <div className="bg-circle bg-circle-1" />
              <div className="bg-circle bg-circle-2" />
              <div className="mesh-gradient" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .creative-section-2 {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .nav-dots {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 10;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 76, 118, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-dot::before {
          content: '';
          position: absolute;
          inset: -8px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .nav-dot.active {
          background: var(--color-primary, #004c76);
          transform: scale(1.5);
        }

        .nav-dot.active::before {
          border-color: var(--color-primary, #004c76);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.3; }
        }

        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .content-card {
          position: relative;
          opacity: 0;
          transform: translateY(100px) scale(0.8);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-height: 600px;
        }

        .content-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .content-card.active {
          transform: translateY(-20px) scale(1.02);
        }

        .card-number {
          position: absolute;
          top: -2rem;
          left: 2rem;
          z-index: 5;
        }

        .card-number span {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 8rem;
          font-weight: 900;
          color: rgba(0, 76, 118, 0.08);
          line-height: 1;
          user-select: none;
        }

        .floating-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          z-index: 4;
        }

        .badge-content {
          position: relative;
          background: linear-gradient(135deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 76, 118, 0.3);
        }

        .badge-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--color-primary, #004c76), var(--color-accent, #f39c12));
          border-radius: 50px;
          opacity: 0;
          filter: blur(8px);
          animation: badgeGlow 3s ease-in-out infinite alternate;
        }

        @keyframes badgeGlow {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }

        .card-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-text, #333);
          line-height: 1.2;
          margin: 0;
        }

        .card-description {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-text-muted, #777);
          margin: 0;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 76, 118, 0.4);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .primary-btn:hover .btn-arrow {
          transform: translate(4px, -4px);
        }

        .secondary-btn {
          background: transparent;
          color: var(--color-primary, #004c76);
          border: 2px solid var(--color-primary, #004c76);
          padding: 1rem 2rem;
          border-radius: 50px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: var(--color-primary, #004c76);
          color: white;
          transform: translateY(-2px);
        }

        .image-container {
          position: relative;
        }

        .image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .content-card:hover .card-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(0, 76, 118, 0.1) 0%, rgba(243, 156, 18, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .content-card:hover .overlay-gradient {
          opacity: 1;
        }

        .floating-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(243, 156, 18, 0.6);
          border-radius: 50%;
          animation: floatParticle 4s ease-in-out infinite;
        }

        .particle:nth-child(1) { top: 20%; left: 10%; }
        .particle:nth-child(2) { top: 40%; right: 15%; }
        .particle:nth-child(3) { bottom: 30%; left: 20%; }
        .particle:nth-child(4) { top: 60%; left: 60%; }
        .particle:nth-child(5) { bottom: 20%; right: 25%; }
        .particle:nth-child(6) { top: 15%; left: 70%; }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }



        .card-bg-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.1;
        }

        .bg-circle-1 {
          width: 200px;
          height: 200px;
          background: var(--color-primary, #004c76);
          top: -50px;
          left: -50px;
          animation: floatCircle 8s ease-in-out infinite;
        }

        .bg-circle-2 {
          width: 150px;
          height: 150px;
          background: var(--color-accent, #f39c12);
          bottom: -30px;
          right: -30px;
          animation: floatCircle 6s ease-in-out infinite reverse;
        }

        @keyframes floatCircle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }

        .mesh-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(0, 76, 118, 0.02) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(243, 156, 18, 0.02) 0%, transparent 50%);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .nav-dots {
            display: none;
          }

          .card-main {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }

          .card-number span {
            font-size: 4rem;
          }

          .card-title {
            font-size: 2rem;
          }

          .card-actions {
            flex-direction: column;
          }

          .floating-badge {
            position: static;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .content-card,
          .badge-glow,
          .particle,
          .bg-circle {
            animation: none !important;
          }
          
          .card-image {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}