class Vue{
  constructor(options){
    this.$options = options
    if(typeof options.beforeCreate === 'function'){
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    this.proxyData()
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
   */
  proxyData(){
    for(let key in this.$data){
      console.log(key)
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
          return this.$data[vmKey]
        })
      }
    });
  }
}