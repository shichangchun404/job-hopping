/**
 * 生成虚拟dom
 * @param {*} sel 
 * @param {*} data 
 * @param {*} parmas 
 */
import vnode from "./vnode";
export default function(sel,data,parmas){
  if(Array.isArray(parmas)){ // 第三个参数是数组
    return vnode(parmas,data,undefined,sel,undefined)
  }else{ // 第三个参数是字符串
    return vnode([],data,undefined,sel,parmas)
  }
}