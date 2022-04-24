console.log(c) // [Function: c]
var c
function c(a,b,c){
  
  console.log(a) // [Function: a]
  console.log(b) // [Function: a]
  console.log(c) // 222
  var a = 3
  var c = 4
  function a(){}
  function b(){}
}
c(2,22,222)

// 变量提升会将当前作用域的所有变量的声明提升到程序作用域的顶部 函数声明式，会将函数的声明和定义一起提升到作用域的最顶上去。
// 作用域：先在内部找，如果内部找不到，向外查找
// 在ES6之前，js是没有块级作用域 只有函数作用域与全局作用域
// 变量提升规则  同名函数声明会覆盖变量申明 参数会覆盖变量申明 同名函数声明会覆盖参数
