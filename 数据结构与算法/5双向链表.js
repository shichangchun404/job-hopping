function Node(element){
  this.element = element // 当前元素
  this.next = null       // 下个元素链接
  this.previous = null   // 上个元素链接
}

function LList(){
  this.head = new Node('head')
  this.find = find 
  this.findLast = findLast 
  this.insert = insert 
  this.remove = remove 
  this.display = display 
  this.dispReverse = dispReverse
  
  function find(item){
    let currentNode = this.head
    while(currentNode.element!=item){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function findLast(){
    let currentNode = this.head
    while(currentNode.next!=null){
      currentNode = currentNode.next
    }
    return currentNode
  }

  function insert(newElement,item){
    let newNode = new Node(newElement)
    let currentNode = this.find(item)
    newNode.next = currentNode.next
    newNode.previous = currentNode
    currentNode.next = newNode
  }

  function remove(item){
    let currentNode = this.find(item)
    if (currentNode.next!=null) {
      currentNode.next.previous = currentNode.previous
      currentNode.previous.next = currentNode.next
      currentNode.next = null
      currentNode.previous = null
    } else {
      currentNode.previous.next = null
      currentNode.next = null
      currentNode.previous = null
    }
  }

  function display () {
    var currNode = this.head;
    while ( !(currNode.next == null) ){
        console.log( currNode.next.element );
        currNode = currNode.next;
    }
  }

  function dispReverse(){
    let currentNode = this.findLast()
    while(currentNode.previous!=null){
      console.log(currentNode.element)
      currentNode = currentNode.previous
    }
  }

}

var fruits = new LList();
fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.insert('Grape' , 'Pear');

fruits.display()  
fruits.remove('Grape')
console.log('---------------')
fruits.display()  

module.exports = {LList} 
