// components/removeList/removeList.js
const app = getApp()
const db = wx.cloud.database()
Component({
    /**
     * 组件的属性列表,相当于vue的props
     */
    properties:{
        messageId:String
    },
    /**
     * 组件的初始数据
     */
    data: {
        userMessage:{}
    },
    methods:{
        handleDelMessage(){
            wx.showModal({//提示弹框
              title:'提示信息',
              content:'删除消息',
              confirmText:'删除',//确认按钮内容
              success:(res)=>{
                  if(res.confirm){//用户点击确定
                      db.collection('message').where({//查询数据库中本用户下的消息列表
                          userId:app.userInfo._id
                      }).get().then((res)=>{
                          let list = res.data[0].list
                          list=list.filter(val=>val!==this.data.messageId)//过滤掉此条需要删除的消息
                          wx.cloud.callFunction({//利用云函数更新的数据
                              name:'update',
                              data:{
                                  collection:'message',
                                  where:{
                                      userId:app.userInfo._id
                                  },
                                  data:{
                                      list
                                  }
                              }
                          }).then((res)=>{
                              this.triggerEvent('myEvent',list)//调用父组件的bindmyEvent方法，更新消息list
                          })
                      })
                  }else if(res.cancel){//用户点击取消
                      console.log('用户点击取消');
                  }
              }
            })
        }
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            db.collection('users').doc(this.data.messageId)
            .field({//只返回用户头像和用户名两个字段信息
                userPhoto:true,
                nickName:true
            })
            .get()//通过props的messageId查找数据库中对应的此用户的信息
            .then((res)=>{
                this.setData({
                    userMessage:res.data//将此用户的信息存入本组件中
                })
            })
        }
    }
})