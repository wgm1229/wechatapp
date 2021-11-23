// miniprogram/pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    isFriend:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)//跳转路由携带过来的参数集合
    let userId = options.userId
    db.collection('users').doc(userId).get().then(res=>{//users表的对应用户信息
      this.setData({//初始化页面数据
        detail:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  handleAddFriend(){
    debugger
    if(app.userInfo){
      //已登陆
      // 根据userId建数据
      db.collection('message').where({
        userId:this.data.detail._id
      }).get().then((res)=>{
        if(res.data.length){//更新

        }else{//添加
          db.collection('message').add({
            data:{
              userId:this.data.detail._id,
              list:[ app.userInfo._id]
            }
          }).then(res=>{
            wx.showToast({
              title: '申请成功',
            })
          })
        }
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
  }
})