/**
 * @file 微信小程序JSAPI
 * @author 崔健 cuijian03@baidu.com 2017.01.10
 */

/**
 * 云检索LBS.云 小程序API类
 * 
 * @class LBSWX
 */
class LBSWX {
    constructor(param) {
        this.ak = param["ak"]
    }


    /**
     * 使用微信接口进行定位
     *
     * @param {string} type 坐标类型
     * @param {Function} success 成功执行
     * @param {Function} fail 失败执行
     * @param {Function} complete 完成后执行
     */
    getWXLocation(type, success, fail, complete) {
        type = type || 'gcj02',
            success = success || function() {};
        fail = fail || function() {};
        complete = complete || function() {};
        wx.getLocation({
            type: type,
            success: success,
            fail: fail,
            complete: complete
        });
    }

    /**
     * 云检索LBS POI周边检索
     * 
     * @param {any} param 检索配置
     * 参数对象结构可以参考
     * http://lbsyun.baidu.com/index.php?title=lbscloud/api/geosearch
     * @memberof LBSWX
     */
    search(param) {
        var that = this;
        param = param || {};
        /**
         * ak	access_key	string(50)	字符串	必须
            geotable_id	geotable主键	uint32	数字	必须
            q	检索关键字	string(45)	任意汉字或数字，英文字母，可以为空字符	可选
            location	检索的中心点	string(25)	逗号分隔的经纬度	必须
            样例：116.4321,38.76623
         */
        let serachparam = {
            q: param["query"] || '',
            ak: that.ak
        }
    }
}

module.export.LBSWX = LBSWX;