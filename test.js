// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

let l1 = [2,4,3], l2 = [5,6,6]

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
