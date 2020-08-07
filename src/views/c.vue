<template>
  <div>
    1选择上传文件：
    <input type="file" @change="uploadfile" />
    <div>
      <img v-for="item in imagList" :src="item" alt />
    </div>
    <div style="margin-top:100px">
      <input id="f" type="file" @change="fload" ref="input" />
      <div id="etagDemo">{{innner}}</div>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import upload from "../../api/test"
import md5 from "md5"
import sha1 from "sha1"
import getEtag from "../assets/qetag"
export default {
  data() {
    return {
      returnImg: '',
      file: [],
      isScription: false,
      image_id: '',
      temprr: [],
      imagList: [],
      innner: '',
      access: false
    }
  },
  methods: {
    fload() {
      var fs = this.$refs.input.files[0];
      var reader = new FileReader();
      //byte为blob对象
      reader.readAsArrayBuffer(fs);
      reader.onload = (e) => {
        var buf = new Uint8Array(reader.result);
        getEtag(buf, function (v) {
          console.log(v)
        })
      }
    },
    async uploadfile(e) {
      const file = e.target.files[0];
      // FsNDSrJtEBAgr1Ba6XLMye0pGEPG
      const fileFormt = file.name.split('.')[0]
      const fileName = 'test/' + fileFormt + Date.now() + '.jpg';
      const responese = await upload.getUploadToken();
      const token = responese.data.uploadToken;
      const accessDomain = responese.data.domain;
      const putExtra = {
        fname: '',
        params: {},
        mimeType: ['image/png', 'image/jpeg', 'image/gif'],
      };
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      };
      const observable = qiniu.upload(file, fileName, token, putExtra, config);
      observable.subscribe({
        next: (result) => {
          // 主要用来展示进度
          // console.log(result);
        },
        error: () => {
          console.log('上传图片失败')
        },
        complete: (res) => {
          // this.searchImg = key
          let that = this;
          console.log(res)
          var reader = new FileReader();
          let fullpathName = accessDomain + res.key;
          console.log(fullpathName)
          //byte为blob对象
          reader.readAsArrayBuffer(file);
          reader.onload = (e) => {
            console.log(reader.result)
            let buf = new Uint8Array(reader.result);
            getEtag(buf, function (v) {
              if (that.image_id) {
                that.temprr = that.image_id.split(',')
              }
              if (that.temprr.includes(fullpathName) === false) {
                that.imagList.push(fullpathName)
                that.temprr.push(fullpathName)
                that.image_id = that.temprr.toString()
              } else {
                that.$Message.info({ top: 0, content: '重复的图片上传' })
              }
            })
          }
        },
      });
    },
  },
  mounted() {
  }
}
</script>

<style>
img {
  width: 200px;
  height: 100px;
}
</style>