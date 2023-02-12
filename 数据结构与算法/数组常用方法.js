var arr1 = [1, 2, 3, 4, 5, 6];

// map 返回一个新数组 返回map函数ruturn的集合 不改变原数组
let r1 = arr1.map(function (item) {
  return item + 100;
});
console.log("map", r1); // map [ 101, 102, 103, 104, 105, 106 ]

// filter 返回一个新数组 返回filter函数ruturn为true的项 不改变原数组
let r2 = arr1.filter(function (item, index, array) {
  return item + 100;
});
console.log("filter", r2); // filter [ 1, 2, 3, 4, 5, 6 ]

// forEach 无返回值 不改变原数组
let r3 = arr1.forEach(function (item) {
  return item + 100;
});
console.log("forEach ", r3); // forEach  undefined

// some 返回布尔值 只要有一项满足 返回true
let r4 = arr1.some(function (item) {
  return item == 3;
});
console.log("some ", r4); // some  true

// slice 返回一个新数组 不改变原数组 [startIndex, endIndex)
let r5 = arr1.slice(0, 2);
console.log("slice ", r5); // slice  [ 1, 2 ]

/**
 * reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 *
 */
let r6 = arr1.reduce((total, item) => {
  return (total += item);
}, 100);
console.log("reduce ", r6); // reduce  121

console.log("原数组 ", arr1); // 原数组  [ 6, 5, 4, 3, 2, 1 ]

arr1.find((item) => {
  // find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
  return item > 1;
});

// for-of loop 遍历数组每一项 | 对象不能用该方法 array is not iterable
var array = [{ a: 1 }, { b: 2 }];
for (const item of array) {
  console.log(item);
}
// {a:1} {b:1}

// for-in loop item是每一项的下标 | 遍历对象是是对象的key
for (const index in array) {
  console.log(index);
}
// 0 1

// ========= 改版原数组的方法 ====================
console.log("========= 改版原数组的7个方法 ====================");
var arr2 = [1, 2, 3, 4, 5, 6];

// splice 返回删除的数组
let rs1 = arr2.splice(1, 2, "1111");
console.log(rs1, arr2); //[ 2, 3 ] [ 1, '1111', 4, 5, 6 ]

// push 返回数组长度
let rs2 = arr2.push(123, 234);
console.log(rs2, arr2); // 7 [ 1, '1111', 4, 5, 6, 123, 234 ]

// pop 返回删除项目
let rs3 = arr2.pop();
console.log(rs3, arr2); // 234 [ 1, '1111', 4, 5, 6, 123 ]

// unshift 返回添加后返回数组长度
let rs4 = arr2.unshift("001", "002");
console.log(rs4, arr2); // 8 [ '001', '002', 1, '1111', 4, 5, 6, 123 ]

// shift 返回删除项目
let rs5 = arr2.shift();
console.log(rs5, arr2); // 001 [ '002', 1, '1111', 4, 5, 6, 123 ]

let rs6 = arr2.reverse();
console.log(rs6, arr2); // (7) [123, 6, 5, 4, '1111', 1, '002'] (7) [123, 6, 5, 4, '1111', 1, '002']

let re7 = arr2.sort();
console.log(rs7, arr2); // ['002', 1, '1111', 123, 4, 5, 6] (7) ['002', 1, '1111', 123, 4, 5, 6]
