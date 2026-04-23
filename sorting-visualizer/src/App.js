import React, { useState } from "react";
import "./App.css";

const ALGORITHMS = {
  bubble: {
    label: "Bubble Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    description: "Compares neighboring elements and swaps them."
  },
  selection: {
    label: "Selection Sort",
    best: "O(n^2)",
    average: "O(n^2)",
    worst: "O(n^2)",
    description: "Finds the smallest element and puts it in the correct place."
  },
  insertion: {
    label: "Insertion Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    description: "Builds the sorted array one element at a time."
  },
  merge: {
    label: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    description: "Splits the array, sorts each half, and merges them."
  },
  quick: {
    label: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n^2)",
    description: "Uses a pivot to split the array into smaller parts."
  }
};

const DEFAULT_SIZE = 30;
const DEFAULT_SPEED = 70;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 260) + 40);

const getDelay = (speed) => Math.max(8, 160 - speed * 1.5);

const paintStep = async (array, setArray, setActive, active, delay) => {
  setActive(active);
  setArray([...array]);
  await sleep(delay);
};

const bubbleSort = async (array, setArray, setActive, delay) => {
  for (let i = 0; i < array.length; i += 1) {
    let swapped = false;

    for (let j = 0; j < array.length - i - 1; j += 1) {
      await paintStep(array, setArray, setActive, [j, j + 1], delay);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        await paintStep(array, setArray, setActive, [j, j + 1], delay);
      }
    }

    if (!swapped) {
      break;
    }
  }
};

const selectionSort = async (array, setArray, setActive, delay) => {
  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j += 1) {
      await paintStep(array, setArray, setActive, [minIndex, j], delay);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      await paintStep(array, setArray, setActive, [i, minIndex], delay);
    }
  }
};

const insertionSort = async (array, setArray, setActive, delay) => {
  for (let i = 1; i < array.length; i += 1) {
    const current = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      await paintStep(array, setArray, setActive, [j, j + 1], delay);
      j -= 1;
    }

    array[j + 1] = current;
    await paintStep(array, setArray, setActive, [j + 1], delay);
  }
};

const mergeParts = async (array, left, mid, right, setArray, setActive, delay) => {
  const leftPart = array.slice(left, mid + 1);
  const rightPart = array.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) {
      array[k] = leftPart[i];
      i += 1;
    } else {
      array[k] = rightPart[j];
      j += 1;
    }

    await paintStep(array, setArray, setActive, [k], delay);
    k += 1;
  }

  while (i < leftPart.length) {
    array[k] = leftPart[i];
    i += 1;
    await paintStep(array, setArray, setActive, [k], delay);
    k += 1;
  }

  while (j < rightPart.length) {
    array[k] = rightPart[j];
    j += 1;
    await paintStep(array, setArray, setActive, [k], delay);
    k += 1;
  }
};

const runMergeSort = async (array, left, right, setArray, setActive, delay) => {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  await runMergeSort(array, left, mid, setArray, setActive, delay);
  await runMergeSort(array, mid + 1, right, setArray, setActive, delay);
  await mergeParts(array, left, mid, right, setArray, setActive, delay);
};

const mergeSort = async (array, setArray, setActive, delay) => {
  await runMergeSort(array, 0, array.length - 1, setArray, setActive, delay);
};

const partition = async (array, low, high, setArray, setActive, delay) => {
  const pivot = array[high];
  let index = low;

  for (let j = low; j < high; j += 1) {
    await paintStep(array, setArray, setActive, [j, high], delay);

    if (array[j] < pivot) {
      [array[index], array[j]] = [array[j], array[index]];
      await paintStep(array, setArray, setActive, [index, j], delay);
      index += 1;
    }
  }

  [array[index], array[high]] = [array[high], array[index]];
  await paintStep(array, setArray, setActive, [index, high], delay);
  return index;
};

const runQuickSort = async (array, low, high, setArray, setActive, delay) => {
  if (low >= high) {
    return;
  }

  const pivotIndex = await partition(array, low, high, setArray, setActive, delay);
  await runQuickSort(array, low, pivotIndex - 1, setArray, setActive, delay);
  await runQuickSort(array, pivotIndex + 1, high, setArray, setActive, delay);
};

const quickSort = async (array, setArray, setActive, delay) => {
  await runQuickSort(array, 0, array.length - 1, setArray, setActive, delay);
};

const SORTERS = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort
};

function App() {
  const [array, setArray] = useState(() => createArray(DEFAULT_SIZE));
  const [algorithm, setAlgorithm] = useState("quick");
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [active, setActive] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const selected = ALGORITHMS[algorithm];

  const generateArray = (nextSize = size) => {
    if (isSorting) {
      return;
    }

    setArray(createArray(nextSize));
    setActive([]);
  };

  const handleSizeChange = (event) => {
    const nextSize = Number(event.target.value);
    setSize(nextSize);

    if (!isSorting) {
      setArray(createArray(nextSize));
      setActive([]);
    }
  };

  const handleSort = async () => {
    if (isSorting) {
      return;
    }

    setIsSorting(true);
    const workingArray = [...array];
    await SORTERS[algorithm](workingArray, setArray, setActive, getDelay(speed));
    setArray([...workingArray]);
    setActive([]);
    setIsSorting(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Sorting Visualizer</h1>
        <p className="subtitle">Simple layout, fewer files, easy controls</p>

        <div className="controls">
          <label>
            Algorithm
            <select
              value={algorithm}
              onChange={(event) => setAlgorithm(event.target.value)}
              disabled={isSorting}
            >
              {Object.entries(ALGORITHMS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Array Size: {size}
            <input
              type="range"
              min="10"
              max="50"
              value={size}
              onChange={handleSizeChange}
              disabled={isSorting}
            />
          </label>

          <label>
            Speed: {speed}
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              disabled={isSorting}
            />
          </label>

          <div className="buttonRow">
            <button type="button" onClick={() => generateArray()} disabled={isSorting}>
              New Array
            </button>
            <button type="button" onClick={handleSort} disabled={isSorting}>
              Start Sorting
            </button>
          </div>
        </div>

        <div className="infoCard">
          <h2>{selected.label}</h2>
          <p>{selected.description}</p>
          <p>
            Best: <strong>{selected.best}</strong>
          </p>
          <p>
            Average: <strong>{selected.average}</strong>
          </p>
          <p>
            Worst: <strong>{selected.worst}</strong>
          </p>
        </div>

        <div className="bars">
          {array.map((value, index) => (
            <div className="barWrap" key={index}>
              <div
                className={active.includes(index) ? "bar active" : "bar"}
                style={{ height: `${value}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
