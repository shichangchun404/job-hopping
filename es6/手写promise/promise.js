function Promise(execute){
  this.PromiseState = 'pending'
  this.PromiseResult = undefined
  // this.callback = {}
  this.callbacks = []
  /**
   * 此处注意使用箭头函数 resolve调用时的this指向Promise
   */
  let resolve = (data)=>{
    if(this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = data
    // this.callback.onReject(data)
    this.callbacks.forEach(item=>{
      item.onResolve(data)
    })
  }
  let reject = (data)=>{
    if(this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = data
    // this.callback.onReject(data)
    this.callbacks.forEach(item=>{
      item.onReject(data)
    })
  }
  try {
    execute(resolve,reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function(onResolve,onReject){
  // 7 针对then的参数进行兼容处理 处理成函数
  if(typeof onResolve !== 'function'){
    onResolve = value => value
  }
  if(typeof onReject !== 'function'){
    onReject = value => {
      throw value
    }
  }
  
  /**
   * 4 then返回值 新的的Promise 新的新的新的！
   * 回调函数的结果的返回值 分Promise 非Promise 异常
   */
  return new Promise((resolve,reject)=>{
    let commFun = (onR)=>{
      try {
        let result = onR(this.PromiseResult)
        if (result instanceof Promise){
          result.then(v=>{
            resolve(v)
          },e=>{
            reject(e)
          })
        }else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // 1 同步 直接执行
    if(this.PromiseState==='fulfilled'){
      // onResolve(this.PromiseResult)
      commFun(onResolve)
      
    }
    if(this.PromiseState==='rejected'){
      // onReject(this.PromiseResult)
      commFun(onReject)
    }

    // 2 异步 将then回调函数存在Promise中 等待执行resolve/reject后执行
    if(this.PromiseState==='pending'){
      // this.callback = { // p.then多次调用需要处理成数组形式
      //   onReject,
      //   onReject
      // }
      // this.callbacks.push({
      //   onResolve,
      //   onReject
      // })
      this.callbacks.push({
        onResolve:function(){
          commFun(onResolve)
        },
        onReject:function(){
          commFun(onReject)
        }
      })
    }
  })
  
}

Promise.prototype.catch = function(onCatch){
  // 6 交给then的第二个函数onReject处理 
  return this.then(undefined,onCatch)
}
