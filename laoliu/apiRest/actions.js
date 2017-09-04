const request = require('superagent')

module.exports = function generateActions(apiModel) {
  return {
    findAll: async function(ctx, next){
      try{
        let conditions = {}
        let select = {}
        let query = ctx.request.query
        console.log('=====================')
        console.log(query)
        if(query.conditions){
          conditions = JSON.parse(query.conditions)
        }
        let result = new Promise((resolve, reject) => {
          request
            .get(apiModel.url)
            .query(query)
            .end(function(err, res){
              if(err)
                reject(err)
              resolve(JSON.parse(res.text))
            })
        })
        if(ctx.url.split('?')[0] === '/getData.jsonp'){
          console.log('jsonp')
        }
         
       return ctx.body = result
        
      }catch(error){
        return ctx.body = error
      }
    }
  }
}