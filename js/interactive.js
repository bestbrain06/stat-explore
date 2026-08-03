document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // SELECT ELEMENTS
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

  const discoveryMessage = document.getElementById("discovery-message");

  // =====================================================
  // CALCULATE MEAN
  // =====================================================

  function calculateMean(data) {
    const total = data.reduce((sum, value) => sum + value, 0);

    return total / data.length;
  }

  // =====================================================
  // CALCULATE MEDIAN
  // =====================================================

  function calculateMedian(data) {
    const middle = Math.floor(data.length / 2);

    if (data.length % 2 === 0) {
      return (data[middle - 1] + data[middle]) / 2;
    }

    return data[middle];
  }

  // =====================================================
  // CALCULATE QUARTILES
  // =====================================================

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

  // =====================================================
  // CALCULATE VARIANCE
  // =====================================================

  function calculateVariance(data, mean) {
    const squaredDifferences = data.map((value) => (value - mean) ** 2);

    const total = squaredDifferences.reduce((sum, value) => sum + value, 0);

    return total / data.length;
  }

  // =====================================================
  // CREATE DATA VISUALIZATION
  // =====================================================

  function createVisualization(data) {
    dataVisualization.innerHTML = "";

    const wrapper = document.createElement("div");

    wrapper.className = "data-line";

    data.forEach((value) => {
      const point = document.createElement("span");

      point.textContent = value;

      point.className = "data-point";

      wrapper.appendChild(point);
    });

    dataVisualization.appendChild(wrapper);
  }

  // =====================================================
  // GENERATE EXPLANATIONS
  // =====================================================

  function generateSpreadMessage(standardDeviation, mean) {
    if (standardDeviation < mean * 0.1) {
      return (
        "Your data has a small spread. " +
        "The values are closely grouped around the mean, " +
        "showing consistency."
      );
    }

    return (
      "Your data has a larger spread. " +
      "The values are more separated from the mean, " +
      "showing greater variation."
    );
  }

  // =====================================================
  // ANALYZE DATA
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
      inputMessage.textContent =
        "Enter at least three values to explore your data.";

      return;
    }

    values.sort((a, b) => a - b);

    const mean = calculateMean(values);

    const range = values[values.length - 1] - values[0];

    const quartiles = calculateQuartiles(values);

    const iqr = quartiles.q3 - quartiles.q1;

    const variance = calculateVariance(values, mean);

    const standardDeviation = Math.sqrt(variance);

    // DISPLAY DATA

    dataDisplay.textContent = values.join(" , ");

    rangeResult.textContent = `Range = ${range.toFixed(2)}`;

    rangeExplanation.textContent = `The distance between the smallest and largest value is ${range.toFixed(2)}.`;

    quartileResult.textContent = `Q1 = ${quartiles.q1}, Q3 = ${quartiles.q3}, IQR = ${iqr.toFixed(2)}`;

    quartileExplanation.textContent =
      "The interquartile range describes the spread of the middle 50% of your data.";

    varianceResult.textContent = `Variance = ${variance.toFixed(2)}`;

    varianceExplanation.textContent =
      "Variance measures how far values spread from the mean using squared distances.";

    standardResult.textContent = `Standard Deviation = ${standardDeviation.toFixed(2)}`;

    standardExplanation.textContent = `Values are approximately ${standardDeviation.toFixed(2)} units away from the mean.`;

    discoveryMessage.textContent = generateSpreadMessage(
      standardDeviation,
      mean,
    );

    createVisualization(values);

    emptyExplorer.classList.add("hidden");

    explorerResults.classList.remove("hidden");
  });

  // =====================================================
  // RESET EXPLORER
  // =====================================================

  resetButton.addEventListener("click", () => {
    dataInput.value = "";

    explorerResults.classList.add("hidden");

    emptyExplorer.classList.remove("hidden");

    inputMessage.textContent = "";

    dataDisplay.textContent = "";

    dataVisualization.innerHTML = "";
  });
});
