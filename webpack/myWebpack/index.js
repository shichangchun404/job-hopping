/**
 * 自定义wbepack
 * @returns 
 */
const Compiler = require('./Compiler')

function myWebpack(options){
  return new Compiler(options)
}

module.exports = myWebpack