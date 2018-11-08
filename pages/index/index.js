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
    if (app.globalData.openid != null) {
      wx.request({
        url: app.globalData.url + 'list/',
        method: 'POST',
        data: {
          opid: app.globalData.openid
        },
        success: (res) => {
          this.setData({
            infoList: res.data
          })
          // 停止刷新事件
          wx.stopPullDownRefresh({success:function(){
            wx.showToast({
              title: '刷新完成',
              icon: 'success',
              duration: 1000
            });
          }})
        }
      })
    } else {
      app.employIdCallback = openid => {
        console.log(app)
        if (openid != '') {
          wx.request({
            url: app.globalData.url + 'list/',
            method: 'POST',
            data: {
              openid: app.globalData.openid
            },
            success: (res) => {
              this.setData({
                infoList: res.data
              })
            }
          })
        }
      }
    }
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
  },
  // 刷新事件
  onPullDownRefresh:function(){
    this.onLoad()
  }
})