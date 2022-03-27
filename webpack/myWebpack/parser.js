const path = require('path')
 const fs = require('fs')
 const babelParser = require('@babel/parser')
 const traverse = require('@babel/traverse').default
 const { transformFromAst } = require('@babel/core')

const parser = {
  // 获取Ast抽象语法树
  getAst(filePath){
    // 读取入口文件内容
    let file = fs.readFileSync(filePath,'utf-8')

    // 2 将文件内容解析成ast抽象语法树
    const ast = babelParser.parse(file,{
      sourceType:'module'
    })
    return ast
  },
  // 收集依赖
  getDeps(filePath,ast){
    // 获取入口文件 文件夹路径
    let dirname = path.dirname(filePath)
    // 创建依赖容器
    let deps = {}
    // 收集依赖
    traverse(ast,{
      // 内部遍历解析program.body 判断语句类型 如果是import导入语句 其type是ImportDeclaration 并触发对应函数
      ImportDeclaration(code){
        // console.log(code)
        // 文件相对路径 如 './add.js'
        let relativePath = code.node.source.value
        // 基于入口文件 生成绝对路径
        let absolutionPath = path.resolve(dirname,relativePath)
        // 添加依赖
        deps[relativePath] = absolutionPath
      }
    })
    return deps
  },
  // 将抽象预发树 编译成浏览器能失=识别的代码
  getCodeFromAst(ast){
    // 4编译代码 将浏览器不认识的语法进行编译
    let {code} = transformFromAst(ast,null,{
      presets:['@babel/preset-env']
    })
    return code
  }
}

module.exports = parser