const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'e9TDPu_LeQWHZtjNJzWkfROdgIIeKbShEUwgbTEJ' //这里填写七牛云的accessKey
const secretKey = 'v3LyoG7r_AtPIoZdzuUyzrkPIcfh0m_FyCR9tzEv'//这里填写七牛云的secretKey
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'qiniulocal',//这里填写七牛云空间名称
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}
