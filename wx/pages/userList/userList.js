// var userData = require('../../data/userlist.js');
var lbsWx = require('../../libs/lbs-wx.js')
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
        duration: 1000,
        // 
        latitude: '',
        longitude: '',

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        // this.setData({
        //     user_list: userData.userList
        // })


    },

    onLoad: function() {
        var that = this;
        var LBSwx = new lbsWx.LBSWX({
            ak: ''
        })
        var fail = function(data) {
            console.log(data);
        };
        var success = function(data) {
            // 转换label
            for (let item of data.contents) {
                item.label = item.label.split(',');
            }
            that.setData({
                laosu: data
            })
            console.log(data)
        };

        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                console.log("==============")
                console.log(latitude + ':' + longitude)
                that.setData({
                    latitude: latitude,
                    longitude: longitude
                })
            }
        })
        LBSwx.search({
            tags: "搜索",
            fail: fail,
            success: success,
            location: "113.94763969118,22.546721293351",
            geotable_id: "164969"
                // location: "113.94766618049,22.546562069184"
                // location: "114.05694988501,22.536342639594"
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