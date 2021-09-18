// miniprogram/pages/myindex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    string:'我是data中的数据',
    textVisible:true,
    textData:[
      {id:1,name:'小明'},
      {id:2,name:'小黄'},
      {id:3,name:'小红'},
    ],
    length:5,
    item:{
      index:1,
      msg:'信息',
      time:'06:19'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index,onLoad页面创建时执行')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('index,onReady页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('index,onShow页面出现在前台时执行')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('index,onHide页面从前台变为后台时执行')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('index,onUnload页面销毁时执行')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('index,onPullDownRefresh用户下拉动作时执行')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('index,onReachBottom用户下拉动作时执行')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})