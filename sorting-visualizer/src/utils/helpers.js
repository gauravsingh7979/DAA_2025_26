export const generateRandomArray = (size = 42, min = 30, max = 360) => {
  return Array.from({ length: size }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
};

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getDelayFromSpeed = (speed) => {
  return Math.max(4, 180 - speed * 1.9);
};

export const animateStep = async (array, visualizer, activeIndices = []) => {
  const { delay, setActiveIndices, setArray, shouldStop } = visualizer;

  if (shouldStop()) {
    return false;
  }

  setActiveIndices(activeIndices);
  setArray([...array]);
  await sleep(delay);

  return !shouldStop();
};

export const setSortedSnapshot = (setSortedIndices, sortedValues) => {
  setSortedIndices([...sortedValues].sort((left, right) => left - right));
};

export const algorithmDetails = {
  bubble: {
    label: "Bubble Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)",
    description:
      "Bubble Sort repeatedly compares neighboring values and swaps them until the largest values rise to the end."
  },
  selection: {
    label: "Selection Sort",
    best: "O(n^2)",
    average: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)",
    description:
      "Selection Sort scans the unsorted region, picks the minimum element, and places it into the next sorted slot."
  },
  insertion: {
    label: "Insertion Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)",
    description:
      "Insertion Sort grows a sorted section one item at a time by inserting the current value into its proper position."
  },
  merge: {
    label: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    description:
      "Merge Sort recursively splits the array, sorts each half, and merges them back together in order."
  },
  quick: {
    label: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n^2)",
    space: "O(log n)",
    description:
      "Quick Sort chooses a pivot, partitions values around it, and recursively sorts the left and right partitions."
  }
};
