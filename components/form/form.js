// components/form/form.js
import WxValidate from '../../utils/WxValidate.js'
var validate
Component({
  properties: {

  },
  data: {
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
    addrLength: 0,
    showTopTips: false,
    showTopTitle: ''
  },
  created() {
    this.initValidate()
  },
  /**
   * 组件的方法列表
   */
  methods: {
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

      wx.navigateTo({
        url: '/pages/msg/msgsuccess'
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
      console.log('ok')

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
  }
})