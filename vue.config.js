const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    lintOnSave: false,//暂时关闭eslint
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                axios: 'axios'
            })
        ]
    },
    chainWebpack: config => {
        // svg loader
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },
    devServer: {
        proxy: {
            '/api/v1': {
                target: 'http://127.0.0.1:8081',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
