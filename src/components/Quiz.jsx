// src/components/Quiz.jsx
import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';

// A sub-component to show the final results and handle submission
function QuizResult({ score, quizData, selectedAnswers, formspreeUrl, studentEmail }) {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmitResults = async () => {
    setSubmissionStatus('submitting');
    const submissionData = {
      quizTitle: quizData.title,
      totalQuestions: quizData.questions.length,
      score: score,
      studentEmail: studentEmail, // Include the student's email here
      // Optional: Include detailed answers. Formspree has limits, so be mindful of data size.
      // For more robust logging, you might process this on a backend if you switch from static hosting.
      // userAnswersDetails: quizData.questions.map((q, index) => ({
      //   question: q.question,
      //   selectedOption: q.options[selectedAnswers[index]] || "Not answered",
      //   correctOption: q.options[q.correctAnswerIndex],
      //   isCorrect: selectedAnswers[index] === q.correctAnswerIndex
      // }))
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
      <h2>Quiz Complete!</h2>
      <div className="score-summary">
        <p>Your Score:</p>
        <p className="score">{score} / {quizData.questions.length}</p>
      </div>

      <div className="submission-section">
        {submissionStatus === 'idle' && (
          <button onClick={handleSubmitResults} className="submit-results-button">
            Send My Results
          </button>
        )}
        {submissionStatus === 'submitting' && <p className="submission-message submitting">Sending results...</p>}
        {submissionStatus === 'success' && <p className="submission-message success">Results sent successfully! Thank you.</p>}
        {submissionStatus === 'error' && <p className="submission-message error">Failed to send results. Please check your connection or try again.</p>}
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
              <p className="explanation">Explanation: {question.explanation}</p>
            </li>
          )
        })}
      </ul>
       <style>{`
        .quiz-results { background-color: var(--color-bg-alt); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); }
        .score-summary { text-align: center; margin-bottom: 2rem; }
        .score-summary p { font-family: var(--font-sans); font-size: 1.2rem; color: var(--color-text-muted); margin: 0; }
        .score { font-size: 3rem !important; font-weight: bold; color: var(--color-primary) !important; }
        .quiz-results hr { border: 0; border-top: 1px solid var(--color-border); margin: 2rem 0; }
        .results-list { list-style: none; padding: 0; }
        .results-list li { margin-bottom: 1.5rem; padding: 1rem; border-radius: 6px; border-left-width: 4px; border-left-style: solid; }
        .results-list li.correct { border-left-color: #34d399; background-color: rgba(16, 185, 129, 0.1); }
        .results-list li.incorrect { border-left-color: #f87171; background-color: rgba(239, 68, 68, 0.1); }
        .result-question { font-family: var(--font-serif); font-weight: bold; color: var(--color-text); }
        .user-answer, .correct-answer, .explanation { font-family: var(--font-sans); font-size: 0.95rem; margin-top: 0.5rem; }
        .user-answer { color: var(--color-text-muted); }
        .correct-answer { color: var(--color-primary); font-weight: bold; }
        .explanation { font-style: italic; color: var(--color-text-muted); }

        .submission-section {
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .submit-results-button {
          background-color: #4CAF50;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .submit-results-button:hover {
          background-color: #45a049;
        }
        .submission-message {
            margin-top: 1rem;
            font-weight: bold;
        }
        .submission-message.submitting { color: #555; }
        .submission-message.success { color: #28a745; }
        .submission-message.error { color: #dc3545; }
      `}</style>
    </div>
  );
}

