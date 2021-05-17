global.MyKnexKnife = global.MyKnexKnife || {}
const model = global.MyKnexKnife.Express = {}

const handle = {
  GET(model, req){
    return model.fetch(req.query)
  },
  POST(model, req){
    if(!req.body.id)
      delete req.body.id // 有时候 id 会为空串
    return model.upsert(req.body)
  },
  DELETE(model, req){
    return model.del(req.body)
  }
}
const methods = Object.keys(handle)

exports = module.exports = function(req){
  const { path, method } = req
  const [n1, mName, id, n2] = path.split('/')
  if(n2) return
  const m = model[mName]
  if(!m) return
  if(id)
    return handle.GET(m, req)
  else
    return handle[method](m, req)
}