let s = 'abc'

function test(s){
  let n = s.length
  if(n<2){
    return n;
  }
  let max = 0
  let maxs = ''
  for(let i=0;i<n-1;i++){
    for(let j=i+1;j<n;j++){
      if(s.slice(i,j).includes(s.charAt(j))||(j==n-1)){
        let m = j-i
        if(j==n-1&&!s.slice(i,j).includes(s.charAt(j))){
          m++
        }
        if(m>max){
          max=m
          maxs = s.slice(i,j)
          console.log(max,maxs)
        } 
        break
      }
    }
  }
  
  return max
}

let s = 'abc'
function test2(s){
  let set = new Set()
  let max = 0
  let n = s.length
  let rk = 0
  for(let i=0;i<n;++i){
    if(i!=0){
      set.delete(s.charAt(i-1))
    }
    while(rk<n && !set.has(s.charAt(rk))){
      set.add(s.charAt(rk))
      rk++
    }
    max = Math.max(max,rk-i)
  }
  return max
}

console.log(test2(s))


/**
 * 通过双指针循环
 * - map 存放以每个字符开始唯一不重复的最长子串集合 无实际作用 仅仅为方便理解
 * - arr[] 临时存放不重复的字符串 
 * - max 最大长度
 * 实现逻辑
 * - 循环字符串
 * 每次循环开始，将临时存放子串的数组第一个字符剔除
 *  - 1 当移动的指针下标元素在数组中没有 将该字符放进数组 继续移动指针
 *  - 2 当移动指针下标元素出现在数组中 退出移动指针的循环 
 * @param {} s 
 * @returns 
 */
function test2(s){
  let map = {}
  let arr = []
  let len = s.length
  let moveKey = 0
  let max = 0
  for(let i=0;i<len;i++){
    if(i!=0){
      arr.shift()
    }
    while(moveKey<len&&!arr.includes(s[moveKey])){
      arr.push(s[moveKey])
      moveKey++
    }
    max = Math.max(max,moveKey-i)
    map[i]=s.slice(i,moveKey)
  }
  console.log(map)
  return max 
}
let s2 = 'abcafghjfrghc'
console.log(test2(s2))
// { '0': 'abc',
//   '1': 'bcafghj',
//   '2': 'cafghj',
//   '3': 'afghj',
//   '4': 'fghj',
//   '5': 'ghjfr',
//   '6': 'hjfrg',
//   '7': 'jfrghc',
//   '8': 'frghc',
//   '9': 'rghc',
//   '10': 'ghc',
//   '11': 'hc',
//   '12': 'c' }
// 7