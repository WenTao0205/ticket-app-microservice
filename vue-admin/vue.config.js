module.exports = {
  devServer: {
    port: 8092,
    proxy: {
      '/': {
        target: 'https://ticketing.dev/api',
        ws: true,
        changeOrigin: true
      }
    }
  }
}