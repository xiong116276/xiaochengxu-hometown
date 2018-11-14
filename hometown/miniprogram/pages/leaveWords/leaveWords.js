// miniprogram/pages/leaveWords/leaveWords.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',//用户头像链接
    userInfo: {},//用户信息
    showLeaveWords:false,//是否显示留言列表
    nickName:'',//留言 昵称
    contact:'',//留言 联系方式
    leaveWords:'',//留言 内容
    showList:[],// 获取到的留言列表内容
    pageIndex:1,//留言列表当前页码
    pageSize:5,//留言列表一页显示条数
    pageCount:'',//留言总共页数
    hasMore:false,//留言是否显示完
    pageInput:''//留言跳转页码
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    });
    
    this.getData(this.data.pageIndex);

    // console.log(this.getTime());
  },
  getData:function(index){
    var t = this;
    wx.cloud.callFunction({
      name: 'pages',
      data: {
        dbName: 'leaveWords',
        pageIndex: index,
        pageSize: t.data.pageSize
      }
    }).then(res => {
      // console.log(res)
      
      t.setData({
        showList: res.result.data,
        hasMore:res.result.hasMore,
        pageCount:res.result.totalPage
      })
      
    })
  },
  btnPrev:function(){
    if(this.data.pageIndex > 1){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
      this.setData({
        pageIndex:this.data.pageIndex - 1
      });
      this.getData(this.data.pageIndex);
      
    }else{
      wx.showModal({
        content: '已经是第一页',
      })
    }
  },
  btnNext: function () { 
    if (this.data.pageIndex < this.data.pageCount) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
      this.setData({
        pageIndex: parseInt(this.data.pageIndex) + 1
      });
      this.getData(this.data.pageIndex);
    } else {
      wx.showModal({
        content: '已经是最后一页',
      })
    }
  },
  bindKeyInput:function(e){
    this.setData({
      pageInput: e.detail.value
    })
  },
  btnSkip:function(){
    // console.log(this.data.pageInput);
    var key = this.data.pageInput;
    if (key == "" || key == 0){
      wx.showModal({
        content: '页码不能为空或者0！',
      })
    }else{
      var reg = /^[0-9]*$/;
      if (reg.test(key)) {
        // console.log(1);
        if(key > this.data.pageCount){
          wx.showModal({
            content: '页码超出！',
          })
        }else{
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
          })
          this.setData({
            pageIndex: key
          });
          this.getData(this.data.pageIndex);
        }
      } else {
        wx.showModal({
          content: '页码只能为数字！',
        })
      }
    }
  },
  getTime:function(){
    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours() < 10?'0'+date.getHours():date.getHours();
    //分
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    //秒
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() ;

    return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s
  },
  inputNickName:function(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  inputContact: function (e) { 
    this.setData({
      contact:e.detail.value
    })
  },
  inputLeaveWords: function (e) { 
    this.setData({
      leaveWords:e.detail.value
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.nickName==''){
      wx.showModal({
        content: '昵称不能为空！',
      })
    }else{
      if (e.detail.value.contact == ''){
        wx.showModal({
          content: '联系方式不能为空！',
        })
      } else {
        if (e.detail.value.leaveContent == '') {
          wx.showModal({
            content: '留言内容不能为空！',
          })
        }else{
          const t = this;
          const db = wx.cloud.database();
          db.collection('leaveWords').add({
            data:{
              nickName:t.data.nickName,
              contact:t.data.contact,
              leaveContent: t.data.leaveWords,
              ltime: t.getTime()
            },
            success:function(res){
              // console.log(res);
              wx.showModal({
                content: '留言提交成功！',
                cancelText: '继续留言',
                confirmText: '查看留言',
                success: function (res) {
                  if (res.confirm) {
                    t.getData(t.data.pageIndex);
                    t.showList();
                  } else if (res.cancel) {
                    t.formReset();
                  }
                }
              })
            }
          })
        }
      }
    }
  },
  formReset: function () {
    this.setData({
      nickName: '',
      contact: '',
      leaveWords: ''
    })
  },
  showList:function(){
    this.setData({
      showLeaveWords: true
    })
  },
  showForm:function(){
    this.setData({
      showLeaveWords: false
    })
    this.formReset();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})