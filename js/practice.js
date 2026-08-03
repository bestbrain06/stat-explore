document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".practice-card");

  const completedCount = document.getElementById("completed-count");

  const progressFill = document.getElementById("progress-fill");

  const completionSection = document.getElementById("completion-section");

  const resetButton = document.querySelector(".reset-practice");

  const STORAGE_KEY = "statexplore_practice_progress";

  let practiceData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    completed: [],
    answers: {},
  };

  /* =====================================================
RESTORE SAVED DATA
===================================================== */

  questions.forEach((question) => {
    const id = question.id;

    // Restore answers

    const savedAnswer = practiceData.answers[id];

    if (savedAnswer) {
      const inputs = question.querySelectorAll("input");

      inputs.forEach((input) => {
        if (input.type === "radio") {
          if (input.value === savedAnswer) {
            input.checked = true;
          }
        } else {
          input.value = savedAnswer[input.id] || "";
        }
      });
    }

    // Restore completed questions

    if (practiceData.completed.includes(id)) {
      markCompleted(question);
    }
  });

  updateProgress();

  checkCompletion();

  /* =====================================================
HINT SYSTEM
===================================================== */

  document.querySelectorAll(".hint-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const hint = button.nextElementSibling;

      hint.classList.toggle("show");

      button.textContent = hint.classList.contains("show")
        ? "Hide Hint"
        : "💡 Show Hint";
    });
  });

  /* =====================================================
INPUT AUTO SAVE
===================================================== */

  questions.forEach((question) => {
    const inputs = question.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        saveAnswers(question);
      });

      input.addEventListener("change", () => {
        saveAnswers(question);
      });
    });
  });

  function saveAnswers(question) {
    const id = question.id;

    let answers = {};

    const inputs = question.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.type === "radio") {
        if (input.checked) {
          answers = input.value;
        }
      } else {
        answers[input.id] = input.value;
      }
    });

    practiceData.answers[id] = answers;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(practiceData));
  }

  /* =====================================================
SUBMIT ANSWERS
===================================================== */

  questions.forEach((question) => {
    const submitButton = question.querySelector(".submit-answer");

    submitButton.addEventListener("click", () => {
      const correct = checkAnswer(question);

      const feedback = question.querySelector(".answer-feedback");

      const solution = question.querySelector(".solution");

      const solutionButton = question.querySelector(".solution-toggle");

      if (correct) {
        feedback.textContent =
          "✓ Correct! Great job. You understand this concept.";

        feedback.className = "answer-feedback correct";

        if (!practiceData.completed.includes(question.id)) {
          practiceData.completed.push(question.id);
        }

        submitButton.disabled = true;

        submitButton.textContent = "Completed";
      } else {
        feedback.textContent =
          "✗ Incorrect. The correct answer is: " + question.dataset.answer;

        feedback.className = "answer-feedback wrong";
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(practiceData));

      solutionButton.classList.remove("hidden");

      solutionButton.onclick = () => {
        solution.classList.toggle("hidden");
      };

      updateProgress();

      checkCompletion();
    });
  });

  /* =====================================================
ANSWER CHECKING
===================================================== */

  function checkAnswer(question) {
    const correctAnswer = question.dataset.answer;

    const radio = question.querySelector("input[type='radio']:checked");

    if (radio) {
      return normalize(radio.value) === normalize(correctAnswer);
    }

    const inputs = question.querySelectorAll(".answer-input");

    if (inputs.length > 1) {
      const correctValues = correctAnswer.split(",");

      return Array.from(inputs).every(
        (input, index) =>
          normalize(input.value) === normalize(correctValues[index]),
      );
    }

    if (inputs.length === 1) {
      return Math.abs(Number(inputs[0].value) - Number(correctAnswer)) < 0.01;
    }

    return false;
  }

  /* =====================================================
MARK COMPLETED
===================================================== */

  function markCompleted(question) {
    const button = question.querySelector(".submit-answer");

    const feedback = question.querySelector(".answer-feedback");

    button.disabled = true;

    button.textContent = "Completed";

    feedback.textContent = "✓ Completed";

    feedback.className = "answer-feedback correct";
  }

  /* =====================================================
PROGRESS
===================================================== */

  function updateProgress() {
    const completed = practiceData.completed.length;

    completedCount.textContent = completed;

    const percentage = (completed / questions.length) * 100;

    progressFill.style.width = percentage + "%";
  }

  /* =====================================================
FINISH PRACTICE
===================================================== */

  function checkCompletion() {
    if (practiceData.completed.length === questions.length) {
      completionSection.classList.remove("hidden");
    }
  }

  /* =====================================================
RESET
===================================================== */

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);

      location.reload();
    });
  }

  function normalize(value) {
    return value.toString().trim().toLowerCase();
  }
});
