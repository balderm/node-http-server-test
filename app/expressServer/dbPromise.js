// content of file app\expressServer\dbPromise.js

const pgp = require('pg-promise')(/*init params i.e.{noWarnings: true}*/)
// postgres connection config
const config = {
  user: 'postgres',
  password: 'pwd',
  database: 'node_hero',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}
// or can use const config = "postgres://username:password@host:port/database"

// create database connection instance
const db = pgp(config)

// exporting the database object for shared use
// exports = db;
// test connection
exports.test = function testConnection () {
  db.one('SELECT $1::varchar AS status', ['OK'])
    .then(data => {
      console.log('\nConnection Status: ' + data.status)
    })
    .catch(err => {
      console.log('error happened during query', err)
    })
}
// generic method for query execution
exports.queryAny = function queryDb(sql, value, cb) {
  db.any(sql, value)
    .then(data => {
      cb(data)
    })
    .catch(err => {
      console.log('error happened during query', err)
    })
}
