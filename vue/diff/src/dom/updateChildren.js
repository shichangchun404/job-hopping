import creatElement from "./creatElement"
import patchVNode from "./patchVNode"

export default function updateChildren(parentNode,oldChild,newChild){
  let oldStartIndex = 0                 // 旧前指针
  let newStartIndex = 0                 // 新前指针
  let oldEndIndex = oldChild.length-1   // 旧后指针
  let newEndIndex = newChild.length-1   // 新后指针

  let oldStartVnode = oldChild[oldStartIndex]  // 旧前虚拟节点
  let newStartVnode = newChild[newStartIndex] // 新前虚拟节点
  let oldEndVnode = oldChild[oldEndIndex]      // 旧后虚拟节点
  let newEndVnode = newChild[newEndIndex]      // 新后虚拟节点

  // 通过爽指针比较新旧虚拟节点
  while (oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex) {
    if(oldStartVnode===undefined){
      oldStartVnode = oldChild[++oldStartIndex]
    }else if(oldEndVnode==undefined){
      oldEndVnode = oldChild[--oldEndIndex]
    } else if(sameVnode(oldStartVnode,newStartVnode)){
      console.log('1 旧前与新前匹配')
      patchVNode(oldStartVnode,newStartVnode)
      if(newStartVnode) {
        newStartVnode.elm = oldStartVnode?.elm
      }
      oldStartVnode = oldChild[++oldStartIndex]
      newStartVnode = newChild[++newStartIndex]

    }else if(sameVnode(oldEndVnode,newEndVnode)){
      console.log('2 旧后与新后匹配')
      patchVNode(oldEndVnode,newEndVnode)
      if(newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      oldEndVnode = oldChild[--oldEndIndex]
      newEndVnode = newChild[--newEndIndex]
    }else if(sameVnode(oldStartVnode,newEndVnode)){
      console.log('3 旧前与新后匹配')
      patchVNode(oldStartVnode,newEndVnode)
      if(newEndVnode){
        newEndVnode.elm = oldStartVnode?.elm
      }
      // 将旧前指定的节点移动到旧后指定的后面
      parentNode.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
      oldStartVnode = oldChild[++oldStartIndex]
      newEndVnode = newChild[--newEndIndex]

    }  else if(sameVnode(oldEndVnode,newStartVnode)){
      console.log('4 旧后与新前匹配')
      patchVNode(oldEndVnode,newStartVnode)
      if(newStartVnode){
        newStartVnode.elm = oldEndVnode?.elm
      }
      // 将旧后指定节点移动到旧前指定节点的前面
      parentNode.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
      oldEndVnode = oldChild[--oldEndIndex]
      newStartVnode = newChild[++newStartIndex]

    }else {
      console.log('5 查找')
      // 创建老节点数据对象 依次在新节点中查找是有存在
      let keyMap = {}
      for(let i=oldStartIndex;i<oldEndIndex;i++){
        let key = oldChild[i]?.key
        if(key){
          keyMap[key] = i
        }
      }

      let oldIndex = keyMap[newStartVnode.key]
      if(oldIndex){
        let moveElement = oldChild[oldIndex]
        console.log('5.1 查找新节点 在老节点中存在 准备更新 ', moveElement)
        patchVNode(moveElement,newStartVnode)
        parentNode.insertBefore(moveElement.elm,oldStartVnode.elm)
        oldChild[oldIndex] = undefined

      }else{ // 新节点 在老节点中不存在
        let newElement = creatElement(newStartVnode)
        console.log('5.2 查找新节点 在老节点中不存在 准备增加 ', newElement)
        parentNode.insertBefore(newElement,oldStartVnode.elm)
      }
      newStartVnode = newChild[++newStartIndex]
    }


  }

  // 退出循环后
  // oldStartIndex > oldEndIndex 新节点添加
  // newStartIndex > newEndIndex 旧节点删除
  console.log('oldStartIndex, oldEndIndex ',oldStartIndex,oldEndIndex)
  console.log('newStartIndex, newEndIndex ',newStartIndex,newEndIndex)
  if(oldStartIndex > oldEndIndex){
    console.log('6.1 退出循环 添加旧节点中不存在的新节点')
    let before = newChild[newEndIndex+1]?newChild[newEndIndex+1].elm:null
    for(let i = newStartIndex;i<=newEndIndex;i++){
      let elm = creatElement(newChild[i])
      console.log('新建新节点 ',i, elm)
      parentNode.insertBefore(elm, before)
    }
  }
  if(newStartIndex > newEndIndex){
    console.log('6.2 退出循环 删除新节点中不存在的旧节点')
    for(let i=oldStartIndex;i<=oldEndIndex;i++){
      let elm = oldChild[i].elm
      console.log('删除老节点 ',i, elm)
      parentNode.removeChild(elm)
    }
  }
}

function sameVnode(v1,v2){
  return v1.key === v2.key
}