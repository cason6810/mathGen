module.exports = {
    devServer: {
        port: 9000,
        open: true
    },
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/mathGen/'
    : '/'
}