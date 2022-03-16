import vnode from "./vnode"
import creatElement from "./creatElement"
import patchVNode from "./patchVNode"


export default function(oldVNode,newVNode){
  
  if(!oldVNode.sel){ // 真实节点转成虚拟节点
    oldVNode = vnode([], {}, oldVNode, oldVNode.tagName.toLowerCase(), oldVNode.innerText)
  }

  if(oldVNode.sel===newVNode.sel){ // 1 新老节点名称相同
    patchVNode(oldVNode,newVNode)

  } else { // 2 新老节点名称不同 暴力删除添加
    // 新节点真实dom
    let newElement = creatElement(newVNode)
    // 旧节点真实dom
    let oldElement = oldVNode.elm
    // 插入新节点
    oldElement.parentNode.insertBefore(newElement,oldElement)
    // 删除旧节点
    oldElement.parentNode.removeChild(oldElement)
  }
}