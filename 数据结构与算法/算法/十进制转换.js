function transform(num,int){
  if(Number.isInteger(num)&&Number.isInteger(int)&&int<=16&&int>1){
    let temp = '0123456789ABCDEF'
    let yu = 0
    let arr = []
    while(num){
      yu = num%int
      num = Math.floor(num/int)
      arr.push(temp[yu])
    }
    return arr.reverse().join('')
  }else{
    console.log('参数有误')
  }
  
}
let r1 = transform(100,16)
console.log(r1)