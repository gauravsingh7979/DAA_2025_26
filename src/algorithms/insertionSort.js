import { animateStep, setSortedSnapshot } from "../utils/helpers";

export const insertionSort = async (array, visualizer) => {
  const sorted = new Set();
  const { setSortedIndices } = visualizer;

  if (array.length > 0) {
    sorted.add(0);
    setSortedSnapshot(setSortedIndices, sorted);
  }

  for (let i = 1; i < array.length; i += 1) {
    const currentValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currentValue) {
      array[j + 1] = array[j];

      if (!(await animateStep(array, visualizer, [j, j + 1]))) {
        return false;
      }

      j -= 1;
    }

    array[j + 1] = currentValue;

    if (!(await animateStep(array, visualizer, [j + 1, i]))) {
      return false;
    }

    for (let index = 0; index <= i; index += 1) {
      sorted.add(index);
    }
    setSortedSnapshot(setSortedIndices, sorted);
  }

  return true;
};
