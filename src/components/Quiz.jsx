// src/components/Quiz.jsx
import { h } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// A sub-component to show the final results and handle submission
function QuizResult({ score, quizData, selectedAnswers, formspreeUrl, studentEmail, studentName }) {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmitResults = async () => {
    setSubmissionStatus('submitting');

    // Create detailed answers for each question
    const detailedAnswers = quizData.questions.map((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;

      return {
        questionNumber: index + 1,
        question: question.question,
        selectedOption: selectedAnswerIndex !== undefined ? question.options[selectedAnswerIndex] : "Not answered",
        correctOption: question.options[question.correctAnswerIndex],
        isCorrect: isCorrect,
        category: question.category || 'General',
        explanation: question.explanation || 'No explanation provided'
      };
    });

    const submissionData = {
      // Student Info
      studentEmail: studentEmail,
      studentName: studentName || 'Anonymous Student',
      completedAt: new Date().toISOString(),

      // Quiz Summary
      quizTitle: quizData.title,
      totalQuestions: quizData.questions.length,
      score: score,
      percentage: Math.round((score / quizData.questions.length) * 100),

      // Detailed Question & Answer Data
      detailedAnswers: detailedAnswers,

      // Quick summary for email subject/preview
      summary: `${studentName || studentEmail} scored ${score}/${quizData.questions.length} (${Math.round((score / quizData.questions.length) * 100)}%) on ${quizData.title}`
    };

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        console.error('Formspree submission failed:', response.statusText);
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Network error during Formspree submission:', error);
    }
  };

  return (
    <div className="quiz-results">
      <div className="results-header">
        <h2>Quiz Complete!</h2>
        {studentName && (
          <p className="student-info">Student: {studentName}</p>
        )}
      </div>

      <div className="score-summary">
        <p>Your Score:</p>
        <p className="score">{score} / {quizData.questions.length}</p>
        <p className="percentage">({Math.round((score / quizData.questions.length) * 100)}%)</p>
      </div>

      <div className="submission-section">
        {submissionStatus === 'idle' && (
          <button onClick={handleSubmitResults} className="submit-results-button">
            Submit My Results
          </button>
        )}
        {submissionStatus === 'submitting' && (
          <p className="submission-message submitting">
            <span className="spinner"></span>
            Submitting results...
          </p>
        )}
        {submissionStatus === 'success' && (
          <p className="submission-message success">
            ✅ Results submitted successfully! Your instructor has been notified.
          </p>
        )}
        {submissionStatus === 'error' && (
          <div className="submission-message error">
            ❌ Failed to submit results.
            <button onClick={handleSubmitResults} className="retry-button">
              Try Again
            </button>
          </div>
        )}
      </div>

      <hr />
      <h3>Review Your Answers</h3>
      <ul className="results-list">
        {quizData.questions.map((question, index) => {
          const isCorrect = selectedAnswers[index] === question.correctAnswerIndex;
          const selectedOption = question.options[selectedAnswers[index]];
          const correctOption = question.options[question.correctAnswerIndex];

          return (
            <li key={index} className={isCorrect ? 'correct' : 'incorrect'}>
              <p className="result-question">{index + 1}. {question.question}</p>
              <p className="user-answer">Your answer: {selectedOption || "Not answered"}</p>
              {!isCorrect && <p className="correct-answer">Correct answer: {correctOption}</p>}
              {question.explanation && <p className="explanation">Explanation: {question.explanation}</p>}
            </li>
          )
        })}
      </ul>

      <style>{`
        .quiz-results { 
          background-color: var(--color-bg-alt); 
          padding: 2rem; 
          border-radius: 8px; 
          border: 1px solid var(--color-border); 
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .student-info {
          font-family: var(--font-sans);
          color: var(--color-text-muted);
          font-size: 1rem;
          margin: 0.5rem 0 0 0;
        }
        
        .score-summary { 
          text-align: center; 
          margin-bottom: 2rem; 
        }
        
        .score-summary p { 
          font-family: var(--font-sans); 
          font-size: 1.2rem; 
          color: var(--color-text-muted); 
          margin: 0; 
        }
        
        .score { 
          font-size: 3rem !important; 
          font-weight: bold; 
          color: var(--color-primary) !important; 
        }
        
        .percentage {
          font-size: 1.5rem !important;
          font-weight: 600;
          color: var(--color-accent) !important;
          margin-top: 0.5rem !important;
        }
        
        .submission-section {
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .submit-results-button {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .submit-results-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 76, 118, 0.3);
        }
        
        .submission-message {
          margin-top: 1rem;
          font-weight: bold;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .submission-message.submitting { 
          color: #555; 
          background: #f8f9fa;
        }
        
        .submission-message.success { 
          color: #28a745; 
          background: #d4edda;
        }
        
        .submission-message.error { 
          color: #dc3545; 
          background: #f8d7da;
          flex-direction: column;
          gap: 1rem;
        }
        
        .retry-button {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .quiz-results hr { 
          border: 0; 
          border-top: 1px solid var(--color-border); 
          margin: 2rem 0; 
        }
        
        .results-list { 
          list-style: none; 
          padding: 0; 
        }
        
        .results-list li { 
          margin-bottom: 1.5rem; 
          padding: 1rem; 
          border-radius: 6px; 
          border-left-width: 4px; 
          border-left-style: solid; 
        }
        
        .results-list li.correct { 
          border-left-color: #34d399; 
          background-color: rgba(16, 185, 129, 0.1); 
        }
        
        .results-list li.incorrect { 
          border-left-color: #f87171; 
          background-color: rgba(239, 68, 68, 0.1); 
        }
        
        .result-question { 
          font-family: var(--font-serif); 
          font-weight: bold; 
          color: var(--color-text); 
        }
        
        .user-answer, .correct-answer, .explanation { 
          font-family: var(--font-sans); 
          font-size: 0.95rem; 
          margin-top: 0.5rem; 
        }
        
        .user-answer { 
          color: var(--color-text-muted); 
        }
        
        .correct-answer { 
          color: var(--color-primary); 
          font-weight: bold; 
        }
        
        .explanation { 
          font-style: italic; 
          color: var(--color-text-muted); 
          background: rgba(0, 0, 0, 0.05);
          padding: 0.75rem;
          border-radius: 4px;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

// The main Quiz component
export default function Quiz({ quizData, formspreeUrl }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Get current user from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const goToNextQuestion = () => {
    if (activeQuestion < quizData.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = useMemo(() => {
    if (!isFinished) return 0;
    return quizData.questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswerIndex ? total + 1 : total;
    }, 0);
  }, [isFinished, selectedAnswers, quizData.questions]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="quiz-container loading-state">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading quiz...</p>
        </div>
        <style>{`
          .loading-state {
            background-color: var(--color-bg-alt);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--color-border);
            text-align: center;
          }
          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid var(--color-border);
            border-top: 3px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show authentication required message if user is not logged in
  if (!user) {
    return (
      <div className="quiz-container auth-required">
        <h2>Authentication Required</h2>
        <p>You need to be logged in to take this quiz.</p>
        <div className="auth-actions">
          <a href="/course_website/" className="login-button">
            Go to Login Page
          </a>
        </div>
        <style>{`
          .auth-required {
            background-color: var(--color-bg-alt);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--color-border);
            text-align: center;
          }
          .auth-actions {
            margin-top: 2rem;
          }
          .login-button {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            transition: all 0.3s ease;
          }
          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 76, 118, 0.3);
          }
        `}</style>
      </div>
    );
  }

  const currentQuestion = quizData.questions[activeQuestion];
  const isAnswerSelected = selectedAnswers[activeQuestion] !== undefined;

  // Show quiz results after completion
  if (isFinished) {
    return (
      <QuizResult
        score={calculateScore}
        quizData={quizData}
        selectedAnswers={selectedAnswers}
        formspreeUrl={formspreeUrl}
        studentEmail={user.email}
        studentName={user.displayName}
      />
    );
  }

  // Show quiz questions
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizData.title}</h2>
        <div className="student-info">
          <span>Student: {user.displayName || user.email}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${((activeQuestion + 1) / quizData.questions.length) * 100}%` }}
        ></div>
      </div>

      <p className="question-counter">Question {activeQuestion + 1} of {quizData.questions.length}</p>
      <h3 className="question-text">{currentQuestion.question}</h3>

      <ul className="options-list">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectAnswer(activeQuestion, index)}
              className={`option-button ${selectedAnswers[activeQuestion] === index ? 'selected' : ''}`}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={goToNextQuestion}
        className="next-button"
        disabled={!isAnswerSelected}
      >
        {activeQuestion < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>

      <style>{`
        .quiz-container { 
          background-color: var(--color-bg-alt); 
          padding: 2rem; 
          border-radius: 8px; 
          border: 1px solid var(--color-border); 
        }
        
        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .student-info {
          font-family: var(--font-sans);
          color: var(--color-text-muted);
          font-size: 0.9rem;
          background: var(--color-bg);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid var(--color-border);
        }
        
        .progress-bar { 
          width: 100%; 
          background-color: var(--color-border); 
          border-radius: 4px; 
          overflow: hidden; 
          height: 8px; 
          margin-bottom: 1rem; 
        }
        
        .progress-bar-inner { 
          height: 100%; 
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
          transition: width 0.3s ease; 
        }
        
        .question-counter { 
          font-family: var(--font-sans); 
          color: var(--color-text-muted); 
          font-size: 0.9rem; 
        }
        
        .question-text { 
          font-family: var(--font-serif); 
          color: var(--color-text); 
          margin-bottom: 2rem; 
        }
        
        .options-list { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        
        .option-button { 
          width: 100%; 
          text-align: left; 
          padding: 1rem; 
          margin-bottom: 0.75rem; 
          border: 2px solid var(--color-border); 
          border-radius: 6px; 
          background-color: transparent; 
          color: var(--color-text); 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          font-family: var(--font-sans); 
          font-size: 1rem; 
          transition: all 0.2s ease; 
        }
        
        .option-button:hover { 
          border-color: var(--color-accent); 
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .option-button.selected { 
          border-color: var(--color-primary); 
          background-color: rgba(0, 76, 118, 0.1);
        }
        
        .option-letter { 
          flex-shrink: 0; 
          display: grid; 
          place-content: center; 
          width: 28px; 
          height: 28px; 
          border: 1px solid var(--color-border); 
          border-radius: 4px; 
          margin-right: 1rem; 
          font-weight: bold; 
          transition: all 0.2s ease;
        }
        
        .option-button.selected .option-letter { 
          background-color: var(--color-primary); 
          color: var(--color-bg); 
          border-color: var(--color-primary); 
        }
        
        .next-button { 
          display: block; 
          width: 100%; 
          padding: 1rem; 
          margin-top: 1rem; 
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
          color: var(--color-bg); 
          border: none; 
          border-radius: 6px; 
          font-size: 1.1rem; 
          font-weight: bold; 
          cursor: pointer; 
          transition: all 0.3s ease; 
        }
        
        .next-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 76, 118, 0.3);
        }
        
        .next-button:disabled { 
          opacity: 0.5; 
          cursor: not-allowed; 
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .quiz-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .quiz-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}