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
     * 
     */
    search(param) {
        var that = this;
        param = param || {};
        let searchparam = {
            ak: that.ak,
            output: param["output"] || 'json',
            radius: param["radius"] || 10000,
            q: param["tags"] || 'mm',
            geotable_id: param["geotable_id"] || "165117",
            sortby: "distance:1"
        }
        let otherparam = {
            success: param["success"] || function() {},
            fail: param["fail"] || function() {}
        }
        let type = 'gcj02';
        let locationsuccess = function(result) {
            searchparam["location"] = result["latitude"] + ',' + result["longitude"];
            console.log(searchparam["location"])
            wx.request({
                url: 'http://m174382l91.iask.in/baidu/lbsData',
                data: searchparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success(data) {
                    let res = data["data"];
                    if (res["status"] === 0) {
                        // outputRes 包含两个对象，
                        // originalData为百度接口返回的原始数据
                        // wxMarkerData为小程序规范的marker格式


                        otherparam.success(res);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail(data) {
                    otherparam.fail(data);
                }
            })
        }
        let locationfail = function(result) {
            otherparam.fail(result);
        };
        let locationcomplete = function(result) {};
        if (!param["location"]) {
            console.log(1);
            that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
        } else {
            console.log(2)
            let longitude = param.location.split(',')[1];
            let latitude = param.location.split(',')[0];
            console.log(latitude + '====' + longitude)
            let errMsg = 'input location';
            let res = {
                errMsg: errMsg,
                latitude: latitude,
                longitude: longitude
            };
            locationsuccess(res);
        }
    }
}

module.exports.LBSWX = LBSWX;