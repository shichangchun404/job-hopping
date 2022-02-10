// 一 对象的遍历
var obj = {
  a: '111',
  b: '222',
  c: '333'
}
var proto = {
  d: '444'
}
Object.setPrototypeOf(obj, proto);
console.log('obj >>> ',obj)

/**
 * for in 
 * 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
 */
for(let i in obj){
  console.log(i) // a b c d
}

/**
 * for of 
 * TypeError: obj is not iterable
 */
//  for(let i of obj){
//   console.log(i)
// }


/**
 * Object.keys()
 * 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
 */
Object.keys(obj).forEach(item => {
  console.log(item) // a b c
})

/**
 * Object.values()
 * 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性值
 */
Object.values(obj).forEach(item => {
  console.log(item) // 111 222 333
})

/**
 * Object.getOwnPropertyNames(obj)
 * 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
 */
console.log(Object.getOwnPropertyNames(obj)) // [ 'a', 'b', 'c' ]

/**
 * Object.getOwnPropertySymbols(obj)
 * 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
 */


/**
 * Reflect.ownKeys(obj)
 * 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
 */