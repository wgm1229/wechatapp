// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command//{links: _.inc(1)}需要用到

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(typeof event.data)
  try {
    if(typeof event.data == 'string' ){
      event.data = eval('('+event.data+')')//若data为字符串，解析字符,并重新赋值
    }
    return await db.collection(event.collection).doc(event.doc).update({
      data: {
        ...event.data
      },
    })
   /*  .then(res=>{有这段会使调用云函数返回结果为null
      console.log('更新数据库',res)
    }) */
  } catch(e) {
    console.error(e)
  }
}