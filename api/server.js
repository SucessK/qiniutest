const express = require("express")
const bodyParse = require('body-parser')
const app = express()
app.use(bodyParse.json())
const qnconfig = require('./config.js')
app.get('/token', (req, res, next) => {
    console.log(qnconfig.uploadToken)
    res.status(200).send(qnconfig.uploadToken)
  })
  // 监听3000端口
  app.listen(3000, () => {
    console.log('this server are running on localhost:3000!')
  })