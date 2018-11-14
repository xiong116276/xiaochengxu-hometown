// pages/title.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl:{
      type:String,
      value:'./user-unlogin.png'
    },
    headertitle:String
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    navlist:[],
    navShow:false
  },
  attached:function(){
    const db = wx.cloud.database();
    db.collection('navList').get({
      success:res => {
        // console.log(res.data);
        this.setData({
          navlist:res.data
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navToogle:function(){
      this.setData({
        navShow: !this.data.navShow
      })
    },
    onGetUser:function(e){
      if (e.detail.userInfo) {
        app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
        app.globalData.avatarUrl = e.detail.userInfo;
      }
    }
  }
})
