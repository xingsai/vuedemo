/*
 * @Descripttion: 
 * @version: 
 * @Author: bo
 * @Date: 2020-06-01 11:54:11
 * @LastEditors: Seven
 * @LastEditTime: 2020-11-12 15:33:25
 */
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    transpileDependencies: ['vue','element-ui','sm-crypto'], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
        chunks: 'all'
        });
         // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    configureWebpack: config => {
        // config.entry.app = ["babel-polyfill", "./src/main.js"];
        config.entry.app = ["./src/main.js"];
        // 用cdn方式引入
    //     config.externals = {
    //         'vue': 'Vue',
    //         'vuex': 'Vuex',
    //         'vue-router': 'VueRouter',
    //         'axios': 'axios',
    //         'element-ui':'ELEMENT',
    //         'lodash':'_',
    //         'echarts':'echarts'
    //     }
    //     // 为生产环境修改配置...
    //     config.plugins.push(
    //        new TerserPlugin({
    //            parallel: true,
    //            sourceMap: true,
    //            terserOptions: {
    //                warnings: false,
    //                compress: {
    //                    drop_console: true,// 注释console
    //                    drop_debugger: true, // 注释debugger
    //                    pure_funcs: ["console.log"], //移除console
    //                }
    //            }
    //        })
    //    )
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#20ad86', // 全局主色
                        'link-color': '#20ad86', // 链接色
                        'border-color-base':'#20ad86', // 边框色
                    },
                    javascriptEnabled: true,
                },
            },
        },
        // // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // // 开启 CSS source maps?
        // sourceMap: false,
        // // css预设器配置项
        // loaderOptions: {},
        // // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        //将服务启动后默认打开浏览器
        open: true,
        host: 'localhost',
        port: 8088,
        https: false,
        hotOnly: false,
        proxy: {// 设置代理
            '/api': {
                // target: 'http://192.168.9.198:20008',
                target: 'http://30.20.110.183:28620',
                // target: 'https://osg-open-simu.sgcc.com.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {

    }
}

