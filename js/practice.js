document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("practice-container");

  const completedCount = document.getElementById("completed-count");

  const totalCount = document.getElementById("total-count");

  const progressFill = document.getElementById("progress-fill");

  const STORAGE_KEY = "statexplore_practice_progress";

  let practiceState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    completed: [],
    answers: {},
  };

  totalCount.textContent = practiceQuestions.length;

  /* =====================================================
   RENDER QUESTIONS
===================================================== */

  function renderQuestions() {
    container.innerHTML = "";

    practiceQuestions.forEach((question) => {
      const card = document.createElement("article");

      card.className = "question-card";

      card.dataset.id = question.id;

      card.innerHTML = `

<div class="question-header">

<span>
Activity ${question.id}
</span>


<h2>
${question.title}
</h2>


<p class="topic-label">
${question.topic}
</p>


</div>




<div class="question-body">


<p>
${question.question}
</p>




${
  question.data
    ? `
<div class="data-box">

${question.data}

</div>
`
    : ""
}





<div class="hint-area">


<button class="hint-button">

💡 Show Hint

</button>


<div class="hint-content">

<p class="hint-text"></p>

</div>


</div>






<div class="answer-container">

${createAnswer(question)}

</div>





<button class="check-answer-btn">

Check Answer

</button>





<div class="feedback">

</div>





<button class="explanation-btn hidden">

View Explanation

</button>





<div class="explanation hidden">


<h3>
Worked Explanation
</h3>


<p>
${question.explanation}
</p>




<div class="concept-box">

<strong>
Concept Reminder
</strong>


<p>
${question.concept}
</p>


</div>


</div>




</div>

`;

      container.appendChild(card);
    });

    attachEvents();

    restoreState();
  }

  /* =====================================================
 CREATE ANSWERS
===================================================== */

  function createAnswer(question) {
    if (question.type === "multiple-choice" || question.type === "true-false") {
      return `


<div class="options">


${question.options
  .map(
    (option) => `


<label class="option">


<input 
type="radio"
name="question-${question.id}"
value="${option}"
>


<span>
${option}
</span>


</label>


`,
  )
  .join("")}


</div>


`;
    }

    return `


<input

class="answer-input"

type="number"

placeholder="Enter your answer"

>


`;
  }

  /* =====================================================
 EVENTS
===================================================== */

  function attachEvents() {
    document.querySelectorAll(".hint-button").forEach((button) => {
      let currentHint = 0;

      button.onclick = () => {
        const card = button.closest(".question-card");

        const question = practiceQuestions.find((q) => q.id == card.dataset.id);

        const text = card.querySelector(".hint-text");

        const box = card.querySelector(".hint-content");

        if (currentHint < question.hints.length) {
          text.textContent = question.hints[currentHint];

          box.classList.add("active");

          currentHint++;

          button.textContent =
            currentHint < question.hints.length
              ? "Show Another Hint"
              : "Hide Hint";
        } else {
          box.classList.remove("active");

          button.textContent = "💡 Show Hint";

          currentHint = 0;
        }
      };
    });

    document.querySelectorAll(".check-answer-btn").forEach((button) => {
      button.onclick = () => {
        const card = button.closest(".question-card");

        const id = Number(card.dataset.id);

        const question = practiceQuestions.find((q) => q.id === id);

        checkAnswer(card, question);
      };
    });
  }

  /* =====================================================
 CHECK ANSWER
===================================================== */

  function checkAnswer(card, question) {
    let userAnswer;

    const selected = card.querySelector("input[type='radio']:checked");

    if (selected) {
      userAnswer = selected.value;
    } else {
      const input = card.querySelector(".answer-input");

      userAnswer = input.value;
    }

    const feedback = card.querySelector(".feedback");

    if (isCorrect(userAnswer, question.answer)) {
      feedback.textContent = "✓ Correct! Your understanding is improving.";

      feedback.className = "feedback correct";

      if (!practiceState.completed.includes(question.id)) {
        practiceState.completed.push(question.id);
      }
    } else {
      feedback.textContent = "Not quite yet. Review the hint and try again.";

      feedback.className = "feedback incorrect";
    }

    practiceState.answers[question.id] = userAnswer;

    saveProgress();

    const explanation = card.querySelector(".explanation-btn");

    explanation.classList.remove("hidden");

    explanation.onclick = () => {
      card.querySelector(".explanation").classList.toggle("hidden");
    };

    updateProgress();
  }

  /* =====================================================
 ANSWER VALIDATION
===================================================== */

  function isCorrect(user, answer) {
    if (Array.isArray(answer)) {
      return false;
    }

    if (typeof answer === "number") {
      return Math.abs(Number(user) - answer) < 0.01;
    }

    return (
      String(user).trim().toLowerCase() === String(answer).trim().toLowerCase()
    );
  }

  /* =====================================================
 STORAGE
===================================================== */

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(practiceState));
  }

  function restoreState() {
    practiceState.completed.forEach((id) => {
      const card = document.querySelector(`.question-card[data-id="${id}"]`);

      if (card) {
        card.classList.add("completed");
      }
    });

    updateProgress();
  }

  /* =====================================================
 PROGRESS
===================================================== */

  function updateProgress() {
    const completed = practiceState.completed.length;

    completedCount.textContent = completed;

    progressFill.style.width = `${(completed / practiceQuestions.length) * 100}%`;
  }

  renderQuestions();
});
