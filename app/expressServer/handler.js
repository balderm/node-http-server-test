// content of app\expressServer\handler.js

const rp = require('request-promise')
const db = require('./dbPromise.js')
const dbr = require('./dbRegular.js')

function getHome (request, response) {
  var json = {
    message: 'Hello from Express server! ',
    chance: request.chance
  }

  response.render('home', json)
}

function getCookie (request, response) {
  var json = {
    message: 'Have a cookie',
    imgsrc: '/static/images/cookie.jpg',
    chance: request.chance
  }

  response.render('cookie', json)
}

function getUsers (request, response) {
  db.queryAny('SELECT * FROM USERS', null, (data) => {
    var users_json = JSON.stringify({users: data})
    console.log(users_json)
    response.render('users', {users: data})
    // response.json(users_json)
  })
}

function addUser (request, response) {
  const user = request.body
  // TODO do this in a secure way
  db.queryAny('INSERT INTO users (name, age) VALUES ($1, $2)', [user.name, user.age], (data) => {
    // do something
    response.send(200)
  })
}

function getWeather (request, response) {
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
    // response.json(data)
  })
  .catch((err) => {
    console.log(err)
    response.render('error')
  })
}

function sendError (request, response) {
    throw new Error('oops')
}

module.exports.home = getHome
module.exports.cookie = getCookie
module.exports.getUsers = getUsers
module.exports.addUser = addUser
module.exports.weather = getWeather
module.exports.sendError = sendError
