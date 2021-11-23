// miniprogram/pages/mine/mine.js
const db = wx.cloud.database()//小程序的数据库
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userImage:'/miniprogram/images/users/userImage.png',
    userImage:'../../images/users/userImage.png',
    nickName:'小王',
    logined:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger
    const db = wx.cloud.database()
    db.collection('users').where({//获取数据库中的用户信息
      _openid: 'oqW3K5Pg3fo_jlTylHQ9fwS_BoZo' // 填入当前用户 openid（用户的唯一标识）
    }).get().then(res => {
      // console.log(res.data)//数据库中的数据
      this.userInfo = res.data[res.data.length-1]
      app.userInfo = this.userInfo
      this.getMessage()
    })
    if(this.userInfo){
      this.logined =true
      this.userImage = this.userInfo.avatarUrl
      this.nickName = this.userInfo.nickName
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({//通过云函数的openid获取数据库的用户信息，用户授权一次之后无需再次授权
      name:'login',//与云函数中的云函数名称对应
      data:{}
    }).then(res=>{
      // console.log('云函数',res)      
      db.collection('users').where({
        /* 根据res的_openid在数据库users表中查找对应用户信息 */
        _openid:res.result.openid
      }).get().then(res=>{
        // console.log('云函数根据openid查找数据库',res)
        this.setData({//写入data
          userImage:res.data[0].userPhoto,
          nickName:res.data[0].nickName,
          logined:true//已登录
        })
      })
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
  getUserInfo(ev){//进行用户授权
    // console.log('ev',ev)
    let userInfo = ev.detail.userInfo//用户信息

    if(!this.logined&&userInfo){
      db.collection('users').add({//在数据库中的users表中添加数据
        data:{
          userPhoto:userInfo.avatarUrl,
          nickName:userInfo.nickName,
          signature:'',
          phoneNumber:'',
          wxNumber:'',
          links:0,
          time:new Date(),
          location:true
        }
      }).then(res=>{//与Promise用法相同，成功后返回结果
        console.log(res)
        db.collection('users').doc(res._id).get().then(res=>{//在数据库users表中查找_id的数据，并返回
          console.log('11',res)
          this.setData({//与react创建data相同
            userImage:res.data.userPhoto,
            nickName:res.data.nickName,
            logined:true
          })
        })
      })
    }
  },
  getMessage(){
    db.collection('message')
    .where({
      userId: app.userInfo._id
    })
    .watch({//监听数据库对应表
      onChange: function(snapshot) {//监听成功
        if(snapshot.docChanges.length){//取对应的数据
          let list = snapshot.docChanges[0].doc.list
          if(list.length){//若有，给tabBar索引为2的icon添加小红点
            wx.showTabBarRedDot({
              index: 2,
            })
            app.userMessage=list//写入全局变量
          }else{//否则取消小红点
            wx.hideTabBarRedDot({
              index: 2,
            })
            app.userMessage=list//写入全局变量
          }
        }
      },
      onError: function(err) {//监听失败，抛出错误
        console.error('the watch closed because of error', err)
      }

    })

  }
})