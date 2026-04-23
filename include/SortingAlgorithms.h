#ifndef SORTING_ALGORITHMS_H
#define SORTING_ALGORITHMS_H

#include <vector>

namespace sorting {

void bubbleSort(std::vector<int>& values);
void selectionSort(std::vector<int>& values);
void insertionSort(std::vector<int>& values);
void mergeSort(std::vector<int>& values);
void quickSort(std::vector<int>& values);

}  // namespace sorting

#endif
