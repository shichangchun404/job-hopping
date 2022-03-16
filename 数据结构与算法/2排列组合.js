let str = 'abc'
let temp = []
//期待 ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

function fun (arr1,arr2) {
  console.log("arr1 arr2", arr1,arr2)
  for (let i=0; i<arr1.length; i++) {
    let copyA = JSON.parse(JSON.stringify(arr1))
    let copyB = JSON.parse(JSON.stringify(arr2))
    copyB.push(copyA[i])
    copyA.splice(i,1)
    console.log("arr1.length", copyA.length)
    if (copyA.length) {
      fun(copyA,copyB)
    } else {
      temp.push(copyB.join(''))
    }
  }
}

let arr = str.split('')
// fun(arr,[])
// console.log(temp)

let nums = [0,1,2,3,4,5,6,7,8,9,10]
let target = 10
let temp2 = []
function fun2(nums,target) {
  for(let i=0;i<nums.length;i++) {
    let leftNums = nums.slice(i+1)
    for(let j=0;j<leftNums.length;j++) {
      if (nums[i]+leftNums[j]==target) {
        temp2.push([nums[i],leftNums[j]])
        break
      }
    }
  }
}
fun2(nums,target)
console.log('temp2 = ',temp2)



