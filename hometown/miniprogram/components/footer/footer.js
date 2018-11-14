// components/footer/footer.js
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
    connect:[
      {
        id:'0',
        img:'cloud://tes-c5bf5b.7465-tes-c5bf5b/images/QRcode-weChat.jpg',
        text:'微信'
      },
      {
        id: '1',
        img: 'cloud://tes-c5bf5b.7465-tes-c5bf5b/images/QRcode-qq.jpg',
        text: 'QQ'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    distinguish:function(e){
      var list = [];
      for (var i = 0, len = this.data.connect.length;i < len;i++){
        list.push(this.data.connect[i].img);
      }
      wx.previewImage({
        current: this.data.connect[e.currentTarget.id].img, // 当前显示图片的http链接
        urls:list
      })
    }
  }
})
