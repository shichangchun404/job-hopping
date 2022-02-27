class Promise {
  constructor(execute){
    this.PromiseState = 'pending'
    this.PromiseResult = undefined
    this.callbacks = []
    let resolve = (data)=>{
      if(this.PromiseState !== 'pending') return
      this.PromiseState = 'fulfilled'
      this.PromiseResult = data
      this.callbacks.forEach(item=>{
        item.onResolve(data)
      })
    }
    let reject = (data)=>{
      if(this.PromiseState !== 'pending') return
      this.PromiseState = 'rejected'
      this.PromiseResult = data
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
  then(onResolve,onReject){
    if(typeof onResolve !== 'function'){
      onResolve = value => value
    }
    if(typeof onReject !== 'function'){
      onReject = value => {
        throw value
      }
    }
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
  catch(onCatch){
    return this.then(undefined,onCatch)
  }
  static all(arr){
    return new Promise((resolve,reject)=>{
      let result = []
      arr.forEach((p,i)=>{
        p.then(v=>{
          result[i]=v 
          if(result.length===arr.length){
            resolve(result)
          }
        },e=>{
          reject(e)
        })
      })
    })
  }
}