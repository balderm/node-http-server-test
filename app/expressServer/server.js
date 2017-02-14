// content of app\expressServer\server.js

// const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const handler = require('./handler.js')
const middle = require('./middleware.js')
const app = express()
const port = 3000

exports.start = function startExpressServer () {
  // middlewares
  app.use(middle.logRequest)
  app.use(middle.appendUniqueKey)
  // handle requests from root
  app.get('/', handler.home)
  // handle requests from /cookie
  app.get('/cookie', handler.cookie)
  // handle requests for weather queries
  app.get('/:city', handler.weather)
  // handle requests from /error
  app.get('/error', handler.sendError)
  // error handling
  app.use(middle.logError)
  // configure handlebars
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'views/layout'
  }))
  app.set('view engine', '.hbs')
  app.set('views', 'views')
  // expose static content folder
  app.use('/static', express.static('public'))
  // server listening
  app.listen(port)

  console.log('Express server listening on port ' + port)
}
