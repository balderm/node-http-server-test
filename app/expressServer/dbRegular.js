// content of file app\expressServer\dbRegular.js

'use strict' // force strict mode
// postgres library for node
const pg = require('pg')
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
// const config = "postgres://postgres:pwd@localhost:5432/node_hero"
// create a connection pool
// const pool = pg.Pool(config)
// generic query method
exports.query = function queryDb (sql, values, cb) {
  pg.connect(config, (err, client, done) => {
    if (err) {
      console.log('error fetching client from pool', err)
    }

    client.query(sql, values, (err, result) => {
      done()

      if (err) {
        return console.error('error happened during query', err)
      }
      
      cb(err, result)
    })
  })
}
// test database connection
exports.test = function testConnection () {
  // create and test connection
  pg.connect(config, (err, client, done) => {
    if (err) {
      console.log('error fetching client from pool', err)
    }

    client.query('SELECT $1::varchar AS status', ['OK'], (err, result) => {
      done()

      if (err) {
        return console.error('error happened during query', err)
      }
      console.log('Connection Test: ' + result.rows[0].status)
      // process.exit(0)
    })
  })

  // handle idle connection pool errors
  // pool.on('error', (err, client) => {
  //   console.error('error happened while client was idle', err.message, err.stack)
  // })
}
