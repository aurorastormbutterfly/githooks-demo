import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import "./QuizPage.css";

const quizData = {
  questions: [
    {
      questionNumber: 1,
      question: "Where are Git hooks stored within a project's directory?",
      answerOptions: [
        {
          text: "Inside the .git/hooks folder",
          rationale:
            "This is the default internal directory where Git looks for executable scripts to trigger during specific actions.",
          isCorrect: true,
        },
        {
          text: "In a /hooks folder in the project root",
          rationale:
            "Git natively ignores the root directory for its internal hooks; it only looks inside the hidden .git metadata folder.",
          isCorrect: false,
        },
        {
          text: "Within the .gitignore file",
          rationale:
            "The .gitignore file manages which files Git should ignore, but it doesn't store or execute scripts.",
          isCorrect: false,
        },
        {
          text: "In the global ~/.gitconfig file",
          rationale:
            "Global configuration handles settings like user names, while hooks are specific to the local repository instance.",
          isCorrect: false,
        },
      ],
      hint: "Check the hidden directory where Git keeps all its internal repository metadata.",
    },
    {
      questionNumber: 2,
      question:
        "Why don't your colleagues automatically get your new Git hook when they clone the repository?",
      answerOptions: [
        {
          text: "The .git directory is local to your machine; it is not tracked or pushed to the remote server.",
          rationale:
            "The .git folder is excluded from version control tracking, so local configurations and hooks are never part of the push/pull cycle.",
          isCorrect: true,
        },
        {
          text: "Hooks must be registered in the remote repository's settings panel first.",
          rationale:
            "While some platforms have server-side hooks, client-side hooks are managed entirely on the local machine.",
          isCorrect: false,
        },
        {
          text: "Git automatically deletes scripts during a push to prevent malware spreading.",
          rationale:
            "Git doesn't delete them; it simply doesn't include the .git directory in the data sent to the remote.",
          isCorrect: false,
        },
        {
          text: "You need to run 'git push --hooks' to share them.",
          rationale:
            "There is no native Git command to push local hook scripts to a remote repository.",
          isCorrect: false,
        },
      ],
      hint: "Think about which parts of your project directory are actually tracked by version control.",
    },
    {
      questionNumber: 3,
      question:
        "What command do you need to run to ensure your new hook script is allowed to execute?",
      answerOptions: [
        {
          text: "chmod +x [filename]",
          rationale:
            "This Unix command grants execution permissions to the file, which is a requirement for Git to run it as a script.",
          isCorrect: true,
        },
        {
          text: "git add [filename]",
          rationale:
            "This stages the file for a commit but does not modify the local file system permissions needed for execution.",
          isCorrect: false,
        },
        {
          text: "chown [filename]",
          rationale:
            "This command changes the owner of the file rather than its permission attributes.",
          isCorrect: false,
        },
        {
          text: "git config --run [filename]",
          rationale:
            "Git configuration is for settings; execution rights are managed by the operating system's file permissions.",
          isCorrect: false,
        },
      ],
      hint: "You need to modify the file's permission bits to make it runnable.",
    },
    {
      questionNumber: 4,
      question:
        "How does Git know whether to allow or block a commit based on your hook script?",
      answerOptions: [
        {
          text: "It checks the exit code (0 for success, non-zero for failure).",
          rationale:
            "Git relies on standard process exit statuses; a zero indicates everything is fine, while any other number aborts the commit.",
          isCorrect: true,
        },
        {
          text: "It searches the console output for the word 'ERROR'.",
          rationale:
            "Git ignores the content of the output for logic; it only cares about the final status code of the process.",
          isCorrect: false,
        },
        {
          text: "It checks if the script finished in under 5 seconds.",
          rationale:
            "Hooks can take as long as needed to run tests; time elapsed doesn't determine success or failure.",
          isCorrect: false,
        },
        {
          text: "It looks for a boolean 'return true' at the end of the file.",
          rationale:
            "Shell scripts use exit codes to communicate with the calling process rather than programmatic return values.",
          isCorrect: false,
        },
      ],
      hint: "This is the standard way Unix-like systems determine if a script or command finished successfully.",
    },
    {
      questionNumber: 5,
      question:
        "What is a primary benefit of using a pre-commit hook for linting and testing?",
      answerOptions: [
        {
          text: "It shifts quality checks 'left', providing instant feedback and reducing cognitive load.",
          rationale:
            "By automating checks at the point of commit, developers get immediate feedback, ensuring code meets standards without having to remember manual steps.",
          isCorrect: true,
        },
        {
          text: "It makes the remote CI/CD pipeline run faster by skipping those checks.",
          rationale:
            "CI/CD pipelines should still run these checks to ensure total repository integrity; local hooks simply catch issues earlier.",
          isCorrect: false,
        },
        {
          text: "It prevents other developers from seeing your code until it is perfect.",
          rationale:
            "Hooks only affect your local commit process; they don't hide code, they just enforce a quality baseline before the commit is created.",
          isCorrect: false,
        },
        {
          text: "It automatically fixes all bugs and formatting errors for you.",
          rationale:
            "While some hooks can run auto-formatters, their main role is to check and validate, not necessarily to fix complex logic bugs.",
          isCorrect: false,
        },
      ],
      hint: "Consider the timing of the feedback loop compared to waiting for a remote build server.",
    },
  ],
};

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
