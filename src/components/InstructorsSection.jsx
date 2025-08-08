import { useState, useEffect, useRef } from 'preact/hooks';

export default function InstructorsSection() {
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const instructors = [
    {
      name: "Dr. Amina Bouaziz",
      title: "Lead Ecosystem Scientist",
      specialization: "Mediterranean Biodiversity & IUCN Classification",
      bio: "With over 15 years of field research across North African ecosystems, Dr. Bouaziz brings unparalleled expertise in biodiversity conservation and ecosystem management to our academy.",
      credentials: "PhD Ecology, University of Tunis • IUCN Red List Authority",
      image: "https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      achievements: ["Published 45+ research papers", "Led 12 conservation projects", "UNEP Award recipient"]
    },
    {
      name: "Prof. Hassan El-Mansouri",
      title: "Conservation Strategy Expert",
      specialization: "Traditional Ecological Knowledge & Community Conservation",
      bio: "A renowned expert in integrating traditional knowledge with modern conservation practices, Professor El-Mansouri has worked with communities across the Maghreb region for over two decades.",
      credentials: "Professor of Environmental Science, University of Rabat • UNESCO Advisor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
      achievements: ["25+ years field experience", "Authored 3 conservation handbooks", "Community impact in 50+ villages"]
    },
    {
      name: "Dr. Fatima Al-Zahra",
      title: "Marine Ecosystem Specialist",
      specialization: "Coastal & Marine Conservation",
      bio: "Leading expert in Mediterranean marine ecosystems and blue carbon initiatives. Dr. Al-Zahra's research focuses on sustainable coastal management and marine protected areas.",
      credentials: "PhD Marine Biology, Sorbonne • Blue Carbon Initiative Coordinator",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
      achievements: ["Established 8 marine protected areas", "Blue carbon expert", "40+ scientific publications"]
    },
    {
      name: "Dr. Omar Benjelloun",
      title: "Climate Adaptation Researcher",
      specialization: "Climate Change & Ecosystem Resilience",
      bio: "Internationally recognized climate scientist specializing in ecosystem adaptation strategies. Dr. Benjelloun leads cutting-edge research on climate resilience in arid environments.",
      credentials: "PhD Climate Science, ETH Zurich • IPCC Contributing Author",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
      achievements: ["IPCC report contributor", "Climate adaptation pioneer", "30+ international conferences"]
    },
    {
      name: "Dr. Leila Khemiri",
      title: "Data Science & GIS Expert",
      specialization: "Remote Sensing & Ecosystem Monitoring",
      bio: "Expert in applying cutting-edge technology to ecosystem monitoring and conservation. Dr. Khemiri pioneers the use of satellite data and AI for biodiversity assessment.",
      credentials: "PhD Remote Sensing, INSAT • Google Earth Engine Certified Trainer",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
      achievements: ["GIS innovation leader", "AI conservation tools", "Trained 500+ scientists"]
    }
  ];

  // Auto-advance functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentInstructor((prev) => (prev + 1) % instructors.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, instructors.length]);

  const handleInstructorChange = (index) => {
    setCurrentInstructor(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  return (
    <div className="instructors-section">
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">Meet Your Expert Instructors</h2>
        <p className="section-subtitle">
          Learn from world-renowned conservation scientists and ecosystem experts who bring decades of field experience and cutting-edge research to your learning journey.
        </p>
      </div>

      {/* Main instructor display */}
      <div className="instructor-showcase">
        <div className="instructor-card">
          {/* Image section */}
          <div className="instructor-image-container">
            <div className="image-wrapper">
              <img
                src={instructors[currentInstructor].image}
                alt={instructors[currentInstructor].name}
                className="instructor-image"
              />
              <div className="image-overlay">
                <div className="credentials-badge">
                  {instructors[currentInstructor].credentials}
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="instructor-content">
            <div className="instructor-header">
              <h3 className="instructor-name">{instructors[currentInstructor].name}</h3>
              <p className="instructor-title">{instructors[currentInstructor].title}</p>
              <div className="specialization-tag">
                {instructors[currentInstructor].specialization}
              </div>
            </div>

            <p className="instructor-bio">{instructors[currentInstructor].bio}</p>

            {/* Achievements */}
            <div className="achievements">
              <h4 className="achievements-title">Key Achievements</h4>
              <ul className="achievements-list">
                {instructors[currentInstructor].achievements.map((achievement, index) => (
                  <li key={index} className="achievement-item">
                    <div className="achievement-icon">✓</div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor navigation */}
      <div className="instructor-navigation">
        {instructors.map((instructor, index) => (
          <div
            key={index}
            className={`nav-instructor ${currentInstructor === index ? 'active' : ''}`}
            onClick={() => handleInstructorChange(index)}
          >
            <div className="nav-image">
              <img src={instructor.image} alt={instructor.name} />
            </div>
            <div className="nav-info">
              <p className="nav-name">{instructor.name}</p>
              <p className="nav-title">{instructor.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentInstructor + 1) / instructors.length) * 100}%` }}
          />
        </div>
        <div className="progress-dots">
          {instructors.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${currentInstructor === index ? 'active' : ''}`}
              onClick={() => handleInstructorChange(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .instructors-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .section-subtitle {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 1.2rem;
          color: var(--color-text-muted, #777);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .instructor-showcase {
          margin-bottom: 3rem;
        }

        .instructor-card {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 3rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        .instructor-image-container {
          position: relative;
        }

        .image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 3/4;
        }

        .instructor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .instructor-card:hover .instructor-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .credentials-badge {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          color: var(--color-text, #333);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .instructor-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }

        .instructor-header {
          border-bottom: 1px solid rgba(0, 76, 118, 0.1);
          padding-bottom: 1rem;
        }

        .instructor-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
        }

        .instructor-title {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 1.1rem;
          color: var(--color-primary, #004c76);
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .specialization-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .instructor-bio {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-muted, #777);
          margin: 0;
        }

        .achievements {
          background: rgba(248, 250, 252, 0.8);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .achievements-title {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin: 0 0 1rem 0;
        }

        .achievements-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.9rem;
          color: var(--color-text-muted, #777);
        }

        .achievement-icon {
          width: 20px;
          height: 20px;
          background: var(--color-primary, #004c76);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .instructor-navigation {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 1rem;
        }

        .nav-instructor {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 240px;
          flex-shrink: 0;
        }

        .nav-instructor:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .nav-instructor.active {
          border-color: var(--color-primary, #004c76);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 25px rgba(0, 76, 118, 0.2);
        }

        .nav-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .nav-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-info {
          flex: 1;
        }

        .nav-name {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .nav-title {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.8rem;
          color: var(--color-text-muted, #777);
          margin: 0;
          line-height: 1.2;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(0, 76, 118, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        .progress-dots {
          display: flex;
          gap: 0.5rem;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 76, 118, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: var(--color-primary, #004c76);
          transform: scale(1.3);
        }

        .progress-dot:hover {
          background: var(--color-primary, #004c76);
          transform: scale(1.1);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem;
          }

          .instructor-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }

          .instructor-name {
            font-size: 1.8rem;
          }

          .nav-instructor {
            min-width: 200px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .instructor-card,
          .instructor-image,
          .nav-instructor {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}