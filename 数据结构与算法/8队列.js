/**
 * 队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾
 */

function Queue(){
  this._items = []
  this.enqueue = enqueue // 进栈
  this.dequeue = dequeue // 出栈
  this.head = head       // 获取栈头元素
  this.tail = tail       // 获取栈尾元素
  this.size = size       // 获取栈的长度
  this.clear = clear     // 清空栈
  this.isEmpty = isEmpty

  function enqueue(item){
    this._items.push(item)
  }

  function dequeue(){
    return this._items.shift()
  }

  function head(){
    return this._items[0]
  }

  function tail(){
    return this._items[this._items.length-1]
  }

  function size(){
    return this._items.length
  }

  function clear(){
    this._items = []
  }

  function isEmpty(){
    return this._items.length==0
  }
}

let q1 = new Queue()
q1.enqueue('1111')
q1.enqueue('2223')
q1.enqueue('3333')
console.log(q1)
q1.dequeue()
console.log(q1)

module.exports = {Queue}