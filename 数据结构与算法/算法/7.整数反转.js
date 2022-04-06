var reverse = function(x) {
  let arr = String(x).split('').reverse()
  console.log(arr)
  while(arr[0]=='0'){
    arr.splice(0,1)
  }
  if(arr[arr.length-1]=='-'){
    arr.unshift('-')
    arr.pop()
  }
  let str = arr.join('')
  let num = Number(str)
  if (Math.abs(num)>Math.pow(2,31)){
    num = 0
  }
  return num
};
let n = 1534236469

console.log(reverse(n))