// https://leetcode-cn.com/problems/fibonacci-number/
// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
// [0,1,1,2,3,5,8,13,21] 输出4 得到3
/**
 * @param {number} n
 * @return {number}
 */
 var fib = function(n) {
  let cache = []
  cache[0]=0
  cache[1]=1
  function fn(n){ // 递归函数
    if(n<2){
      return cache[n]
    }
    return fn(n-1)+fn(n-2)
  }
  return fn(n)
};

function fib2(n) {
  if(n<2){
    return n
  }
  let pre1 = 0
  let pre2 = 1
  for(let i=2; i<n+1; i++){
    let cur = pre1 + pre2
    pre1 = pre2
    pre2 = cur
  }
  return pre2
};

console.log(fib2(7))