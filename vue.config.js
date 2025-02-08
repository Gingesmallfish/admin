const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // 这里写你的 API 服务器地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // 修改端
})
