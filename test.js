var arr1 = [1,2,3,4,5,6,];

// map 返回一个新数组 返回map函数ruturn的集合 不改变原数组
let r1 = arr1.map(function(item){
  return item+100
})
console.log('map',r1) // map [ 101, 102, 103, 104, 105, 106 ]

// filter 返回一个新数组 返回filter函数ruturn为true的项 不改变原数组
let r2 = arr1.filter(function(item,index,array){
  return item+100
})
console.log('filter',r2) // filter [ 1, 2, 3, 4, 5, 6 ]

// forEach 无返回值 不改变原数组
let r3 = arr1.forEach(function(item){
  return item+100
})
console.log('forEach ',r3) // forEach  undefined

// some 返回布尔值 只要有一项满足 返回true
let r4 = arr1.some(function(item){
  return item==3
})
console.log('some ',r4) // some  true

// slice 返回一个新数组 不改变原数组
let r5 = arr1.slice(0,2) 
console.log('slice ',r5) // slice  [ 1, 2 ]

/**
 * reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * 
 */
let r6 = arr1.reduce((total,item)=>{
  return total +=item
},100)
console.log('reduce ',r6) // reduce  121

console.log('原数组 ', arr1)

// ========= 改版原数组的方法 ====================
console.log('========= 改版原数组的方法 ====================')
var arr2 = [1,2,3,4,5,6,];

// splice 返回删除的数组
let rs1 = arr2.splice(1,2,'1111')
console.log(rs1,arr2)  //[ 2, 3 ] [ 1, '1111', 4, 5, 6 ]

// push 返回数组长度
let rs2 = arr2.push(123,234)
console.log(rs2,arr2)  // 7 [ 1, '1111', 4, 5, 6, 123, 234 ]

// pop 返回删除项目
let rs3 = arr2.pop()
console.log(rs3,arr2) // 234 [ 1, '1111', 4, 5, 6, 123 ]

// unshift 返回添加后返回数组长度
let rs4 = arr2.unshift('001','002')
console.log(rs4,arr2) // 8 [ '001', '002', 1, '1111', 4, 5, 6, 123 ]

// shift 返回删除项目
let rs5 = arr2.shift()
console.log(rs5,arr2) // 001 [ '002', 1, '1111', 4, 5, 6, 123 ]

