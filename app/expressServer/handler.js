// content of app\expressServer\handler.js

const rp = require('request-promise')
const db = require('./dbPromise.js')
const dbr = require('./dbRegular.js')

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

exports.getUsers = function getUsers (request, response) {
  db.queryAny('SELECT * FROM USERS', null, (data) => {
    var users_json = JSON.stringify(data)
    console.log({users: data})
    response.render('users', {users: data})
    // response.json(users_json)
  })
}

exports.addUser = function addUser (request, response) {
  const user = request.body
  // TODO do this in a secure way
  db.queryAny('INSERT INTO users (name, age) VALUES ($1, $2)', [user.name, user.age], (data) => {
    // do something
    response.send(200)
  })
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
