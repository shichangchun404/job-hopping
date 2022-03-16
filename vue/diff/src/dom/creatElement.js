export default function creatElement(VNode){
  let elememt = document.createElement(VNode.sel)
  elememt.innerText = VNode.text || ''
  if(VNode.children&&VNode.children.length){
    for(let item of VNode.children){
      let child = creatElement(item)
      elememt.appendChild(child)
    }
  }
  // 补充elm属性
  VNode.elm = elememt
  return elememt
}