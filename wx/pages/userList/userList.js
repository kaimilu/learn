var userData = require('../../data/userlist.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        // 是否显示面板指示点
        indicatorDots: true,
        // 是否自动切换
        autoplay: false,
        // 自动切换时间间隔
        interval: 3000,
        // 滑动动画时长
        duration: 1000
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        this.setData({
            user_list: userData.userList
        })


    },



    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    }

})