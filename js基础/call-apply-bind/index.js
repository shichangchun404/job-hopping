// 他们都是定义在Function原型上的方法 通过函数来调用 改变函数内部this指向
//fn.call(ctx,arg1,arg2...) 立即执行
//fn.apply(ctx,[arg1,arg2]) 立即执行
//fn.apply(ctx,arg1,arg2...) 返回一个函数 需要手动执行

// 自定义call方法
Function.prototype.myCall = function (ctx, ...args) {
  var ctx = ctx || window
  ctx.fn = this
  var result = eval("ctx.fn(...args)")
  delete ctx.fn
  return result
}

console.log(Object.prototype.toString.myCall({})) // [object Object]
console.log(Object.prototype.toString.myCall([])) // [object Array]

// 自定义apply方法
Function.prototype.myApply = function (ctx, args) {
  var ctx = ctx || window
  var args = args || []
  ctx.fn = this
  var result = eval("ctx.fn(...args)")
  delete ctx.fn
  return result
}

console.log(Object.prototype.toString.myApply({})) // [object Object]

const mm = {
  name: "mm",
  getName(arg) {
    return this.name + " " + arg
  },
}

const gg = {
  name: "gg",
}
console.log(mm.getName.myCall(gg, 18)) //gg 18
console.log(mm.getName.myApply(gg, [20])) //gg 20

// 自定义bind方法
Function.prototype.myBind = function (ctx, ...args) {
  if (typeof this != "function") {
    throw new Error("this must a function")
  }
  var self = this
  var fn = function () {
    return self.apply(ctx, args.concat(Array.prototype.slice.call(arguments)))
  }
  if (this.prototype) {
    fn.prototype = Object.create(this.prototype)
  }
  return fn
}

console.log(Object.prototype.toString.myBind([])()) // [object Array]
var b = mm.getName.myBind(gg, 40)
console.log(b()) // gg 40
