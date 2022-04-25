const path = require('path')
const fs = require('fs')
const express = require('express')
var etag = require('etag')
const app = express()

app.use('*',(req,res,next)=>{
  console.log('请求进来了 url= ',req.url)
  next()
})

// app.use(express.static(path.resolve(__dirname,'./static'), {
//   etag: false,
//   lastModified: false,
// }))

app.get('/',(req,res,next)=>{
  let data = fs.readFileSync(path.resolve(__dirname,'./index.html'))
  res.setHeader('Content-Type','text/html')
  res.setHeader('Cache-Control','no-store')
  res.send(data.toString())
})

app.get('/1.jpg',(req,res)=>{
  console.log('/1.jpg ')
  let data = fs.readFileSync(path.resolve(__dirname,'./static/1.jpg'))
  res.setHeader('Content-Type','image/jpeg')
  res.setHeader('Cache-Control','max-age=30')
  res.send(data)
})
app.get('/2.jpg',(req,res)=>{
  console.log('/2.jpg ')
  let data = fs.readFileSync(path.resolve(__dirname,'./static/2.jpg'))
  const ETag = etag(data)
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
  let stat = fs.statSync(path.resolve(__dirname,'./static/3.jpg'))
  let mtime = stat.mtime
  res.setHeader('Content-Type','image/jpeg')
  res.setHeader('Cache-Control','no-cache')
  res.setHeader('Last-Modified',mtime)
  if(req.headers['if-modified-since']&&mtime==req.headers['if-modified-since'].toString()){
    console.log('文件修改时间一致 返回304')
    res.statusCode = 304
    res.send()
    return
  }
  let data = fs.readFileSync(path.resolve(__dirname,'./static/3.jpg'))
  res.send(data)
})

app.get('/4.jpg',(req,res)=>{
  console.log('/4.jpg ')
  let data = fs.readFileSync(path.resolve(__dirname,'./static/4.jpg'))
  res.setHeader('Content-Type','image/jpeg')
  res.send(data)
})


app.listen(8848,()=>{
  console.log('app start at http://localhost:8848')
})