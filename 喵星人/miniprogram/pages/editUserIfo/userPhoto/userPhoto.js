// miniprogram/pages/editUserIfo/userPhoto/userPhoto.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:''
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
    this.setData({
      userPhoto:app.userInfo.userPhoto
    })
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
  handleBtn(){
    wx.showLoading({
      title: '上传中',
    })
    let cloudPath = "userPhoto/"+app.userInfo._openid+Date.now()+'.jpg'//上传至云存储userPhoto文件夹下，使用openid和时间来确定文件唯一性
    wx.cloud.uploadFile({
      cloudPath,//文件名称为cloudPath
      filePath:this.data.userPhoto//文件路径
    }).then(res=>{
      console.log('上传至云存储后',res)
      let fileID = res.fileID//为云存储图片的路径
      if(fileID){
        db.collection('users').doc(app.userInfo._id).update({//更新数据库的图片
          data:{
            userPhoto:fileID
          }
        }).then(res=>{
          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
          })
          app.userInfo.userPhoto = fileID
        })

      }
    })
  },
  handleUploadImage(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],//选择原图 、压缩尺寸
      sourceType: ['album', 'camera'],//选择图片的来源
      success: (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData({
            userPhoto:tempFilePaths
        })
      }
    })
  },
  update(){
    // console.log('app',app)
    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data:{
        userPhoto:this.data.userPhoto
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '更新成功',
      })
    })
  },
  getUserInfo(ev){//进行用户授权
    let userInfo = ev.detail.userInfo//用户信息
    this.setData({
      userPhoto:userInfo.avatarUrl//头像是avatarUrl属性
    })
    db.collection('users').doc(app.userInfo._id).update({//更新数据库的图片
      data:{
        userPhoto:userInfo.avatarUrl
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '上传成功',
      })
      app.userInfo.userPhoto = userInfo.avatarUrl//更新app对象中的图片
    })    
  }
})