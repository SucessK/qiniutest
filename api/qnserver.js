const express = require("express")
const bodyParse = require('body-parser')
const app = express()
app.use(bodyParse.json())
const qntool = require('./config2.js')
app.post('/getQiniuFile',async(req,res)=>{
    const {bucket, options} = req.body;
    console.log(bucket,options)
    const responese = await qntool.qiniuGetImg(bucket,options)
    console.log(responese)
    res.json({
        token:qntool.uploadToken,
        responese
    })
})
app.get('/token',(req,res)=>{
    res.send('hello')
})
app.listen(3000, () => {
    console.log('this server are running on localhost:3000!')
})