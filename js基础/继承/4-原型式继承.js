// 原型式继承 缺点 数据存在篡改可能
const obj = {
  name: "p",
  list: ["p1", "p2"],
  getName() {
    return this.name
  },
}

const c1 = Object.create(obj)
const c2 = Object.create(obj)
c1.name = "c1"
c2.name = "c2"
c1.list.push("c1")
c2.list.push("c2")
console.log(c1) // { name: 'c1' }
console.log(c2) // { name: 'c2' }
console.log(c1.list) // [ 'p1', 'p2', 'c1', 'c2' ]
console.log(c2.list) // [ 'p1', 'p2', 'c1', 'c2' ]

// 缺点 数据存在篡改可能
