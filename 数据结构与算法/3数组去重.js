let arr = [1,2,3,4,5,5,5,6]
let arr2 = ['11','11','aa','a','bb',11,12]

let set = new Set(arr)
console.log(set)

let set2 = new Set(arr2)
console.log(set2)

var a3 = [1,2,3,4,5,6,3,1];
var a4 = a3.filter(function(item,i,arr){
  console.log(item,i,arr)  
  return arr.indexOf(item) == i;
});
console.log('a4 ',a4)

// 找出重复的次数
var arrString = 'abcdaabc';
arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})