module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['nedb-promise', 'puppeteer'],
      nodeIntegration: true
    }
  },
  chainWebpack:
    config => {
      config.externals({ nedb: 'commonjs nedb', puppeteer: "require('puppeteer')" })
    }
}
