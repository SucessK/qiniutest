var qiniu = require("qiniu");
// 创建上传凭证
const accessKey = 'e9TDPu_LeQWHZtjNJzWkfROdgIIeKbShEUwgbTEJ' //这里填写七牛云的accessKey
const secretKey = 'v3LyoG7r_AtPIoZdzuUyzrkPIcfh0m_FyCR9tzEv'//这里填写七牛云的secretKey

qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
// 鉴权对象
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const optionss = {
    scope: 'qiniulocal',//这里填写七牛云空间名称
    expires: 7200
  }
  const putPolicy = new qiniu.rs.PutPolicy(optionss)
  const uploadToken = putPolicy.uploadToken(mac)

// 获取七牛配置
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
//构建bucketmanager对象
var bucketmanager = new qiniu.rs.BucketManager(mac, config);
//你要测试的空间， 并且这个key在你空间中存在
bucket = 'qiniulocal';
key = 'qiniulocalThu Aug 06 2020 16:28:02 GMT+0800 (中国标准时间).jpg';
//删除资源
function qiniuDelImg(bucket,key){
    bucketmanager.delete(bucket, key, function(err, ret) {
        if (!err) {
            console.log('is ok lalalalalla')
          // ok
        } else {
          console.log(err);
        }
      });
}
// 获取指定前缀的文件列表
// @param options 列举操作的可选参数
//                prefix    列举的文件前缀
//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
//                limit     每次返回的最大列举文件数量
//                delimiter 指定目录分隔符
function qiniuGetImg(bucket, options){
    return new Promise((resolve,reject)=>{
        bucketmanager.listPrefix(bucket, options, function(err, respBody, respInfo) {
            if (err) {
              console.log(err);
              throw err;
            }
            if (respInfo.statusCode == 200) {
              //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
              //指定options里面的marker为这个值
              var nextMarker = respBody.marker;
              var commonPrefixes = respBody.commonPrefixes;
            //   console.log(nextMarker);
            //   console.log(commonPrefixes);
              var items = respBody.items;
              resolve(items)
            //   items.forEach(function(item) {
            //      console.log(item.key); //图片key
            //   });
            } else {
              console.log(respInfo.statusCode);
              console.log(respBody);
              reject(respInfo.statusCode)
            }
          });
    })
}
// 获取单文件信息
// client.stat(bucket, key, function(err, ret) {
//     if (!err) {
//       console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
//     } else {
//       console.log(err);
//     }
//   }); 


// @param options 列举操作的可选参数
//                prefix    列举的文件前缀
//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
//                limit     每次返回的最大列举文件数量
//                delimiter 指定目录分隔符
// var options = {
//   limit: 10,
//   prefix: 'qiniulocal/',
// };
// bucketmanager.listPrefix(bucket, options, function(err, respBody, respInfo) {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
//   if (respInfo.statusCode == 200) {
//     //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
//     //指定options里面的marker为这个值
//     var nextMarker = respBody.marker;
//     var commonPrefixes = respBody.commonPrefixes;
//     console.log(nextMarker);
//     console.log(commonPrefixes);
//     var items = respBody.items;
//     items.forEach(function(item) {
//       console.log(item.key);
//       // console.log(item.putTime);
//       // console.log(item.hash);
//       // console.log(item.fsize);
//       // console.log(item.mimeType);
//       // console.log(item.endUser);
//       // console.log(item.type);
//     //   先查询文件，再删除
//     //   bucketmanager.delete('qiniulocal', item.key, function(err, ret) {
//     //     if (!err) {
//     //         console.log('is ok lalalalalla,全部删除！')
//     //       // ok
//     //     } else {
//     //       console.log(err);
//     //     }
//     //   });
//     });
//   } else {
//     console.log(respInfo.statusCode);
//     console.log(respBody);
//   }
// });

module.exports = {
    qiniuDelImg,
    qiniuGetImg,
    uploadToken
}