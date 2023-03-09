module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'https://ticketing.dev/api',
        ws: true,
        changeOrigin: true
      }
    }
  }
}