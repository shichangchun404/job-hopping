const myWebpack = require("./index");
const config = require("./webpack.config");

const compiler = new myWebpack(config)
compiler.run()