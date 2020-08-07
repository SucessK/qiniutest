<template>
  <div>
    上传图片：
    <input type="file" @change="uploadfile" />
    <img style="width:200px;height:100px" :src="searchImg" alt />
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {
  data() {
    return {
      searchImg: ''
    }
  },
  methods: {
    uploadfile(e) {

      this.axios.get('/up/token').then(res => {
        const file = e.target.files[0];
        const key = 'security/' + Date.now() + '.jpg';
        const token = res.data;
        const putExtra = {
          fname: '',
          params: {},
          mimeType: ['image/png', 'image/jpeg', 'image/gif'],
        };
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z2
        };
        const options = {
          quality: 0.92,
          maxWidth: 1000,
          naxHeight:500,
          noCompressIfLarger: true
        }
        // 图片压缩后上传
        qiniu.compressImage(file, options).then(data => {
          console.log(2222222,data)
          const observable = qiniu.upload(data.dist, key, token, putExtra, config);
          observable.subscribe({
            next: (result) => {
              // 主要用来展示进度
              console.warn(result);
            },
            error: () => {
              alert('上传图片失败')
            },
            complete: (res) => {
              // this.searchImg = key
              console.log(res)
              var fileFullPathName = 'http://qegy3ynf9.bkt.clouddn.com/' + res.key;
              console.log("图片上传成功,最终保存的访问路径为：" + fileFullPathName);
            },
          });
        })

      })

    }
  }
}
</script>

<style>
</style>