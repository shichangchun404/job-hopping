class Vue{
  constructor(options){
    this.$options = options
    this.$watchEvent = {} // 数据更新的watcher集合
    if(typeof options.beforeCreate === 'function'){
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    this.proxyData()
    this.observe()
    if(typeof options.created === 'function'){
      options.created.bind(this)()
    }
    if(typeof options.beforeMount === 'function'){
      options.beforeMount.bind(this)()
    }
    this.$el = document.querySelector(options.el)
    this.compile(this.$el)
    if(typeof options.mounted === 'function'){
      options.mounted.bind(this)()
    }
  }

  /**
   * 代理劫持数据
   * 将$data的数据绑定到this上
   */
  proxyData(){
    for(let key in this.$data){
      Object.defineProperty(this,key,{
        get(){
          return this.$data[key]
        },
        set(value){
          this.$data[key] = value
        }
      })
    }
  }

  /**
   * 触发data中数据变化 执行watcher中的update 更新视图
   */
  observe(){
    for(let key in this.$data){
      console.log(key)
      let value = this.$data[key]
      let _this = this
      Object.defineProperty(this.$data,key,{
        get(){
          // this >>> this.$data
          return value
        },
        set(val){
          // _this.$data[key] = val // 有问题
          value = val // ???
          if(_this.$watchEvent[key]){
            _this.$watchEvent[key].forEach(item=>{
              item.update()
            })
          }
        }
      })
    }
  }

  /**
   * 编译模版
   * @param {*} node 
   */
  compile(node){
    node.childNodes.forEach(item => {
      if(item.nodeType===1){ // node节点 递归调用compile
        this.compile(item)
        if(item.hasAttribute('@click')){
          // console.log('click = ', item.getAttribute('@click'))
          let vmKey = item.getAttribute('@click').trim()
          if(this.$options.methods&&this.$options.methods[vmKey]){
            item.addEventListener('click',(event)=>{
              this.$options.methods[vmKey].bind(this)(event)
            })
          }else{
            console.warn(`没有注册 ${vmKey} methods`)
          }
        }

      } else if(item.nodeType===3){ // 文本节点
        // 正则pipei{{}}
        let reg = /\{\{(.*?)\}\}/g
        item.textContent = item.textContent.replace(reg,(match,vmKey)=>{
          // console.log(match,vmKey)
          vmKey = vmKey.trim()
          if(this.hasOwnProperty(vmKey)){
            let watcher = new Watch(this,vmKey,item,'textContent')
            if(this.$watchEvent[vmKey]){
              this.$watchEvent[vmKey].push(watcher)
            }else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watcher)
            }
            return this.$data[vmKey]
          }else{
            console.warn(`${vmKey} 未在data中定义`)
          }
          
        })
      }
    });
  }

}

/**
 * 数据watch对象
 * 通过update更新试图
 */
class Watch {
  constructor(vm,key,node,attr){
    this.vm = vm
    this.key = key
    this.node = node
    this.attr = attr
  }
  update(){
    this.node[this.attr] = this.vm[this.key]
  }
}