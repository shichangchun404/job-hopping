### this指向问题
https://zhuanlan.zhihu.com/p/23804247
==============================
# 普通函数：函数被调用时（即运行时）才会确定该函数内this的指向 即谁调用指向谁
var a = 1
var test = function() {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test() // 2

let t = obj.test
t() // 1
============================ 
### 箭头函数：函数定义的时候就已经确定 有人说「箭头函数里面的 this 指向箭头函数外面的 this」，这很傻，因为箭头函数内外 this 就是同一个东西，并不存在什么指向不指向。
var a = 1
var test = () => {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test() // 1
============================================
# this指向直接调用对象
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var obj0 = {
    a: 3,
    obj 
}
obj0.obj.test() // 2
=============================
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy() // 1 
=============================
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
setTimeout(obj.test) // 1

function setTimeout (fn, time) {
  // 这里干了一大波不可描述的事情，最后会去调一下你传进来的回调函数
  fn()
}
=================================
# 我们通过call（apply跟call的区别只是传参，作用是一样的，bind有点区别，bind能让我们的函数延迟执行，apply与call调用就执行，所以bind这样的形式我们也称为函数柯里化，这些就不是我们这里要说的啦）来调用testCopy，并且传入了你想要this指向的上下文，那么this就会乖乖按照你的指示行事啦。
var a = 1
function test () {
  console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy.call(obj)

func(p1, p2) 等价于
func.call(undefined, p1, p2)

obj.child.method(p1, p2) 等价于
obj.child.method.call(obj.child, p1, p2)
====================================
# new这个操作符其实是new了一个新对象出来，而被new的test我们称为构造函数，我们可以在这个构造函数里定义一下将要到来的新对象的一些属性。那么在构造函数里，我们怎样去描述这个还未出生的新对象呢？没错，就是用this。所以构造函数里的this指的就是将要被new出来的新对象。
var a = 1
function test (a) {
    this.a = a
}
var b = new test(2)
console.log(b.a)
=====================================
function fn (){ console.log(this) }
var arr = [fn]
arr[0]() // [f]
=====================================
let length = 1
function fn(){
    console.log(this.length)
}
const obj = {
    length: 100,
    fn: function(callback){
        callback()
        arguments[0]()
    }
}
let arr = [1,2,3,4]
obj.fn(fn,...arr) // 1 5
