// https://leetcode-cn.com/problems/longest-palindromic-substring/

/**
 * 1
 * @param {*} str 
 */

function test1(str){
  let len = str.length
  if(len<2){
    return str
  }
  let maxStr = str[0]
  for(let i=0;i<len;i++){
    let str1 = findStr(i-1,i+1)
    let str2 = findStr(i,i+1)
    let currMax = str1.length>=str2.length?str1:str2
    maxStr = maxStr.length>=currMax.length?maxStr:currMax
  }
  return maxStr
  function findStr(left,right){
    let maxstr = ''
    while(left>-1&&right<len&&str[left]==str[right]){
      maxstr = str.slice(left,right+1) // 此处值得优化
      left--
      right++
    }
    return maxstr
  }
}

var test2 = function(str) {
  let len = str.length
  if(len<2){
    return str
  }
  left=0
  maxLen=1
  for(let i=0;i<len;i++){
    let str1 = findStr(i-1,i+1)
    let str2 = findStr(i,i+1)
    if(str1[1]>str2[1]){
      if(str1[1]>maxLen){
        left = str1[0]
        maxLen = str1[1]
      }
    } else {
      if(str2[1]>maxLen){
        left = str2[0]
        maxLen = str2[1]
      }
    }
  }
  return str.slice(left,left+maxLen)
  function findStr(left,right){
    let cLen = 0
    let cLeft = 0
    while(left>-1&&right<len&&str[left]==str[right]){
      cLen = right - left + 1
      cLeft = left
      left--
      right++
    }
    return [cLeft,cLen]
  }
};

let str = 'cbbd'

console.log(test2(str))