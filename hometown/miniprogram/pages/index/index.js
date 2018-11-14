//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    aboutDetail:'/pages/about/about',
    introduction:{
      img:'cloud://tes-c5bf5b.7465-tes-c5bf5b/images/symbolic-02.jpg',
      text: [
        '淅川县(Xichuan County)古称丹阳，历史悠久，文化灿烂，是楚文化的发祥地之一。 春秋时为楚国始都丹阳所在地，楚国800多年历史中有300多年定都丹阳， 楚人以丹阳为起点，取威定霸于春秋战国，开疆拓土，一路南征，先后统一50多个小国， 成为南方霸主，并创造了灿烂的文化。曾孕育了一代商圣范蠡、史学家范晔、唯物主义思想家 范缜等一批有重要影响的历史人物。',
        '淅川依山傍水，旅游资源丰富。是世界最大调水工程南水北调中线工程核心水源地和渠首工程所在地。 拥有亚洲最大的人工淡水湖丹江口水库，“天下第一渠首”南水北调中线工程渠首， 全国重点文物保护单位千年古刹香严寺和荆紫关古镇以及丹江大观苑、八仙洞、坐禅谷、神仙洞等景区。'
      ]
    }
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({// 查看是否授权
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.avatarUrl = res.userInfo.avatarUrl;
              app.globalData.userInfo = res.userInfo;
              this.setData({
                avatarUrl: app.globalData.avatarUrl,
                userInfo: app.globalData.userInfo
              })
            }
          })
        }
      }
    })
  },

  // onGetUserInfo: function(e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

})
