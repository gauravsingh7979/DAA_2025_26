#include <iostream>
#include <unordered_map>
using namespace std;

int main() {

    int N;
    cin >> N;

    char attendance[N];
    for (int i = 0; i < N; i++) {
        cin >> attendance[i];
    }

    unordered_map<int, int> mp;

    int prefixSum = 0;
    int maxLength = 0;

    mp[0] = -1;

    for (int i = 0; i < N; i++) {

        if (attendance[i] == 'P')
            prefixSum += 1;
        else
            prefixSum -= 1;

        if (mp.find(prefixSum) != mp.end()) {

            int length = i - mp[prefixSum];
            if (length > maxLength)
                maxLength = length;
        }
        else {
            
            mp[prefixSum] = i;
        }
    }

    cout << maxLength << endl;

    return 0;
}
//Linear (Iterative) Relation = T(n) = T(n−1) + O(1)
// Time complexity: O(N)
