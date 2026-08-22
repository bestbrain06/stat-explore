document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "statexplore-practice";

  const container = document.getElementById("practice-container");

  const completedEl = document.getElementById("completed");
  const remainingEl = document.getElementById("remaining");
  const accuracyEl = document.getElementById("accuracy");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");

  const completion = document.getElementById("completion");
  const finalScore = document.getElementById("final-score");

  const resetBtn = document.getElementById("reset-btn");
  const retryBtn = document.getElementById("retry-btn");

  let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    completed: [],
    answers: {},
    attempts: 0,
    correct: 0,
  };

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function render() {
    container.innerHTML = "";

    practiceQuestions.forEach((q) => {
      const card = document.createElement("article");
      card.className = "question-card";
      card.dataset.id = q.id;

      const completed = state.completed.includes(q.id);

      if (completed) card.classList.add("completed");

      card.innerHTML = `
      <div class="completed-badge">✓ Completed</div>

      <div class="question-header">
        <span class="question-number">Activity ${q.id}</span>
        <h3>${q.title}</h3>
        <p class="topic">${q.topic}</p>
      </div>

      <p class="question-text">${q.question}</p>

      ${q.data ? `<div class="data-box">${q.data}</div>` : ""}

      ${createAnswer(q)}

      <button class="hint-btn">💡 Show Hint</button>

      <div class="hint-content">
        <p></p>
      </div>

      <div class="actions">
        <button class="check-btn" ${completed ? "disabled" : ""}>
          ${completed ? "Completed ✓" : "Check Answer"}
        </button>

        <button class="explain-btn" style="${completed ? "display:block" : "display:none"}">
          Show Explanation
        </button>
      </div>

      <div class="feedback"></div>

      <div class="explanation">
        ${q.explanation}
        <hr>
        <strong>Concept Reminder</strong>
        <p>${q.concept}</p>
      </div>
    `;

      container.appendChild(card);

      restore(card, q);
    });

    attachEvents();
    updateProgress();
  }

  function createAnswer(q) {
    if (q.type === "multiple-choice" || q.type === "true-false") {
      return `
      <div class="options">
        ${q.options
          .map(
            (o) => `
          <label class="option">
            <input type="radio" name="q${q.id}" value="${o}">
            <span>${o}</span>
          </label>
        `,
          )
          .join("")}
      </div>
    `;
    }

    if (q.fields) {
      return `
      <div class="multi-inputs">
        ${q.fields
          .map(
            (f, i) => `
          <div>
            <label>${f}</label>
            <input class="answer-input" data-index="${i}" type="number">
          </div>
        `,
          )
          .join("")}
      </div>
    `;
    }

    return `<input class="answer-input" type="number" step="any">`;
  }

  function attachEvents() {
    document.querySelectorAll(".hint-btn").forEach((btn) => {
      btn.onclick = () => {
        const card = btn.closest(".question-card");
        const q = getQuestion(card);

        const box = card.querySelector(".hint-content");
        const text = box.querySelector("p");

        let index = Number(card.dataset.hint || 0);

        if (box.classList.contains("show") && index >= q.hints.length) {
          box.classList.remove("show");
          btn.textContent = "💡 Show Hint";
          card.dataset.hint = 0;
          return;
        }

        text.textContent = q.hints[index];

        box.classList.add("show");

        index++;

        card.dataset.hint = index;

        btn.textContent =
          index < q.hints.length ? "💡 Show Another Hint" : "Hide Hint";
      };
    });

    document.querySelectorAll(".check-btn").forEach((btn) => {
      btn.onclick = () => check(btn);
    });

    document.querySelectorAll(".explain-btn").forEach((btn) => {
      btn.onclick = () => {
        const exp = btn.closest(".question-card").querySelector(".explanation");

        exp.classList.toggle("show");

        btn.textContent = exp.classList.contains("show")
          ? "Hide Explanation"
          : "Show Explanation";
      };
    });
  }

  function check(button) {
    const card = button.closest(".question-card");
    const q = getQuestion(card);
    const feedback = card.querySelector(".feedback");

    let user;

    if (q.type === "multiple-choice" || q.type === "true-false") {
      const checked = card.querySelector("input:checked");

      if (!checked) {
        return showFeedback(feedback, "Select an answer.", false);
      }

      user = checked.value;
    } else if (q.fields) {
      const values = [...card.querySelectorAll(".answer-input")].map((i) =>
        Number(i.value),
      );

      if (values.some(Number.isNaN)) {
        return showFeedback(feedback, "Complete all answers.", false);
      }

      user = values;
    } else {
      const input = card.querySelector(".answer-input");

      if (input.value === "") {
        return showFeedback(feedback, "Enter your answer.", false);
      }

      user = Number(input.value);
    }

    state.attempts++;

    const correct = validate(user, q.answer);

    if (correct) {
      state.correct++;

      if (!state.completed.includes(q.id)) state.completed.push(q.id);

      state.answers[q.id] = user;

      save();

      card.classList.add("completed");

      button.disabled = true;
      button.textContent = "Completed ✓";

      card.querySelectorAll("input").forEach((i) => (i.disabled = true));

      card.querySelector(".explain-btn").style.display = "block";

      showFeedback(feedback, "✓ Correct! Activity completed.", true);
    } else {
      state.answers[q.id] = user;

      save();

      showFeedback(feedback, "Incorrect. Try again.", false);
    }

    updateProgress();
  }

  function validate(user, answer) {
    if (Array.isArray(answer)) {
      return user.every((v, i) => Math.abs(v - answer[i]) < 0.01);
    }

    if (typeof answer === "number") {
      return Math.abs(user - answer) < 0.01;
    }

    return String(user).toLowerCase() === String(answer).toLowerCase();
  }

  function restore(card, q) {
    const saved = state.answers[q.id];

    if (saved === undefined) return;

    if (q.type === "multiple-choice" || q.type === "true-false") {
      const radio = card.querySelector(`input[value="${saved}"]`);

      if (radio) radio.checked = true;
    } else if (Array.isArray(saved)) {
      card.querySelectorAll(".answer-input").forEach((i, index) => {
        i.value = saved[index];
      });
    } else {
      card.querySelector(".answer-input").value = saved;
    }

    if (state.completed.includes(q.id)) {
      card.querySelector(".check-btn").disabled = true;
      card.querySelector(".check-btn").textContent = "Completed ✓";

      card.querySelector(".explain-btn").style.display = "block";

      card.querySelectorAll("input").forEach((i) => (i.disabled = true));
    }
  }

  function showFeedback(el, msg, ok) {
    el.className = `feedback show ${ok ? "correct" : "wrong"}`;
    el.textContent = msg;
  }

  function getQuestion(card) {
    const id = Number(card.dataset.id);

    return practiceQuestions.find((q) => q.id === id);
  }

  function updateProgress() {
    const total = practiceQuestions.length;

    const completed = state.completed.length;

    const remaining = total - completed;

    const accuracy =
      state.attempts === 0
        ? 0
        : Math.round((state.correct / state.attempts) * 100);

    const progress = Math.round((completed / total) * 100);

    completedEl.textContent = completed;
    remainingEl.textContent = remaining;
    accuracyEl.textContent = `${accuracy}%`;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    if (completed === total) {
      completion.classList.remove("hidden");
      finalScore.textContent = `${completed} / ${total}`;
    } else {
      completion.classList.add("hidden");
    }
  }

  function resetPractice() {
    if (!confirm("Reset all practice progress?")) return;

    localStorage.removeItem(STORAGE_KEY);

    state = {
      completed: [],
      answers: {},
      attempts: 0,
      correct: 0,
    };

    render();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  resetBtn.onclick = resetPractice;
  retryBtn.onclick = resetPractice;

  render();
});
