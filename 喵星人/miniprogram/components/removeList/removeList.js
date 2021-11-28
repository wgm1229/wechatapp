// components/removeList/removeList.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command//数据库操作符
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
                      this.removeMessage()
                  }else if(res.cancel){//用户点击取消
                      console.log('用户点击取消');
                  }
              }
            })
        },
        handleAddFriend(){
            wx.showModal({//提示弹框
                title:'提示信息',
                content:'申请好友',
                confirmText:'同意',//确认按钮内容
                success:(res)=>{
                    if(res.confirm){//用户点击确定
                        //在本用户下的friendList字段下添加请求好友的id
                        db.collection('users').doc(app.userInfo._id).update({
                            data:{
                                friendList:_.unshift(this.data.messageId)
                            }
                        }).then((res)=>{})
                        //通过云函数更新请求方的friendList字段
                        wx.cloud.callFunction({
                            name:'update',
                            data:{
                                collection:"users",
                                doc:this.data.messageId,
                                data:`{friendList:_.unshift('${app.userInfo._id}')}`
                            }
                        }).then(res=>{})
                        //删除已添加成功的好友消息
                        this.removeMessage()
                    }else if(res.cancel){//用户点击取消
                        console.log('用户点击取消');
                    }
                }
              })
        },
        removeMessage(){//封装删除添加好友请求记录
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
        },
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