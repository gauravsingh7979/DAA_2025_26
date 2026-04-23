import { animateStep, setSortedSnapshot } from "../utils/helpers";

export const bubbleSort = async (array, visualizer) => {
  const sorted = new Set();
  const { setSortedIndices } = visualizer;

  for (let i = 0; i < array.length; i += 1) {
    let swapped = false;

    for (let j = 0; j < array.length - i - 1; j += 1) {
      if (!(await animateStep(array, visualizer, [j, j + 1]))) {
        return false;
      }

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        if (!(await animateStep(array, visualizer, [j, j + 1]))) {
          return false;
        }
      }
    }

    sorted.add(array.length - i - 1);
    setSortedSnapshot(setSortedIndices, sorted);

    if (!swapped) {
      for (let index = 0; index < array.length - i - 1; index += 1) {
        sorted.add(index);
      }
      setSortedSnapshot(setSortedIndices, sorted);
      break;
    }
  }

  return true;
};