// The main Quiz component
export default function Quiz({ quizData, formspreeUrl }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
      setIsFinished(true); // Mark quiz as finished
      setShowEmailInput(true); // Show the email input form
    }
  };

  const calculateScore = useMemo(() => { // Renamed for clarity, used for final results display
    if (!isFinished) return 0;
    return quizData.questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswerIndex ? total + 1 : total;
    }, 0);
  }, [isFinished, selectedAnswers, quizData.questions]);


  const handleEmailInputChange = (e) => {
    setStudentEmail(e.target.value);
    // Clear error as user types
    if (emailError) setEmailError('');
  };

  const handleEmailFormSubmit = (e) => { // Renamed for clarity
    e.preventDefault(); // Prevent default form submission

    if (!studentEmail.trim()) {
      setEmailError('Email cannot be empty.');
      return;
    }
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(studentEmail)) {
      setEmailError('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    // If validation passes, hide email input and proceed to results
    setShowEmailInput(false);
  };

  const currentQuestion = quizData.questions[activeQuestion];
  const isAnswerSelected = selectedAnswers[activeQuestion] !== undefined;

  // Render logic based on quiz state
  if (!isFinished) {
    // Display quiz questions
    return (
      <div className="quiz-container">
        <h2>{quizData.title}</h2>
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
          .quiz-container { background-color: var(--color-bg-alt); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); }
          .progress-bar { width: 100%; background-color: var(--color-border); border-radius: 4px; overflow: hidden; height: 8px; margin-bottom: 1rem; }
          .progress-bar-inner { height: 100%; background-color: var(--color-primary); transition: width 0.3s ease; }
          .question-counter { font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.9rem; }
          .question-text { font-family: var(--font-serif); color: var(--color-text); margin-bottom: 2rem; }
          .options-list { list-style: none; padding: 0; margin: 0; }
          .option-button { width: 100%; text-align: left; padding: 1rem; margin-bottom: 0.75rem; border: 2px solid var(--color-border); border-radius: 6px; background-color: transparent; color: var(--color-text); cursor: pointer; display: flex; align-items: center; font-family: var(--font-sans); font-size: 1rem; transition: border-color 0.2s, background-color 0.2s; }
          .option-button:hover { border-color: var(--color-accent); }
          .option-button.selected { border-color: var(--color-primary); background-color: rgba(94, 234, 212, 0.1); }
          .option-letter { flex-shrink: 0; display: grid; place-content: center; width: 28px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; margin-right: 1rem; font-weight: bold; }
          .option-button.selected .option-letter { background-color: var(--color-primary); color: var(--color-bg); border-color: var(--color-primary); }
          .next-button { display: block; width: 100%; padding: 1rem; margin-top: 1rem; background-color: var(--color-primary); color: var(--color-bg); border: none; border-radius: 6px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
          .next-button:disabled { opacity: 0.5; cursor: not-allowed; }
        `}</style>
      </div>
    );
  } else if (showEmailInput) {
    // Display email input form
    return (
      <div className="quiz-container email-input-form">
        <h2>Enter Your Email</h2>
        <p>Please provide your email address to view your results and send them.</p>
        <form onSubmit={handleEmailFormSubmit}>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={studentEmail}
            onInput={handleEmailInputChange} // Use the new handler
            className={`email-input ${emailError ? 'error' : ''}`} // Add error class for styling
            required
            autoFocus // Auto-focus the input
          />
          {emailError && <p className="email-error">{emailError}</p>}
          <button type="submit" className="submit-email-button">
            View Results
          </button>
        </form>
        <style>{`
          .email-input-form {
            text-align: center;
          }
          .email-input {
            width: 100%;
            padding: 10px 15px;
            margin-top: 15px;
            margin-bottom: 10px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            font-size: 1rem;
          }
          .email-input:focus {
            outline: none;
            border-color: var(--color-primary);
          }
          .email-input.error {
            border-color: #dc3545; /* Red border for error */
          }
          .email-error {
            color: #dc3545; /* Red for error messages */
            font-size: 0.9rem;
            margin-bottom: 10px;
            font-weight: bold; /* Make error text bold */
          }
          .submit-email-button {
            background-color: var(--color-primary);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: bold;
            transition: background-color 0.3s ease;
            width: 100%;
            margin-top: 1rem;
          }
          .submit-email-button:hover {
            background-color: var(--color-primary-dark);
          }
        `}</style>
      </div>
    );
  } else {
    // Display final results (QuizResult component)
    return <QuizResult score={calculateScore} quizData={quizData} selectedAnswers={selectedAnswers} formspreeUrl={formspreeUrl} studentEmail={studentEmail} />;
  }
}