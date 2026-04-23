#include "SortingAlgorithms.h"

#include <iostream>
#include <vector>

namespace {

void printArray(const std::vector<int>& values) {
  for (std::size_t i = 0; i < values.size(); ++i) {
    std::cout << values[i];
    if (i + 1 < values.size()) {
      std::cout << ' ';
    }
  }
  std::cout << '\n';
}

std::vector<int> readArray() {
  int size = 0;
  std::cout << "Enter number of elements: ";
  std::cin >> size;

  std::vector<int> values(size);
  std::cout << "Enter " << size << " integers:\n";

  for (int i = 0; i < size; ++i) {
    std::cin >> values[i];
  }

  return values;
}

void runSelectedAlgorithm(int choice, std::vector<int>& values) {
  switch (choice) {
    case 1:
      sorting::bubbleSort(values);
      break;
    case 2:
      sorting::selectionSort(values);
      break;
    case 3:
      sorting::insertionSort(values);
      break;
    case 4:
      sorting::mergeSort(values);
      break;
    case 5:
      sorting::quickSort(values);
      break;
    default:
      std::cout << "Invalid choice.\n";
      break;
  }
}

}  // namespace

int main() {
  std::cout << "Sorting Visualizer Algorithms in C++\n";
  std::cout << "1. Bubble Sort\n";
  std::cout << "2. Selection Sort\n";
  std::cout << "3. Insertion Sort\n";
  std::cout << "4. Merge Sort\n";
  std::cout << "5. Quick Sort\n";
  std::cout << "Choose an algorithm: ";

  int choice = 0;
  std::cin >> choice;

  if (!std::cin.good()) {
    std::cerr << "Invalid input.\n";
    return 1;
  }

  std::vector<int> values = readArray();

  runSelectedAlgorithm(choice, values);

  if (choice < 1 || choice > 5) {
    return 1;
  }

  std::cout << "Sorted array:\n";
  printArray(values);

  return 0;
}
