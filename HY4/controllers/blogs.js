const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

blogRouter.use(bodyParser.json())
  
blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })

	response.json(blogs.map(Blog.format))  
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	
	if (body === undefined) {
		return response.status(400).json({ error: 'body was empty' })
	}

	if (typeof body.url === 'undefined' || typeof body.title === 'undefined') {
		return response.status(400).json({ error: 'url or title was empty' })
	}

	try {
		const user = await User.findOne({ _id: body.userId })
		const savedBlog = await new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes ? body.likes: 0,
			user: decodedToken.id
		}).save()
		
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(Blog.format(savedBlog))
		
	} catch (exception) {
		console.log(exception)
		response.status(500).json({ error: 'something went wrong'})
	}
	
})

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	try {

		const blog = await Blog.findById(request.params.id)
		if (blog.user.toString() !== decodedToken.id.toString()) {
			return response.status(401).send({ error: 'permission denied'})
		} 

		await Blog.findByIdAndRemove(request.params.id)
		return response.status(204).end()
					
	} catch (exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted id' })
	}
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body
	if (typeof body.likes === 'undefined') {
		return reponse.status(400).json({ error: 'content missing' })
	}	

	try {
		const result = await Blog.findByIdAndUpdate(request.params.id, {likes: body.likes}, {new: true})
		response.status(201).json(result)
	} catch (exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted id' })
	}

})

module.exports = blogRouter
