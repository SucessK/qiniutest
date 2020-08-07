module.exports = {
    devServer: {
      port: 8011,
      open: true,
      // 反向代理配置
      proxy: {
        '/up': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/up': ''
          }
        },
        '/yihao01-app-api/app/qiniu':{
          target:'https://app.cgsq96655.com',
          changeOrigin: true,
        }
      }
    }
  }