function findPivot(arr, low, high) {
    if (high < low) return -1;
    if (high === low) return low;
    const mid = Math.floor((low + high) / 2);
    if (mid < high && arr[mid] > arr[mid + 1]) {
        return mid;
    }
    if (mid > low && arr[mid] < arr[mid - 1]) {
        return mid - 1;
    }
    if (arr[low] >= arr[mid]) {
        return findPivot(arr, low, mid - 1);
    }
    return findPivot(arr, mid + 1, high);
}
function findMin(nums) {
    let n = nums.length;

    let flag = 0;
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] < nums[i + 1]) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        let pivot = findPivot(nums, 0, n - 1);
        if (pivot == -1) return nums[0];
        return nums[pivot + 1];
    }
    return nums[n - 1];
}

nums = [100];
nums2 = [4, 5, 6, 7, 0, 2];
nums3 = [70, 20, 10, 8, 6];
console.log(findMin(nums));
