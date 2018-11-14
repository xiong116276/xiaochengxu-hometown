// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;//集合名称
  var filter = event.filter?event.filter:null;//查询条件，默认为空 格式 {type:'scenery'}

  var pageIndex = event.pageIndex?event.pageIndex:1;//当前页码，默认为1
  var pageSize = event.pageSize?event.pageSize:10;//每页显示记录条数

  const countResult = await db.collection(dbName).where(filter).count();//获取集合中的总记录数
  const total = countResult.total;//得到总记录数
  const totalPage = Math.ceil(total / pageSize);//计算需要多少页

  var hasMore;//提示是否还有数据
  if(pageIndex > totalPage||pageIndex == totalPage){
    hasMore = false;
  }else{
    hasMore = true
  }

  //最后查询数据并返回给前端
  return db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
    res.hasMore = hasMore;
    res.totalPage = totalPage;
    return res;
  })
}