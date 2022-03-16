class Vue{
  constructor(options){
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    console.log(this.$el,this.$data)
    this.compile(this.$el)
  }

  compile(node){
    console.log('compile node.childNodes', node.childNodes)
    node.childNodes.forEach(item => {
      if(item.nodeType===1){ // node节点 递归调用compile
        this.compile(item)
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