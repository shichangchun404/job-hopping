import creatElement from "./creatElement"
import updateChildren from "./updateChildren"

export default function patchVNode(oldVNode,newVNode){
  if(!newVNode.children.length){
    console.log('patchVNode 1 新节点没有children 直接覆盖旧节点')
    if(oldVNode.text!==newVNode.text){
      let oldElement = oldVNode.elm
      oldElement.innerHTML = ''
      oldElement.innerText = newVNode.text
    }
    
  } else if(!oldVNode.children.length){
    console.log("patchVNode 2 新节点有child 老节点没有 直接覆盖旧节点")
    let oldElement = oldVNode.elm
    oldElement.innerHTML = ''
    for(let item of newVNode.children){
      let childElement = creatElement(item)
      oldElement.appendChild(childElement)
    }
  } else {
    console.log("patchVNode 3 新老节点都有children 最复杂的 diff核心算法")
    console.log(oldVNode,newVNode)
    updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
  }
}