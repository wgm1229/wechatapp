// miniprogram/pages/index/index.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundUrl:[
      'https://preview.qiantucdn.com/58pic/36/41/14/51A58PICuRf1zD8tSPXBx_PIC2018.jpg!kuan320',
      'https://www.58pic.com/newpic/36416257.html',
      'https://preview.qiantucdn.com/paixin/31/24/89/75Q58PIC58PICTziWPiTW7q4N_PIC2018.jpg!kuan320'
    ],
    current:'links'
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
    db.collection('users').get().then(res=>{//users表的全部字段
      console.log(res)
    })
    db.collection('users')
    .field({//筛选users表的字段为以下几个
      userPhoto: true,
      nickName: true,
      links: true,
    }).orderBy(this.data.current, 'desc')//指定条件排序
    .get().then(res=>{
      this.setData({
        listData:res.data//渲染页面
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
  handleLinks(e){
    // console.log(e.target.dataset.id)
    let id = e.target.dataset.id//通过自定义属性data-id拿到当前点击的用户id
    /* db.collection('users').doc(id).update({//只能修改自己的数据
      data:{
        links:5
      }
    }).then(res=>{
    }) */
    const _ = db.command

    wx.cloud.callFunction({//自己可以修改他人的数据
      name:'update',//调用名为“update”的云函数
      data:{//相当于云函数中的event
        collection:'users',
        doc:id,
        data:"{links: _.inc(1)}"
        // links:_.inc(1)字段每次自增1，需要传入字符串，并在云函数中解析字符串
      }
    }).then(res=>{
      // console.log('调用云函数',res)
      if(res.result.stats.updated){
        let coloneListData = [...this.data.listData]
        for(let i = 0;i<coloneListData.length;i++){
          if(coloneListData[i]._id == id){
            coloneListData[i].links++
          }
        }
        this.setData({
          listData:coloneListData//更新页面数据
        })
      }
    })
  },
  handleCurrent(e){
    let current = e.target.dataset.current
    if(current === this.data.current){
      return false
    }
    this.setData({
      current
    })
    this.getListData()
  },
  getListData(){
    db.collection('users')
    .field({//筛选users表的字段为以下几个
      userPhoto: true,
      nickName: true,
      links: true,
    }).orderBy(this.data.current, 'desc')//指定条件排序
    .get().then(res=>{
      this.setData({
        listData:res.data//渲染页面
      })
    })
  },
  handleDetail(e){
    let id = e.target.dataset.id
    wx.navigateTo({//跳转页面
      url:'/pages/detail/detail?userId='+id//携带参数
    })
  }
})