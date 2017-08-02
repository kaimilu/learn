Page({

    onBegin: function(event) {
        // 父级 -> 子级
        // wx.navigateTo({
        //     url:"../userList/userList"
        // });

        //页面跳转
        wx.redirectTo({
            url: '../userList/userList'
        })
    }
})