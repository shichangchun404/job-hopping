export default function vnode(children,data,elm,sel,text){
  return {
    children,
    data,
    elm,
    key:data.key,
    sel,
    text
  }
}