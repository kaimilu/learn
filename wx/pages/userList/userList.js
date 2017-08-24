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
        // 当前页码
        curPage: 0,
        LBSwx: null,
        laosu: null
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {


    },

    onLoad: function() {
        var that = this;
        this.data.LBSwx = new lbsWx.LBSWX({
            ak: 'ljXs5Tq8SGuEffMsAYZglcEjgCGgiCRW'
        })
        this.getData();
    },

    // 获取数据
    getData: function() {
        var that = this;
        that.data.LBSwx.search({
            tags: "搜索",
            fail: that.fail,
            success: that.success,
            location: "114.02597366,22.54605355",
            // location: "113.94763969118,22.546721293351",
            geotable_id: "164969",
            curPage: that.data.curPage,
            radius: 2000000000
        })
        wx.showNavigationBarLoading();
    },
    // 处理并且绑定数据
    success: function(data) {
        var laosuData = null;
        var that = this;
        var locationArr = [];
        for (let item of data.contents) {
            item.label = item.label.split(',');
            locationArr.push(item.location[1] + ',' + item.location[0])

        }
        locationArr = locationArr.join('|');
        that.computed(locationArr);
        laosuData = data;
        if (this.data.laosu) {
            laosuData.contents = this.data.laosu.contents.concat(data.contents)
        }
        this.setData({
            laosu: laosuData
        })
        wx.hideNavigationBarLoading()

    },
    computed: function(destinations) {
        var that = this;
        console.log(that.data.lbsWx);
        that.data.LBSwx.computed({
            destinations: destinations,
            fail: that.fail,
            success: function(data) {
                that.setData()
            }
        })

    },
    fail: function(data) {
        console.log(data)
    },
    onScrollLower: function(event) {
        if (Math.ceil(this.data.laosu.total / this.data.curPage) <= this.data.curPage) {
            return
        }
        this.data.curPage++;
        console.log(this.data.curPage)
        this.getData();
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