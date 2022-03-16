// 链接：https://leetcode-cn.com/problems/add-two-numbers
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

let l1 = [2,4,3]
let l2 = [5,6,4]
// function sum(l1){
//   let sum = 0
//   for(let i=0;i<l1.length;i++){
//     let base = 1
//     for (let j=0;j<i;j++){
//       base = base * 10
//     }
//     sum += l1[i] * base
//   }
//   return sum
// }

//console.log(sum(l1))

var twoSum = function(l1,l2){
  let total = sum(l1) + sum(l2)
  let arr = String(total).split('')
  return arr.reverse()
  function sum(l1){
    let sum = 0
    for(let i=0;i<l1.length;i++){
      let base = 1
      for (let j=0;j<i;j++){
        base = base * 10
      }
      sum += l1[i] * base
    }
    return sum
  }
}

// console.log(twoSum(l1,l2))

var addTwoNumbers = function(l1, l2) {
  var sum = function(l1){
  let sum = 0
  for(let i=0;i<l1.length;i++){
    let base = 1
    for (let j=0;j<i;j++){
      base = base * 10
    }
    sum += l1[i] * base
  }
    return sum
  }
  let total = sum(l1) + sum(l2)
  let arr = String(total).split('')
  return arr.reverse()

};

console.log(addTwoNumbers(l1,l2))

function add2(l1,l2){
  let n1 = l1.reverse().join('')
  let n2 = l2.reverse().join('')
  let n3 = Number(n1)+Number(n2)
  let strArr = String(n3).split('').reverse()
  let numArr = strArr.map(item => Number(item))
  return numArr

}
console.log(add([2,4,3],[5,6,4]))

/**
 * 应用Array.reduce()  Math.pow(10,2)
 * @returns 
 */
 function add21(l1,l2){
  function sum(l){
    let totle = l.reduce(function(totle,current,index,arr){
       totle += current*Math.pow(10,index)
       return totle
    },0)
    console.log(totle)
    return totle
  }
  let s = sum(l1)+sum(l2)
  console.log(s)
  return String(s).split('').reverse().map(item => Number(item))

}
console.log(add21([6,4,3],[5,6,6]))