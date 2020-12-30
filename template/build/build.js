'use strict'
// 检查 NodeJS和 npm的版本
require('./check-versions')()
// 设置生产环境
process.env.NODE_ENV = 'production'
// node的控制台进度美化
const ora = require('ora')
// 递归删除文件的node插件，在项目的文件编译之前，可以清除dist文件夹里的内容
const rm = require('rimraf')
// 处理文件路径
const path = require('path')
// node的控制台文本和颜色美化
const chalk = require('chalk')
// 资源加载/打包工具
const webpack = require('webpack')
// 获取基本配置
const config = require('../config')
// 打包配置
const webpackConfig = require('./webpack.prod.conf')
// ora的text信息
const spinner = ora('生产环境打包中...')
// 开启 ora转轮
spinner.start()
// 查找出口文件 -- dist
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 写入流
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  🐞Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  ✨打包完成.\n'))
    console.log(chalk.yellow(
      '  🌐Tip: built files are meant to be served over an HTTP server.\n' +
      '  💼Opening index.html over file:// won\'t work.\n'
    ))
  })
})
