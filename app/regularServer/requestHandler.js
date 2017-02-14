// content of app\regularServer\equestHandler.js

exports.handler = function requestHandler (request, response) {
  console.log(request.url)
  response.end('Hello from Nodes.js server!')
}
