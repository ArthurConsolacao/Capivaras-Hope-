const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://backend:3000',
        changeOrigin: true,
        pathRewrite: { '^/uploads': '/uploads' },
      },
    },
  },
})
