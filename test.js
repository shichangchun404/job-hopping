let s = 'abcafghjfrghc'
/**
 * 通过双指针循环
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

console.log(test2(s))