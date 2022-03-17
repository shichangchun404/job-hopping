// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
// 算法的时间复杂度应该为 O(log (m+n)) 。

// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays1 = function(nums1, nums2) {
  let arr = [...nums1,...nums2]
  arr.sort((m,n)=>{return m-n})
  console.log('arr ', arr)
  let mid = 0
  if(arr.length%2==0){
    mid = (arr[arr.length/2] + arr[arr.length/2 - 1])/2
  } else {
    mid = arr[Math.floor(arr.length/2)]
  }
  return mid
};

var nums1 = [1,2,13],nums2=[2,3,4,5,6]
let mid = findMedianSortedArrays1(nums1, nums2)
console.log(mid)

// =================================================
var findMedianSortedArrays2 = function(nums1, nums2) {
  let moveKey = 0
  let resultArr = []
  if(nums1.length==0){
    resultArr = nums2
  }
  for(let i = 0; i<nums1.length; i++){
    while(moveKey<nums2.length&&nums2[moveKey]<=nums1[i]){
      resultArr.push(nums2[moveKey])
      moveKey++
    } 
    resultArr.push(nums1[i])
    while(moveKey<nums2.length&&nums2[moveKey]>nums1[i]&&i==nums1.length-1){
      resultArr.push(nums2[moveKey])
      moveKey++
    } 
  }
  console.log('resultArr ', resultArr)
  let midIndex = Math.floor(resultArr.length/2)
  let mid = 0
  if(resultArr.length%2==0){
    mid = (resultArr[midIndex -1] + resultArr[midIndex])/2
  }else{
    mid = resultArr[midIndex]
  }
  return mid 
};

var nums1 = [1,2,13,14],nums2=[2,3,4,5,6,30]
let mid = findMedianSortedArrays2(nums1, nums2)
console.log(mid)




