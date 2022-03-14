## copyright-webpack-plugin.js

```
class copyrightWebpackPlugin {
  constructor(options){
    console.log('options ', options)
  }
  apply(compiler){
    // 官网有很多钩子，我们以emit为例
    compiler.hooks.emit.tapAsync(
      'copyrightWebpackPlugin',
      (compilation,cb) => {
        console.log("CopyrightWebpackPlugin 异步的例子 开始了")
        // console.log("compilation === ", compilation)
        compilation.assets['copyright.txt'] = {
          source:()=>{
            return '版权2022'
          },
          size:()=>{
            return 100
          }
        }
        cb()
      }
    )
    // 同步的例子
    compiler.hooks.compile.tap(
      "CopyrightWebpackPlugin",
      compilation => {
        console.log("CopyrightWebpackPlugin 同步的例子 开始了")
        // console.log("compilation === ", compilation)
      }
    )

  }
}

module.exports = copyrightWebpackPlugin
```

## webpack.config.js
```
const copyrightWebackPlugin = require('./plugins/copyright-webpack-plugin.js')

module.exports = {
  mode:'none',
  entry:resolve(__dirname,'./app.js'),
  output:{
    path: resolve(__dirname,'./dist'),
    filename:'[name].js'
  },
  plugins:[
    new copyrightWebackPlugin({name:'shicc'})
  ]
}
```

