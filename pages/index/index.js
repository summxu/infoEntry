// pages/index/index.js
const app = getApp()
Page({
  data: {
    infoList: []
  },
  onReady: function() {

  },
  onLoad: function(options) {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        wx.request({
          url: app.globalData.url + 'jscode/' + res.code,
          success: (res) => {
            app.globalData.openid = res.data.openid
            wx.request({
              url: app.globalData.url + 'list/',
              method: 'POST',
              data: {
                opid: app.globalData.openid
              },
              success: (res) => {
                this.setData({
                  infoList:res.data
                })
                // console.log(this.data.infoList)
              }
            })
          }
        })
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  goNewadd() {
    wx.navigateTo({
      url: '/pages/newadd/newadd'
    })
  }
})