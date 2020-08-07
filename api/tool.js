const qiniu = require('qiniu')
const Base64 = require('js-base64').Base64
const accessKey = 'e9TDPu_LeQWHZtjNJzWkfROdgIIeKbShEUwgbTEJ' //这里填写七牛云的accessKey
const secretKey = 'v3LyoG7r_AtPIoZdzuUyzrkPIcfh0m_FyCR9tzEv'//这里填写七牛云的secretKey
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'qiniulocal',//这里填写七牛云空间名称
    expires: 3600
  }
module.exports = {
    getQiniuToken(){
        return new Promise((resolve,reject)=>{
            const putPolicy = new qiniu.rs.PutPolicy(options)
            const uploadToken = putPolicy.uploadToken(mac)
        //    resolve(Base64.decode(uploadToken.split(':')[2]))
        })
    }
}

module.exports.getQiniuToken().then(data=>{
    // console.log(data)
})
const md5 = require("md5")
const clientId = "clientId=10007"
const businessSystem = "businessSystem=security"
const biz = "biz=common"
const appKey = "appKey=huafatwy"
const key = "key=103f4bd7a99ddc1241c7d6f0977e85b2"

const arr = [clientId,businessSystem,biz,appKey,key].sort();
const str = arr.join('&')
console.log(md5(str))