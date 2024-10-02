const { Pool } = require('pg')
const pool = new Pool({
    host: 'db',
    post: 3000,
    user: 'capivara',
    password: 'capivaras123',
    database: 'dbcapivaras'
})

module.exports = pool