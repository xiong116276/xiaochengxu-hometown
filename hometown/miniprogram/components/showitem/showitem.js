// components/showItem/showItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail:function(e){
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/detail/detail?'+'id='+id,
        success:function(){

        },
        fail:function(err){
          console.log(err)
        }
      })
    }
  }
})
