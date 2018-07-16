//排除在打包js之外的库，通过外部加载
exports.externals = {
    "vue": "Vue",
    "axios": "axios"
}