// content of app\expressServer\handler.js

const rp = require('request-promise')

exports.home = function getHome (request, response) {
  var json = {
    message: 'Hello from Express server! ',
    chance: request.chance
  }

  response.render('home', json)
}

exports.cookie = function getCookie (request, response) {
  var json = {
    message: 'Have a cookie',
    imgsrc: '/static/images/cookie.jpg',
    chance: request.chance
  }

  response.render('cookie', json)
}

exports.weather = function getWeather (request, response) {
  rp({
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: request.params.city, 
      apiKey: 'hoArfRosT1215'
    },
    json: true
  })
  .then((data) => {
    response.render('weather', data)
  })
  .catch((err) => {
    console.log(err)
    response.render('error')
  })
}

exports.sendError = function sendError (request, response) {
    throw new Error('oops')
}
