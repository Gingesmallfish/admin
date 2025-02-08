const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
  },

  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false;
      args[0]['__VUE_OPTIONS_API__'] = true;
      args[0]['__VUE_PROD_DEVTOOLS__'] = false;
      return args;
    });
  }
})
