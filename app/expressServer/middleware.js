// content of app\expressServer\middleware.js

exports.logRequest = function logRequest (request, response, next) {
  console.log('\nRequest url = ' + request.url)
  console.log(request.headers)
  next()
}

exports.appendUniqueKey = function appendUniqueKey (request, response, next) {
  request.chance = Math.random() // TODO handle properly with Web Crypto API
  next()
}

exports.logError = function logError (err, request, response, next) {
  // log error in console
  console.log(err)
  // send errro 500
  response.status(500).send('Something broke in here!')
}
