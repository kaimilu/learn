Page({

    onBegin:function(event){
        // 父级 -> 子级
        // wx.navigateTo({
        //     url:"../userList/userList"
        // });

        // 页面跳转
        // wx.redirectTo({
        //     url:'../userList/userList'
        // })

        // wx.navigateTo({
        //     url:'String',
        //     success: function(res){
        //         // success
        //     },
        //     fail: function(){
        //         // fail
        //     },
        //     complete: function(){
        //         // complete
        //     }
        // })
       
        console.log("execuute onTap")
     

    },
    onTextTap:function(event){
        console.log("execuute onTextTap")
    },
    onUnload:function(){
        console.log('onUnload');
    },

    onHide:function(){
        console.log('onHide');
    }
})