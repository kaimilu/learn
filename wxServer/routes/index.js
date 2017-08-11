var express = require('express');
var router = express.Router();
var request = require('superagent');

/**
 *  百度 lbs 云检索
 */
router.get('/baidu/lbsData', function(req, res, next) {
    console.log(req.query)
    var result = "";
    request
        .get('http://api.map.baidu.com/geosearch/v3/nearby')
        .query(req.query)
        .end(function(err, response) {
            result = JSON.parse(response.text);
            res.json(result)
        });

})

router.get('/baidu/convertIP', function(req, res, next) {
    request
        .get('http://api.map.baidu.com/geoconv/v1/?')
        .query({
            ak: 'ljXs5Tq8SGuEffMsAYZglcEjgCGgiCRW',
            coords: '114.21892734521,29.575429778924',
            from: '3'
        })
})

module.exports = router;