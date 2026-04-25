import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import "./QuizPage.css";
import { quizData } from "../data/quizData";

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (
      quizData.questions[currentQuestion].answerOptions[selectedOption]
        .isCorrect
    ) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setShowHint(false);
  };

  if (showResults) {
    return (
      <div className="quiz-card quiz-results">
        <h2>Quiz Complete!</h2>
        <div className="quiz-score">
          {score} <span>/ {quizData.questions.length}</span>
        </div>
        <p>
          {score === quizData.questions.length
            ? "Perfect! You're ready to automate your workflow."
            : "Good effort. Review the concepts to solidify your Git hook knowledge."}
        </p>
        <button onClick={resetQuiz} className="quiz-button">
          <RotateCcw size={20} />
          Try Again
        </button>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-card">
      <div className="quiz-progress-bg">
        <div
          className="quiz-progress-fill"
          style={{
            width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="quiz-header">
        <span className="quiz-meta">
          Question {currentQuestion + 1} / {quizData.questions.length}
        </span>
        <button
          onClick={() => setShowHint(!showHint)}
          className="hint-button"
          title="Show Hint"
        >
          <Lightbulb size={20} />
        </button>
      </div>

      <h3 className="quiz-question">{question.question}</h3>

      {showHint && !isAnswered && (
        <div className="quiz-hint">Hint: {question.hint}</div>
      )}

      <div className="quiz-options">
        {question.answerOptions.map((option, index) => {
          let variantClass = "";

          if (isAnswered) {
            if (option.isCorrect) {
              variantClass = "correct";
            } else if (selectedOption === index) {
              variantClass = "incorrect";
            } else {
              variantClass = "dimmed";
            }
          } else if (selectedOption === index) {
            variantClass = "selected";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={`quiz-option ${variantClass}`}
            >
              <div className="option-icon">
                {isAnswered && option.isCorrect ? (
                  <CheckCircle color="#10b981" size={20} />
                ) : isAnswered &&
                  selectedOption === index &&
                  !option.isCorrect ? (
                  <XCircle color="#ef4444" size={20} />
                ) : (
                  <div className="option-radio" />
                )}
              </div>
              <span>
                <strong style={{ marginRight: "0.5rem" }}>
                  {["A", "B", "C", "D"][index]})
                </strong>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`quiz-rationale ${
            question.answerOptions[selectedOption].isCorrect
              ? "correct-rationale"
              : "incorrect-rationale"
          }`}
        >
          <p>
            <span
              className={`rationale-status ${
                question.answerOptions[selectedOption].isCorrect
                  ? "correct"
                  : "incorrect"
              }`}
            >
              {question.answerOptions[selectedOption].isCorrect
                ? "Correct! "
                : "Not quite. "}
            </span>
            {question.answerOptions[selectedOption].rationale}
          </p>
        </div>
      )}

      <div className="quiz-actions">
        {!isAnswered ? (
          <button
            onClick={handleConfirm}
            disabled={selectedOption === null}
            className="quiz-button"
          >
            Confirm Answer
          </button>
        ) : (
          <button onClick={handleNext} className="quiz-button next-button">
            {currentQuestion < quizData.questions.length - 1
              ? "Next Question"
              : "View Results"}
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
