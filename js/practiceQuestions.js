const practiceQuestions = [
  {
    id: 1,

    topic: "Range",

    type: "short-answer",

    title: "Finding the Range",

    question: "Find the range of the following data set:",

    data: "12, 15, 18, 20, 25",

    answer: 13,

    hints: [
      "Look for the smallest and largest values in the data set.",
      "Range = Highest value - Lowest value.",
      "Range = 25 - 12.",
    ],

    explanation: `
      Highest value = 25

      <br><br>

      Lowest value = 12

      <br><br>

      Range = 25 - 12

      <br><br>

      <strong>
      Range = 13
      </strong>
    `,

    concept:
      "Range measures the total distance between the smallest and largest values in a data set.",
  },

  {
    id: 2,

    topic: "Range",

    type: "true-false",

    title: "Understanding Range",

    question:
      "Range is calculated by subtracting the smallest value from the largest value.",

    options: ["True", "False"],

    answer: "True",

    hints: [
      "Think about how we measure the total spread of data.",
      "The formula compares the maximum and minimum values.",
    ],

    explanation: `
      Range is found using:

      <br><br>

      Range = Maximum value - Minimum value

      <br><br>

      Therefore, the statement is correct.
    `,

    concept:
      "Range gives a quick measure of how far apart the extreme values are.",
  },

  {
    id: 3,

    topic: "Data Spread",

    type: "multiple-choice",

    title: "Comparing Data Spread",

    question: "Which class shows more consistent performance?",

    data: `
      Class A:
      68, 69, 70, 71, 72

      <br><br>

      Class B:
      40, 60, 70, 80, 100
    `,

    options: ["Class A", "Class B"],

    answer: "Class A",

    hints: [
      "Consistency means values are close together.",
      "A smaller spread means less variation.",
    ],

    explanation: `
      Class A values are closer together.

      <br><br>

      This means Class A has less variation.

      <br><br>

      <strong>
      Answer: Class A
      </strong>
    `,

    concept: "Data sets with smaller variation are usually more consistent.",
  },

  {
    id: 4,

    topic: "Quartiles",

    type: "short-answer",

    title: "Finding Quartiles",

    question: "Find Q1 and Q3 for the following data set:",

    data: "4, 7, 9, 12, 15, 18, 21",

    fields: ["Enter Q1", "Enter Q3"],

    answer: [7, 18],

    hints: [
      "Arrange the data in order.",
      "Separate the lower half and upper half.",
    ],

    explanation: `
      Ordered data:

      <br>
      4, 7, 9, 12, 15, 18, 21

      <br><br>

      Lower half:

      <br>
      4, 7, 9

      <br><br>

      Q1 = 7

      <br><br>

      Upper half:

      <br>
      15, 18, 21

      <br><br>

      Q3 = 18
    `,

    concept: "Quartiles divide ordered data into four equal sections.",
  },

  {
    id: 5,

    topic: "Interquartile Range",

    type: "short-answer",

    title: "Finding the Interquartile Range",

    question: "Calculate the interquartile range of:",

    data: "5, 8, 10, 12, 15, 18, 20",

    answer: 10,

    hints: ["Find Q1 and Q3 first.", "IQR = Q3 - Q1."],

    explanation: `
      Lower half:

      <br>
      5, 8, 10

      <br><br>

      Q1 = 8

      <br><br>

      Upper half:

      <br>
      15, 18, 20

      <br><br>

      Q3 = 18

      <br><br>

      IQR = 18 - 8

      <br><br>

      <strong>
      IQR = 10
      </strong>
    `,

    concept:
      "Interquartile range measures the spread of the middle 50% of data.",
  },

  {
    id: 6,

    topic: "Interquartile Range",

    type: "multiple-choice",

    title: "Meaning of IQR",

    question: "What does the interquartile range measure?",

    options: [
      "The total spread of all values",
      "The spread of the middle 50% of values",
      "The average value of the data",
    ],

    answer: "The spread of the middle 50% of values",

    hints: ["Think about the area between Q1 and Q3."],

    explanation: `
      IQR measures the distance between Q1 and Q3.

      <br><br>

      This represents the middle 50% of the data.
    `,

    concept: "IQR is useful because it is less affected by extreme values.",
  },

  {
    id: 7,

    topic: "Variance",

    type: "true-false",

    title: "Understanding Variance",

    question:
      "Variance measures the average squared distance of values from the mean.",

    options: ["True", "False"],

    answer: "True",

    hints: [
      "Variance uses deviations from the mean.",
      "The deviations are squared.",
    ],

    explanation: `
      Variance calculates how far values spread
      around the mean using squared deviations.
    `,

    concept: "Variance measures the amount of variation within a data set.",
  },

  {
    id: 8,

    topic: "Variance",

    type: "short-answer",

    title: "Calculating Variance",

    question: "Find the variance of:",

    data: "6, 8, 10",

    answer: 2.67,

    hints: ["Find the mean first.", "Calculate squared deviations."],

    explanation: `
      Mean = 8

      <br><br>

      Deviations:

      <br>
      -2, 0, 2

      <br><br>

      Squared deviations:

      <br>
      4, 0, 4

      <br><br>

      Variance:

      <br>
      (4 + 0 + 4) ÷ 3

      <br><br>

      <strong>
      Variance = 2.67
      </strong>
    `,

    concept: "Variance measures the average squared distance from the mean.",
  },

  {
    id: 9,

    topic: "Standard Deviation",

    type: "multiple-choice",

    title: "Meaning of Standard Deviation",

    question: "Which statement best describes standard deviation?",

    options: [
      "The middle value of a data set",
      "The average distance of values from the mean",
      "The largest value minus the smallest value",
    ],

    answer: "The average distance of values from the mean",

    hints: ["Think about how far values usually move from the average."],

    explanation: `
      Standard deviation describes the typical distance
      between values and the mean.
    `,

    concept:
      "Standard deviation shows how spread out data values are around the mean.",
  },

  {
    id: 10,

    topic: "Choosing Measures",

    type: "multiple-choice",

    title: "Selecting the Correct Measure",

    question:
      "Which measure is most useful for describing how spread out values are around the mean?",

    options: ["Range", "Standard Deviation", "Median"],

    answer: "Standard Deviation",

    hints: ["Look for the measure connected to the mean."],

    explanation: `
      Standard deviation measures how far values
      are distributed around the mean.

      <br><br>

      <strong>
      Answer: Standard Deviation
      </strong>
    `,

    concept:
      "Standard deviation is commonly used when analysing variation around the average.",
  },
];
