/**
 * 循环链表和单链表相似，节点类型都是一样，唯一的区别是，在创建循环链表的时候，让其头节点的 next 属性执行它本身
 */

function Node(element){
  this.element = element
  this.next = null
}

function LList(){
  this.head = new Node('head')
  this.find = find
  this.findprev = findprev
  this.findLast = findLast
  this.insert = insert
  this.remove = remove

  function find(item) {
    let currentNode = this.head
    while(currentNode.element!=item){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function findprev(item){
    let currentNode = this.head
    while(currentNode.next.element!=item){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function findLast() {
    let currentNode = this.head
    while(currentNode.next.element!=this.head.element){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function insert(newElement,item){
    let newNode = new Node(newElement)
    let currentNode = this.find(item)
    if (currentNode.next==null) {
      currentNode.next = newNode
      newNode.next = this.head
    } else {
      newNode.next = currentNode.next
      currentNode.next = newNode
    }
  }

  function remove(item){
    let prevNode = this.findprev(item)
    let currentNode = this.find(item)
    if (currentNode.next&&currentNode.next.element==this.head.element) {
      prevNode.next = null
      currentNode.next = null
    } else {
      prevNode.next = currentNode.next
      currentNode.next = null
    }
  }
}

module.exports = {LList} 