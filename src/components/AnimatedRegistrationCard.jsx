import { useState, useEffect } from 'preact/hooks';

export default function AnimatedRegistrationCard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setName('');
    }, 3000);
  };

  return (
    <div className="animated-registration-wrapper">
      <div className="shine-border-card">
        {/* Animated shine border */}
        <div className="shine-border"></div>

        {/* Card content */}
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">Join the Academy</h3>
            <p className="card-description">
              Become a part of the next generation of conservation leaders
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="card-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Registering...
                  </>
                ) : (
                  'Register Interest'
                )}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#10B981"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Thank you!</h4>
              <p>We'll be in touch soon with updates about the course.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animated-registration-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .shine-border-card {
          position: relative;
          max-width: 400px;
          width: 100%;
          background: white;
          border-radius: 16px;
          padding: 2px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .shine-border-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .shine-border {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(160, 124, 254, 0.4),
            rgba(254, 143, 181, 0.4),
            rgba(255, 190, 123, 0.4),
            transparent
          );
          animation: shine 3s infinite;
          z-index: 1;
        }

        @keyframes shine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        .card-content {
          position: relative;
          background: white;
          border-radius: 14px;
          padding: 2rem;
          z-index: 2;
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin: 0 0 0.5rem 0;
        }

        .card-description {
          font-family: var(--font-sans, 'Lato', sans-serif);
          color: var(--color-text-muted, #777);
          margin: 0;
          line-height: 1.5;
        }

        .card-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text, #333);
          margin: 0;
        }

        .form-input {
          font-family: var(--font-sans, 'Lato', sans-serif);
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-border, #E8E8E8);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary, #004c76);
          box-shadow: 0 0 0 3px rgba(0, 76, 118, 0.1);
        }

        .submit-button {
          font-family: var(--font-sans, 'Lato', sans-serif);
          background: linear-gradient(135deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 48px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 76, 118, 0.3);
        }

        .submit-button:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          text-align: center;
          padding: 1rem 0;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          margin: 0 auto 1rem auto;
          width: fit-content;
          animation: scaleIn 0.5s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .success-message h4 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.5rem;
          color: var(--color-text, #333);
          margin: 0 0 0.5rem 0;
        }

        .success-message p {
          font-family: var(--font-sans, 'Lato', sans-serif);
          color: var(--color-text-muted, #777);
          margin: 0;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .animated-registration-wrapper {
            padding: 1rem;
          }
          
          .card-content {
            padding: 1.5rem;
          }
          
          .card-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}