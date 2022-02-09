// 链接：https://leetcode-cn.com/problems/two-sum/
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 暴力
let nums = [3,2,66,777,77,33,4]
let target = 6
function test1(nums,target){
  for(let i=0;i<nums.length-1;i++){
    for(let j=i+1;j<nums.length;j++){
      if(nums[i]+nums[j]==target){
        return [i,j]
      }
    }
  }
}

//console.log(test1(nums,target))

// 哈希法
function test2(nums,target){
  let map = {}
  for(let i=0; i<nums.length;i++){
    if(i==0){
      map[nums[0]]=0
    }else {
      let cha = target - nums[i]
      if(map[cha]==undefined){
        map[nums[i]] = i
      }else {
        return [map[cha],i]
      }
    }
  }
}

console.log(test2(nums,target))
