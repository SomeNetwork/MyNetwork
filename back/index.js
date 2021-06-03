require('dotenv').config({ path: './.env.local' })
require('dotenv').config()
console.log(`process.env`, process.env)
require('./src')
