setTimeout(function(){
  console.log('111')
  new Promise((reslove,reject)=>{
    reslove()
  }).then(function(){
    console.log('2222')
  })
},0)


setTimeout(function(){
  console.log('333')
  new Promise((reslove,reject)=>{
    reslove()
  }).then(function(){
    console.log('4444')
  })
},0)

new Promise((reslove,reject)=>{
  reslove()
}).then(function(){
  console.log('555')
})

console.log('666')

// 执行结果
// 666
// 555
// 111
// 333
// 2222
// 4444