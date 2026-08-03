document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz-form");

  const resultSection = document.getElementById("result-section");

  const scoreDisplay = document.getElementById("score");

  const resultMessage = document.getElementById("result-message");

  const resetButton = document.querySelector(".reset-quiz");

  const retryButton = document.querySelector(".retry-btn");

  const quizMessage = document.querySelector(".quiz-message");

  const questions = document.querySelectorAll(".quiz-question");

  const STORAGE_KEY = "statExploreAssessment";

  /*
  =====================================================
  LOAD SAVED ANSWERS
  =====================================================
  */

  const savedAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedAnswers) {
    Object.keys(savedAnswers).forEach((questionName) => {
      const input = document.querySelector(
        `[name="${questionName}"][value="${savedAnswers[questionName]}"]`,
      );

      if (input) {
        input.checked = true;
      }
    });
  }

  /*
  =====================================================
  SAVE ANSWERS WHILE STUDENT WORKS
  =====================================================
  */

  const allInputs = document.querySelectorAll("input");

  allInputs.forEach((input) => {
    input.addEventListener("change", () => {
      let answers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

      if (input.type === "radio") {
        answers[input.name] = input.value;
      }

      if (input.classList.contains("short-answer")) {
        answers[input.parentElement.dataset.name] = input.value;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    });
  });

  /*
  =====================================================
  SUBMIT QUIZ
  =====================================================
  */

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let unanswered = false;

    questions.forEach((question) => {
      const radios = question.querySelectorAll("input[type='radio']");

      const textInput = question.querySelector(".short-answer");

      if (radios.length) {
        const selected = question.querySelector("input[type='radio']:checked");

        if (!selected) {
          unanswered = true;
        }
      }

      if (textInput && textInput.value.trim() === "") {
        unanswered = true;
      }
    });

    if (unanswered) {
      quizMessage.textContent =
        "Please answer all questions before submitting.";

      quizMessage.className = "quiz-message error-message";

      return;
    }

    gradeQuiz();
  });

  /*
  =====================================================
  MARK QUIZ
  =====================================================
  */

  function gradeQuiz() {
    let score = 0;

    questions.forEach((question) => {
      const correctAnswer = question.dataset.answer;

      const feedback = document.createElement("div");

      feedback.classList.add("answer-status");

      let studentAnswer = "";

      const selected = question.querySelector("input[type='radio']:checked");

      const input = question.querySelector(".short-answer");

      if (selected) {
        studentAnswer = selected.value;
      }

      if (input) {
        studentAnswer = input.value.trim();
      }

      if (studentAnswer === correctAnswer) {
        score++;

        feedback.innerHTML = "✓ Correct";

        feedback.classList.add("correct-answer");
      } else {
        feedback.innerHTML = `✗ Incorrect <br>
        Correct Answer: <strong>${correctAnswer}</strong>`;

        feedback.classList.add("wrong-answer");

        highlightCorrectAnswer(question, correctAnswer);
      }

      question.appendChild(feedback);

      disableQuestion(question);
    });

    showResult(score);
  }

  /*
  =====================================================
  HIGHLIGHT CORRECT OPTION
  =====================================================
  */

  function highlightCorrectAnswer(question, answer) {
    const options = question.querySelectorAll("label");

    options.forEach((option) => {
      const input = option.querySelector("input");

      if (input && input.value === answer) {
        option.classList.add("correct-option");
      }
    });
  }

  /*
  =====================================================
  DISABLE AFTER SUBMISSION
  =====================================================
  */

  function disableQuestion(question) {
    const inputs = question.querySelectorAll("input");

    inputs.forEach((input) => {
      input.disabled = true;
    });
  }

  /*
  =====================================================
  RESULT CARD
  =====================================================
  */

  function showResult(score) {
    resultSection.classList.remove("hidden");

    scoreDisplay.textContent = score;

    if (score >= 8) {
      resultMessage.textContent =
        "Excellent work! You have a strong understanding of measures of dispersion.";
    } else if (score >= 5) {
      resultMessage.textContent =
        "Good effort! Review some concepts and continue improving.";
    } else {
      resultMessage.textContent =
        "Keep practicing. Revisiting the lesson will help strengthen your understanding.";
    }

    resultSection.scrollIntoView({
      behavior: "smooth",
    });
  }

  /*
  =====================================================
  RESET QUIZ
  =====================================================
  */

  function resetQuiz() {
    localStorage.removeItem(STORAGE_KEY);

    quizForm.reset();

    questions.forEach((question) => {
      question
        .querySelectorAll(".answer-status")
        .forEach((status) => status.remove());

      question.querySelectorAll("label").forEach((label) => {
        label.classList.remove("correct-option");
      });

      question.querySelectorAll("input").forEach((input) => {
        input.disabled = false;
      });
    });

    resultSection.classList.add("hidden");

    quizMessage.textContent = "";
  }

  resetButton.addEventListener("click", resetQuiz);

  retryButton.addEventListener("click", resetQuiz);
});
