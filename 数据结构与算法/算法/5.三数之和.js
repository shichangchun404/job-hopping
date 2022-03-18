// https://leetcode-cn.com/problems/3sum/
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
/**
 * 1 排序
 * 2 三指针 i start end 循环0 到 length-2 nums[i]与上一个相同 跳过
 * nums[i]+num[start]+nums[end]==0 start++ end-- 
 *  - 去重 分别判断 start end 与上一个数是否相同 是直接跳过
 * nums[i]+nums[start]+nums[end]<0 start++ 
 * nums[i]+nums[start]+nums[end]>0 end--
 */

 function sum3(nums){
  nums.sort((a,b)=> {return a-b})
  console.log('===== nums ', nums)
  let len = nums.length
  let result = []
  for(let i=0;i<len-2;i++){
    let start = i +1 ,end = len-1
    while((i==0||(nums[i]!=nums[i-1])) && start<end){
      if(nums[i]+nums[start]+nums[end]==0){
        console.log(nums[i],nums[start],nums[end])
        result.push([nums[i],nums[start],nums[end]])
        start++
        end--
        while(nums[start]==nums[start-1]){
          start++
        }
        while(nums[end]==nums[end+1]){
          end--
        }
      }else if(nums[i]+nums[start]+nums[end]<0){
        start++
      }else{
        end--
      }
    }
  }
  return result
}
let nums = [-1,0,1,2,-1,-4]
console.log(sum3(nums))