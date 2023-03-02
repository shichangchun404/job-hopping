// 构造函数 + call
// 缺点 子类无法继承父类prototype上的方法与属性
function P2() {
  this.name = "p1"
}

P2.prototype.getName = function () {
  return this.name
}
P2.prototype.city = "bj"

function C2() {
  P2.call(this)
  this.age = 18
}

const c21 = new C2()
console.log(c21) // C2 { name: 'p1', age: 18 }
console.log(c21.getName()) // TypeError: c21.getName is not a function
