module.exports = {
  devServer: {
    port: 8091,
    proxy: {
      '/': {
        target: 'https://ticketing.dev/api',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
