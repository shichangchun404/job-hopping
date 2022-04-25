const path = require('path')
const fs = require('fs')
const express = require('express')
var etag = require('etag')
const app = express()

app.use('*',(req,res,next)=>{
  // console.log('请求进来了 url= ',req.url)
  next()
})
// app.use(express.static(__dirname + '/static',{maxAge:40000}))

app.get('/1.jpg',(req,res)=>{
  console.log('/1.jpg ')
  let data = fs.readFileSync(path.resolve(__dirname,'./static/1.jpg'))
  fs.stat(path.resolve(__dirname,'./static/1.jpg'),(err,stat)=>{
    // console.log(stat)
  })
  res.setHeader('Content-Type','image/jpeg')
  res.setHeader('Cache-Control','max-age=30')
  res.send(data)
})
app.get('/2.jpg',(req,res)=>{
  console.log('/2.jpg ', req.headers)
  let data = fs.readFileSync(path.resolve(__dirname,'./static/2.jpg'))
  const ETag = etag(data)
  console.log('etag == ', ETag)
  res.setHeader('ETag',ETag)
  res.setHeader('Content-Type','image/jpeg')
  res.setHeader('Cache-Control','no-cache')
  if(req.headers['if-none-match']==ETag){
    console.log('文件内容未发生变化 直接返回304')
    res.statusCode = 304 // 如果返回305时 下次请求中不会带if-none-match 导致返回200
    res.send()
    return
  }else{
    console.log('文件内容发生变化 返回200 ') // 当返回200或304时 下次请求req中才会带着if-none-match
    
    res.send(data)
  }
  
})
app.get('/3.jpg',(req,res)=>{
  console.log('/3.jpg ')
  let data = fs.readFileSync(path.resolve(__dirname,'./static/3.jpg'))
  res.setHeader('Content-Type','image/jpeg')
  res.setHeader('Cache-Control','no-store')
  res.send(data)
})
app.listen(8848,()=>{
  console.log('app start at http://localhost:8848')
})