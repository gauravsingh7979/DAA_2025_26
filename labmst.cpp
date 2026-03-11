class Solution {
public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {
        
        vector<int> final_subarray;
        int n = arr.size();
        
        for(int i = 0; i <= n - k; i++) {
            
          int max = arr[i];
          for( int j = i; j < i+k; j++)
          if(arr[j]> max){
          max = arr[j];
            }
            final_subarray.push_back(max);
        } 
        return final_subarray;
    }       
};
