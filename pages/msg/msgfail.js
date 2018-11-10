Page({
  goHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  goNewadd() {
    wx.redirectTo({
      url: '/pages/newadd/newadd',
    })
  }
});