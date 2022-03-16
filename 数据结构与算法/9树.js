const {Queue} = require('./8队列')
/**
 * 树跟节点可以用两个单独的构造器来描述：Node和Tree。
 */
function Node(data){
  this.data = data     // data存储一个值
  this.parent = null   // parent指向这个节点的父节点
  this.children = []   // children指向表中的下一个节点 （这个可能有一堆，那么可能是一个数组）
}

function Tree(data) {
  let node = new Node(data)
  this._root = node
}

// 树的方法1 深度优先遍历 traverseDF(callback) 
Tree.prototype.traverseDF = function(callback){
  (function recurse(node){
    for (let i=0; i<node.children.length;i++) {
      recurse(node.children[i])
    }
    callback(node)
  })(this._root)
}

// 树的方法2 宽度优先遍历 traverseBF(callback)
Tree.prototype.traverseBF = function(callback){
  let queue = new Queue()
  queue.enqueue(this._root)
  while(!queue.isEmpty()){
    for(let item of queue.head().children){
      queue.enqueue(item)
    }
    callback(queue.dequeue())
  }
}

var tree = new Tree('0')
tree._root.children.push(new Node('1'))
tree._root.children[0].parent = tree
tree._root.children.push(new Node('2'))
tree._root.children[1].parent = tree
tree._root.children.push(new Node('3'))
tree._root.children[2].parent = tree

tree._root.children[0].children.push(new Node('11'))
tree._root.children[0].children[0].parent = tree._root.children[0]
tree._root.children[0].children.push(new Node('12'))
tree._root.children[0].children[1].parent = tree._root.children[0]
tree._root.children[0].children.push(new Node('13'))
tree._root.children[0].children[2].parent = tree._root.children[0]

tree._root.children[1].children.push(new Node('21'))
tree._root.children[1].children[0].parent = tree._root.children[1]
tree._root.children[1].children.push(new Node('22'))
tree._root.children[1].children[1].parent = tree._root.children[1]
 
tree._root.children[2].children.push(new Node('31'))
tree._root.children[2].children[0].parent = tree._root.children[2]
tree._root.children[2].children.push(new Node('32'))
tree._root.children[2].children[1].parent = tree._root.children[2]

tree.traverseDF(function(node){
  console.log('traverseDF ',node.data)
})

tree.traverseBF(function(node){
  console.log('traverseBF ', node.data)
})

module.exports = {Tree}