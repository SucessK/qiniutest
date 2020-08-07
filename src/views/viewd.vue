<template>
  <div>
    <Upload
      multiple
      type="drag"
        :show-upload-list="false"
      :on-success="handleSuccess"
      :format="format"
      :before-upload="handleBeforeUpload"
      action="https://upload-z2.qiniup.com"
      :data="{token:uptoken,key:keyname}"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
    <img style="width:500px;height:300px" :src="imageUrl" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是七牛云空间的外链默认域名
      qiniuaddr: 'qegy3ynf9.bkt.clouddn.com',
      imageUrl: '',
      uptoken: '',
      domain: 'https://upload-z2.qiniup.com',
      format: ['jpg', 'jpeg', 'png'],
      keyname:''
    }
  },
  mounted(){
  },
  methods: {
    formatError() {
      this.$Message.info(`图片格式限制为${this.format.join('、')}`)
    },
    handleSuccess(a) {
      console.log(111111111, a);
      this.imageUrl = 'http://' + this.qiniuaddr + '/' + a.key
      console.log(this.imageUrl)
    },
    async handleBeforeUpload(req) {
      if (this.format.length) {
        const fileFormat = req.name.split('.').pop().toLocaleLowerCase()
        const checked = this.format.some(item => item.toLocaleLowerCase() === fileFormat)
        if (!checked) {
          this.formatError(req)
          return false
        } else {
          let filetype = ''
          if (req.type === 'image/png') {
            filetype = 'png'
          } else {
            filetype = 'jpg'
          }
          // 重命名要上传的文件
           this.keyname = 'security/' + Date.now() + '.' + filetype
          // 从后端获取上传凭证token
            const response = await this.axios.get("/up/token")
            console.log(response)
            this.uptoken = response.data
        }
      }

    }
  }
}
</script>

<style>
</style>