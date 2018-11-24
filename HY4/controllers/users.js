const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const bodyParser = require('body-parser')

usersRouter.use(bodyParser.json())


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1})
    
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const userName = body.username
    const pass = body.password
    const adultvalue = body.adult == undefined? true: body.adult 
    
    const existingUser = await User.find({username: userName})
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    if (pass.length < 3) {
      return response.status(400).json({ 
        error: 'password must include at least 3 characters' 
      })
    }
    
    const passwordHash = await bcrypt.hash(pass, 10)

    const user = new User({
      username: userName,
      name: body.name,
      passwordHash,
      adult: adultvalue
    })

    const savedUser = await user.save()
    response.json(User.format(savedUser))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter