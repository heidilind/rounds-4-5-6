const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json())

app.use(middleware.logger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use(middleware.error)

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true } )
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log('not able to connect to database', err)
  })

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
