let config = {
  sdk: 'NIM_Web_SDK_v6.1.0',
  // 用户自定义的登录注册地址
  loginUrl: '/webdemo/h5/login.html',
  registUrl: '/webdemo/h5/regist.html',
  homeUrl: '/webdemo/h5/index.html#/session',
}

const env = 'online'

let appConfig = {
  // 用户的appkey
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  test: {
    appkey: 'fe416640c8e8a72734219e1847ad2547',
    postUrl: 'https://apptest.netease.im'
  },
  online: {
    appkey: '45c6af3c98409b18a84451215d0bdd6e',
    postUrl: 'https://app.netease.im'
  }
}

config = Object.assign(config, appConfig[env])

export default config
