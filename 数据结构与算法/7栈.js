/**
 * 栈是一种特殊的线性表，仅能在线性表的一端操作，栈顶允许操作，栈底不允许操作。栈的特性：先进后出(后进先出)。
 * 栈的实现有多种 下面使用数组实现 其实只是做了一层封装
 */
function Stack(){
  this.items = []
  this.push = push         // 往栈里压入一个元素
  this.pop = pop           // 往栈里取出一个元素
  this.top = top           // 返回栈顶元素
  this.isEmpty = isEmpty   // 返回栈是否为空
  this.size = size         // 返回栈的大小
  this.clear = clear       // 清空栈

  function push(item){
    this.items.push(item)
  }

  function pop(){
    return this.items.pop()
  }

  function top(){
    return this.items[this.items.length-1]
  }

  function isEmpty(){
    return this.items.length==0
  }

  function size(){
    return this.items.length
  }

  function clear(){
    this.items = []
  }
}

// 栈的应用 给一段字符串，判断里面的括号是否是成对出现

var str1 = '()ss()ss(sss(ss)(ss)ss) 合法'
var str2 = '()ss()ss(sss(ss)(ss)ss)) 不合法'

function isOk(str){
  let stack = new Stack()
  for(let i=0;i<str.length;i++){
    if (str[i]==='(') {
      stack.push('(')
    } else if (str[i]===')'){
      if (stack.isEmpty()) {
        return false
      } else {
        stack.pop()
      }
    }
  }
  return stack.size()==0
}
//console.log(isOk(str1))
//console.log(isOk(str2))

// 应用场景2 十进制转任意进制(最大十六进制)
/**
 * 分析: 进制转换的本质：将目标值一次一次除以进制基数，得到的取整值为新目标值，记录下余数，
 * 直到目标值小于0，最后将余数逆序组合即可。利用栈，记录余数入栈，组合时出栈
 */

function transform(num,int){
  if(!Number.isInteger(num)||!Number.isInteger(int)||int>16||int<1){
    return '参数不合法'
  }
  let val = '0123456789ABCDEF'
  let stack = new Stack()
  let yu = 0;
  while(num){
    yu = num%int
    num = Math.floor(num/int) // 向下取整
    stack.push(val[yu])
  }
  console.log(stack)
  let arr = []
  while(!stack.isEmpty()){
    arr.push(stack.pop())
  }
  return arr.join('')
}

//console.log(transform(100345,16))

// 场景3 逆波兰表达式计算
/**
 * 逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式，例如(a+b)*(c+d)转换为a b + c d + *
 * ["4", "13", "5", "/", "+"] ==> (4 + (13 / 5)) = 6
 * 分析：以符号为触发节点，一旦遇到符号，就将符号前两个元素按照该符号运算，并将新的结果入栈，直到栈内仅一个元素
 */

let p1 = ["4", "13", "5", "/", "+"]

function isOperator(str) {
  return ['+','-','*','/'].includes(str)
}
function getExpResult(arr){
  let stack = new Stack()
  for (let str of arr) {
    if (isOperator(str)) {
      let num1 = stack.pop()
      let num2 = stack.pop()
      let result = eval(`${num2}${str}${num1}`)
      stack.push(result)
    } else {
      stack.push(str)
    }
  }
  return stack.top()
}
console.log(getExpResult(p1))

module.exports = {Stack} 