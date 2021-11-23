// miniprogram/pages/message/message.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userMessage:[],//数据库中的消息列表
    logged:false//登陆状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   * 此生命周期每进一次此tabBar都会触发一次
   */
  onShow: function () {
    if(app.userInfo._id){
      this.setData({
        logged:true,
        userMessage:app.userMessage//初始化消息列表
      })
    }else{
      //未登录
      wx.showToast({
        title: '请先登录',
        duration:2000,//停留时间
        icon:'none',
        success:()=>{
         setTimeout(()=>{
           wx.switchTab({//tabBar路径跳转方式
             url: '/pages/mine/mine',
           },2000)
         })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})