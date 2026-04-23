import { animateStep } from "../utils/helpers";

const merge = async (array, start, middle, end, visualizer) => {
  const left = array.slice(start, middle + 1);
  const right = array.slice(middle + 1, end + 1);

  let leftIndex = 0;
  let rightIndex = 0;
  let currentIndex = start;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (
      !(await animateStep(array, visualizer, [
        start + leftIndex,
        middle + 1 + rightIndex
      ]))
    ) {
      return false;
    }

    if (left[leftIndex] <= right[rightIndex]) {
      array[currentIndex] = left[leftIndex];
      leftIndex += 1;
    } else {
      array[currentIndex] = right[rightIndex];
      rightIndex += 1;
    }

    if (!(await animateStep(array, visualizer, [currentIndex]))) {
      return false;
    }

    currentIndex += 1;
  }

  while (leftIndex < left.length) {
    array[currentIndex] = left[leftIndex];
    leftIndex += 1;

    if (!(await animateStep(array, visualizer, [currentIndex]))) {
      return false;
    }

    currentIndex += 1;
  }

  while (rightIndex < right.length) {
    array[currentIndex] = right[rightIndex];
    rightIndex += 1;

    if (!(await animateStep(array, visualizer, [currentIndex]))) {
      return false;
    }

    currentIndex += 1;
  }

  return true;
};

const mergeSortRecursive = async (array, start, end, visualizer) => {
  if (visualizer.shouldStop()) {
    return false;
  }

  if (start >= end) {
    return true;
  }

  const middle = Math.floor((start + end) / 2);

  if (!(await mergeSortRecursive(array, start, middle, visualizer))) {
    return false;
  }

  if (!(await mergeSortRecursive(array, middle + 1, end, visualizer))) {
    return false;
  }

  return merge(array, start, middle, end, visualizer);
};

export const mergeSort = async (array, visualizer) => {
  if (array.length < 2) {
    return true;
  }

  return mergeSortRecursive(array, 0, array.length - 1, visualizer);
};
