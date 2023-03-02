// 组合继承
function P() {
  this.name = "p"
  this.list = [1, 2]
}
P.prototype.getName = function () {
  return this.name
}

function C() {
  P.call(this)
  this.age = 18
}

C.prototype = new P()
C.prototype.constructor = C

const c1 = new C()
const c2 = new C()
c1.list.push(3)
console.log(c1) // C { name: 'p', list: [ 1, 2, 3 ], age: 18 }
console.log(c2) // C { name: 'p', list: [ 1, 2 ], age: 18 }
console.log(c1.getName()) // p
