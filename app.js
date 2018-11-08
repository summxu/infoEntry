App({
  onLaunch: function() {
    wx.login({
      success: res => {
        console.log(res)
        wx.request({
          url: this.globalData.url + 'jscode/' + res.code,
          success: (res) => {
            this.globalData.openid = res.data.openid
            //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.employIdCallback) {
              this.employIdCallback(res.data.openid);
            }
          }
        })
      }
    })
  },
  globalData: {
    openid: null,
    url: 'http://47.105.161.30/weixin/miniprogram/submitedMsg/'
  },
  refSuccess: function() {
    
  }
})