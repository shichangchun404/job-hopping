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
  let maxStr = str[0]
  for(let i=0;i<len;i++){
    let str1 = findStr(i-1,i+1)
    let str2 = findStr(i,i+1)
    let currMax = str1.length>=str2.length?str1:str2
    maxStr = maxStr.length>=currMax.length?maxStr:currMax
  }
  console.log('maxStr ', maxStr)
  return maxStr
  function findStr(left,right){
    let maxstr = ''
    while(left>-1&&right<len&&str[left]==str[right]){
      maxstr = str.slice(left,right+1)
      left--
      right++
    }
    return maxstr
  }
}

let str = 'bb'

longestPalindromicSubstring(str)