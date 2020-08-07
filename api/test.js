import axios from 'axios'
const md5 = require("md5")
const clientId = "clientId=10007"
const businessSystem = "businessSystem=security"
const biz = "biz=common"
const appKey = "appKey=huafatwy"
const key = "key=103f4bd7a99ddc1241c7d6f0977e85b2"
// 字典排序
const arr = [clientId, businessSystem, biz, appKey, key].sort();
const str = arr.join('&')
const sign = md5(str)
const url = '/yihao01-app-api/app/qiniu/getImgUploadTokenAndDomainNoXid'
function getUploadToken(){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:{
                clientId:'10007',
                businessSystem:'security',
                biz:'common',
                appKey:'huafatwy',
                sign
            }
        }).then(({data})=>{
            resolve(data)
        }).catch(reject)
    })
}
export default{
    getUploadToken
}
