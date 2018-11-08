import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
var validate
Page({
  data: {
    id: '',
    gender: [
      '男', '女'
    ],
    nation: [
      '汉族', '回族', '其他'
    ],
    groupNum: [0, 1, 2, 3, 4, 5, 6],
    nationIndex: 0,
    genderIndex: 0,
    groupNumIndex: 0,
    is_helper: false,
    is_helper: false,
    addrLength: 0,
    showTopTips: false,
    showTopTitle: '',
    pageVlaues: {
      name: '',
      phoneNum: '',
      idcard: '',
      household_num: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate()
    this.setData({
      id: options.id
    })

    // 发送请求 获取数据
    wx.request({
      url: app.globalData.url + this.data.id,
      success: (res) => {
        console.log(res.data)
        this.setData({
          pageVlaues: {
            name: res.data.name,
            phoneNum: res.data.telephone,
            idcard: res.data.idcard,
            household_num: res.data.household_num,
            address: res.data.address
          },
          groupNumIndex:parseInt(res.data   .group_num),
          nationIndex: parseInt(res.data    .nation),
            genderIndex: parseInt(res.data    .gender),
          is_helper: res.data   .is_helper == 0 ? false : true,
          is_master: res.data   .is_master == 0 ? false : true
        })
        console.log(this.data)
      }
    })
  },

  formSubmit(e) {
    // console.log(e.detail)
    if (!this.validate.checkForm(e.detail.value)) {
      const error = this.validate.errorList[0];
      // console.log(error)
      this.setData({
        showTopTips: true,
        showTopTitle: error.msg,
      })
      // 定时器
      setTimeout(() => {
        this.setData({
          showTopTips: false,
        })
      }, 3000)

      return false
    }
    // 提交表单
    var data = e.detail.value
    data.submitter_openid = app.globalData.openid
    if (data.is_helper) {
      data.is_helper = 1
    } else {
      data.is_helper = 0
    }
    if (data.is_master) {
      data.is_master = 1
    } else {
      data.is_master = 0
    }
    wx.request({
      url: app.globalData.url + 'save',
      method: 'POST',
      data: data,
      success: (res) => {
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '/pages/msg/msgsuccess'
          })
        } else (
          wx.navigateTo({
            url: '/pages/msg/msgfail'
          })
        )
      }
    })
  },
  genderChange(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  nationChange(e) {
    this.setData({
      nationIndex: e.detail.value
    })
  },
  groupNumChange(e) {
    this.setData({
      groupNumIndex: e.detail.value
    })
  },
  addrChange(e) {
    this.setData({
      addrLength: e.detail.cursor
    })
  },
  // 表单验证
  initValidate() {
    // 创建实例对象
    this.validate = new WxValidate({
      name: {
        required: true,
        maxlength: 4
      },
      telephone: {
        telephone: true
      },
      idcard: {
        required: true,
        idcard: true
      },
      household_num: {
        required: true,
        minlength: 6
      },
      address: {
        required: true,
        minlength: 6
      }
    }, {
      name: {
        required: '请输入姓名!',
        maxlength: '名称不得超过4字!'
      },
      telephone: {
        telephone: '电话格式不正确!'
      },
      idcard: {
        required: '身份证是必填字段',
        idcard: '请输入18位的有效身份证'
      },
      household_num: {
        required: '户口号是必填字段',
        minlength: '户口号不能低于6个字符'
      },
      address: {
        required: '住址是必填字段',
        minlength: '住址不能低于6个字符'
      }
    })
    // 自定义规则
    this.validate.addMethod('household_num', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选1-2个敲码助手')
    this.validate.addMethod('address', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    }, '请勾选1-2个敲码助手')
  }

})