// pages/index/index.js
const app = getApp()
Page({
  data: {
    infoList: []
  },
  onReady: function() {

  },
  onLoad: function(options) {
    console.log(getCurrentPages())
    // 显示加载
    wx.showLoading({
      title: '加载中',
    })
    // 登录
    if (app.globalData.openid != null) {
      this.reqList()
    } else {
      app.employIdCallback = openid => {
        // console.log(app)
        if (openid != '') {
          this.reqList()
        }
      }
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // list请求
  reqList(isRefresh) {
    isRefresh = isRefresh || false
    wx.request({
      url: app.globalData.url + 'list/' + app.globalData.openid,
      method: 'GET',
      success: (res) => {
        this.setData({
          infoList: res.data
        })
        // 隐藏加载
        wx.hideLoading()
        if (isRefresh) {
          // 停止刷新事件
          setTimeout(() => {
            wx.stopPullDownRefresh({
              success: function() {
                wx.showToast({
                  title: '刷新完成',
                  icon: 'success',
                  duration: 1000
                });
              }
            })
          }, 500)
        }
      }
    })
  },
  goNewadd() {
    wx.navigateTo({
      url: '/pages/newadd/newadd'
    })
  },
  // 刷新事件
  onPullDownRefresh: function() {
    this.reqList(true)
  }
})