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