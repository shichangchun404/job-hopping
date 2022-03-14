# md-loader.js
```
module.exports = source =>{
  // 加载的模块内容
  console.log('source ', source)
  // 返回值是最终打包的内容 需要返回一段可执行的js代码 
  //return '你好' // ReferenceError: 你好 is not defined
  // return "console.log('你好')"
  let code = `export default {source:${JSON.stringify(source)}}` 
  return code
}
```

# webpack.config.js
```
const {resolve} = require('path')

module.exports = {
  mode:'none',
  entry:resolve(__dirname,'./app.js'),
  output:{
    path: resolve(__dirname,'./dist'),
    filename:'[name].js'
  },
  module:{
    rules:[
      {
        test:/\.md$/,
        use:resolve(__dirname,'./loader/md-loader.js') // 直接使用路径
      }
    ]
  },
}
```