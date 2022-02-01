// const http = require('http')
// const Gun = require('gun')

// const server = http.createServer(Gun.serve(__dirname))

// const gun = { web: server.listen(3001) }

const express = require('express')
const Gun = require('gun')

const app = express()
const port = 3001
app.use(Gun.serve)

const server = app.listen(port, () => {
  console.log('Listening at: http://localhost:' + port)
})

Gun({ web: server })
