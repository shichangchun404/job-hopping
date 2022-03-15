/**
 * 链表是一组节点（Node）组成的集合，每个节点都使用一个对象的引用来指向它的后一个节点。指向另一节点的引用讲做链。
 * Node类包含连个属性： element 用来保存节点上的数据，next 用来保存指向下一个节点的链接，具体实现如下：
 */
function Node(element) {
  this.element = element //当前节点元素
  this.next = null // 下一节点链接
}

/**
 * LinkedList类提供了对链表进行操作的方法，包括插入删除节点，查找给定的值等。
 * 值得注意的是，它只有一个属性，那就是使用一个 Node 对象来保存该链表的头节点。
 */
function LList(){
  this.head = new Node('head') //头节点
  this.find = find             //查找节点
  this.findPrev = findPrev     //查找前一个节点
  this.insert = insert         //插入节点
  this.remove = remove         //删除节点
  this.display = display       //显示链表

  function find(item) {
    let currentNode = this.head
    while(currentNode.element!=item){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function findPrev(item){
    let currentNode = this.head
    while(!(currentNode.next&&currentNode.next.element==item)){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function insert(newElement,item){
    let newNode = new Node(newElement)
    let currentNode = this.find(item)
    newNode.next = currentNode.next
    currentNode.next = newNode
  }

  function remove(item){
    let prevNode = this.findPrev(item)
    if(prevNode.next){
      prevNode.next = prevNode.next.next
    }else{
      prevNode.next = null
    }
  }

  function display(){
    let currentNode = this.head
    while(currentNode){
      console.log('element: ',currentNode.next.element)
      currentNode = currentNode.next
    }
  }
}

let fruits = new LList()
fruits.insert('1Apple' , 'head');
fruits.insert('2Banana' , '1Apple');
fruits.insert('3Pear' , '2Banana');
fruits.insert('4Grape' , '3Pear');
fruits.insert('5' , '4Grape');
fruits.insert('6' , '5');
fruits.insert('7' , '6');
fruits.display()

// 找出倒数第k个元素
function findK(linkList,k){
  if (!linkList||!linkList.head||!k){
    return '参数有误'
  }
  let currentNode = linkList.head
  let arr = []
  while(currentNode.next){
    arr.unshift(currentNode.next.element)
    currentNode = currentNode.next
  }
  console.log('arr ',arr)
  return arr[k-1]
}
console.log(findK(fruits,3))

module.exports = {LList} 