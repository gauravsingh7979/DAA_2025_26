import { animateStep, setSortedSnapshot } from "../utils/helpers";

const partition = async (array, low, high, visualizer, sorted) => {
  const { setSortedIndices } = visualizer;
  const pivot = array[high];
  let pivotIndex = low;

  for (let current = low; current < high; current += 1) {
    if (!(await animateStep(array, visualizer, [current, high]))) {
      return -1;
    }

    if (array[current] < pivot) {
      [array[pivotIndex], array[current]] = [array[current], array[pivotIndex]];

      if (!(await animateStep(array, visualizer, [pivotIndex, current]))) {
        return -1;
      }

      pivotIndex += 1;
    }
  }

  [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];

  if (!(await animateStep(array, visualizer, [pivotIndex, high]))) {
    return -1;
  }

  sorted.add(pivotIndex);
  setSortedSnapshot(setSortedIndices, sorted);

  return pivotIndex;
};

const quickSortRecursive = async (array, low, high, visualizer, sorted) => {
  const { setSortedIndices } = visualizer;

  if (visualizer.shouldStop()) {
    return false;
  }

  if (low > high) {
    return true;
  }

  if (low === high) {
    sorted.add(low);
    setSortedSnapshot(setSortedIndices, sorted);
    return true;
  }

  const pivotIndex = await partition(array, low, high, visualizer, sorted);

  if (pivotIndex === -1) {
    return false;
  }

  if (!(await quickSortRecursive(array, low, pivotIndex - 1, visualizer, sorted))) {
    return false;
  }

  return quickSortRecursive(array, pivotIndex + 1, high, visualizer, sorted);
};

export const quickSort = async (array, visualizer) => {
  const sorted = new Set();

  if (array.length < 2) {
    return true;
  }

  return quickSortRecursive(array, 0, array.length - 1, visualizer, sorted);
};
