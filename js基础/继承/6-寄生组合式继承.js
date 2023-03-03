// 寄生组合式继承 前6种种最优解

function clone(parent, child) {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

function P() {
  this.name = "p"
  this.list = ["p1"]
}
P.prototype.getList = function () {
  return this.list
}

function C() {
  P.call(this)
  this.age = 18
}
clone(P, C)
C.prototype.getAge = function () {
  return this.age
}

const c1 = new C()
const c2 = new C()
c2.age = 20
c1.list.push("c1")
c2.list.push("c2")
console.log(c1) // C { name: 'p', list: [ 'p1', 'c1' ], age: 18 }
console.log(c2) // C { name: 'p', list: [ 'p1', 'c2' ], age: 20 }
console.log(c1.getList())
console.log(c2.getList())
console.log(c1.getAge())
console.log(c2.getAge())
