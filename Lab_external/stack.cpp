#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* top = NULL;

// isEmpty
bool isEmpty() {
    return top == NULL;
}

// push
void push(int x) {
    top = new Node{x, top};
}

// pop
void pop() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }
    Node* temp = top;
    top = top->next;
    delete temp;
}

// peek
int peek() {
    if (isEmpty()) return -1;
    return top->data;
}

// display
void display() {
    for (Node* t = top; t; t = t->next)
        cout << t->data << " ";
    cout << endl;
}

int main() {
    push(10); push(20); push(30);
    display();        // 30 20 10

    cout << peek() << endl; // 30

    pop();
    display();        // 20 10

    cout << isEmpty(); // 0 (false)
}