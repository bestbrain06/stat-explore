const assessmentQuestions = [
  /*
  =====================================================
  QUESTION 1
  MULTIPLE CHOICE
  RANGE
  =====================================================
  */

  {
    id: 1,

    type: "multiple-choice",

    topic: "Range",

    question:
      "A poultry farmer in Nsawam records the number of eggs produced over seven days. Calculate the range of the data set:",

    data: "12, 15, 15, 17, 20, 22, 24",

    options: ["8", "10", "12", "15"],

    answer: "12",

    explanation: `
    Maximum value = 24

    <br><br>

    Minimum value = 12

    <br><br>

    Range = Maximum value - Minimum value

    <br><br>

    Range = 24 - 12

    <br><br>

    <strong>
    Range = 12
    </strong>
    `,

    concept:
      "Range measures the total distance between the highest and lowest values in a data set.",
  },

  /*
  =====================================================
  QUESTION 2
  MULTIPLE CHOICE
  STANDARD DEVIATION
  =====================================================
  */

  {
    id: 2,

    type: "multiple-choice",

    topic: "Standard Deviation",

    question:
      "Two schools recorded the standard deviation of their students' mathematics scores. School A has a standard deviation of 5.2 while School B has a standard deviation of 8.9. Which statement is correct?",

    options: [
      "School A scores are more spread out than School B",

      "School B scores are more spread out than School A",

      "Both schools have equal variation",

      "The mean must be known before comparing dispersion",
    ],

    answer: "School B scores are more spread out than School A",

    explanation: `
    A larger standard deviation means the values
    are more spread out from the mean.

    <br><br>

    Since 8.9 is greater than 5.2:

    <br><br>

    School B has greater variation.
    `,

    concept:
      "Standard deviation measures how far data values usually spread from the mean.",
  },

  /*
  =====================================================
  QUESTION 3
  MULTIPLE CHOICE
  INTERQUARTILE RANGE
  =====================================================
  */

  {
    id: 3,

    type: "multiple-choice",

    topic: "Interquartile Range",

    question:
      "Given the data set below, determine the interquartile range (IQR):",

    data: "4, 8, 8, 10, 12, 14, 20",

    options: ["4", "6", "8", "10"],

    answer: "6",

    explanation: `
    Ordered data:

    <br>
    4, 8, 8, 10, 12, 14, 20

    <br><br>

    Lower half:

    <br>
    4, 8, 8

    <br>

    Q1 = 8

    <br><br>

    Upper half:

    <br>
    12, 14, 20

    <br>

    Q3 = 14

    <br><br>

    IQR = Q3 - Q1

    <br>

    IQR = 14 - 8

    <br>

    <strong>
    IQR = 6
    </strong>
    `,

    concept:
      "Interquartile range measures the spread of the middle 50% of a data set.",
  },

  /*
  =====================================================
  QUESTION 4
  TRUE/FALSE
  VARIANCE
  =====================================================
  */

  {
    id: 4,

    type: "true-false",

    topic: "Variance",

    question:
      "Variance measures the average squared distance of values from the mean.",

    options: ["True", "False"],

    answer: "True",

    explanation: `
    Variance is calculated by finding deviations
    from the mean, squaring them and finding their average.
    `,

    concept: "Variance describes the amount of variation in a data set.",
  },

  /*
  =====================================================
  QUESTION 5
  SHORT ANSWER
  STANDARD DEVIATION
  =====================================================
  */

  {
    id: 5,

    type: "short-answer",

    topic: "Standard Deviation",

    question:
      "The variance of a data set is 36. Calculate the standard deviation.",

    answer: 6,

    explanation: `
    Standard deviation is the square root of variance.

    <br><br>

    Standard deviation = √36

    <br><br>

    <strong>
    Standard deviation = 6
    </strong>
    `,

    concept:
      "Standard deviation is obtained by taking the square root of variance.",
  },

  /*
  =====================================================
  QUESTION 6
  TRUE/FALSE
  OUTLIERS
  =====================================================
  */

  {
    id: 6,

    type: "true-false",

    topic: "Interquartile Range",

    question:
      "The interquartile range is usually less affected by extreme values compared with the range.",

    options: ["True", "False"],

    answer: "True",

    explanation: `
    IQR focuses on the middle 50% of data,
    so extreme values have less influence on it.
    `,

    concept: "IQR is useful when data contains outliers.",
  },

  /*
  =====================================================
  QUESTION 7
  MULTIPLE CHOICE
  VARIANCE
  =====================================================
  */

  {
    id: 7,

    type: "multiple-choice",

    topic: "Variance",

    question:
      "A school compares the consistency of rainfall in two regions. Region X has variance 25 and Region Y has variance 16. Which region has more consistent rainfall?",

    options: [
      "Region X",

      "Region Y",

      "Both regions have equal consistency",

      "Variance cannot compare consistency",
    ],

    answer: "Region Y",

    explanation: `
    Smaller variance means less variation.

    <br><br>

    Region Y has variance 16,
    which is smaller than 25.

    Therefore Region Y is more consistent.
    `,

    concept: "Lower dispersion indicates more consistency.",
  },

  /*
  =====================================================
  QUESTION 8
  SHORT ANSWER
  SEMI-INTERQUARTILE RANGE
  =====================================================
  */

  {
    id: 8,

    type: "short-answer",

    topic: "Quartiles",

    question: "Find the semi-interquartile range of the data set:",

    data: "3, 7, 7, 11, 15, 19",

    answer: 4,

    explanation: `
    Lower half:

    <br>
    3, 7, 7

    <br>

    Q1 = 7

    <br><br>

    Upper half:

    <br>
    11, 15, 19

    <br>

    Q3 = 15

    <br><br>

    IQR = 15 - 7 = 8

    <br><br>

    Semi-IQR = 8 ÷ 2

    <br>

    <strong>
    Semi-IQR = 4
    </strong>
    `,

    concept:
      "Semi-interquartile range is half the difference between Q3 and Q1.",
  },

  /*
  =====================================================
  QUESTION 9
  MULTIPLE CHOICE
  MEASURE SELECTION
  =====================================================
  */

  {
    id: 9,

    type: "multiple-choice",

    topic: "Measures of Dispersion",

    question:
      "A data set contains one extremely high outlier compared with the other values. Which measure of dispersion is least affected by this outlier?",

    options: ["Range", "Standard deviation", "Interquartile range", "Variance"],

    answer: "Interquartile range",

    explanation: `
    IQR uses the middle 50% of data,
    making it less affected by extreme values.
    `,

    concept:
      "The choice of dispersion measure depends on the nature of the data.",
  },

  /*
  =====================================================
  QUESTION 10
  SHORT ANSWER
  STANDARD DEVIATION
  =====================================================
  */

  {
    id: 10,

    type: "short-answer",

    topic: "Standard Deviation",

    question:
      "A machine produces the following output times: 5, 5, 5, 5, 5. Find the standard deviation.",

    answer: 0,

    explanation: `
    Every value is equal to the mean.

    <br><br>

    Therefore every deviation is zero.

    <br><br>

    Standard deviation = 0
    `,

    concept:
      "A standard deviation of zero means there is no variation in the data.",
  },
];
