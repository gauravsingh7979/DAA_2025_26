import { animateStep, setSortedSnapshot } from "../utils/helpers";

export const selectionSort = async (array, visualizer) => {
  const sorted = new Set();
  const { setSortedIndices } = visualizer;

  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j += 1) {
      if (!(await animateStep(array, visualizer, [minIndex, j]))) {
        return false;
      }

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      if (!(await animateStep(array, visualizer, [i, minIndex]))) {
        return false;
      }
    }

    sorted.add(i);
    setSortedSnapshot(setSortedIndices, sorted);
  }

  return true;
};
