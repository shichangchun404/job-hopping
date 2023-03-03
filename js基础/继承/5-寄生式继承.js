// 寄生式继承
// 使用原型式继承获取目标对象的浅拷贝 然后利用这个浅拷贝的能力进行增强 添加一些方法
// 相比原型式继承 在父类上增加了一些方法

const obj = {
  name: "p",
  list: ["p1", "p2"],
  getName() {
    return this.name
  },
}

function clone(o) {
  const clone = Object.create(o)
  clone.getList = function () {
    return this.list
  }
  return clone
}

const c1 = clone(obj)
const c2 = clone(obj)
c1.list.push("c1")
c2.list.push("c2")
console.log(c1.name)
console.log(c1.getList()) // [ 'p1', 'p2', 'c1', 'c2' ]
console.log(c2.name)
console.log(c2.getList()) // [ 'p1', 'p2', 'c1', 'c2' ]
