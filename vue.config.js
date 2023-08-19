const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.football-data.org',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/v4', // Redireciona as requisições /api para /v4
        },
      },
    },
  },
};