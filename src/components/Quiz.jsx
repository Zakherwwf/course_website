import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';

// The main Quiz component
export default function Quiz({ quizData }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

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

  const score = useMemo(() => {
    if (!isFinished) return 0;
    return quizData.questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswerIndex ? total + 1 : total;
    }, 0);
  }, [isFinished, selectedAnswers, quizData.questions]);

  if (isFinished) {
    return <QuizResult score={score} quizData={quizData} selectedAnswers={selectedAnswers} />;
  }

  const currentQuestion = quizData.questions[activeQuestion];
  const isAnswerSelected = selectedAnswers[activeQuestion] !== undefined;

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
}

// A sub-component to show the final results
function QuizResult({ score, quizData, selectedAnswers }) {
  return (
    <div className="quiz-results">
      <h2>Quiz Complete!</h2>
      <div className="score-summary">
        <p>Your Score:</p>
        <p className="score">{score} / {quizData.questions.length}</p>
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
        .user-answer, .correct-answer { font-family: var(--font-sans); font-size: 0.95rem; margin-top: 0.5rem; }
        .user-answer { color: var(--color-text-muted); }
        .correct-answer { color: var(--color-primary); font-weight: bold; }
      `}</style>
    </div>
  );
}