// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerList:[],
    indicatorDots:true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  attached:function(){//从数据库获取banner数据
    const db = wx.cloud.database();
    db.collection('bannerList').get({
      success:res => {
        // console.log(res);
        this.setData({
          bannerList:res.data
        })
      }
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
