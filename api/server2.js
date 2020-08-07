const md5 = require("md5")
const clientId = "clientId=10007"
const businessSystem = "businessSystem=security"
const biz = "biz=common"
const appKey = "appKey=huafatwy"
const key = "key=103f4bd7a99ddc1241c7d6f0977e85b2"
const arr = [clientId, businessSystem, biz, appKey, key].sort();
const str = arr.join('&')
const sign = md5(str)
// const url = "https://app.cgsq96655.com/yihao01-app-api/app/qiniu/getImgUploadTokenAndDomainNoXid"
const url = `https://app.cgsq96655.com/yihao01-app-api/app/qiniu/getImgUploadTokenAndDomainNoXid?${biz}&${clientId}&${businessSystem}&${appKey}&sign=${sign}`
console.log(url)

