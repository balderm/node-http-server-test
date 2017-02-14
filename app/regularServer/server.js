// content of app\regularServer\server.js

const request = require('./requestHandler.js')
const http = require('http')
const port = 3000
let server

exports.start = function startServer () {
  server = http.createServer(request.handler)
  server.listen(port, (err) => {
    if (err) {
      return console.log('Something bad happened', err)
    }

    console.log('Server listening on port ' + port)
  })
}
