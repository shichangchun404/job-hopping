import h from './dom/h'
import petch from './dom/petch'

let app = document.getElementById("app")
let btn = document.getElementById('btn')

let vnode1 = h('div',{key:1},'hi shicc')
let vnode2 = h('p',{key:1},'hi shicc')

let vnode3 = h('ul',{key:1},[
  h('li',{key:'b'},'b'),
  h('li',{key:'a'},'a'),
  h('li',{key:'c'},'c'),
])

let v4 = h('ul',{key:1},[
  h('li',{key:'a'},'a'),
  h('li',{key:'b'},'b'),
  h('li',{key:'c'},'c'),
  h('li',{key:'d'},'d'),
  h('li',{key:'d2'},'d2'),
])
let v5 = h('ul',{key:1},[
  h('li',{key:'a'},[
    h('span',{key:'s1'},'a1'),
    h('span',{key:'s2'},'a2'),
  ]),
  h('li',{key:'b'},'bbb'),
  h('li',{key:'c'},'ccc'),
  h('li',{key:'d'},'ddd'),
  h('li',{key:'e'},'eee'),
  h('li',{key:'f'},'fff'),
])

console.log(v4)
petch(app,v4) // 让v4替换app 生成其elm
btn.addEventListener('click',function(){
  petch(v4,v5)
})

