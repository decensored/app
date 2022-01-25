const http = require('http')
const Gun = require('gun')

const server = http.createServer(Gun.serve(__dirname))

const gun = { web: server.listen(3001) }
