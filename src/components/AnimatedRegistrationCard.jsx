import { useState } from 'preact/hooks';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app, auth, googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Configure Google provider for better UX
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export default function AnimatedRegistrationCard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [error, setError] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = '/course_website/chapter1/';
      }, 2500);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    console.log('Google button clicked!'); // Debug log
    setSocialLoading('Google');
    setError('');

    try {
      console.log('Attempting Google sign-in...'); // Debug log
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user); // Debug log
      setSocialLoading('');
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = '/course_website/chapter1/';
      }, 2500);
    } catch (error) {
      console.error('Google sign-in error:', error); // Debug log
      setSocialLoading('');
      setError(`Google sign-in failed: ${error.message}`);
    }
  };

  const redirectToCourse = () => {
    window.location.href = '/course_website/chapter1/';
  };

  return (
    <div className="animated-registration-wrapper">
      <div className="shine-border-card">
        <div className="shine-border"></div>
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">Join the Academy</h3>
            <p className="card-description">
              Choose your preferred way to create an account
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error.includes('email-already-in-use')
                ? 'This email is already registered. Try signing in instead!'
                : error.includes('weak-password')
                ? 'Password should be at least 6 characters'
                : error
              }
            </div>
          )}

          {!isSubmitted ? (
            <div className="auth-options">
              {/* Google Auth Button */}
              <div className="social-auth">
                <button
                  onClick={handleGoogleAuth}
                  disabled={socialLoading}
                  className="social-button google-button"
                >
                  {socialLoading === 'Google' ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="divider">
                <span>or</span>
              </div>

              {/* Email Option */}
              {!showEmailForm ? (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="email-option-button"
                >
                  Sign up with Email
                </button>
              ) : (
                <form onSubmit={handleEmailSubmit} className="card-form">
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

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="form-buttons">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="back-button"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`submit-button ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          Creating...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#10B981"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Welcome to the Academy!</h4>
              <p>Your account has been created. Redirecting you to the course...</p>
              <button onClick={redirectToCourse} className="enter-course-button">
                Enter Course Now
              </button>
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
          max-width: 450px;
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

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          text-align: center;
          font-family: var(--font-sans, 'Lato', sans-serif);
        }

        .auth-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .social-auth {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 48px;
        }

        .social-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .social-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .google-button {
          border-color: #4285f4;
          color: #4285f4;
          pointer-events: auto; /* Ensure button is clickable */
          user-select: none; /* Prevent text selection */
        }

        .google-button:hover:not(:disabled) {
          background: #f8fbff;
          border-color: #1a73e8;
        }

        .google-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 0.5rem 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--color-border, #E8E8E8);
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          color: var(--color-text-muted, #777);
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-size: 0.9rem;
        }

        .email-option-button {
          background: transparent;
          border: 2px solid var(--color-primary, #004c76);
          color: var(--color-primary, #004c76);
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .email-option-button:hover {
          background: var(--color-primary, #004c76);
          color: white;
          transform: translateY(-1px);
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

        .form-buttons {
          display: flex;
          gap: 1rem;
        }

        .back-button {
          flex: 1;
          background: transparent;
          border: 2px solid var(--color-border, #E8E8E8);
          color: var(--color-text-muted, #777);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          border-color: var(--color-text-muted, #777);
          color: var(--color-text, #333);
        }

        .submit-button {
          flex: 2;
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
          margin: 0 0 1.5rem 0;
        }

        .enter-course-button {
          background: linear-gradient(135deg, var(--color-primary, #004c76) 0%, var(--color-accent, #f39c12) 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-family: var(--font-sans, 'Lato', sans-serif);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .enter-course-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 76, 118, 0.3);
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

          .form-buttons {
            flex-direction: column;
          }

          .submit-button {
            flex: none;
          }
        }
      `}</style>
    </div>
  );
}