let s = 'ab'

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
console.log(test(s))