// setTimeout(function(){
//   console.log('111')
//   new Promise((reslove,reject)=>{
//     console.log('aaa')
//     reslove()
//   }).then(function(){
//     console.log('2222')
//   })
// },0)


// setTimeout(function(){
//   console.log('333-50')
//   new Promise((reslove,reject)=>{
//     console.log('bbb-50')
//     reslove()
//   }).then(function(){
//     console.log('4444-50')
//   })
// },5)
// setTimeout(function(){
//   console.log('333-60')
//   new Promise((reslove,reject)=>{
//     console.log('bbb-60')
//     reslove()
//   }).then(function(){
//     console.log('4444-60')
//   })
// },6)

setTimeout(function(){
  console.log('333')
  new Promise((reslove,reject)=>{
    console.log('bbb')
    setTimeout(function(){
      console.log('8888')
    },4)
    reslove()
  }).then(function(){
    console.log('4444')
  }).then(function(){
    console.log('7777')
  })

  new Promise((reslove,reject)=>{
    console.log('bbb-2')
    setTimeout(function(){
      console.log('8888-2')
    },4)
    reslove()
  }).then(function(){
    console.log('4444-2')
  }).then(function(){
    console.log('7777-2')
  })
},0)
setTimeout(function(){
  console.log('ss333')
  new Promise((reslove,reject)=>{
    console.log('ssbbb')
    setTimeout(function(){
      console.log('ss8888')
    },4)
    reslove()
  }).then(function(){
    console.log('ss4444')
  }).then(function(){
    console.log('ss7777')
  })

  new Promise((reslove,reject)=>{
    console.log('ssbbb-2')
    setTimeout(function(){
      console.log('ss8888-2')
    },4)
    reslove()
  }).then(function(){
    console.log('ss4444-2')
  }).then(function(){
    console.log('ss7777-2')
  })
},5)

// new Promise((reslove,reject)=>{
//   console.log('ccc')
//   reslove()
// }).then(function(){
//   console.log('555')
// })

console.log('666')

// 执行结果
// ccc
// 666
// 555
// 111
// aaa
// 2222
// 333
// bbb
// 4444
// 333-50
// bbb-50
// 4444-50
// 333-60
// bbb-60
// 4444-60


// var fn = async ()=>{
//   console.log(1)
//   return 10
// };
// (async function(){
//   let re = await fn()
//   console.log(2,re)
// })();
// console.log(3)

// VM53214:2 1
// VM53214:9 3
// VM53214:7 2 10