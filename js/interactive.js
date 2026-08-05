document.addEventListener("DOMContentLoaded", () => {
  console.log("StatExplore Interactive Loaded");

  // =====================================================
  // ELEMENTS
  // =====================================================

  const dataInput = document.getElementById("data-input");

  const analyzeButton = document.getElementById("analyze-data");

  const resetButton = document.getElementById("reset-data");

  const inputMessage = document.getElementById("input-message");

  const emptyExplorer = document.getElementById("empty-explorer");

  const explorerResults = document.getElementById("explorer-results");

  const dataDisplay = document.getElementById("data-display");

  const dataVisualization = document.getElementById("data-visualization");

  const rangeResult = document.getElementById("range-result");

  const rangeExplanation = document.getElementById("range-explanation");

  const quartileResult = document.getElementById("quartile-result");

  const quartileExplanation = document.getElementById("quartile-explanation");

  const varianceResult = document.getElementById("variance-result");

  const varianceExplanation = document.getElementById("variance-explanation");

  const standardResult = document.getElementById("standard-result");

  const standardExplanation = document.getElementById("standard-explanation");

  const spreadLevel = document.getElementById("spread-level");

  const discoveryMessage = document.getElementById("discovery-message");

  // =====================================================
  // STATISTICAL FUNCTIONS
  // =====================================================

  function calculateMean(data) {
    const total = data.reduce((sum, value) => sum + value, 0);

    return total / data.length;
  }

  function calculateMedian(data) {
    const middle = Math.floor(data.length / 2);

    if (data.length % 2 === 0) {
      return (data[middle - 1] + data[middle]) / 2;
    }

    return data[middle];
  }

  function calculateQuartiles(data) {
    const middle = Math.floor(data.length / 2);

    let lowerHalf;

    let upperHalf;

    if (data.length % 2 === 0) {
      lowerHalf = data.slice(0, middle);

      upperHalf = data.slice(middle);
    } else {
      lowerHalf = data.slice(0, middle);

      upperHalf = data.slice(middle + 1);
    }

    return {
      q1: calculateMedian(lowerHalf),

      q3: calculateMedian(upperHalf),
    };
  }

  function calculateVariance(data, mean) {
    const squaredDifference = data.map((value) => (value - mean) ** 2);

    const total = squaredDifference.reduce((sum, value) => sum + value, 0);

    return total / data.length;
  }

  // =====================================================
  // VISUALIZATION
  // =====================================================

  function createVisualization(data, mean) {
    dataVisualization.innerHTML = "";

    const minimum = Math.min(...data);

    const maximum = Math.max(...data);

    const range = maximum - minimum;

    const wrapper = document.createElement("div");

    wrapper.className = "number-line-wrapper";

    const line = document.createElement("div");

    line.className = "number-line";

    data.forEach((value) => {
      const marker = document.createElement("span");

      marker.className = "data-marker";

      const position = range === 0 ? 50 : ((value - minimum) / range) * 100;

      marker.style.left = `${position}%`;

      marker.textContent = value;

      line.appendChild(marker);
    });

    const meanMarker = document.createElement("span");

    meanMarker.className = "mean-marker";

    const meanPosition = range === 0 ? 50 : ((mean - minimum) / range) * 100;

    meanMarker.style.left = `${meanPosition}%`;

    meanMarker.innerHTML = `

      <span class="mean-label">
        Mean = ${mean.toFixed(2)}
      </span>

    `;

    line.appendChild(meanMarker);

    const labels = document.createElement("div");

    labels.className = "number-labels";

    labels.innerHTML = `

      <span>${minimum}</span>

      <span>${maximum}</span>

    `;

    wrapper.appendChild(line);

    wrapper.appendChild(labels);

    dataVisualization.appendChild(wrapper);
  }

  // =====================================================
  // DATA INTERPRETATION
  // =====================================================

  function analyseSpread(sd, mean, range) {
    const coefficient = sd / mean;

    if (range <= 5 && coefficient < 0.5) {
      return {
        level: "Small Spread",

        message:
          "Your values are closely grouped together. The dataset shows consistency because observations are not far apart.",
      };
    }

    if (coefficient < 1) {
      return {
        level: "Moderate Spread",

        message:
          "Your data shows some variation. Values move away from the mean but still maintain a pattern.",
      };
    }

    return {
      level: "Large Spread",

      message:
        "Your values are widely separated. The dataset has greater variation.",
    };
  }

  // =====================================================
  // ANALYZE BUTTON
  // =====================================================

  analyzeButton.addEventListener("click", () => {
    inputMessage.textContent = "";

    let values = dataInput.value.split(",").map((value) => value.trim());

    if (values.length === 1 && values[0] === "") {
      inputMessage.textContent = "Please enter your data first.";

      return;
    }

    values = values.map(Number);

    if (values.some((value) => Number.isNaN(value))) {
      inputMessage.textContent = "Please enter numbers only.";

      return;
    }

    if (values.length < 3) {
      inputMessage.textContent = "Enter at least three values.";

      return;
    }

    values.sort((a, b) => a - b);

    const mean = calculateMean(values);

    const range = values[values.length - 1] - values[0];

    const quartiles = calculateQuartiles(values);

    const iqr = quartiles.q3 - quartiles.q1;

    const variance = calculateVariance(values, mean);

    const standardDeviation = Math.sqrt(variance);

    // DISPLAY RESULTS

    dataDisplay.textContent = values.join(" , ");

    rangeResult.textContent = `Range = ${range.toFixed(2)}`;

    rangeExplanation.textContent = `The distance between the smallest and largest value is ${range.toFixed(2)}.`;

    quartileResult.textContent = `Q1 = ${quartiles.q1}, Q3 = ${quartiles.q3}, IQR = ${iqr.toFixed(2)}`;

    quartileExplanation.textContent =
      "IQR represents the spread of the middle 50% of the dataset.";

    varianceResult.textContent = `Variance = ${variance.toFixed(2)}`;

    varianceExplanation.textContent =
      "Variance measures how much values differ from the mean.";

    standardResult.textContent = `Standard Deviation = ${standardDeviation.toFixed(2)}`;

    standardExplanation.textContent = `Values are approximately ${standardDeviation.toFixed(2)} units from the mean.`;

    const insight = analyseSpread(standardDeviation, mean, range);

    spreadLevel.textContent = insight.level;

    discoveryMessage.textContent = insight.message;

    createVisualization(values, mean);

    // SWITCH VIEW

    emptyExplorer.classList.add("hidden");

    explorerResults.classList.remove("hidden");

    explorerResults.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });
  });

  // =====================================================
  // RESET BUTTON
  // =====================================================

  resetButton.addEventListener("click", () => {
    dataInput.value = "";

    inputMessage.textContent = "";

    explorerResults.classList.add("hidden");

    emptyExplorer.classList.remove("hidden");

    dataDisplay.textContent = "";

    dataVisualization.innerHTML = "";

    rangeResult.textContent = "";

    rangeExplanation.textContent = "";

    quartileResult.textContent = "";

    quartileExplanation.textContent = "";

    varianceResult.textContent = "";

    varianceExplanation.textContent = "";

    standardResult.textContent = "";

    standardExplanation.textContent = "";

    spreadLevel.textContent = "";

    discoveryMessage.textContent = "";
  });
});
