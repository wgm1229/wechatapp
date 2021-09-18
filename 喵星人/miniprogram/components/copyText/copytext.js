// components/copyText/copytext.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'//表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面
  },
  properties: {
    copyText:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCopyText(){
      wx.setClipboardData({//剪贴板功能
        data: this.data.copyText,
        success (res) {
          wx.getClipboardData({
            success (res) {
              // console.log(res.data) // data
              wx.showToast({
                title: '复制成功',
              })
            }
          })
        }
      })
    }
  }
})
