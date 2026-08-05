document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("assessment-container");

  const form = document.getElementById("assessment-form");

  const submitButton = document.querySelector(".submit-assessment");

  const resetButton = document.querySelector(".reset-assessment");

  const resultSection = document.querySelector(".assessment-result");

  const scoreDisplay = document.getElementById("assessment-score");

  const messageDisplay = document.getElementById("assessment-message");

  const STORAGE_KEY = "statexplore_assessment_progress";

  let answers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  let submitted = false;

  /*
  =====================================================
  CREATE ASSESSMENT QUESTIONS
  =====================================================
  */

  function renderAssessment() {
    container.innerHTML = "";

    assessmentQuestions.forEach((question) => {
      const card = document.createElement("article");

      card.className = "assessment-question";

      card.dataset.id = question.id;

      card.innerHTML = `


      <div class="question-top">


        <span>
          Question ${question.id}
        </span>


        <small>
          ${question.topic}
        </small>


      </div>




      <h3>
      ${question.question}
      </h3>




      ${
        question.data
          ? `
        <div class="question-data">

        ${question.data}

        </div>
        `
          : ""
      }



      ${generateAnswer(question)}




      <div class="feedback"></div>


      `;

      container.appendChild(card);
    });

    restoreAnswers();
  }

  /*
  =====================================================
  CREATE ANSWER TYPES
  =====================================================
  */

  function generateAnswer(question) {
    if (question.type === "multiple-choice" || question.type === "true-false") {
      return `


      <div class="answer-options">


      ${question.options
        .map((option) => {
          return `


          <label class="answer-option">


          <input

          type="radio"

          name="question-${question.id}"

          value="${option}"

          >


          <span>
          ${option}
          </span>


          </label>


          `;
        })
        .join("")}


      </div>


      `;
    }

    if (question.type === "short-answer") {
      return `


      <input

      class="short-answer"

      type="number"

      name="question-${question.id}"

      placeholder="Enter your answer"


      >


      `;
    }
  }

  /*
  =====================================================
  SAVE ANSWERS AUTOMATICALLY
  =====================================================
  */

  container.addEventListener("change", (event) => {
    if (submitted) return;

    const input = event.target;

    if (input.type === "radio") {
      answers[input.name] = input.value;
    }

    if (input.classList.contains("short-answer")) {
      answers[input.name] = input.value;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  });

  /*
  =====================================================
  RESTORE SAVED ANSWERS
  =====================================================
  */

  function restoreAnswers() {
    Object.keys(answers).forEach((name) => {
      const saved = answers[name];

      const radio = document.querySelector(
        `input[name="${name}"][value="${saved}"]`,
      );

      if (radio) {
        radio.checked = true;
      }

      const input = document.querySelector(
        `input[name="${name}"].short-answer`,
      );

      if (input) {
        input.value = saved;
      }
    });
  }

  /*
  =====================================================
  SUBMIT
  =====================================================
  */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!completeAssessment()) {
      alert("Please answer all questions before submitting.");

      return;
    }

    markAssessment();
  });

  function completeAssessment() {
    return assessmentQuestions.every((question) => {
      return (
        answers[`question-${question.id}`] !== undefined &&
        answers[`question-${question.id}`] !== ""
      );
    });
  }

  /*
  =====================================================
  MARK QUESTIONS
  =====================================================
  */

  function markAssessment() {
    let score = 0;

    assessmentQuestions.forEach((question) => {
      const card = document.querySelector(
        `.assessment-question[data-id="${question.id}"]`,
      );

      const feedback = card.querySelector(".feedback");

      const studentAnswer = answers[`question-${question.id}`];

      if (isCorrect(studentAnswer, question.answer)) {
        score++;

        feedback.innerHTML = "✓ Correct Answer";

        feedback.className = "feedback correct";
      } else {
        feedback.innerHTML = `
        ✗ Incorrect

        <br>

        Correct answer:

        <strong>
        ${question.answer}
        </strong>

        `;

        feedback.className = "feedback incorrect";

        showCorrectOption(card, question.answer);
      }
    });

    submitted = true;

    disableAssessment();

    displayResult(score);
  }

  /*
  =====================================================
  CHECK ANSWERS
  =====================================================
  */

  function isCorrect(user, correct) {
    if (typeof correct === "number") {
      return Math.abs(Number(user) - correct) < 0.01;
    }

    return user.trim().toLowerCase() === correct.trim().toLowerCase();
  }

  /*
  =====================================================
  SHOW CORRECT OPTION
  =====================================================
  */

  function showCorrectOption(card, answer) {
    const options = card.querySelectorAll(".answer-option");

    options.forEach((option) => {
      const input = option.querySelector("input");

      if (input.value === String(answer)) {
        option.classList.add("correct-option");
      }
    });
  }

  /*
  =====================================================
  DISABLE AFTER SUBMISSION
  =====================================================
  */

  function disableAssessment() {
    document.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
    });
  }

  /*
  =====================================================
  RESULT
  =====================================================
  */

  function displayResult(score) {
    resultSection.classList.remove("hidden");

    scoreDisplay.textContent = `${score}/10`;

    if (score >= 8) {
      messageDisplay.textContent =
        "Excellent! You have mastered measures of dispersion.";
    } else if (score >= 5) {
      messageDisplay.textContent =
        "Good work. Review weak areas and keep improving.";
    } else {
      messageDisplay.textContent =
        "Review the lessons and practice activities before trying again.";
    }

    resultSection.scrollIntoView({
      behavior: "smooth",
    });
  }

  /*
  =====================================================
  RESET
  =====================================================
  */

  function resetAssessment() {
    localStorage.removeItem(STORAGE_KEY);

    answers = {};

    submitted = false;

    form.reset();

    document.querySelectorAll(".feedback").forEach((item) => {
      item.innerHTML = "";

      item.className = "feedback";
    });

    document.querySelectorAll(".correct-option").forEach((item) => {
      item.classList.remove("correct-option");
    });

    document.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });

    resultSection.classList.add("hidden");
  }

  resetButton.addEventListener("click", resetAssessment);

  renderAssessment();
});
