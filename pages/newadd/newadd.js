import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
var validate
Page({
  data: {
    gender: [
      '男', '女'
    ],
    nation: [
      '汉族', '回族', '其他'
    ],
    btnLoad: {
      show: false,
      title: '提交'
    },
    groupNum: [0, 1, 2, 3, 4, 5, 6],
    nationIndex: 0,
    genderIndex: 0,
    groupNumIndex: 0,
    is_helper: false,
    is_master: false,
    addrLength: 0,
    showTopTips: false,
    showTopTitle: ''
  },
  // 用arrached 才能取到数据值
  onLoad() {
    this.initValidate()
  },
  formSubmit(e) {
    console.log(e.detail.value)
    if (!this.validate.checkForm(e.detail.value)) {
      const error = this.validate.errorList[0];
      console.log(error)
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
    // 按钮加载
    this.setData({
      btnLoad: {
        show: true,
        title: '正在提交 请稍后'
      }
    })
    // 提交表单
    var data = e.detail.value
    data.submitter_openid = app.globalData.openid
    if(data.is_helper){
      data.is_helper = 1
    }else{
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
      success:(res)=>{
        if (res.statusCode == 200) {
          wx.redirectTo({
            url: '/pages/msg/msgsuccess'
          })
        }else(
          wx.redirectTo({
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
        required: true,
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
        minlength: 6
      }
    }, {
      name: {
        required: '请输入姓名!',
        maxlength: '名称不得超过4字!'
      },
      telephone: {
        required: '请输入电话!',
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