// 1 原型链继承
// 缺点 存在内存共享
function P1() {
  this.name = "p1"
  this.list = [1, 2]
}
P1.prototype.getName = function () {
  return this.name
}
function C1() {
  this.age = 10
}

C1.prototype = new P1()
const c1 = new C1()
const c2 = new C1()
c1.list.push(3)
console.log(c1) // P1 { age: 10 }
console.log(c1.list) // [ 1, 2, 3 ]
console.log(c2.list) // [ 1, 2, 3 ]
console.log(c1.getName()) // p1
