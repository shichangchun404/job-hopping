 const fs = require('fs')
 const path = require('path')
 const { getAst, getDeps, getCodeFromAst} = require('./parser')
 
 class Compiler{
    constructor(options={}){
      // webpack配置
      this.options = options
      // 所有依赖集合 数组形式
      this.modules = []
      // 所有集合depsGrap
      this.depsGrap = {}
    }
    // 启动webpack打包
    run(){
      // 1 获取入口文件
      let filePath = this.options.entry
      let fileInfo = this.build(filePath)
      this.modules.push(fileInfo)

      // this.modules.forEach(fileInfo => { // 不能用forEach this.modules.push后无法触发递归更新 
      for(let i=0;i<this.modules.length;i++){
        console.log('this.modules.length ', this.modules.length)
        // console.log('fileInfo.filePath ============== ', fileInfo.filePath)
        // let deps = fileInfo.deps
        let deps = this.modules[i].deps
        // deps如下
        // {
        //   './add.js': '/Users/shichangchun/codes/selfspace/webpack/webpack5/src/add.js',
        //   './count.js': '/Users/shichangchun/codes/selfspace/webpack/webpack5/src/count.js'
        // }
        for (const relativePath in deps) {
          // console.log('relativePath ============== ', relativePath)
          let absolutionPath = deps[relativePath]
          const info = this.build(absolutionPath)
          this.modules.push(info)
        }
      }
      // })

      // console.log(this.modules)
      this.depsGrap = this.modules.reduce((depsGrap,current)=>{
        return {
          ...depsGrap,
          [current.filePath]:{
            code: current.code,
            deps: current.deps
          }
        }
      },{})
      // console.log(this.depsGrap)
      this.generate(this.depsGrap)
    }
    build(filePath){
      // 2 获取AST抽象语法树
      let ast = getAst(filePath)
      // 3 根据AST收集依赖
      let deps = getDeps(filePath,ast)
      // 4 将AST编译成code
      let code = getCodeFromAst(ast)
      return {
        filePath,
        deps,
        code
      }
    }
    generate(depsGrap){
      const bundle = 
      `;(function(depsGrap){
  // require目的：加载入口文件
  function require(module){
    // 定义模块内部的require函数
    function localeRequire(relativePath){
      // 为了找到引入模块的绝对路径 通过require加载
      return require(depsGrap[module].deps[relativePath])
    }
    // 定义暴露的对象 将来模板要暴露的对象
    let exports = {}
    ;(function (require,exports,code) {
      eval(code)
    })(localeRequire, exports, depsGrap[module].code)
    // 作为require函数返回值 返回出去
    return exports
  }
  require('${this.options.entry}')
})(${JSON.stringify(depsGrap)})`
      fs.writeFileSync(path.resolve(this.options.output.path,this.options.output.filename),bundle,'utf-8')
    }
 }
 
 module.exports = Compiler