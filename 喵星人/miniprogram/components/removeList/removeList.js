// components/removeList/removeList.js
const app = getApp()
const db = wx.cloud.database()
Page({
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
    lifetimes: {
        attached: function() {
            debugger
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
    },
})