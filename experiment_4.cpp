#include <iostream>
using namespace std;

class MaxHeap {
    int arr[100];
    int size;

public:
    MaxHeap() {
        size = 0;
    }

    void insert(int value) {
        size++;
        int index = size;
        arr[index] = value;

        while (index > 1) {
            int parent = index / 2;
            if (arr[parent] < arr[index]) {
                swap(arr[parent], arr[index]);
                index = parent;
            } else {
                return;
            }
        }
    }

    void deleteFromHeap() {
        if (size == 0) {
            cout << "Heap is empty\n";
            return;
        }

        arr[1] = arr[size];
        size--;
        int index = 1;
        while (index <= size) {
            int left = 2 * index;
            int right = 2 * index + 1;
            int largest = index;

            if (left <= size && arr[left] > arr[largest])
                largest = left;

            if (right <= size && arr[right] > arr[largest])
                largest = right;

            if (largest != index) {
                swap(arr[index], arr[largest]);
                index = largest;
            } else {
                break;
            }
        }
    }

    void printHeap() {
        for (int i = 1; i <= size; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    int getSize() {
        return size;
    }

    int getElement(int i) {
        return arr[i];
    }
};
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {

    MaxHeap h;
    h.insert(50);
    h.insert(55);
    h.insert(53);
    h.insert(52);
    h.insert(54);

    cout << "Heap after insertion:\n";
    h.printHeap();

    h.deleteFromHeap();
    cout << "Heap after deletion:\n";
    h.printHeap();

    int arr[] = {10, 20, 15, 30, 40};
    int n = 5;

    heapSort(arr, n);

    cout << "Sorted array using Heap Sort:\n";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";

    return 0;
}
