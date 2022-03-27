// https://leetcode-cn.com/problems/longest-palindromic-substring/

/**
 * 1
 * @param {*} str 
 */

function longestPalindromicSubstring(str){
  let len = str.length
  if(len<2){
    return str
  }
  let max = 0
  let maxStr = ''
  for(let i =1;i<len;i++){
    let leftIndex= i-1, rightIndx=i+1
    while(-1<leftIndex&&rightIndx<len&&str[leftIndex]==str[rightIndx]){
      leftIndex--
      rightIndx++
    }
    max = Math.max(max,rightIndx-leftIndex)
    maxStr = s.slice(leftIndex,rightIndx)
  }
}

let str = 'abcded'